import { FastifyInstance } from "fastify";
import { SystemController } from "../../../controllers/system.controller.js";

export async function systemRoute(app: FastifyInstance) {
    app.get(
        "/system",
        SystemController.getSystem
    )    
}