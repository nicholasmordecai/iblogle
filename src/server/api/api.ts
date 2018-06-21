import { Router } from 'express';
import EmailController from './../controllers/emailController';
let router;

export default () => {
    router = Router();

    router.post('/contact-form', (req, res, next) => {
        EmailController.sendEmail(req.body.mail, req.body.subject, req.body.comment, (error, info) => {
            res.status(200).json({error: error, info: info});
        });
    });

    router.post('/test', (req, res, next) => {
        res.status(200).json('abcdefg');
    });

    return router;
}