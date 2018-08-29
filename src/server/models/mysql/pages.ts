import { MysqlController } from './../../controllers/mysqlController';

export class PageModel {
    public static getPages(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, content, url, created_at, last_edited, layout, template
                FROM pages
                WHERE id = published = 1`;

            MysqlController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getPage(id) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, name, description, content, url, created_at, last_edited
                FROM pages
                WHERE id = ?`;

            let params = [id];

            MysqlController.executeQuery(query, params, resolve, reject)
        });
    }
}