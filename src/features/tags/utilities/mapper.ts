import type { SupportedLang } from "@/shared/types";

import type { Tag } from "../types";

export function mapTagToOption(lang: SupportedLang, item?: Tag) {
    return {
        value: item?.id || "",
        label: item?.[`name_${lang}`] || ""
    }
}