import { Router } from 'express';
import { AdminRenderer } from './../../controllers/adminRenderer';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res, next) => {
        AdminRenderer.render({
            template: 'dashboard',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router
}