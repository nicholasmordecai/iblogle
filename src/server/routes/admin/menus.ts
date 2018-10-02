import { Router } from 'express';
import { AdminRenderer } from './../../controllers/adminRenderer';
import { MenuController } from './../../controllers/menuController';


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