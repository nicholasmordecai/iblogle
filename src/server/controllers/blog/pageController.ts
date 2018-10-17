import { BaseController } from '../baseController';

import { PageModel } from '../../models/mysql/pages';

export class PageController extends BaseController {
    public static getListOfPages() {
        return new Promise((resolve, reject) => {
            PageModel.getPages()
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getSinglePage(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            PageModel.getPage(id)
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getSinglePageBySlug(slug: string): Promise<any> {
        return new Promise((resolve, reject) => {
            PageModel.getPageByUrl(slug)
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
    
}