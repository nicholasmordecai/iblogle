import * as Raven from 'raven';

import { BaseController } from './baseController';

export class ErrorController extends BaseController {

    public static init() {
        if (process.env.NODE_ENV === 'production') {
            Raven.config('sentry.io config here').install();
        }
    }

    public static error(error) {

    }
}