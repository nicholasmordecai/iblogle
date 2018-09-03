import { Router } from 'express';
import { PostController } from './../controllers/postController';

/**
 * import routes
 */
import Dashboard from './admin/dashboard';
import Login from './admin/login';
import Posts from './admin/posts';
import Themes from './admin/themes';

let router;

export default () => {
    router = Router();

    router.use('/login', Login());
    router.use('/', Dashboard());
    router.use('/themes', Themes());


    router.get('/admin-login', (req, res, next) => {
        res.render('pages/login', { layout: 'admin' });
    });

    router.get('/settings/general', (req, res) => {
        res.render('pages/settings/general', { layout: 'admin' });
    });

    router.get('/content/view-posts', (req, res) => {
        PostController.getListOfPosts()
            .then((posts) => {
                res.render('pages/view-posts', { layout: 'admin', posts: posts });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/content/edit-post', (req, res) => {
        PostController.getSinglePost(req.query.post_id)
            .then((post) => {
                if (post.length < 1) {
                    res.render('pages/edit-post', { layout: 'admin', editorRequired: true, noPost: true });
                } else {
                    res.render('pages/edit-post', { layout: 'admin', editorRequired: true, post: post[0] });
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    return router;
}