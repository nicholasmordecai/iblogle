import { Router } from 'express';

let router;

export default () => {
    router = Router();

    
    router.get('/', (req, res, next) => {
        res.render('pages/login', { layout: 'admin' });
    });

    return router
}