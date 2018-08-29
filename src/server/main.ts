import * as express from 'express';
import * as hbs from 'express-hbs';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

require('dotenv').config()

import MainRouter from './routes/router';
import APIRouter from './api/api';
import Error404 from './middleware/404';
import ErrorCSRF from './middleware/csrf';
import { BlogPostController } from './controllers/blogPostController';
import { ErrorController } from './controllers/errorController';
import { SocketController } from './controllers/socketController';
import { MysqlController } from './controllers/mysqlController';

export class Server {

    public static _app: express.Express;
    public static _socketController: SocketController;

    constructor() {
        // create new instance of express
        Server._app = express();

        Server._app.use(helmet());

        ErrorController.init();
        BlogPostController.readJSONToCache();

        // setup the json parser middleware
        Server._app.use(bodyParser.urlencoded({ extended: true }));
        Server._app.use(bodyParser.json());

        Server._app.set('view engine', 'hbs');
        Server._app.set('views', __dirname + '/../views/');

        // configure views path
        Server._app.engine('hbs', hbs.express4({
            defaultLayout: __dirname + '/../views/layouts/main.hbs',
            partialsDir: __dirname + '/../views/partials',
            layoutsDir: __dirname + '/../views/layouts',
            extname: '.hbs'
        }));

        if(process.env.NODE_ENV === 'production') {
            Server._app.enable('view cache');
        }

        MysqlController.getPool((error, pool) => {
            if(error) {
                console.log(error);
            } else {
                console.log('Database Connected');
            }
        })

        Server._app.use(compression());
        Server._app.use(cookieParser());

        // configure static path
        Server._app.use(express.static(__dirname + '/../website/public'));

        Server._app.use('/', MainRouter());
        Server._app.use('/api', APIRouter());

        // use the 404 custom middleware
        // Server._app.use(Error404);
        Server._app.use(ErrorCSRF.handleError(Server._app));

        Server._socketController = new SocketController(Server._app)

        // set the port to listen on
        Server._app.set('port', 4200);

        // start the actual application
        Server._app.listen(Server._app.get('port'), () => {
            console.log('Express Started, listening on port 4200');
        });
    }
}

var server = new Server();

// here so supertest can access easily
module.exports = Server._app;