import { MysqlController } from './../../controllers/mysqlController';

export class PostModel {
    public static getAllPosts(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, user_id, date_created, last_updated
                FROM posts`;

            MysqlController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getPost(id): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, user_id, date_created, last_updated
                FROM posts
                WHERE id = ?`;

            let params = [id];

            MysqlController.executeQuery(query, params, resolve, reject)
        });
    }

    public static getPostBySlug(slug: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, user_id, date_created, last_updated, slug, template, layout
                FROM posts
                WHERE slug = ?`;

            let params = [slug];

            MysqlController.executeQuery(query, params, resolve, reject)
        });
    }
}