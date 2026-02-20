import { useQuery } from "@tanstack/react-query";

import { getAuthorById } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";

export function useGetAuthorById(id?: string) {
    return useQuery({
        queryKey: [AUTHOR_QUERY_KEY, id],
        queryFn: () => getAuthorById(id!),
        enabled: !!id
    });
}