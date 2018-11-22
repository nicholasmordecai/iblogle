import * as hbs from 'express-hbs';

// import controllers
import { BaseController } from '../baseController';

interface IPreview {
    themeName: string;
    id: string;
    themeLocation: string;
    instance;
}

export class PreviewController extends BaseController {
    private static _previewReferences: { [id: string]: IPreview };

    public constructor() {
        super();
        PreviewController._previewReferences = {};
    }

    public static getInstance(id: string): IPreview | null | never {
        for(let i in this._previewReferences) {
            if(this._previewReferences[i].id === id) {
                return this._previewReferences[i];
            }
        }
        return null;
    }

    /**
     * 
     * @param themeName 
     * @param id 
     * @param themeLocation 
     * 
     * @todo clean up the instances if they haven't been used in x amount of time (1 hour?)
     */
    public static generatePreviewInstance(themeName: string, id: string, themeLocation: string) {
        let instance = hbs.create().express3({
            viewsDir: global['appRoot'] + `/../views/${themeLocation}/`,
            partialsDir: global['appRoot'] + `/../views/${themeLocation}/partials/`,
            layoutDir: global['appRoot'] + `/../views/${themeLocation}/layouts/`,
            defaultLayout: global['appRoot'] + `/../views/${themeLocation}/layouts/main.hbs`,
            extName: '.hbs'
        });

        let themePreview: IPreview = {
            themeName: themeName,
            id: id,
            themeLocation: themeLocation,
            instance: instance
        }

        themePreview.instance = instance;
        this._previewReferences[id] = themePreview;
    }
}