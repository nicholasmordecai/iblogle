import { Router } from 'express';

// import controllers
import { PageController } from './../controllers/blog/pageController';

let router;

export default () => {
    router = Router();

    router.put('/save', (req, res, next) => {
        PageController.updatePage(req.body, req.query.page_id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    });

    return router;
}