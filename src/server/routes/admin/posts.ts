import { Router } from 'express';

import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { PostController } from './../../controllers/blog/postController';
import { Authentication } from '../../controllers/core/authentication';

let router;

export default () => {
    router = Router();

    router.get('/', Authentication.isAdmin, (req, res) => {
        PostController.getListOfPosts()
            .then((posts) => {
                AdminRenderer.render({
                    template: 'view-posts',
                    data: { posts: posts }
                }, (html) => {
                    res.status(200).send(html);
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/:postID', Authentication.isAdmin, (req, res) => {
        PostController.getSinglePost(req.params.postID)
            .then((post) => {
                if (post.length < 1) {
                    AdminRenderer.render({
                        template: 'edit-posts',
                        data: { editorRequired: true, noPost: true }
                    }, (html) => {
                        res.status(200).send(html);
                    });
                    res.render('edit-post', { layout: 'admin', editorRequired: true, noPost: true });
                } else {
                    AdminRenderer.render({
                        template: 'edit-post',
                        data: { editorRequired: true, post: post[0]}
                    }, (html) => {
                        res.status(200).send(html);
                    });
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    return router
}