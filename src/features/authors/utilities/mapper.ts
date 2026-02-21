import type { SupportedLang } from "@/shared/types";

import type { Author } from "../types";

export function mapAuthorToOption(lang: SupportedLang, item?: Author) {
    return {
        value: item?.id || "",
        label: item?.[`name_${lang}`] || ""
    }
}