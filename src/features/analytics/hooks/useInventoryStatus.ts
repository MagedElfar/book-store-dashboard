import { useQuery } from "@tanstack/react-query";

import { getInventoryStatusApi } from "../api";
import { ANALYTICS_QUERY_KEY } from "../constants";

export const useInventoryStatus = () => {
    return useQuery({
        queryKey: [ANALYTICS_QUERY_KEY, "inventory-status"],
        queryFn: () => getInventoryStatusApi(),
        staleTime: 1000 * 60 * 2,
    });
};