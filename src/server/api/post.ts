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
        let published: number = (req.body.published) ? 1 : 0;
        let slug: string = req.body.slug; 
        let template: string = req.body.template;
        let layout: string = req.body.layout;

        /**
         * @TODO - Write a validator for any api requests, such as this
         */
        PostController.updatePost(id, content, title, description, userID, published, slug, template, layout)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    return router;
}