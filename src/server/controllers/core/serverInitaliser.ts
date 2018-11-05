import { BaseController } from '../baseController';
import { Server } from './../../main';
import { Stats } from './stats';
import { FileController } from './fileController';
import { PreviewController } from './../theme/previewController';
import ErrorCSRF from './../../middleware/csrf';

import MainRouter from './../../routes/router';
import AdminRouter from './../../routes/adminRouter';
import AdminLogin from './../../routes/admin/login';
import APIRouter from './../../api/api';

import * as express from 'express';
import * as fs from 'fs';
import * as helmet from 'helmet';
// import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { CacheController } from './cacheController';
import { ErrorController } from './errorController';
import * as hbs from 'express-hbs';
import * as path from 'path';


export class ServerInitaliser extends BaseController {

    private static _bootTime: number;

    public static boot() {
        ServerInitaliser._bootTime = Date.now();
        global['appRoot'] = path.resolve(__dirname) + '../../../';

        ServerInitaliser.loadConfig();
        ServerInitaliser.initaliseErrorController();
        ServerInitaliser.createExpressServer();
        ServerInitaliser.setupMiddleware();
        ServerInitaliser.initaliseCache();
        ServerInitaliser.configureStaticPaths();
        ServerInitaliser.initaliseOtherControllers();
        ServerInitaliser.setupRoutes();
        ServerInitaliser.startServer();
    }

    private static loadConfig() {
        Server.config = JSON.parse(fs.readFileSync(global['appRoot'] + '/../../server-config.json', 'utf-8'));
        console.log('Loaded Config:',timeNow());
    }

    private static createExpressServer() {
        Server._app = express();
        console.log('Express Service Started:', timeNow());

    }

    private static setupMiddleware() {
        Server._app.use(helmet());
        Server._app.use(ErrorCSRF.handleError(Server._app));
        Server._app.use(bodyParser.urlencoded({ extended: true }));
        Server._app.use(bodyParser.json());
        Server._app.use(compression());
        Server._app.use(cookieParser());

        Server._app.use((req, res, next) => {
            if (req.method === 'GET') {
                Stats.newGetRequest();
            } else if (req.method === "POST") {
                Stats.newPostRequest();
            }
            next();
        });

        console.log('Middleware Loaded:', timeNow());
    }

    private static initaliseCache() {
        CacheController.init();
        console.log('Cache Initalised:', timeNow());
    }

    private static initaliseErrorController() {
        ErrorController.init();
        console.log('Initalised Error Controller:', timeNow());
    }

    private static initaliseOtherControllers() {
        new FileController();
        new PreviewController();
        console.log('Initalised Other Controller:', timeNow());
    }

    private static setupRoutes() {
        Server._app.set('view engine', 'hbs');
        Server._app.set('views', path.join(global['appRoot'], `/../../themes/${Server.config.active_theme}`));

        Server._app.engine('hbs', hbs.express4({
            defaultLayout: `themes/${Server.config.active_theme}/layouts/main.hbs`,
            partialsDir: `themes/${Server.config.active_theme}/partials`,
            layoutsDir: `themes/${Server.config.active_theme}/layouts`,
            extname: '.hbs'
        }));

        Server._app.use('/', MainRouter());
        Server._app.use('/admin', AdminRouter());
        Server._app.use('/admin-login', AdminLogin());
        Server._app.use('/api', APIRouter());

        console.log('Routes Setup & Theme Paths Configured:', timeNow());
    }

    private static configureStaticPaths() {
        // configure static path
        Server._app.use(express.static(__dirname + '/../website/public'));
        Server._app.use("/public/css", express.static(global['appRoot'] + `/../../themes/${Server.config.active_theme}/css`));
        Server._app.use("/public/js", express.static(global['appRoot'] + `/../../themes/${Server.config.active_theme}/js`));
        console.log('Static Paths Configured:', timeNow());
    }

    private static startServer() {
        // set the port to listen on
        Server._app.set('port', Server.config.port);

        // start the actual application
        Server._app.listen(Server._app.get('port'), () => {
            console.log(`Server listening on port: ${Server.config.port}`);
            console.log(`Boot Sequence Complete: ${timeNow()} - ${Date.now() - ServerInitaliser._bootTime}ms`);
        });
    }
}

function timeNow() {
    return new Date(Date.now()).toDateString() + ' ' + new Date(Date.now()).toTimeString()
}