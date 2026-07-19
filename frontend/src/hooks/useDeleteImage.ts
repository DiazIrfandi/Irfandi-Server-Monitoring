import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteImage } from "../api/docker";

export function useDeleteImage() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: deleteImage,

        onSuccess() {

            queryClient.invalidateQueries({

                queryKey: [

                    "docker-images"

                ]

            });

            toast.success(

                "Image deleted successfully"

            );

        },

        onError(error: any) {

            console.log(error.response?.data)

            toast.error(

                error.response?.data?.message ??

                "Failed to delete image"

            );

        }

    });

}