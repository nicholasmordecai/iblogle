import { BaseController } from '../baseController';

import { TopicModel } from '../../models/mysql/topic';
import { PostModel } from '../../models/mysql/posts';

export class TopicController extends BaseController {
    public static getAllTopics() {
        return new Promise((resolve, reject) => {
            TopicModel.getAllTopics()
                .then((topics) => {
                    resolve(topics);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}