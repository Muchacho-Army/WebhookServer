import { YouTubeVideo } from "./typings";

export default class Cache {
    private cacheData: { [key: string]: YouTubeVideo };
    constructor() {
        this.cacheData = {};
    }

    getItem(key: string): YouTubeVideo | undefined {
        return this.cacheData[key];
    }

    setItem(key: string, value: YouTubeVideo): void {
        this.cacheData[key] = value;
        setTimeout(() => delete this.cacheData[key], 1000 * 60 * 60 * 24 * 7); // Delete after 7 days
    }

    deleteItem(key: string): void {
        delete this.cacheData[key];
    }

    clear(): void {
        this.cacheData = {};
    }
}
