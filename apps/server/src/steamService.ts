import z from 'zod';

class SteamApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
    ) {
        super(message);
        this.name = 'SteamApiError';
    }
}

class SteamValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'SteamValidationError';
    }
}

class SteamUserNotFoundError extends Error {
    constructor(
        username: string,
        public response?: unknown,
    ) {
        super(`Steam user '${username}' not found`);
        this.name = 'SteamUserNotFoundError';
    }
}

const SteamGetOwnedGamesSchema = z.object({
    response: z.object({
        game_count: z.number(),
        games: z.array(
            z.object({
                appid: z.number(),
                playtime_forever: z.number(),
                playtime_windows_forever: z.number(),
                playtime_mac_forever: z.number(),
                playtime_linux_forever: z.number(),
                playtime_deck_forever: z.number(),
                rtime_last_played: z.number(),
                playtime_disconnected: z.number(),
                playtime_2weeks: z.number().optional(),
            }),
        ),
    }),
});

const SteamVanityUrlSchema = z.object({
    response: z.object({
        success: z.number(),
        steamid: z.string().optional(),
        message: z.string().optional(),
    }),
});

type SteamGetOwnedGamesResponse = z.infer<typeof SteamGetOwnedGamesSchema>;

export class SteamService {
    private API_KEY: string = 'BDD9CCB873FE240E2CC04E6FDEBC82C1';

    public async getOwnedGames(
        steamId: string,
    ): Promise<SteamGetOwnedGamesResponse> {
        const url = new URL(
            'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/',
        );
        url.searchParams.set('key', this.API_KEY);
        url.searchParams.set('steamid', steamId);
        url.searchParams.set('include_appinfo', '1');
        url.searchParams.set('include_played_free_games', '1');

        const res = await this.fetchSteamApi(url);

        if (!res.ok) {
            throw new SteamApiError(
                `GetOwnedGames failed: ${res.status}`,
                res.status,
            );
        }

        return await this.validateSteamApiResponse(
            res,
            'GetOwnedGames',
            SteamGetOwnedGamesSchema,
        );
    }

    public async getSteamId(username: string): Promise<string> {
        const url = new URL(
            'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/',
        );
        url.searchParams.set('key', this.API_KEY);
        url.searchParams.set('vanityurl', username);

        const res = await this.fetchSteamApi(url);

        if (!res.ok) {
            throw new SteamApiError(
                `ResolveVanityURL failed: ${res.status}`,
                res.status,
            );
        }

        const validated = (
            await this.validateSteamApiResponse(
                res,
                'ResolveVanityURL',
                SteamVanityUrlSchema,
            )
        ).response;

        if (validated.success !== 1 || !validated.steamid) {
            throw new SteamUserNotFoundError(username, validated.message);
        }

        return validated.steamid;
    }

    private async fetchSteamApi(url: URL) {
        try {
            return await fetch(url);
        } catch (err) {
            throw new SteamApiError(
                `Network error during GetOwnedGames: ${
                    err instanceof Error ? err.message : 'Unknown error'
                }`,
            );
        }
    }

    private async validateSteamApiResponse<T>(
        res: Response,
        method: string,
        schema: z.ZodSchema<T>,
    ): Promise<T> {
        try {
            const data = await res.json();
            return schema.parse(data);
        } catch (err) {
            throw new SteamValidationError(
                `${method} returned unexpected data: ${err}`,
            );
        }
    }
}

export { SteamApiError, SteamValidationError, SteamUserNotFoundError };
