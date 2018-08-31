import { Router } from 'express';
import { ThemeModel } from './../../models/mysql/themes';
import { ThemeController } from './../../controllers/themeController';

import { PostController } from './../../controllers/postController';
import { Auth } from './../../controllers/authentication';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res, next) => {
        res.render('admin/pages/dashboard', { layout: 'admin' });
    });

    router.get('/admin-login', (req, res, next) => {
        res.render('admin/pages/login', { layout: 'admin' });
    });
    
    router.get('/settings/general', (req, res) => {
        res.render('admin/pages/settings/general', { layout: 'admin' });
    });


    router.get('/content/view-posts', (req, res) => {
        PostController.getListOfPosts()
            .then((posts) => {
                res.render('admin/pages/view-posts', { layout: 'admin', posts: posts });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/content/edit-post', (req, res) => {
        PostController.getSinglePost(req.query.post_id)
            .then((post) => {
                if(post.length < 1) {
                    res.render('admin/pages/edit-post', { layout: 'admin', editorRequired: true, noPost: true });
                } else {
                    res.render('admin/pages/edit-post', { layout: 'admin', editorRequired: true, post: post[0] });
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/themes/all', (req, res) => {
        ThemeModel.getThemes()
            .then((themes) => {
                res.render('admin/pages/view-themes', { layout: 'admin', themes: themes });
            });
    });

    router.get('/themes/edit', (req, res) => {
        let themeID = req.query.theme_id;
        ThemeController.generateFileStructure(themeID)
            .then((structure) => {
                res.render('admin/pages/edit-theme', { layout: 'admin',  editorRequired: true, structure: structure });
            })
    });

    return router
}