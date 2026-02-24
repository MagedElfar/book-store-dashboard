import { useInfiniteLookup } from "@/shared/hooks";

import { BOOK_QUERY_KEY } from "../constants";
import type { Book, BookParams } from "../types";

import { getBooKsApi } from "./../api"

export function useGetInfiniteBooks(params: BookParams, enabled: boolean) {
    return useInfiniteLookup<Book>(
        [BOOK_QUERY_KEY, 'infinite', params],
        (page) => getBooKsApi({ ...params, page }),
        enabled
    );
}