import { useQuery } from "@tanstack/react-query";

import { getOrdersStateApi } from "../api";
import { ORDER_QUERY_KEY } from "../constants";

export function useGetOrdersStats() {
    return useQuery({
        queryKey: [ORDER_QUERY_KEY, "stats"],
        queryFn: () => getOrdersStateApi()
    });
}