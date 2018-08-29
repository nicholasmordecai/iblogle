import { BaseController } from './baseController';
import { ThemeModel } from './../models/mysql/themes';
import * as fs from 'fs';

export class ThemeController extends BaseController {

    public static generateFileStructure() {
        ThemeModel.getActiveTheme()
            .then((theme) => {

            })
    }
}