import { Router } from 'express';

import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { PostController } from './../../controllers/blog/postController';
import { Authentication } from '../../controllers/core/authentication';
import { Utils } from '../../utils/utils';

let router;

export default () => {
    router = Router();

    router.get('/', Authentication.isAdmin, (req, res) => {
        PostController.getListOfPosts()
            .then((posts) => {
                AdminRenderer.render({
                    template: 'posts/view-posts',
                    data: { 
                        posts: posts.posts,
                        postsPublished: posts.postsPublished,
                        postCount: posts.postCount
                    }
                }, (html) => {
                    res.status(200).send(html);
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/new', Authentication.isAdmin, (req, res) => {
        let newPostID = Utils.generateUniquestring();
        res.redirect(`/admin/content/posts/edit?post_id=${newPostID}&new=true`);
    });

    router.get('/edit/', Authentication.isAdmin, (req, res) => {
        // if the edit post url contains the query 'new' as it's set to true, just render an empty post editor page
        if(req.query.new) {
            AdminRenderer.render({
                template: 'edit-post',
                data: { editorRequired: true }
            }, (html) => {
                res.status(200).send(html);
            });
            return;
        }

        // if it's not a new post, run the query to see if it exists in the database
        PostController.getSinglePost(req.query.post_id)
            .then((post) => {
                // if there aren't any results, render a no-post page
                if (post.length < 1) {
                    AdminRenderer.render({
                        template: 'no-post-found',
                        data: { editorRequired: false, noPost: true }
                    }, (html) => {
                        res.status(200).send(html);
                    });
                } else {
                    // otherwise, render the post editor page
                    AdminRenderer.render({
                        template: 'posts/edit-post',
                        data: { post: post[0] }
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