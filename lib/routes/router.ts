import { Router } from 'express';
import Technologies from './../data/technologies';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res) => {
        res.render('pages/index', {home: true});
    });

    router.get('/about', (req, res) => {
        res.render('pages/about', {about: true, title: 'About Me', path: req.breadcrumbs});
    });

    router.get('/portfolio', (req, res) => {
        res.render('pages/portfolio', {portfolio: true, title: 'My Work', path: req.breadcrumbs});
    });

    router.get('/technologies', (req, res) => {
        res.render('pages/technologies', {
            technologies: true,
            techs: Technologies.list,
            title: "Technologies I've used",
            path: req.breadcrumbs
        });
    });

    router.get('/contact', (req, res) => {
        res.render('pages/contact', {contact: true, title: 'Contact Me', slug: 'Contact'});
    });

    router.get('/about/music', (req, res) => {
        res.render('pages/music', {
            music: true, 
            title: 'My Music',
            path: req.breadcrumbs
        });
    });

    router.get('/about/photography', (req, res) => {
        res.render('pages/photography', {
            music: true, 
            title: 'My Photography',
            path: req.breadcrumbs
        });
    });

    router.get('/about/travels', (req, res) => {
        res.render('pages/travels', {
            travels: true, 
            title: 'My Travels',
            path: req.breadcrumbs
        });
    });

    return router;
}