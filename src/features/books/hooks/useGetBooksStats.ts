import { useQuery } from "@tanstack/react-query";

import { getBooKsStateApi } from "../api";
import { BOOK_QUERY_KEY } from "../constants";

export function useGetBooksStats() {
    return useQuery({
        queryKey: [BOOK_QUERY_KEY, "stats"],
        queryFn: () => getBooKsStateApi()
    });
}