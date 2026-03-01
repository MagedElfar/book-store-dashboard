import { useMemo, useState } from "react";

import { INFINITE_RECORDED_LIMIT } from "@/core";
import { useLocalize } from "@/shared/lib";
import type { AutocompleteOptions } from "@/shared/types";


import type { Category } from "../types";
import { mapCategoryToOption } from "../utilities";

import { useGetInfiniteCategories } from "./useGetInfiniteCategories";

export function useCategoryAutoComplete() {
    const [search, setSearch] = useState("");
    const [isCategoriesEnabled, setIsCategoriesEnabled] = useState(false);

    const { lang } = useLocalize()

    const query = useGetInfiniteCategories({
        search,
        is_active: "active",
        limit: INFINITE_RECORDED_LIMIT,
        lang
    }, isCategoriesEnabled)

    const options: AutocompleteOptions<Category>[] = useMemo(() => {
        const pages = query?.data?.pages || [];

        return pages.flatMap(page => (page.items || []).map(item => mapCategoryToOption(item, lang)));

    }, [lang, query?.data?.pages]);

    return {
        ...query,
        setSearch,
        setIsCategoriesEnabled,
        options
    };
}