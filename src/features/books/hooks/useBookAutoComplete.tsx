import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { INFINITE_RECORDED_LIMIT } from "@/core";
import type { AutocompleteOptions, SupportedLang } from "@/shared/types";

import type { Book } from "../types";
import { mapBookToOption } from "../utilities";

import { useGetInfiniteBooks } from "./useGetInfiniteBooks";

export function useBookAutoComplete() {
    const [search, setSearch] = useState("");
    const [isBooksEnabled, setIsBooksEnabled] = useState(false);
    const { i18n } = useTranslation()

    const lang = i18n.language as SupportedLang;

    const query = useGetInfiniteBooks({
        search,
        is_active: "active",
        limit: INFINITE_RECORDED_LIMIT,
        lang
    }, isBooksEnabled)

    const options: AutocompleteOptions<Book>[] = useMemo(() => {
        const pages = query?.data?.pages || [];
        return pages.flatMap(page => (page.items || []).map(item => mapBookToOption(item, lang)))
    }, [lang, query?.data?.pages]);

    return {
        ...query,
        isBooksEnabled,
        setIsBooksEnabled,
        setSearch,
        options
    };
}