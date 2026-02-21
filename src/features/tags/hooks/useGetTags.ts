import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import type { SupportedLang } from "@/shared/types";

import { getTagsApi } from "../api";
import { TAG_QUERY_KEY } from "../constants";
import type { TagsParams } from "../types";

export function useGetTags(params: TagsParams) {

    const { i18n } = useTranslation()
    const lang = i18n.language as SupportedLang

    return useQuery({
        queryKey: [TAG_QUERY_KEY, params, lang],
        queryFn: () => getTagsApi({
            ...params,
            lang
        }),
        placeholderData: (previousData) => previousData,
    });
}