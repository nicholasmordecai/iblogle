import { BaseController } from '../baseController';
import { Utils } from './../../utils/utils';

import { PostModel } from '../../models/mysql/posts';

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

    public static getSinglePost(id: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            PostModel.getPost(id)
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getSinglePostBySlug(slug: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            PostModel.getPostBySlug(slug)
                .then((posts) => {
                    console.log(posts)
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public static createNewPost(content: string, title: string, description: string, userID: string, published: number, slug: string, template: string, layout: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let postID = Utils.generateUniquestring();
            PostModel.createPost(postID, content, title, description, userID, published, slug, template, layout)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
    
}