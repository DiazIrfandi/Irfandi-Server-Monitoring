import { FastifyError, FastifyInstance } from "fastify";
import { errorResponse } from "../utils/api-response.js";

export async function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: FastifyError, request, reply) => {
      request.log.error(error);

      reply.status(error.statusCode ?? 500).send(
        errorResponse(
          error.message || "Internal Server Error"
        )
      );
    }
  );
}