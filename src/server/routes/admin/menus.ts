import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { MenuController } from './../../controllers/theme/menuController';


let router;

export default () => {
    router = Router();

    router.get('/', (req, res) => {
        AdminRenderer.render({
            template: 'view-menus',
            data: { }
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router;
}