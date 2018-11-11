import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { Utils } from './../../utils/utils';

// import stats
import { Stats } from './../../controllers/core/stats';

let router;

export default () => {
    router = Router();

    router.get('/general', (req, res, next) => {
        AdminRenderer.render({
            template: 'settings/general',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    router.get('/logs', (req, res, next) => {
        AdminRenderer.render({
            template: 'settings/logs',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    router.get('/stats', (req, res, next) => {
        AdminRenderer.render({
            template: 'settings/stats',
            data: {
                cachedQueries: Stats.cachedQueries,
                queriesRun: Stats.queriesRun,
                memory: Stats.memoryStats,
                totalGetRequests: Stats.totalGetRequests,
                totalPostRequests: Stats.totalPostRequests,
                cacheLookup: Stats.totalCacheLookups,
                cacheSuccessRate: Stats.cacheSuccessRate,
                uptime: Utils.secondsToDhms(Stats.getUpTime())
            }
        }, (html) => {
            res.status(200).send(html);
        });
    });

    router.get('/redirects', (req, res, next) => {
        AdminRenderer.render({
            template: 'settings/redirects',
            data: {}
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router
}