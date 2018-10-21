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
    public static getAllPosts(): Promise<Array<IPost>> {
        return new Promise((resolve, reject) => {
            let query = `
            SELECT p.id, p.content, p.title, p.description, p.date_created, p.last_updated, p.slug, u.first_name
            FROM posts as p
            LEFT JOIN users AS u ON p.user_id = u.id
            `;

            MySQLController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getPost(id): Promise<Array<IPost>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, user_id, date_created, last_updated, slug, template, layout
                FROM posts
                WHERE id = ?`;

            let params = [id];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }

    public static getPostBySlug(slug: string): Promise<Array<IPost>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    p.id,
                    p.content,
                    p.title,
                    p.description,
                    DATE_FORMAT(p.date_created, "%W %M %e %Y") as date_created,
                    p.last_updated,
                    p.slug,
                    p.template,
                    p.layout,
                    u.id AS user_id,
                    u.name AS user_name
                FROM posts AS p
                LEFT JOIN users AS u
                    ON p.user_id = u.id
                WHERE slug = ?`;

            let params = [slug];

            MySQLController.executeQuery(query, params, resolve, reject, 'postbyslug')
        });
    }

    public static createPost(id: string, content: string, title: string, description: string, userID: string, published: number, slug: string, template: string, layout: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                INSERT INTO 
                posts (
                    id, 
                    content, 
                    title, 
                    description, 
                    user_id, 
                    last_updated, 
                    published, 
                    slug, 
                    template, 
                    layout)
                VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?);`;

            let params = [id, content, title, description, userID, published, slug, template, layout];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }

    public static updatePost(id: string, content: string, title: string, description: string, userID: string, published: number, slug: string, template: string, layout: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                UPDATE 
                posts SET
                    content = ?,
                    title = ?,
                    description = ? ,
                    last_updated = NOW(),
                    published = ?,
                    slug = ?,
                    template = ?,
                    layout = ?
                WHERE id = ?
                `;

            let params = [content, title, description, published, slug, template, layout, id];

            MySQLController.executeQuery(query, params, resolve, reject)
        })
    }
}