import Utils from './../utils/utils';

export default (req, res, next) => {
    let tPath = req.path.split('/');
    let path = [];
    for(let i of tPath) {
        path.push({slug: i});
    }

    let s = '';
    let c: number = 0;
    for(let i of path) {
        s += `${i.slug}/`;
        path[c].href = s;
        path[c].last = false;
        c++;
    }

    path[path.length-1].last = true;

    path[0].slug = 'home';

    for(let p of path) {
        p.slug = Utils.capitalize(p.slug);
    }

    req.breadcrumbs = path;

    next();
}