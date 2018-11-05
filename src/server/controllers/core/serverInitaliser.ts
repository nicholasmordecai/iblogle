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
import { Log } from './logs';
import * as hbs from 'express-hbs';
import * as path from 'path';


export class ServerInitaliser extends BaseController {

    private static _bootTime: number;

    public static boot() {
        process.on('uncaughtException', (error) => {
            
        });

        ServerInitaliser._bootTime = Date.now();
        global['appRoot'] = path.resolve(__dirname) + '../../../';

        ServerInitaliser.initaliseErrorController();
        ServerInitaliser.loadConfig();
        ServerInitaliser.createExpressServer();
        ServerInitaliser.setupMiddleware();
        ServerInitaliser.initaliseCache();
        ServerInitaliser.initaliseOtherControllers();
        ServerInitaliser.setupRoutes();
        ServerInitaliser.configureStaticPaths();
        ServerInitaliser.startServer();
    }

    private static loadConfig() {
        Server.config = JSON.parse(fs.readFileSync(global['appRoot'] + '/../../server-config.json', 'utf-8'));
        Log.info('Loaded Config');
    }

    private static createExpressServer() {
        Server._app = express();
        Log.info('Express Service Started');

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

        Log.info('Middleware Loaded:');
    }

    private static initaliseCache() {
        CacheController.init();
        Log.info('Cache Initalised:');
    }

    private static initaliseErrorController() {
        ErrorController.init();
        Log.init();
        Log.info('Initalised Error Controller');
    }

    private static initaliseOtherControllers() {
        new FileController();
        new PreviewController();
        Log.info('Initalised Other Controller:');
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

        Log.info('Routes Setup & Theme Paths Configured:');
    }

    private static configureStaticPaths() {
        // configure static path
        Server._app.use(express.static(__dirname + '/../../../website/public'));
        Server._app.use("/public/css", express.static(global['appRoot'] + `/../../themes/${Server.config.active_theme}/css`));
        Server._app.use("/public/js", express.static(global['appRoot'] + `/../../themes/${Server.config.active_theme}/js`));
        Log.info('Static Paths Configured:');
    }

    private static startServer() {
        // set the port to listen on
        Server._app.set('port', Server.config.port);

        // start the actual application
        Server._app.listen(Server._app.get('port'), () => {
            Log.info(`Server listening on port: ${Server.config.port}`);
            Log.info(`Boot Sequence Complete == ${Date.now() - ServerInitaliser._bootTime}ms`);
        });
    }
}