import { Router } from 'express';
import { PageModel } from './../models/mysql/pages';
import { PreviewController } from './../controllers/previewController';
import { PostController } from './../controllers/postController';

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
                    // if the preview_id value is present in the request query
                    if (req.query.preview_id) {
                        // get an instance based of that preview
                        let instance = PreviewController.getInstance(req.query.preview_id);
                        // if the instance is returned, then use that handlebars instance to render the html, otherwise default to the active (cached) instance
                        if (instance) {
                            instance.instance(`${global['appRoot']}/${instance.themeLocation}templates/${page.template}.hbs`, {
                                settings: {},
                                data: {}
                            }, (error, html) => {
                                res.status(200).send(html)
                            });
                        } else {
                            res.status(404).send('Theme preview ID did not match');
                        }
                    } else {
                        res.render(`templates/${page.template}`, {
                            layout: `${page.layout}`
                        });
                    }
                })
            }
        })
        .catch((error) => { });

        router.get('/blog/:blogID', (req, res, next) => {
            let slug = req.params.blogID;
            if(!slug) {
                // hande if no blog id is found
                return;
            }

            PostController.getSinglePostBySlug(slug)
            .then((postData) => {
                if(postData.length < 1) {
                    // handle no blog post found (404)
                } else {
                    let page = postData[0];
                    console.log(page)
                    res.render(`templates/${page.template}`, {
                        layout: `${page.layout}`,
                        data: page[0]
                    });
                }
            })
            .catch((error) => {
                // handle error here
            })
        })

    return router;
}