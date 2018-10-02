import * as fs from 'fs';

import { BaseController } from '../baseController';
import { ThemeModel } from '../../models/mysql/themes';
import { FileController } from '../core/fileController';
import { Utils } from '../../utils/utils';
import { PreviewController } from './previewController';

export class ThemeController extends BaseController {

    public static generateFileStructure(id) {
        return new Promise((resolve, reject) => {
            ThemeModel.getThemeByID(id)
                .then((theme) => {
                    if (theme.length < 1) {
                        reject('No theme found, please try again.');
                        return;
                    }
                    let name = theme[0].name;
                    Utils.walkDirectory(`./themes/${name}/templates`, (templates) => {
                        Utils.walkDirectory(`./themes/${name}/layouts`, (layouts) => {
                            Utils.walkDirectory(`./themes/${name}/partials`, (partials) => {
                                Utils.walkDirectory(`./themes/${name}/css`, (sass) => {
                                    resolve({
                                        templates: templates,
                                        layouts: layouts,
                                        partials: partials,
                                        sass: sass
                                    });
                                });
                            });

                        });
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public static readFile(req) {
        return new Promise((resolve, reject) => {
            let path = FileController.getPathFromID(req.query.file_id);
            if (!path) {
                reject('File not found. Please refresh and try again.');
                return;
            }
            fs.readFile(path, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ file: data, id: req.query.file_id });
                }
            });
        });
    }

    public static saveFile(req) {
        return new Promise((resolve, reject) => {
            let path = FileController.getPathFromID(req.query.file_id);
            if (!path) {
                reject('File not found. Please refresh and try again.');
                return;
            }
            let contents = req.body.content;
            fs.writeFile(path, contents, 'utf-8', (error) => {
                if (error) {
                    reject(error);
                } else {
                    return resolve('File Saved');
                }
            });
        })
    }

    public static deleteFile(req) {
        return new Promise((resolve, reject) => {
            let path = FileController.getPathFromID(req.query.file_id);
            if (!path) {
                reject('File not found. Please refresh and try again.');
                return;
            }
            let themeID = req.query.theme_id;
            if (!themeID) {
                reject('Theme ID does not match. Please refresh and try again.');
                return;
            }
            fs.unlink(path, (error) => {
                if (error) {
                    reject(error);
                } else {
                    ThemeController.generateFileStructure(themeID)
                        .then((tree) => {
                            resolve({ message: 'File Deleted', tree: tree });
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            });
        });
    }

    public static previewTheme(themeID) {
        return new Promise((resolve, reject) => {
            let id = Utils.generateUniquestring();
            let themePath = 'themes/theme-two/';
            PreviewController.generatePreviewInstance('theme-two', id, themePath);
            resolve(id);
        });
    }

    public static getThemeByID(id: number) {
        return new Promise((resolve, reject) => {
            ThemeModel.getThemeByID(id)
                .then((theme) => {
                    resolve(theme);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
}