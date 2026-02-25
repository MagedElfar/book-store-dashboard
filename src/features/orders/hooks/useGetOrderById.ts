import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "../api";
import { ORDER_QUERY_KEY } from "../constants";

export function useGetOrderById(id?: string) {
    return useQuery({
        queryKey: [ORDER_QUERY_KEY, id],
        queryFn: () => getOrderById(id!),
        enabled: !!id
    })
}