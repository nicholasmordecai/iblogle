import * as Express from 'express';
import { Authentication } from './../controllers/core/authentication';

let router;

export default () => {

    router = Express.Router();

    router.get('/', (req, res, next) => {

    });
}