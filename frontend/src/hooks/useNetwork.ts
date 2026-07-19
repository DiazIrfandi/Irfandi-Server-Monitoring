import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    getNetworks,
    getNetwork,
    deleteNetwork,
} from "../api/docker";

export function useNetworks() {

    return useQuery({

        queryKey: ["docker-networks"],

        queryFn: getNetworks,

    });

}

export function useNetwork(id?: string) {

    return useQuery({

        queryKey: [

            "docker-network",

            id,

        ],

        queryFn: () => getNetwork(id!),

        enabled: !!id,

    });

}

export function useDeleteNetwork() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteNetwork,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "docker-networks"

                ],

            });

            toast.success(

                "Network deleted."

            );

        },

        onError(error: any) {

            toast.error(

                error.response?.data?.message ??

                "Failed to delete network."

            );

        },

    });

}