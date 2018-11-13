import { MySQLController } from './../../controllers/database/mysqlController';

declare interface IComment {
    id: number;
    name: string;
    email: string;
    post_id: number;
    comment: string;
    approved: number;
    comment_id: number;
    is_reply: number;
    approver_id: number;
    thumbs_up: number;
    thumbs_down: number;
    created_at: string;
    hasReplies: boolean;
    replies: Array<IComment>;
}

export class CommentModel {
    public static getCommentsByPostURL(postURL: string): Promise<IComment[]> {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT 
                    c.id,
                    c.name, 
                    c.email_address,
                    c.post_id,
                    c.comment,
                    c.approved,
                    c.comment_id,
                    c.is_reply,
                    c.thumbs_up,
                    c.thumbs_down,
                    DATE_FORMAT(c.created_at, "%W %M %e %Y") as created_at
                FROM comments as c
                LEFT JOIN posts AS p
                ON p.id = c.post_id
                WHERE c.approved = 1
                AND p.slug = ?
                ORDER BY created_at DESC`;

                MySQLController.executeQuery(query, [postURL], resolve, reject);
        });
    }
}