import { FastifyInstance } from "fastify";

import { DashboardController } from "../../../controllers/dashboard.controller.js";

export async function dashboardRoute(
    app: FastifyInstance
) {

    app.get(
        "/dashboard",
        DashboardController.getDashboard
    );

}