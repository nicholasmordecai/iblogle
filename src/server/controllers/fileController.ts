import { BaseController } from './baseController';

export class FileController extends BaseController {
    private static _cachedFilePaths: { [id: string]: string };

    public constructor() {
        super();
        FileController._cachedFilePaths = {};
    }

    public static getPathFromID(id: string) {
        for(let i in this._cachedFilePaths) {
            if(i === id) {
                return this._cachedFilePaths[i];
            }
        }
        return null;
    }

    public static cachePath(path: string, id: string) {
        this._cachedFilePaths[id] = path;
    }

    public static get numberOfCachedPaths(): number {
        return Object.keys(this._cachedFilePaths).length;
    }
}