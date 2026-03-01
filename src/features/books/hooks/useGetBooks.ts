import { useQuery } from "@tanstack/react-query";

import { useLocalize } from "@/shared/lib";

import { getBooKsApi } from "../api";
import { BOOK_QUERY_KEY } from "../constants";
import type { BookParams } from "../types";

export function useGetBooks(params: BookParams) {

    const { lang } = useLocalize()

    return useQuery({
        queryKey: [BOOK_QUERY_KEY, params, lang],
        queryFn: () => getBooKsApi({
            ...params,
            lang
        })
    });
}