import { useQuery } from "@tanstack/react-query";

import { getTopSellingBooksApi } from "../api";
import { ANALYTICS_QUERY_KEY } from "../constants";
import type { AnalyticsParams } from "../type";

export const useTopBooks = (params: AnalyticsParams & { limit?: number }) => {
    return useQuery({
        queryKey: [ANALYTICS_QUERY_KEY, "top-books", params],
        queryFn: () => getTopSellingBooksApi(params),
        staleTime: 1000 * 60 * 15,
    });
};