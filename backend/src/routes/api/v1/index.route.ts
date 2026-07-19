import { FastifyInstance } from "fastify";
import { successResponse } from "../../../utils/api-response.js";
import { env } from "../../../config/env.js";

export async function indexRoute(app: FastifyInstance) {
    app.get("/", async () => {
        return successResponse(
                "API is running",
                {
                    name: "HomeServer Dashboard API",
                    version: env.VERSION,
                    path: env.PATCH,
                    status: "running",
                    developer: "Diaz Irfandi"
                }
            )
        }
    )
}