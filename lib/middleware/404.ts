export default (req, res, next) => {
    if (req.accepts('html')) {
        // render html page
        res.render('pages/404', {'404': true, title: '404 Not Found', slug: '404'});
        return;

    } else if (req.accepts('json')) {
        // send json if it's an api request
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
}