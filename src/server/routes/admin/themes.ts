import { Router } from 'express';
import { AdminRenderer } from './../../controllers/adminRenderer';
import { ThemeController } from './../../controllers/themeController';
import { ThemeModel } from './../../models/mysql/themes';

let router;

export default () => {
    router = Router();

    router.get('/all', (req, res) => {
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

    router.get('/edit', (req, res) => {
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