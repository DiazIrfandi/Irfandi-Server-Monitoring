import { useQuery } from "@tanstack/react-query";
import { getContainerLogs } from "../api/docker";

export function useContainerLogs(
    id: string,
    enabled: boolean
) {

    return useQuery({

        queryKey: [

            "container-logs",

            id,

        ],

        queryFn: () => getContainerLogs(id),

        enabled,

        refetchInterval: 2000,

    });

}