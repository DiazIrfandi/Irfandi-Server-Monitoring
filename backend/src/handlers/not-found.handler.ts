import { FastifyInstance } from "fastify";

import { errorResponse } from "../utils/api-response.js";

export async function registerNotFoundHandler(app: FastifyInstance) {

    app.setNotFoundHandler((request, reply) => {

        reply.status(404).send(
            errorResponse(
                "Route not found"
            )
        );

    });

}