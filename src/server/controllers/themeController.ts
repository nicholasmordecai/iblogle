import { BaseController } from './baseController';
import { ThemeModel } from './../models/mysql/themes';
import { Utils } from './../utils/utils';
export class ThemeController extends BaseController {

    public static generateFileStructure(id) {
        return new Promise((resolve, reject) => {
            ThemeModel.getThemeByID(id)
                .then((theme) => {
                    let name = theme[0].name
                    Utils.walkDirectory(`./src/website/views/themes/${name}/templates`, (templates) => {
                        Utils.walkDirectory(`./src/website/views/themes/${name}/layouts`, (layouts) => {
                            Utils.walkDirectory(`./src/website/views/themes/${name}/partials`, (partials) => {
                                Utils.walkDirectory(`./src/website/views/themes/${name}/sass`, (sass) => {
                                    resolve({
                                        templates: templates,
                                        layouts: layouts,
                                        partials: partials,
                                        sass: sass
                                    });
                                });
                            });
                            
                        });
                    })
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}