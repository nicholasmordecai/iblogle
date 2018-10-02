import { MySQLController } from '../../controllers/database/mysqlController';

declare interface IPost {
    id: string;
    content: string;
    title: string;
    description: string;
    user_id: number;
    date_created: number;
    last_updated: number;
    published: number;
    slug: string;
    template: string;
    layout: string;
}

export class PostModel {
    public static getAllPosts(): Promise <Array<IPost>>{
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, user_id, date_created, last_updated
                FROM posts`;

                MySQLController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getPost(id): Promise <Array<IPost>>{
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, user_id, date_created, last_updated
                FROM posts
                WHERE id = ?`;

            let params = [id];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }

    public static getPostBySlug(slug: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, user_id, date_created, last_updated, slug, template, layout
                FROM posts
                WHERE slug = ?`;

            let params = [slug];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }
}