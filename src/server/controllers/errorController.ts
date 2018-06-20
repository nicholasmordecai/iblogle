import * as Raven from 'raven';

export default class ErrorController {

    public static init() {
        if (process.env.NODE_ENV === 'production') {
            Raven.config('https://4878089bb9314a34a92445e43a84f38a@sentry.io/1223324').install();
        }
    }

    public static error(error) {

    }
}