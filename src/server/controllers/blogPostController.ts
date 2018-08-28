import * as fs from 'fs';
import * as chokidar from 'chokidar';
import BaseController from './baseController';

export default class BlogPostController extends BaseController {

    private static _posts: { [key: string]: JSON };
    private static _postDirectory: string = __dirname + '/../../data/blog-posts/';

    public static readJSONToCache() {
        BlogPostController._posts = {};
        fs.readdir(BlogPostController._postDirectory, function (err, filenames) {
            if (err) {
                console.error(err);
                return;
            }
            filenames.forEach(function (filename) {
                fs.readFile(BlogPostController._postDirectory + filename, 'utf-8', function (err, content) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    let json = JSON.parse(content);
                    BlogPostController._posts[json.slug] = json;
                });
            });
        });
    }

    /**
     * depreciated -> json will be updated on pm2 deploy so no need to watch files any more
     */
    public static watchPostFolder() {
        const watcher = chokidar.watch(BlogPostController._postDirectory, {ignored: /^\./, persistent: true});
        watcher.on('add', () => BlogPostController.readJSONToCache());
        watcher.on('change', () => { BlogPostController.readJSONToCache(); console.log('change');});
        watcher.on('unlink', () => BlogPostController.readJSONToCache());
        watcher.on('error', (error) => console.error(error));
    }

    public static generateData(slug: string) {
        let data = BlogPostController.getBlogPost(slug)
        if (!data) {
            return (null);
        }
        return data;
    }

    private static getBlogPost(slug: string) {
        return BlogPostController._posts[slug];
    }

    public static get blogs() {
        return BlogPostController._posts;
    }
}