import { doesNotReject } from "assert";

var dir = require('node-dir');

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
        dir.files(directory, 'all', (error, result) => {
            let allPaths = result.files.concat(result.dirs);
            let dd = {
                _root: []
            };
            for (let path of allPaths) {
                let chunks = path.split('\\');
                chunks.splice(0, 6);

                switch (chunks.length) {
                    case 1:
                        if (chunks[0].includes('.hbs')) {
                            dd._root.push(chunks[0]);
                        }
                        break;
                    case 2:
                        if (!dd[chunks[0]]) dd[chunks[0]] = [];
                        if (chunks[1].includes('.hbs')) {
                            dd[chunks[0]].push(chunks[1])
                        }
                        break;
                    case 3:
                        if (!dd[chunks[0]]) dd[chunks[0]] = [];
                        if (!dd[chunks[0]][chunks[1]]) dd[chunks[0]][chunks[1]] = [];
                        if (chunks[2].includes('.hbs')) {
                            dd[chunks[0]][chunks[1]].push(chunks[2])
                        }
                        break;
                    case 4:
                        if (!dd[chunks[0]]) dd[chunks[0]] = [];
                        if (!dd[chunks[0]][chunks[1]]) dd[chunks[0]][chunks[1]] = [];
                        if (!dd[chunks[0]][chunks[1]][chunks[2]]) dd[chunks[0]][chunks[1]][chunks[2]] = [];
                        if (chunks[3].includes('.hbs')) {
                            dd[chunks[0]][chunks[1]][chunks[2]].push(chunks[3])
                        }
                        break;
                }
            }

            this.constructHTMLFileStructure(dd, callback);
        });
    }

    public static constructHTMLFileStructure(dataDictionary, callback) {

        let html = '';

        // console.log(dataDictionary)

        // html += this.buildSubFolder('_root', dataDictionary['_root']);
        for (let i in dataDictionary) {
            let array = dataDictionary[i];
            let folder = this.buildSubFolder(i, array);
            html += folder;
        }

        callback(html);
    }

    public static buildSubFolder(root, elements) {
        let html = `
            <a class="nav-link tree" data-toggle="collapse" data-target="#template-${root}" href="#">
                <i class="far fa-folder"></i> ${root}
            </a>
            <div class="collapse tree" id="template-${root}">`;
        for (let element of elements) {
            if(root === 'home') {
            }
            if (element.includes('.hbs')) {
                html += `<a class="nav-link tree" href="#"><i class="far fa-file"></i> ${element}</a>`
            } else {
                console.log('its a sub directory! o.O');
            }
        }
        html += `</div>`;
        return html;
    }
}