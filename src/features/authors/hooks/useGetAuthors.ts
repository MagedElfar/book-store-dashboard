import { useQuery } from "@tanstack/react-query";

import { getAuthors } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";
import type { AuthorsParams } from "../types";

export function useGetAuthors(params: AuthorsParams) {
    return useQuery({
        queryKey: [AUTHOR_QUERY_KEY, params],
        queryFn: () => getAuthors(params)
    });
}