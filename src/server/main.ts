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
import BlogPostController from './controllers/blogPostController';
import ErrorController from './controllers/errorController';
import SocketController from './controllers/socketController';

export default class Main {

    public static _app: express.Express;
    public static _socketController: SocketController;

    constructor() {
        // create new instance of express
        Main._app = express();

        Main._app.use(helmet());

        ErrorController.init();
        BlogPostController.readJSONToCache();

        // setup the json parser middleware
        Main._app.use(bodyParser.urlencoded({ extended: true }));
        Main._app.use(bodyParser.json());

        Main._app.set('view engine', 'hbs');
        Main._app.set('views', __dirname + '/../views/');

        // configure views path
        Main._app.engine('hbs', hbs.express4({
            defaultLayout: __dirname + '/../views/layouts/main.hbs',
            partialsDir: __dirname + '/../views/partials',
            layoutsDir: __dirname + '/../views/layouts',
            extname: '.hbs'
        }));

        if(process.env.NODE_ENV === 'production') {
            Main._app.enable('view cache');
        }

        Main._app.use(compression());
        Main._app.use(cookieParser());

        // configure static path
        Main._app.use(express.static(__dirname + '/../website/public'));

        Main._app.use('/', MainRouter());
        Main._app.use('/api', APIRouter());

        // use the 404 custom middleware
        Main._app.use(Error404);
        Main._app.use(ErrorCSRF.handleError(Main._app));

        Main._socketController = new SocketController(Main._app)

        // set the port to listen on
        Main._app.set('port', 4200);

        // start the actual application
        Main._app.listen(Main._app.get('port'), () => {
            console.log('Express Started, listening on port 4200');
        });
    }
}

var server = new Main();

// here so supertest can access easily
module.exports = Main._app;