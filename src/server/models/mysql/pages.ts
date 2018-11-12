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
                SELECT id, name, description, content, url, DATE_FORMAT(created_at, "%W %M %e %Y") as created_at, DATE_FORMAT(last_edited, "%W %M %e %Y") as last_edited, layout, template, published
                FROM pages
                WHERE archived = 0`;

                MySQLController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getPage(id): Promise <Object[] | Error> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, content, url, created_at, last_edited, template, layout, archived
                FROM pages
                WHERE id = ?`;

            let params = [id];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }

    public static getPageByUrl(url: string): Promise <Object[] | Error> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, content, url, created_at, last_edited
                FROM pages
                WHERE url = ?;`;

            let params = [url];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }

    public static updatePage(id: string, name: string, description: string, content: string, url: string, published: string, layout: string, template: string): Promise <Object[] | Error> {
        return new Promise((resolve, reject) => {
            let query = `
            UPDATE 
            pages SET
                name = ?,
                description = ?,
                content = ?,
                url = ?,
                last_edited = NOW(),
                published = ?,
                layout = ?,
                template = ?
            WHERE id = ?;`;

            let params = [name, description, content, url, published, layout, template, id];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }
}