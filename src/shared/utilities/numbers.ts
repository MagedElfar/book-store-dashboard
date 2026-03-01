import type { SupportedLang } from "../types";

export function formatPrice(price: number, lang: SupportedLang = "en") {
    return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}
