import { useMemo, useState } from "react";

import { INFINITE_RECORDED_LIMIT } from "@/core";
import { useLocalize } from "@/shared/lib";
import type { AutocompleteOptions } from "@/shared/types";


import type { Tag } from "../types";
import { mapTagToOption } from "../utilities";

import { useGetInfiniteTags } from "./useGetInfiniteTags";

export function useTagsAutoComplete() {
    const [search, setSearch] = useState("");
    const [isTagsEnabled, setIsTagsEnabled] = useState(false);
    const { lang } = useLocalize()

    const query = useGetInfiniteTags({
        search,
        limit: INFINITE_RECORDED_LIMIT,
        is_active: "active",
        lang
    }, isTagsEnabled)

    const options: AutocompleteOptions<Tag>[] = useMemo(() => {
        const pages = query?.data?.pages || [];

        return pages.flatMap(page => (page.items || []).map(item => mapTagToOption(item, lang)));

    }, [lang, query?.data?.pages]);

    return {
        ...query,
        setSearch,
        setIsTagsEnabled,
        options
    };
}