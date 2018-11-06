import { Router } from 'express';

import { PostController } from './../controllers/blog/postController';
import { Authentication } from '../controllers/core/authentication';

let router;

export default () => {
    router = Router();

    router.put('/save', Authentication.isAdmin, (req, res, next) => {
        let id: string = req.query.post_id;
        let content: string = req.body.content;
        let title: string = req.body.title;
        let description: string = req.body.description;
        let userID: string = req.decoded.cid;
        let published: number = 0;
        let slug: string = req.body.slug;
        let template: string = req.body.template;
        let layout: string = req.body.layout;

        if(req.body.published == 'true') {
            published = 1;
        }

        let isNew = req.query.new;

        /**
         * @TODO - Write a validator for any api requests, such as this
         */

        if (isNew) {
            PostController.createNewPost(content, title, description, userID, published, slug, template, layout)
                .then((result) => {
                    res.status(200).json({id: result['insertId']});
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        } else {
            PostController.updatePost(id, content, title, description, userID, published, slug, template, layout)
                .then((result) => {
                    res.status(200).json('ok');
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        }

    });

    router.delete('/archive', Authentication.isAdmin, (req, res, next) => {
        let id: string = req.query.post_id;
        PostController.archivePost(id)
            .then((result) => {
                res.status(200).json('ok');
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.delete('/delete', Authentication.isAdmin, (req, res, next) => {
        let id: string = req.query.post_id;
        PostController.deletePost(id)
            .then((result) => {
                res.status(200).json('ok');
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/', (req, res, next) => {
        let topics: string = req.query.topics;
        PostController.getPostsByTopics(topics)
            .then((posts) => {
                res.render(`templates/blank`, {
                    layout: `server`,
                    partials: [req.query.partial],
                    data: posts
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    return router;
}