import type { AutocompleteOptions, SupportedLang } from "@/shared/types";

import type { Tag } from "../types";

export function mapTagToOption(item: Tag, lang: SupportedLang = "en"): AutocompleteOptions<Tag> {
    return {
        value: item?.id || "",
        label: item?.[`name_${lang}`],
        data: item
    }
}