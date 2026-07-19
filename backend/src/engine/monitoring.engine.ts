import { monitoringState } from "./state.js";
import { SystemService } from "../services/system.service.js";
import { DockerService } from "../services/docker.service.js";
import { getIO } from "../socket/socket.js";
import { DockerCollector } from "../collectors/docker.collector.js";

export class MonitoringEngine {

    static initialize() {

        DockerCollector.watchEvents((event) => {

            DockerService.pushEvent(event);

            getIO().emit("docker:event", {
                type: event.Type,
                action: event.Action,
                name:
                    event.Actor?.Attributes?.name ??
                    event.Actor?.Attributes?.container ??
                    event.Actor?.ID,
                time: event.time,
                attributes: event.Actor?.Attributes ?? {},
            });

        });

    }

    static async refresh() {

        const [
            systemResult,
            dockerResult,
        ] = await Promise.allSettled([
            SystemService.getSystem(),
            DockerService.getContainers(),
        ]);

        monitoringState.system =
            systemResult.status === "fulfilled"
                ? systemResult.value
                : null;

        monitoringState.docker =
            dockerResult.status === "fulfilled"
                ? dockerResult.value
                : [];

        monitoringState.updateAt = new Date();

        try {

            getIO().emit(
                "dashboard:update",
                monitoringState
            );

        } catch {

            // Socket belum siap
        }
    }
}