import { useInfiniteLookup } from "@/shared/hooks";

import { TAG_QUERY_KEY } from "../constants";
import type { Tag, TagsParams } from "../types";

import { getTagsApi } from "./../api"

export function useGetInfiniteTags(params: TagsParams, enabled: boolean) {
    return useInfiniteLookup<Tag>(
        [TAG_QUERY_KEY, 'infinite', params],
        (page) => getTagsApi({
            ...params,
            page,
        }),
        enabled
    );
}