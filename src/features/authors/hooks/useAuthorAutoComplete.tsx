import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { INFINITE_RECORDED_LIMIT } from "@/core";
import type { AutocompleteOptions, SupportedLang } from "@/shared/types";


import type { Author } from "../types";
import { mapAuthorToOption } from "../utilities";

import { useGetInfiniteAuthors } from "./useGetInfiniteAuthors";

export function useAuthorAutoComplete() {
    const [search, setSearch] = useState("");
    const [isAuthorsEnabled, setIsAuthorsEnabled] = useState(false);
    const { i18n } = useTranslation()

    const lang = i18n.language as SupportedLang;

    const query = useGetInfiniteAuthors({
        search,
        is_active: "active",
        limit: INFINITE_RECORDED_LIMIT,
        lang
    }, isAuthorsEnabled)

    const options: AutocompleteOptions<Author>[] = useMemo(() => {
        const pages = query?.data?.pages || [];
        return pages.flatMap(page => (page.items || []).map(item => mapAuthorToOption(item, lang)));
    }, [lang, query?.data?.pages]);

    return {
        ...query,
        isAuthorsEnabled,
        setIsAuthorsEnabled,
        setSearch,
        options
    };
}