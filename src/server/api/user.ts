import * as Express from 'express';
import { Authentication } from './../controllers/core/authentication';
import { UserController } from './../controllers/blog/userController';

let router;

export default () => {

    router = Express.Router();

    router.get('/', (req, res, next) => {
        let userID = req.query.author;
        return new Promise((resolve, reject) => {
            UserController.userByID(userID)
            .then((user) => {
                res.render(`templates/blank`, {
                    layout: `server`,
                    partials: [req.query.partial],
                    data: user
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            })
        })
    });

    return router;
}