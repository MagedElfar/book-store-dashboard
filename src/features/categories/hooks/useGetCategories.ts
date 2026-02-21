import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { SupportedLang } from "@/shared/types";

import { getCategories } from "../api";
import { CATEGORY_QUERY_KEY } from "../constants";
import type { CategoriesParams } from "../types";

export function useGetCategories(params: CategoriesParams) {

    const { i18n } = useTranslation()
    const lang = i18n.language as SupportedLang

    return useQuery({
        queryKey: [CATEGORY_QUERY_KEY, params, lang],
        queryFn: () => getCategories({
            ...params,
            lang
        })
    });
}