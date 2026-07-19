import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../services/socket";
import type { DockerEvent } from "../types/docker-event";

export function useDockerEvents() {

    const queryClient = useQueryClient();

    useEffect(() => {

        socket.connect();

        const listener = (event: DockerEvent) => {

            queryClient.setQueryData<DockerEvent[]>(

                ["docker-events"],

                (old = []) => [

                    event,

                    ...old

                ]

            );

        };

        socket.on("docker:event", listener);

        return () => {

            socket.off("docker:event", listener);

        };

    }, [queryClient]);

}