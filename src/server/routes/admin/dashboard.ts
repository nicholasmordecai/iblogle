import { Router } from 'express';
import { ThemeModel } from './../../models/mysql/themes';
import { ThemeController } from './../../controllers/themeController';
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

    router.get('/content/view-posts', (req, res) => {
        res.render('admin/pages/view-posts', { layout: 'admin' });
    });

    router.get('/content/edit-post/:postID', (req, res) => {
        res.render('admin/pages/edit-post', { layout: 'admin', editorRequired: true });
    });

    router.get('/themes/all', (req, res) => {
        ThemeModel.getThemes()
            .then((themes) => {
                res.render('admin/pages/view-themes', { layout: 'admin', themes: themes });
            });
    });

    router.get('/themes/edit/:themeID', (req, res) => {
        let themeID = req.params.themeID;
        ThemeController.generateFileStructure(themeID)
            .then((structure) => {
                // console.log(structure)
                res.render('admin/pages/edit-theme', { layout: 'admin',  editorRequired: true, structure: structure });
            })
    });

    return router
}