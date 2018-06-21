export default class CSRF {
    public static handleError(app) {
        return function (err, req, res, next) {
            if (err.code !== 'EBADCSRFTOKEN') return next(err)
            // handle CSRF token errors here
            res.status(403)
            res.json('form tampered with')
        };
    }
}