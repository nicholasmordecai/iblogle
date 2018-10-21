import mysql = require('mysql');

import { CacheController } from '../../controllers/core/cacheController';
import { Stats } from './../core/stats';

let pool;

export class MySQLController {

    public static getPool(cb: Function) {
        if (pool) {
            pool.getConnection((err, connection) => {
                if (!err) {
                    cb(null, connection);
                } else {
                    cb(err, null);
                }
            });
        } else {
            pool = mysql.createPool({
                host: process.env.MYSQL_ADDRESS,
                port: parseInt(process.env.MYSQL_PORT),
                database: process.env.MYSQL_NAME,
                user: process.env.MYSQL_USERNAME,
                password: process.env.MYSQL_PASSWORD
            });
            pool.getConnection((err, connection) => {
                if (!err) {
                    cb(null, connection);
                } else {
                    cb(err, null);
                }
            });
        }
    }

    public static executeQuery(query, params, resolve, reject, queryKey: string = null) {
        if (queryKey) {
            let results = CacheController.findInCache(queryKey, params);

            if (results) {
                resolve(results);
                return;
            }
        }

        MySQLController.getPool((err, con) => {
            con.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                    con.release();
                } else {
                    if(queryKey) {
                        CacheController.createCache(queryKey, params, results);
                    }
                    resolve(results);
                    con.release();
                }
            });
            Stats.queryRun(1);
        });
    }
}