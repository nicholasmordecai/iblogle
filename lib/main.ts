// import Global from './controllers/globalController';
import * as fs from 'fs';
import * as express from 'express';
import * as hbs from 'express-hbs';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

import MainRouter from './routes/router';
import APIRouter from './api/api';
import Error404 from './middleware/404';
import BlogPostController from './controllers/blogPostController';


var Raven = require('raven');
Raven.config('https://4878089bb9314a34a92445e43a84f38a@sentry.io/1223324').install();

export default class Main {

    private _app: express.Express;
    private _router: express.Router;
    private _hbs;
    private _http: http.Server;

    constructor() {
        BlogPostController.watchPostFolder();
        BlogPostController.readJSONToCache();

        // create new instance of express
        this._app = express();

        // setup the json parser middleware
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(bodyParser.json());

        this._app.set('view engine', 'hbs');

        // configure views path
        this._app.engine('hbs', hbs.express4({
            defaultLayout: __dirname + '/../views/layouts/main.hbs',
            partialsDir: __dirname + '/../views/partials',
            layoutsDir: __dirname + '/../views/layouts'
        }));

        // this._app.enable('view cache');

        this._app.use(compression());
        this._app.use(cookieParser());

        // configure static path
        this._app.use(express.static('public'));

        this._app.use('/', MainRouter());
        this._app.use('/api', APIRouter());

        // use the 404 custom middleware
        this._app.use(Error404);

        // set the port to listen on
        this._app.set('port', 4200);

        // start the actual application
        this._app.listen(this._app.get('port'), () => {
            console.log('listening on port 4200');
        });
    }
}

var server = new Main();

module.exports = server;