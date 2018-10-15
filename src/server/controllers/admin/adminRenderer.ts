import * as hbs from 'express-hbs';
import adminRouter from '../../routes/adminRouter';

declare interface IRenderOptions {
    template: string;
    layout?: string;
    data?;
}

export class AdminRenderer {
    private static _renderer;
    
    private static getRenderer() {
        if(!AdminRenderer._renderer) {
            return AdminRenderer.startRenderer();
        } else {
            return AdminRenderer._renderer;
        }
    }

    private static startRenderer() {
        AdminRenderer._renderer = hbs.create().express3({
            viewsDir: `${global['appRoot']}/../views`,
            partialsDir: `${global['appRoot']}/../views/partials`,
            layoutDir: `${global['appRoot']}/../views/layouts`,
            defaultLayout: `${global['appRoot']}/../views/layouts/admin.hbs`,
            extName: '.hbs'
        });
        return AdminRenderer._renderer;
    }

    public static render(options: IRenderOptions, callback: Function) {
        let renderer = AdminRenderer.getRenderer();
        renderer(`${global['appRoot']}/../views/templates/${options.template}.hbs`, {
            layout: `${global['appRoot']}/../views/layouts/${options.layout || 'admin'}.hbs`,
            settings: {},
            data: options.data
        }, (error, html) => {
            if(error) {
                console.log(error);
            } else {
                callback(html);
            }
        })
    }
}