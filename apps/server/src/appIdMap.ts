import { promises as fs } from 'fs';
import { deserialize } from 'v8';

type SteamApp = { appid: number; name: string };
type IdToName = Map<number, string>;
declare global {
    var preloadedAppMap: IdToName | undefined;
}

export class AppidMap {
    private map: IdToName;
    private static applistPath = 'data/applist.json';

    constructor(map: IdToName) {
        this.map = map;
    }

    static async init(
        method: 'json' | 'v8' | 'blob' = 'json',
        path?: string,
    ): Promise<AppidMap> {
        const filePath = path ? path : this.applistPath;

        switch (method) {
            case 'v8':
                return this.loadV8Cache(filePath);
            case 'blob':
                return this.loadNodeSnapshot();
            case 'json':
                return this.loadJson(filePath);
        }
    }

    private static async loadJson(path: string): Promise<AppidMap> {
        try {
            const fileContent = await fs.readFile(path, 'utf-8');
            const parsedData = JSON.parse(fileContent).applist.apps;
            const appMap: IdToName = new Map(
                parsedData.map((app: SteamApp) => [app.appid, app.name]),
            );
            return new AppidMap(appMap);
        } catch (error) {
            console.error(`Failed to load JSON: ${error}`);
            throw error;
        }
    }

    private static async loadV8Cache(jsonPath: string): Promise<AppidMap> {
        const v8Path = jsonPath.replace('.json', '.v8');

        try {
            const buffer = await fs.readFile(v8Path);
            const deserializedMap: IdToName = deserialize(buffer);
            return new AppidMap(deserializedMap);
        } catch {
            console.log('V8 cache not found, falling back to JSON...');
            return this.loadJson(jsonPath);
        }
    }

    private static async loadNodeSnapshot(): Promise<AppidMap> {
        try {
            const preloadedMap = global.preloadedAppMap;
            if (!preloadedMap) {
                throw new Error('Snapshot data not available');
            }
            return new AppidMap(preloadedMap);
        } catch {
            console.log('Snapshot not available, falling back to JSON...');
            return this.loadJson(this.applistPath);
        }
    }

    get(appid: number): string | undefined {
        return this.map.get(appid);
    }
}
