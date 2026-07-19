import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pullImage } from "../api/docker";

export function usePullImage() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: pullImage,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey:[
                    "docker-images"
                ]

            });

        },

    });

}