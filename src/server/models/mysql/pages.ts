import { MySQLController } from './../../controllers/database/mysqlController';

declare interface IPage {
    id: number;
    name: string;
    description: string;
    content: string;
    url: string;
    author: string;
    created_at: number;
    last_edit: number;
    published: number;
    layout: string;
    template: string;
}

export class PageModel {
    public static getPages(): Promise <Array<IPage>>{
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, content, url, created_at, last_edited, layout, template
                FROM pages
                WHERE published = 1`;

                MySQLController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getPage(id): Promise <Object[] | Error> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, content, url, created_at, last_edited
                FROM pages
                WHERE id = ?`;

            let params = [id];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }
}