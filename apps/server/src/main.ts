import { AppidMap } from './appIdMap.js';
import { GameService } from './gameService.js';
import { SteamService } from './steamService.js';
import { serverInit } from './server.js';

(async function main() {
    const appidMap = await AppidMap.init('v8');
    const steamService = new SteamService();
    const gameService = new GameService(appidMap, steamService);
    const server = await serverInit(gameService);
})();
