import { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../utils/api-response.js";
import { SystemService } from "../services/system.service.js";

export class SystemController {
    static async getSystem(
        request: FastifyRequest,
        reply: FastifyReply,
    ) {
        const system = await SystemService.getSystem();

        return reply.send(
            successResponse(
                "System information retrieved successfully",
                system
            )
        )
    }
}