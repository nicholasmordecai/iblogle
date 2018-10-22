import { CacheController } from './cacheController';

export class Stats {
    private static _queriesRun: number = 0;
    private static _getRequests: number = 0;
    private static _postRequests: number = 0;

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

    public static queryRun(incrementer: number) {
        Stats._queriesRun += incrementer;
    }

    public static get queriesRun(): number {
        return Stats._queriesRun;
    }

    public static newGetRequest() {
        Stats._getRequests++;
    }

    public static newPostRequest() {
        Stats._postRequests++;
    }

    public static get totalGetRequests(): number {
        return Stats._getRequests;
    }

    public static get totalPostRequests(): number {
        return Stats._postRequests;
    }
}