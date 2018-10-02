import { Router } from 'express';

/**
 * import routes
 */
import Dashboard from './admin/dashboard';
import Login from './admin/login';
import Posts from './admin/posts';
import Themes from './admin/themes';
import Menus from './admin/menus';

let router;

export default () => {
    router = Router();

    router.use('/login', Login());
    router.use('/', Dashboard());
    router.use('/themes', Themes());
    router.use('/content/posts', Posts());
    router.use('/content/menus', Menus());

    return router;
}