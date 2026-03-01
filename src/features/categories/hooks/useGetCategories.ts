import { useQuery } from "@tanstack/react-query";

import { useLocalize } from "@/shared/lib";

import { getCategories } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";
import type { CategoriesParams } from "../types";

export function useGetCategories(params: CategoriesParams) {

    const { lang } = useLocalize()

    return useQuery({
        queryKey: [CATEGORY_QUERY_KEY, params, lang],
        queryFn: () => getCategories({
            ...params,
            lang
        })
    });
}