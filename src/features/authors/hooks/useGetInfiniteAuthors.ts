import { useInfiniteLookup } from "@/shared/hooks";

import { AUTHOR_QUERY_KEY } from "../constants";
import type { Author, AuthorsParams } from "../types";

import { getAuthors } from "./../api"

export function useGetInfiniteAuthors(params: AuthorsParams, enabled: boolean) {
    return useInfiniteLookup<Author>(
        [AUTHOR_QUERY_KEY, 'infinite', params],
        (page) => getAuthors({ ...params, page }),
        enabled
    );
}