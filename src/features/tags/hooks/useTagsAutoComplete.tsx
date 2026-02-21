import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { INFINITE_RECORDED_LIMIT } from "@/core";
import type { AutocompleteOptions, SupportedLang } from "@/shared/types";


import { useGetInfiniteTags } from "./useGetInfiniteTags";

export function useTagsAutoComplete() {
    const [search, setSearch] = useState("");
    const { i18n } = useTranslation()

    const lang = i18n.language as SupportedLang;

    const query = useGetInfiniteTags({
        search,
        limit: INFINITE_RECORDED_LIMIT,
        is_active: "active",
        lang
    })

    const options: AutocompleteOptions[] = useMemo(() => {
        const pages = query?.data?.pages || [];

        return pages.flatMap(page =>

            (page.items || []).map(item => ({
                label: item?.[`name_${lang}`] || item?.name_en || "",
                value: item.id,
            }))
        );
    }, [lang, query?.data?.pages]);
    return {
        ...query,
        setSearch,
        options
    };
}