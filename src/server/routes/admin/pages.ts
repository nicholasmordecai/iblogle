import { Router } from 'express';

import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { PageController } from './../../controllers/blog/pageController';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res) => {
        PageController.getListOfPages()
            .then((pages) => {
                AdminRenderer.render({
                    template: 'pages/view-pages',
                    data: { pages: pages }
                }, (html) => {
                    res.status(200).send(html);
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/edit', (req, res) => {
        PageController.getSinglePage(req.query.page_id)
            .then((page) => {
                if (page.length < 1) {
                    AdminRenderer.render({
                        template: 'pages/edit-page',
                        data: { editorRequired: true, noPage: true }
                    }, (html) => {
                        res.status(200).send(html);
                    });
                } else {
                    AdminRenderer.render({
                        template: 'pages/edit-page',
                        data: { editorRequired: true, page: page[0]}
                    }, (html) => {
                        res.status(200).send(html);
                    });
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    return router
}