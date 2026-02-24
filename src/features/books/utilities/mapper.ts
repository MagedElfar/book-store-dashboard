import type { AutocompleteOptions, SupportedLang } from "@/shared/types";

import type { Book } from "../types";

export function mapBookToOption(item: Book, lang: SupportedLang = "en"): AutocompleteOptions<Book> {
    return {
        label: item?.[`title_${lang}`],
        value: item.id,
        image: item.cover_image,
        data: item
    }
}