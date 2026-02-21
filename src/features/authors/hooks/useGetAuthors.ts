import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { SupportedLang } from "@/shared/types";

import { getAuthors } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";
import type { AuthorsParams } from "../types";

export function useGetAuthors(params: AuthorsParams) {

    const { i18n } = useTranslation()
    const lang = i18n.language as SupportedLang

    return useQuery({
        queryKey: [AUTHOR_QUERY_KEY, params, lang],
        queryFn: () => getAuthors({
            ...params,
            lang
        })
    });
}