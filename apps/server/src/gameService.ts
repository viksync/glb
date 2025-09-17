import { type Game, type GameData } from './types/index.js';
import { type AppidMap } from './appIdMap.js';
import type { SteamService } from './steamService.js';

interface GameServiceCredentials {
    username?: string;
    steamid?: string;
}

export class GameService {
    private steamService: SteamService;

    constructor(
        private appMap: AppidMap,
        s: SteamService,
    ) {
        this.steamService = s;
    }

    private getGameData(game: Game): GameData {
        const name = this.appMap.get(game.appid);
        const timePlayed = game.playtime_forever;

        return { name, timePlayed };
    }

    public async getOnlyPlayedSorted(
        credentials: GameServiceCredentials,
    ): Promise<Game[]> {
        const steamid =
            credentials.username ?
                await this.steamService.getSteamId(credentials.username)
            :   credentials.steamid;

        const gamesData = await this.steamService.getOwnedGames(steamid!);
        const games = gamesData.response.games;

        const playedGames = games.filter((game) => game.playtime_forever > 0);

        return playedGames.sort(
            (a: Game, b: Game) => a.playtime_forever - b.playtime_forever,
        );
    }

    private getTotalPlaytime(games: Game[]): number {
        return games.reduce(
            (a: number, game: Game) => a + game.playtime_forever,
            0,
        );
    }
}
