import { useQuery } from "@tanstack/react-query";

import { getSalesDataApi } from "../api";
import { ANALYTICS_QUERY_KEY } from "../constants";
import type { AnalyticsParams } from "../type";

export const useSalesAnalytics = (params: AnalyticsParams) => {
    return useQuery({
        queryKey: [ANALYTICS_QUERY_KEY, "sales", params],
        queryFn: () => getSalesDataApi(params),
        staleTime: 1000 * 60 * 5,
    });
};