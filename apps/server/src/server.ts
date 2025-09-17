import fastify, {
    type FastifyInstance,
    type FastifyReply,
    type FastifyRequest,
} from 'fastify';
import type { GameService } from './gameService.js';
import z from 'zod';
import {
    SteamApiError,
    SteamUserNotFoundError,
    SteamValidationError,
} from './steamService.js';

let gameService: GameService;
let server: FastifyInstance;

const GamesRouteQuerySchema = z
    .object({
        username: z.string().optional(),
        steamid: z.string().optional(),
    })
    .refine((data) => data.username || data.steamid, {
        message: 'Either username or steamid required',
    });

export async function serverInit(g: GameService) {
    gameService = g;
    await createServer();
    setRoutes();
    startServer();

    return server;
}

async function createServer() {
    server = fastify({
        logger:
            process.env.NODE_ENV === 'dev' ?
                {
                    level: 'info',
                    transport: { target: 'pino-pretty' },
                }
            :   { level: 'info' },
    });

    await server.register(import('@fastify/cors'), {
        origin: true,
    });
}

function setRoutes() {
    server.get('/games', getGamesList);
}

async function startServer() {
    try {
        await server.listen({ port: 3001, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

async function getGamesList(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { username, steamid } = GamesRouteQuerySchema.parse(
            request.query,
        );

        const games = await gameService.getOnlyPlayedSorted({
            username,
            steamid,
        });

        return games;
    } catch (err) {
        // server.log.error(err);

        if (err instanceof z.ZodError) {
            reply.status(400);
            return { error: err.message };
        }

        if (err instanceof SteamUserNotFoundError) {
            server.log.warn(err.message);
            return reply.status(404).send({ error: err.message });
        }

        if (err instanceof SteamApiError) {
            const statusCode = err.statusCode === 401 ? 401 : 502;
            return reply.status(statusCode).send({ error: err.message });
        }

        if (err instanceof SteamValidationError) {
            return reply
                .status(502)
                .send({ error: 'Steam API returned invalid data' });
        }

        return reply.status(500).send({ error: 'Failed to fetch games data' });
    }
}
