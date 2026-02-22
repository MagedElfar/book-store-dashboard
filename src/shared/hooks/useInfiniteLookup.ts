import { useInfiniteQuery } from "@tanstack/react-query";

import { INFINITE_RECORDED_LIMIT } from "@/core";

import type { GetManyResponse } from "../types";

export function useInfiniteLookup<T>(
    queryKey: any[],
    queryFn: (page: number) => Promise<GetManyResponse<T>>,
    enabled: boolean = true,
    pageSize: number = INFINITE_RECORDED_LIMIT
) {
    return useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam = 1 }) => queryFn(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const loadedItemsCount = allPages.length * pageSize;
            return loadedItemsCount < lastPage.total ? allPages.length + 1 : undefined;
        },
        enabled
    });
}