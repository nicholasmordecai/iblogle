import { Router } from 'express';

// import controllers
import { ThemeController } from './../controllers/theme/themeController';

let router;

export default () => {
    router = Router();

    router.put('/save', (req, res, next) => {
        ThemeController.saveFile(req)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    });

    router.get('/load-file', (req, res, next) => {
        ThemeController.readFile(req)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    });

    router.delete('/delete-file', (req, res, next) => {
        ThemeController.deleteFile(req)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    });

    
    router.get('/preview', (req, res, next) => {
        ThemeController.previewTheme(req.query.theme_id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    });

    router.get('/list-templates', (req, res, next) => {
        ThemeController.getTemplates()
        .then((templates) => {
            res.status(200).json(templates);
        })
    });

    router.get('/list-layouts', (req, res, next) => {
        ThemeController.getLayouts()
        .then((layouts) => {
            res.status(200).json(layouts);
        })
    })

    return router;
}