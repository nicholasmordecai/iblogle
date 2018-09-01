import { doesNotReject } from "assert";

var dir = require('node-dir');
const dirTree = require('directory-tree');
const ext: string = '.hbs';
const uuidv4 = require('uuid/v4');

import { FileController } from './../controllers/fileController';

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
}