import { Router } from 'express';

let router;

export default () => {
    router = Router();

    
    router.get('/', (req, res, next) => {
        res.render('pages/posts', { layout: 'admin' });
    });

    return router
}