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
            SELECT p.id, p.content, p.title, p.description, p.date_created, p.last_updated, p.slug, p.published, u.first_name
            FROM posts as p
            LEFT JOIN users AS u ON p.user_id = u.id
            WHERE archived = 0;
            `;

            MySQLController.executeQuery(query, [], resolve, reject)
        });
    }

    public static getPost(id): Promise<Array<IPost>> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT id, content, title, description, published, user_id, date_created, last_updated, slug, template, layout
                FROM posts
                WHERE id = ?
                AND archived = 0;`;

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
                    u.id AS author_id,
                    u.name AS author_name,
                    u.profile as author_profile
                FROM posts AS p
                LEFT JOIN users AS u
                    ON p.user_id = u.id
                WHERE slug = ?
                AND archived = 0;`;

            let params = [slug];

            MySQLController.executeQuery(query, params, resolve, reject, 'postbyslug')
        });
    }

    public static createPost(content: string, title: string, description: string, userID: string, published: number, slug: string, template: string, layout: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                INSERT INTO 
                posts ( 
                    content, 
                    title, 
                    description, 
                    user_id, 
                    last_updated, 
                    published, 
                    slug, 
                    template, 
                    layout)
                VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?);`;

            let params = [content, title, description, userID, published, slug, template, layout];

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
        });
    }

    public static archivePost(id: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                UPDATE 
                posts SET
                    archived = 1
                WHERE id = ?
                `;

            let params = [id];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }

    public static deletePost(id: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let query = `
                DELETE FROM posts 
                WHERE id = ?
                `;

            let params = [id];

            MySQLController.executeQuery(query, params, resolve, reject)
        });
    }

    public static getPostsByTopic(topic: string, limit: number = 0, iterationCount: number = 10): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT * FROM posts WHERE id IN (
                    SELECT post_id FROM post_topic
                    LEFT JOIN topic ON post_topic.topic_id = topic.id
                    WHERE topic.slug=?
                ) LIMIT ?, ?;`;
            let params = [topic, limit, iterationCount];

            MySQLController.executeQuery(query, params, resolve, reject, 'getPostByTopic')
        });
    }

    public static getPostsByTopics(topics: string[], limit: number = 0, iterationCount: number = 5): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            let query = `
            SELECT 
                p.title,
                p.description,
                DATE_FORMAT(p.date_created, "%W %M %e %Y") as date_created,
                p.last_updated,
                p.slug,
                u.name as publisher_name,
                u.id as publisher_id
            FROM posts as p
            LEFT JOIN users as u ON p.user_id = u.id
                WHERE p.id IN (
                SELECT post_id FROM post_topic 
                LEFT JOIN topic ON topic_id = topic.id
                WHERE topic.id in (?)
            ) 
            
            AND p.archived = 0;`;
            let params = [topics];

            MySQLController.executeQuery(query, params, resolve, reject, 'getPostByTopics')
        });
    }
}