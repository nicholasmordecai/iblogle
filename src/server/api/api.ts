import { Router } from 'express';
import { EmailController } from './../controllers/emailController';
import * as request from 'request';
import * as csrf from 'csurf';

// import other routes
import Post from './post';
import Theme from './theme';

var csrfProtection = csrf({ cookie: true });
let router;

export default () => {
    router = Router();

    router.use('/post', Post());
    router.use('/theme', Theme());

    router.post('/contact-form', csrfProtection, (req, res, next) => {
        let captureResponse = req.body['g-recaptcha-response'];
        request.post({ url: 'https://www.google.com/recaptcha/api/siteverify', form: { secret: '6LfQVGIUAAAAAA4v1jHux6hXF9PNx25CNqMcBXJX', response: captureResponse } }, (err, httpResponse, body) => {
            let data = JSON.parse(body);
            if (!data.success) {
                res.json({ error: 'Invalid recapture, please confirm you are a human being' });
            } else {
                EmailController.sendEmail(req.body.mail, req.body.subject, req.body.comment, (error, info) => {
                    res.status(200).json({ error: error, info: info });
                });
            }
        });
    });

    router.post('/test', (req, res, next) => {
        res.status(200).json('abcdefg');
    });

    return router;
}