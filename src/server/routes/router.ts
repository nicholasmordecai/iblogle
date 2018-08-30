import { Router } from 'express';
import * as csrf from 'csurf';

// import { BlogPostController } from './../controllers/blogPostController';
import admin from './admin/dashboard';
import Breadcrumb from './../middleware/breadcrumb';

import { PageModel } from './../models/mysql/pages';

// var csrfProtection = csrf({ cookie: true });
let router;

const themeRoot = 'themes/theme-one';

export default () => {
    router = Router();

    PageModel.getPages()
        .then((pages) => {
            for (let i = 0, len = pages.length; i < len; i++) {
                let page = pages[i];
                router.get(page.url, (req, res, next) => {

                    res.render(`${themeRoot}/templates/${page.template}`, {
                        layout: `../layouts/${page.layout}`
                    });
                })
            }
        })
        .catch((error) => { });


    router.use('/admin', admin());

    return router;
}