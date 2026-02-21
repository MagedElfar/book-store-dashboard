import { useQuery } from "@tanstack/react-query";

import { getBooByIdApi } from "../api";
import { BOOK_QUERY_KEY } from "../constants";

export function useGetBookById(id?: string) {
    return useQuery({
        queryKey: [BOOK_QUERY_KEY, id],
        queryFn: () => getBooByIdApi(id!),
        enabled: !!id
    });
}