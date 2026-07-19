import { useQuery } from "@tanstack/react-query";

import { getImages } from "../api/docker";

export function useImages() {

    return useQuery({

        queryKey: ["docker-images"],

        queryFn: getImages,

        staleTime: 10000,

    });

}