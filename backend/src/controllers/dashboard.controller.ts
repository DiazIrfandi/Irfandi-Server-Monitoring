import type {
    FastifyReply,
    FastifyRequest
} from "fastify";

import { DashboardService } from "../services/dashboard.service.js";

import { successResponse } from "../utils/api-response.js";

export class DashboardController {

    static async getDashboard(
        request: FastifyRequest,
        reply: FastifyReply
    ) {

        const dashboard =
            await DashboardService.getDashboard();

        return reply.send(
            successResponse(
                "Dashboard retrieved successfully",
                dashboard
            )
        );

    }

}