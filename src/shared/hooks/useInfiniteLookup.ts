import { useInfiniteQuery } from "@tanstack/react-query";

import { INFINITE_RECORDED_LIMIT } from "@/core";

import type { GetManyResponse } from "../types";

export function useInfiniteLookup<T, R extends GetManyResponse<T> = GetManyResponse<T>>(
    queryKey: any[],
    queryFn: (page: number) => Promise<R>,
    enabled: boolean = true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _pageSize: number = INFINITE_RECORDED_LIMIT
) {
    return useInfiniteQuery<R>({
        queryKey,
        queryFn: ({ pageParam = 1 }) => queryFn(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const loadedSoFar = allPages.flatMap(p => p.items).length;

            if (loadedSoFar < lastPage.total) {
                return allPages.length + 1;
            }

            return undefined;
        },
        enabled,
        retry: false,
    });
}