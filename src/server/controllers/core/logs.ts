import { BaseController } from './../baseController';

import * as winston from 'winston';
import * as fs from 'fs';
import { disableConsoleAlerts } from 'raven';
const { combine, timestamp, label, prettyPrint } = winston.format;

export class Log extends BaseController {
    private static _logger;

    public static init() {
        Log._logger = winston.createLogger({
            format: combine(
                timestamp(),
                prettyPrint()
            ),
            transports: [new winston.transports.File({ filename: 'logs/info.log', level: 'info' })]
        })
    }

    public static info(message: string) {
        Log._logger.log('info', message);
    }

    public static getInfoLogs(start, limit) {
        return new Promise((resolve, reject) => {
            fs.readFile(`${global['appRoot']}/../../logs/info.log`, 'utf-8', (error, data) => {
                if(error) {
                    reject(error);
                } else {
                    let logs = Log.parseLogfile(data, start, limit);
                    resolve(logs);
                }
            });
        });
    }

    public static parseLogfile(data, start, limit) {
        let string = data.replace(/[\r\n]+/g, ' ');
        let array = string.match(/\{.*?\}/g);
        return array.slice(start, limit);
    }
}