import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { Authentication } from './../../controllers/core/authentication';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res, next) => {
        AdminRenderer.render({
            template: 'users',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router
}