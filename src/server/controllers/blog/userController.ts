import { BaseController } from '../baseController';

import { UserModel } from '../../models/mysql/user';

export class UserController extends BaseController {
    public static userByID(userID: number) {
        return new Promise((resolve, reject) => {
            UserModel.getUserByID(userID)
            .then((user) => {
                resolve(user);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }
}