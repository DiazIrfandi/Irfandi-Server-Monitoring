import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboard";

export function useDashboard() {
    const query = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
        refetchOnWindowFocus: false,
        staleTime: 5000,
    });

    return {
        dashboard: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}