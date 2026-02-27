import { useQuery } from "@tanstack/react-query";

import { getOrderStatusDataApi } from "../api";
import { ANALYTICS_QUERY_KEY } from "../constants";
import type { AnalyticsParams } from "../type";

export const useOrdersStatus = (params: AnalyticsParams) => {
    return useQuery({
        queryKey: [ANALYTICS_QUERY_KEY, "order-status", params],
        queryFn: () => getOrderStatusDataApi(params),
        staleTime: 1000 * 60 * 5,
    });
};