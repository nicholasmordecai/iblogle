import { Router } from 'express';

import { TopicController } from './../controllers/blog/topicController';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res, next) => {
        TopicController.getAllTopics()
            .then((topics) => {
                res.render(`templates/blank`, {
                    layout: `server`,
                    partials: [req.query.partial],
                    data: topics
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    return router;
}