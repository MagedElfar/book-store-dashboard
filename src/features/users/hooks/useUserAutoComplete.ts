import { useMemo, useState } from "react";

import { INFINITE_RECORDED_LIMIT } from "@/core";
import type { AutocompleteOptions } from "@/shared/types";


import { mapUserToOption } from "../utilities";

import { useGetInfiniteUsers } from "./useGetInfiniteUsers";

export function useUserAutoComplete() {
    const [search, setSearch] = useState("");
    const [isUsersEnabled, setIsUserEnabled] = useState(false);

    const query = useGetInfiniteUsers({
        search,
        limit: INFINITE_RECORDED_LIMIT,
    }, isUsersEnabled)

    const options: AutocompleteOptions[] = useMemo(() => {
        const pages = query?.data?.pages || [];

        return pages.flatMap(page =>

            (page.items || []).map(item => mapUserToOption(item))
        );
    }, [query?.data?.pages]);
    return {
        ...query,
        isUsersEnabled,
        setIsUserEnabled,
        setSearch,
        options
    };
}