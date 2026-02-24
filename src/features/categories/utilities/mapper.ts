import type { AutocompleteOptions, SupportedLang } from "@/shared/types";

import type { Category } from "../types";

export function mapCategoryToOption(item: Category, lang: SupportedLang = "en"): AutocompleteOptions<Category> {
    return {
        value: item?.id,
        label: item?.[`name_${lang}`],
        image: item?.image_url,
        data: item
    }
}