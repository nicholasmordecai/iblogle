import { Router } from 'express';

import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { Authentication } from '../../controllers/core/authentication';
import { PageController } from './../../controllers/blog/pageController';

let router;

export default () => {
    router = Router();

    router.get('/', Authentication.isAdmin, (req, res) => {
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

    router.get('/:pageID', Authentication.isAdmin, (req, res) => {
        PageController.getSinglePage(req.params.pageID)
            .then((page) => {
                if (page.length < 1) {
                    AdminRenderer.render({
                        template: 'pages/edit-pages',
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