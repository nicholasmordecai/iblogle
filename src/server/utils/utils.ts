import { doesNotReject } from "assert";

var dir = require('node-dir');
const dirTree = require('directory-tree');
const ext: string = '.hbs';

export class Utils {
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
                html += `<a class="nav-link tree file-item" data-path=${path.path} href="#"><i class="far fa-file"></i> ${path.name}</a>`
            } else {
                html += `
                <a class="nav-link tree" data-toggle="collapse" data-target="#template-${path.name}" href="#">
                    <i class="far fa-folder"></i> ${path.name} <i class="fas fa-caret-down"></i>
                </a>
                <div class="collapse tree" id="template-${path.name}">`;
                html += Utils.buildSubFolder(path);
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
}