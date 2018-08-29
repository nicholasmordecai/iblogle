import { MysqlController } from './../../controllers/mysqlController';

export class ThemeModel {
    public static getThemes(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, author, version, active
                FROM themes
                ORDER BY active DESC`;

            MysqlController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getActiveTheme(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, author, version
                FROM themes
                WHERE active = 1`;

            MysqlController.executeQuery(query, [], resolve, reject)
        });
    }
}