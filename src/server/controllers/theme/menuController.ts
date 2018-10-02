import { BaseController } from '../baseController';

declare interface IMenu {

}

export class MenuController extends BaseController {

    public static getMenu(id: string): Promise<IMenu> {
        return new Promise((resolve, reject) => {

        });
    }

}