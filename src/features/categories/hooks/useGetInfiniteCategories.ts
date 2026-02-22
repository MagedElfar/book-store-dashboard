import { useInfiniteLookup } from "@/shared/hooks";

import { CATEGORY_QUERY_KEY } from "../constants";
import type { Category, CategoriesParams } from "../types";

import { getCategories } from "./../api"

export function useGetInfiniteCategories(params: CategoriesParams, enabled: boolean) {
    return useInfiniteLookup<Category>(
        [CATEGORY_QUERY_KEY, 'infinite', params],
        (page) => getCategories({
            ...params,
            page,
        }),
        enabled
    );
}