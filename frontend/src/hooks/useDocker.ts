import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    startContainer,
    stopContainer,
    restartContainer,
} from "../services/docker";

export function useDocker() {

    const queryClient = useQueryClient();

    const invalidate = () => {

        queryClient.invalidateQueries({
            queryKey: ["dashboard"],
        });

    };

    const start = useMutation({

        mutationFn: startContainer,

        onSuccess: invalidate,

    });

    const stop = useMutation({

        mutationFn: stopContainer,

        onSuccess: invalidate,

    });

    const restart = useMutation({

        mutationFn: restartContainer,

        onSuccess: invalidate,

    });

    return {

        start,

        stop,

        restart,

    };

}