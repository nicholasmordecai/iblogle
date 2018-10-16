import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { Authentication } from './../../controllers/core/authentication';

let router;

export default () => {
    router = Router();

    router.get('/', Authentication.isAdmin, (req, res, next) => {
        AdminRenderer.render({
            template: 'dashboard',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router
}