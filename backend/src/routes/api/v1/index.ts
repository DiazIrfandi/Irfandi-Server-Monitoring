import type { FastifyInstance } from "fastify";

import { indexRoute } from "./index.route.js";
import { healthRoute } from "./health.route.js";
import { systemRoute } from "./system.route.js";
import { dockerRoute } from "./docker.route.js";
import { dashboardRoute } from "./dashboard.route.js";

export async function apiV1Routes(app: FastifyInstance) {
    await app.register(indexRoute);
    await app.register(healthRoute);
    await app.register(systemRoute);
    await app.register(dockerRoute);
    await app.register(dashboardRoute);
}