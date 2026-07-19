import { useQuery } from "@tanstack/react-query";

import { getVolumes } from "../api/docker";

export function useVolumes() {

    return useQuery({

        queryKey: [

            "docker-volumes"

        ],

        queryFn: getVolumes,

    });

}