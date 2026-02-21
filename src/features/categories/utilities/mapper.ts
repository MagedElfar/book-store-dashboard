import type { SupportedLang } from "@/shared/types";

import type { Category } from "../types";

export function mapCategoryToOption(lang: SupportedLang, item?: Category) {
    return {
        value: item?.id || "",
        label: item?.[`name_${lang}`] || ""
    }
}