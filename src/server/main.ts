require('dotenv').config();

import * as express from 'express';
import { SocketController } from './controllers/core/socketController';
import { ServerInitaliser } from './controllers/core/serverInitaliser';

declare interface ServerConfig {
    website_name: string;
    domain_name: string;
    version: string;
    mysql_host: string;
    mysql_database: string;
    mysql_username: string;
    mysql_password: string;
    mysql_port: number;
    https: boolean;
    port: number;
    active_theme: string;
}

export class Server {

    public static _app: express.Express;
    public static _socketController: SocketController;
    public static _config: ServerConfig;

    constructor() {
        ServerInitaliser.boot();
    }

    public static get config() {
        return this._config;
    }

    public static set config(config: ServerConfig) {
        this._config = config;
    }
}

new Server();

// here so supertest can access easily
module.exports = Server._app;