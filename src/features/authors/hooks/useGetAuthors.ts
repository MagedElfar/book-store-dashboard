import { useQuery } from "@tanstack/react-query";

import { useLocalize } from "@/shared/lib";

import { getAuthors } from "../api";
import { AUTHOR_QUERY_KEY } from "../constants";
import type { AuthorsParams } from "../types";

export function useGetAuthors(params: AuthorsParams) {

    const { lang } = useLocalize("author")

    return useQuery({
        queryKey: [AUTHOR_QUERY_KEY, params, lang],
        queryFn: () => getAuthors({
            ...params,
            lang
        })
    });
}