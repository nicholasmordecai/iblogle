import { MySQLController } from './../../controllers/mysqlController';

declare interface ITheme {
    id: number;
    name: string;
    description: string;
    author: string;
    version: string;
    active: number;
}

export class ThemeModel {
    public static getThemeByID(id: number): Promise<Array<ITheme>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, author, version, active
                FROM themes
                WHERe id = ?`;

                MySQLController.executeQuery(query, [id], resolve, reject)
        });
    }

    public static getThemes(): Promise<Array<ITheme>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, author, version, active
                FROM themes
                ORDER BY active DESC`;

                MySQLController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getActiveTheme(): Promise<Array<ITheme>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, author, version
                FROM themes
                WHERE active = 1`;

                MySQLController.executeQuery(query, [], resolve, reject)
        });
    }
}