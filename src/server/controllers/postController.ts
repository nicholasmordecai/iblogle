import { BaseController } from './baseController';

import { PostModel } from './../models/mysql/posts';

export class PostController extends BaseController {
    public static getListOfPosts() {
        return new Promise((resolve, reject) => {
            PostModel.getAllPosts()
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getSinglePost() {
        return new Promise((resolve, reject) => {
            PostModel.getAllPosts()
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
    
}