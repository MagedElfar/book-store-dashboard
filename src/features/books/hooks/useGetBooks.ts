import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { SupportedLang } from "@/shared/types";

import { getBooKsApi } from "../api";
import { BOOK_QUERY_KEY } from "../constants";
import type { BookParams } from "../types";

export function useGetBooks(params: BookParams) {

    const { i18n } = useTranslation()
    const lang = i18n.language as SupportedLang

    return useQuery({
        queryKey: [BOOK_QUERY_KEY, params, lang],
        queryFn: () => getBooKsApi({
            ...params,
            lang
        })
    });
}