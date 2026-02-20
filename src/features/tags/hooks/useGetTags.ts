import { useQuery } from "@tanstack/react-query";

import { getTagsApi } from "../api";
import { TAG_QUERY_KEY } from "../constants";
import type { TagsParams } from "../types";

export function useGetTags(params: TagsParams) {
    return useQuery({
        queryKey: [TAG_QUERY_KEY, params],
        queryFn: () => getTagsApi(params),
        placeholderData: (previousData) => previousData,
    });
}