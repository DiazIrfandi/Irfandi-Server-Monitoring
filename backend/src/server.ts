import Fastify from "fastify";
import { env } from "./config/env.js";
import { registerPlugins } from "./plugins/app.plugin.js";
import { startScheduler } from "./engine/scheduler.js";
import { initializeSocket } from "./socket/socket.js";
import cors from "@fastify/cors";
import { MonitoringEngine } from "./engine/monitoring.engine.js";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
    origin: "http://localhost:5173",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
});

await registerPlugins(app);

try {  
  await app.ready();

  const server = app.server;

  initializeSocket(server);

  MonitoringEngine.initialize();

  startScheduler();

  await app.listen({
      host: env.HOST,
      port: env.PORT
  });
  
  console.log(`Server running on ${env.PORT}`)

} catch (err) {
  app.log.error(err);
  process.exit(1);
}