import { MySQLController } from '../../controllers/database/mysqlController';

declare interface ITopic {
    id: string;
    name: string;
    description: string;
    slug: string;
}

export class TopicModel {
    public static getAllTopics(): Promise<Array<ITopic>> {
        return new Promise((resolve, reject) => {
            let query = `
            SELECT
                id,
                name,
                description,
                slug
            FROM topic;`;

            MySQLController.executeQuery(query, [], resolve, reject, 'getAllTopics')
        });
    }

    public static getTopicList(slug: string): Promise<Array<ITopic>> {
        return new Promise((resolve, reject) => {
            let query = `
            SELECT
                id,
                name,
                description,
                slug
            FROM topic
            WHERE slug = ?;`;

            MySQLController.executeQuery(query, [slug], resolve, reject, '')
        });
    }
}