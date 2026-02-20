import { useQuery } from "@tanstack/react-query";

import { getCategoryById } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";

export function useGetCategoryById(id?: string) {
    return useQuery({
        queryKey: [CATEGORY_QUERY_KEY, id],
        queryFn: () => getCategoryById(id!),
        enabled: !!id
    });
}