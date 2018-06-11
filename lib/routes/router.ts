import { Router } from 'express';
import Technologies from './../data/technologies';

let router;

export default () => {
    router = Router();

    router.get('/', (req, res) => {
        res.render('pages/index', {home: true});
    });

    router.get('/about', (req, res) => {
        res.render('pages/about', {about: true, title: 'About Me', slug: 'About'});
    });

    router.get('/portfolio', (req, res) => {
        res.render('pages/portfolio', {portfolio: true, title: 'My Work', slug: 'Portfolio'});
    });

    router.get('/technologies', (req, res) => {
        res.render('pages/technologies', {
            technologies: true,
            techs: Technologies.list,
            title: "Technologies I've used",
            slug: 'Technologies'
        });
    });

    router.get('/contact', (req, res) => {
        res.render('pages/contact', {contact: true, title: 'Contact Me', slug: 'Contact'});
    });

    return router;
}