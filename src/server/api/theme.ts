import { Router } from 'express';


import { ThemeController } from './../controllers/themeController';

let router;

export default () => {
    router = Router();

    router.put('/save', (req, res, next) => {
        let id = req.query.theme_id;
        console.log(id);
        console.log(req.body);
        res.status(200).json('ok');
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