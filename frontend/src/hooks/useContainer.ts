import { useQuery } from "@tanstack/react-query";
import { getContainer } from "../api/docker";

export function useContainer(
    id: string | null,
    enabled: boolean
) {

    return useQuery({

        queryKey: ["container", id],

        queryFn: () => getContainer(id!),

        enabled,

        refetchOnWindowFocus: false,

    });

}