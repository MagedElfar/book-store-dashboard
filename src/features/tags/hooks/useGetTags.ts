import { useQuery } from "@tanstack/react-query";

import { useLocalize } from "@/shared/lib";

import { getTagsApi } from "../api";
import { TAG_QUERY_KEY } from "../constants";
import type { TagsParams } from "../types";

export function useGetTags(params: TagsParams) {

    const { lang } = useLocalize()

    return useQuery({
        queryKey: [TAG_QUERY_KEY, params, lang],
        queryFn: () => getTagsApi({
            ...params,
            lang
        }),
        placeholderData: (previousData) => previousData,
    });
}