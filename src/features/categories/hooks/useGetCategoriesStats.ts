import { useQuery } from "@tanstack/react-query";

import { getCategoriesStats } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";

export function useGetCategoriesStats() {
    return useQuery({
        queryKey: [CATEGORY_QUERY_KEY, "stats"],
        queryFn: () => getCategoriesStats()
    });
}