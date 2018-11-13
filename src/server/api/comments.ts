import { Router } from 'express';

import { CommentController } from './../controllers/blog/commentController';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res, next) => {
        CommentController.getCommentsForPost('my-blog')
        .then((comments) => {
            res.render(`templates/blank`, {
                layout: `server`,
                partials: [req.query.partial],
                data: comments
            });
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    })

    return router;
}