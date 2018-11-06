import { BaseController } from '../baseController';
import { Utils } from './../../utils/utils';

import { PostModel } from '../../models/mysql/posts';
import { TopicModel } from '../../models/mysql/topic';

export class PostController extends BaseController {
    public static get posts() {
        return PostController.getListOfPosts()
    }

    public static getListOfPosts(): Promise<{posts, postCount, postsPublished}> {
        return new Promise((resolve, reject) => {
            PostModel.getAllPosts()
                .then((posts) => {
                    let postsCount: number = posts.length;
                    let postsPublished: number = 0;
                    for(let post of posts) {
                        if(post.published) {
                            postsPublished++;
                        }
                    }
                    resolve({posts: posts, postCount: postsCount, postsPublished: postsPublished});
                })
                .catch((error) => {
                    reject(error);
                });
        });
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
        });
    }

    public static getSinglePostBySlug(slug: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let blogData = PostModel.getPostBySlug(slug)
            let topicData = TopicModel.getAllTopics()

            Promise.all([blogData, topicData])
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public static createNewPost(postID: string, content: string, title: string, description: string, userID: string, published: number, slug: string, template: string, layout: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            PostModel.createPost(postID, content, title, description, userID, published, slug, template, layout)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    public static updatePost(postID: string, content: string, title: string, description: string, userID: string, published: number, slug: string, template: string, layout: string): Promise<any> {
        return new Promise((resolve, reject) => {
            PostModel.updatePost(postID, content, title, description, userID, published, slug, template, layout)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    public static archivePost(postID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            PostModel.archivePost(postID)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    public static deletePost(postID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            PostModel.deletePost(postID)
                .then((results) => {
                    resolve(results);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    public static getPostsByTopic(topic: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            PostModel.getPostsByTopic(topic)
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    public static getPostsByTopics(topics: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            PostModel.getPostsByTopics(topics.split(','))
                .then((posts) => {
                    resolve(posts);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}