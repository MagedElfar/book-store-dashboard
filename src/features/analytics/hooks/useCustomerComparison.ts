import { useQuery } from "@tanstack/react-query";

import { getCustomerComparisonApi } from "../api";
import { ANALYTICS_QUERY_KEY } from "../constants";
import type { AnalyticsParams } from "../type";

export const useCustomerComparison = (params: AnalyticsParams) => {
    return useQuery({
        queryKey: [ANALYTICS_QUERY_KEY, "customer-comparison", params],
        queryFn: () => getCustomerComparisonApi(params),
        staleTime: 1000 * 60 * 30,
    });
};