import { BaseController } from '../baseController';
import { Utils } from './../../utils/utils';
import { CommentModel } from './../../models/mysql/comments';

export class CommentController extends BaseController {
    public static getCommentsForPost(postURL: string) {
        return new Promise((resolve, reject) => {
            CommentModel.getCommentsByPostURL(postURL)
            .then((comments) => {
                let commentArray = [];
                // put all the base comments in the array (no replies)
                for(let comment of comments) {
                    if(!comment.is_reply) {
                        commentArray.push(comment);
                    }
                }

                // loop back over comments and put the replies in their parents object
                for(let comment of comments) {
                    if(comment.is_reply) {
                        let parent = comments[Utils.findWithAttr(comments, 'post_id', comment.comment_id)];
                        parent.hasReplies = true;
                        if(!parent.replies) {
                            parent.replies = [];
                        }
                        parent.replies.push(comment);
                    }
                }
                resolve(commentArray);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}