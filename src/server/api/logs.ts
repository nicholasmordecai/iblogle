import { Router } from 'express';

import { Log } from './../controllers/core/logs';

let router;

export default () => {
    router = Router();

    router.get('/info/:start/:limit', (req, res, next) => {
        Log.getInfoLogs(req.params.start, req.params.limit)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                res.status(500).json(error);
            })
    });

    return router;
}