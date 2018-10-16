import { CacheController } from './cacheController';

export class Stats {

    public static get cachedQueries() {
        return CacheController.cachedItems;
    }

    public static get memoryStats() {
        const used = process.memoryUsage();
        let humanReadable = {};
        for (let key in used) {
            humanReadable[key] = Math.round(used[key] / 1024 / 1024 * 100) / 100;
        }
        return humanReadable;
    }
}