import { useQuery } from "@tanstack/react-query";

import { getUserGrowthApi } from "../api";
import { ANALYTICS_QUERY_KEY } from "../constants";
import type { AnalyticsParams } from "../type";

export const useUserGrowth = (params: AnalyticsParams) => {
    return useQuery({
        queryKey: [ANALYTICS_QUERY_KEY, "users", params],
        queryFn: () => getUserGrowthApi(params),
        staleTime: 1000 * 60 * 10,
    });
};