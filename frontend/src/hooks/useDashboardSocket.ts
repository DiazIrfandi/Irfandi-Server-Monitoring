import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socket } from "../services/socket";

export function useDashboardSocket() {

    const queryClient = useQueryClient();

    useEffect(() => {

        socket.connect();

        socket.on("dashboard:update", (data) => {

            queryClient.setQueryData(
                ["dashboard"],
                data
            );

        });

        return () => {

            socket.off("dashboard:update");

            socket.disconnect();

        };

    }, [queryClient]);

}