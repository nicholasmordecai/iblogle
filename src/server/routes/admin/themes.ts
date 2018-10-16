import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { ThemeController } from './../../controllers/theme/themeController';
import { ThemeModel } from './../../models/mysql/themes';
import { Authentication } from './../../controllers/core/authentication';

let router;

export default () => {
    router = Router();

    router.get('/all', Authentication.isAdmin, (req, res) => {
        ThemeModel.getThemes()
            .then((themes) => {
                AdminRenderer.render({
                    template: 'view-themes',
                    data: { themes: themes }
                }, (html) => {
                    res.status(200).send(html);
                });
            });
    });

    router.get('/edit', Authentication.isAdmin, (req, res) => {
        let themeID = req.query.theme_id;
        ThemeController.generateFileStructure(themeID)
            .then((structure) => {
                AdminRenderer.render({
                    template: 'edit-theme',
                    data: { editorRequired: true, structure: structure }
                }, (html) => {
                    res.status(200).send(html);
                });
            })
    });

    return router;
}