import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { MenuController } from './../../controllers/theme/menuController';
import { Authentication } from '../../controllers/core/authentication';


let router;

export default () => {
    router = Router();

    router.get('/', Authentication.isAdmin, (req, res) => {
        AdminRenderer.render({
            template: 'view-menus',
            data: { }
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router;
}