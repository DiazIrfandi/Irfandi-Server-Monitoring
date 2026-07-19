import { FastifyInstance } from "fastify";
import { apiV1Routes } from "../routes/api/v1/index.js";
import { registerErrorHandler, registerNotFoundHandler } from "../handlers/index.js";

export async function registerPlugins(app: FastifyInstance) {
    await app.register(apiV1Routes, {
        prefix: "/api/v1"
    });

    await registerNotFoundHandler(app);
    await registerErrorHandler(app);
}