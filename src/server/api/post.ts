import { Router } from 'express';

let router;

export default () => {
    router = Router();

    router.put('/save', (req, res, next) => {
        console.log(req.body);
        res.status(200).json('ok');
    });

    return router;
}