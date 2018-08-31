import { Router } from 'express';

// import controllers
import { ThemeController } from './../controllers/themeController';

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
        })
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

    return router;
}