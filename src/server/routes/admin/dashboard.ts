import { Router } from 'express';
import { Auth } from './../../controllers/authentication';

let router;

export default () => {
    router = Router();

    router.get('/', Auth.loggedIn, Auth.adminRequired, (req, res) => {
        res.render('admin/dashboard', {
            layout: 'admin',
            title: 'Theme One - Admin | Login',
        });
    });

    return router
}