import { useQuery } from "@tanstack/react-query";

import { getVolume } from "../api/docker";

export function useVolume(
    name: string | null,
    enabled: boolean
) {

    return useQuery({

        queryKey: [

            "docker-volume",

            name

        ],

        queryFn: () =>
            getVolume(name!),

        enabled,

    });

}