import { useQuery } from "@tanstack/react-query";

import { getTagsStatsApi } from "../api";
import { TAG_QUERY_KEY } from "../constants";

export function useGetTagsStats() {
    return useQuery({
        queryKey: [TAG_QUERY_KEY, "stats"],
        queryFn: () => getTagsStatsApi()
    });
}