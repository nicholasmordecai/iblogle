import mysql = require('mysql');

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

    public static executeQuery(query, params, resolve, reject) {
        MySQLController.getPool((err, con) => {
            con.query(query, params, (err, results) => {
                if (err) {
                    reject(err);
                    con.release();
                } else {
                    resolve(results);
                    con.release();
                }
            });
        });
    }

    // public static execute
}