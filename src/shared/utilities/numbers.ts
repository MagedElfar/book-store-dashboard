import type { SupportedLang } from "../types";

export function formatPrice(price: number, lang: SupportedLang) {
    return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}
