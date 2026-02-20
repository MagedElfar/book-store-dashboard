import { useQuery } from "@tanstack/react-query";

import { getAuthorsStats } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";

export function useGetAuthorsStats() {
    return useQuery({
        queryKey: [AUTHOR_QUERY_KEY, "stats"],
        queryFn: () => getAuthorsStats()
    });
}