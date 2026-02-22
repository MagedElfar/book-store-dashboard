import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { INFINITE_RECORDED_LIMIT } from "@/core";
import type { AutocompleteOptions, SupportedLang } from "@/shared/types";


import { useGetInfiniteCategories } from "./useGetInfiniteCategories";

export function useCategoryAutoComplete() {
    const [search, setSearch] = useState("");
    const [isCategoriesEnabled, setIsCategoriesEnabled] = useState(false);

    const { i18n } = useTranslation()

    const lang = i18n.language as SupportedLang;

    const query = useGetInfiniteCategories({
        search,
        is_active: "active",
        limit: INFINITE_RECORDED_LIMIT,
        lang
    }, isCategoriesEnabled)

    const options: AutocompleteOptions[] = useMemo(() => {
        const pages = query?.data?.pages || [];

        return pages.flatMap(page =>

            (page.items || []).map(item => ({
                label: item?.[`name_${lang}`] || item?.name_en || "",
                value: item.id,
                image: item?.image_url || ""
            }))
        );
    }, [lang, query?.data?.pages]);
    return {
        ...query,
        setSearch,
        setIsCategoriesEnabled,
        options
    };
}