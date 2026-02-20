import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";
import type { CategoriesParams } from "../types";

export function useGetCategories(params: CategoriesParams) {
    return useQuery({
        queryKey: [CATEGORY_QUERY_KEY, params],
        queryFn: () => getCategories(params)
    });
}