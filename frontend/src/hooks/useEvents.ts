import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../api/events";

export function useEvents() {
    return useQuery({
        queryKey: ["docker-events"],
        queryFn: getEvents,
        staleTime: Infinity,

        // ketika Activity dimount lagi
        refetchOnMount: "always",

        // optional
        refetchOnWindowFocus: false,
    });
}