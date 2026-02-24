import type { AutocompleteOptions, SupportedLang } from "@/shared/types";

import type { Author } from "../types";

export function mapAuthorToOption(item: Author, lang: SupportedLang = "en"): AutocompleteOptions<Author> {
    return {
        value: item?.id,
        label: item?.[`name_${lang}`],
        image: item?.image_url,
        data: item
    }
}