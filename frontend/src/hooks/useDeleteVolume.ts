import {

    useMutation,

    useQueryClient,

} from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteVolume } from "../api/docker";

export function useDeleteVolume() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: deleteVolume,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "docker-volumes"

                ],

            });

            toast.success(

                "Volume deleted."

            );

        },

        onError(error: any) {

            toast.error(

                error.response?.data?.message ??

                "Failed to delete volume."

            );

        }

    });

}