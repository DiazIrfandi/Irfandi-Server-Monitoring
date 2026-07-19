import { FastifyInstance } from "fastify";
import { successResponse } from "../../../utils/api-response.js";

export async function healthRoute(app: FastifyInstance) {
    app.get('/health', async () => {
        return successResponse(
            "Server is healthy",
            {
                status: "ok",
                timestamp: new Date()
            }
        )
    })    
}