import { doesNotReject } from "assert";

const dirTree = require('directory-tree');
const uuidv4 = require('uuid/v4');

import { FileController } from './../controllers/core/fileController';

export class Utils {

    public static generateUniquestring() {
        return uuidv4();
    }

    public static capitalize(string): string {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    public static stripSlugAndCapitalize(string: string): string {
        let arr = string.split('-');
        for (let i = 0, len = arr.length; i < len; i++) {
            arr[i] = Utils.capitalize(arr[i]);
        }
        let newString = arr.join(' ');
        return newString;
    }

    public static walkDirectory(directory: string, callback: Function) {
        this.readFilesInDirectory(directory, callback);
    }

    public static listFiles(directory: string, callback: Function) {
        let tree = dirTree(directory);
        let list = this.flattenList(tree.children, []);
        callback(list);
    }

    private static flattenList(tree, list) {
        for(let file of tree) {
            if(file.type === 'file') {
                let fileName: string = file.name;
                list.push(fileName.slice(0, -4));
            } else if(file.children.length > 0) {
                this.flattenList(file.children, list);
            }
        }

        return list;
    }

    public static readFilesInDirectory(directory: string, callback: Function) {
        let tree = dirTree(directory);
        let html = this.constructHTMLFileStructure(tree);
        callback(html);
    }

    public static constructHTMLFileStructure(tree) {
        let html = this.buildSubFolder(tree);
        return html;
    }

    public static buildSubFolder(tree) {
        let html = ''
        for (let path of tree.children) {
            if (path.type === 'file') {
                let id = Utils.generateUniquestring();
                FileController.cachePath(path.path, id);
                html += `<a class="nav-link tree file-item" data-id=${id} href="#"><i class="far fa-file"></i> ${path.name}</a>`
            } else {
                html += `
                <a class="nav-link tree" data-toggle="collapse" data-target="#template-${path.name}" href="#">
                    <i class="far fa-folder"></i> ${path.name} <i class="fas fa-caret-down"></i>
                </a>
                <div class="collapse tree" id="template-${path.name}">`;
                html += Utils.buildSubFolder(path);
                html += `<a class="nav-link tree file-item" href="#"><i class="fas fa-plus"></i> Add File</a>`
                html += `</div>`;
            }
        }
        return html;
    }

    public static addToDD(dd, prop) {
        let path = prop.split('.');
    }

    public static leaf(obj, path) {
        return path.split('.').reduce((value, el) => value[el], obj);
    }

    public static secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);

        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    public static findWithAttr(array, attr, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
}