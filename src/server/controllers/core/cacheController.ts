import { BaseController } from "../baseController";

/**
 * TODO
 * 
 * I think I can improve speed by reducing the cached item depth by 1.
 * Also possible, is to not use the queryKey in the hash creation as it's already been looked up once
 * These are minor though, and will not drastically improve performance. it's more for readability
 */

declare interface ICacheItem {
    hash: string;
    results: Array<any>;
}

declare interface ICache {
    cachedQueries: Array<ICacheItem>;
}

export class CacheController extends BaseController{
    private static _cache: { [queryKey: string]: ICache };

    constructor() {
        super();
        CacheController._cache = {};
    }

    public static findInCache(parameters: string[], queryKey: string): Array<any> {
        // check that there is a base instance of a query cache from the query key
        if(CacheController._cache[queryKey]) {
            // store a locally scoped cachedQueries array for faster lookup
            let cachedQueries = CacheController._cache[queryKey].cachedQueries;

            // generate a new hash from the queryKey and the parameters
            let hashLookup = CacheController.generateHash(queryKey, parameters);

            // loop through each cached item of the query
            for(let cacheItem of cachedQueries) {
                // if the new hash is the same as the hash in the cache, then return the cached results
                if(hashLookup === cacheItem.hash) {
                    return cacheItem.results;
                } else {
                    return null;
                }
            }

            // if there are no cachedQueries, but it exists as an empty array, then return null
            return null;
        } else {
            return null;
        }
    }

    public static createCache (queryKey: string, parameters: string[], results: Array<any>): void {
        // if a array entry of cached queries doesn't exist under the query key, then create it
        if(!CacheController._cache[queryKey]) {
            CacheController._cache[queryKey] = { cachedQueries: [] };
        }

        // create a new cache item object with a hash of the query key and parameters
        let cacheItem: ICacheItem = {
            hash: CacheController.generateHash(queryKey, parameters),
            results: results
        };

        // add the new cache item to the array of cached queries
        CacheController._cache[queryKey].cachedQueries.push(cacheItem);
    }

    public static removeFromCache(queryKey: string | string[]) {
        if(typeof(queryKey) === 'string') {
            CacheController._cache[queryKey] = null;
        } else {
            for(let key of queryKey) {
                CacheController._cache[key] = null; 
            }
        }
    }

    public static nukeCache() {

    }

    private static generateHash(queryKey: string, parameters: string[]): string {
        let pString = parameters.join('&');
        return `${queryKey}&${pString}`;
    }
}