import accountAR from "@/features/account/locales/ar.json";
import accountEN from "@/features/account/locales/en.json";
import analyticsAr from "@/features/analytics/locales/ar.json";
import analyticsEN from "@/features/analytics/locales/en.json";
import authAR from "@/features/auth/locales/ar.json";
import authEN from "@/features/auth/locales/en.json";
import authorsAr from "@/features/authors/locales/ar.json";
import authorsEn from "@/features/authors/locales/en.json";
import bookAr from "@/features/books/locales/ar.json";
import bookEn from "@/features/books/locales/en.json";
import categoryAr from "@/features/categories/locales/ar.json";
import categoryEn from "@/features/categories/locales/en.json";
import orderAr from "@/features/orders/locales/ar.json";
import orderEN from "@/features/orders/locales/en.json";
import tagAr from "@/features/tags/locales/ar.json";
import tagEn from "@/features/tags/locales/en.json";
import userAr from "@/features/users/locales/ar.json";
import userEN from "@/features/users/locales/en.json";
import AddressAr from "@/features/users/sub-features/addresses/locales/ar.json";
import AddressEN from "@/features/users/sub-features/addresses/locales/en.json";
import layoutAR from "@/layouts/locales/ar.json";
import layoutEN from "@/layouts/locales/en.json";

import translationAR from "./locales/ar.json";
import translationEN from "./locales/en.json";


export const defaultNS = "common";


export const resources = {
    en: {
        common: translationEN,
        auth: authEN,
        layout: layoutEN,
        account: accountEN,
        user: userEN,
        address: AddressEN,
        category: categoryEn,
        author: authorsEn,
        tag: tagEn,
        book: bookEn,
        order: orderEN,
        analytics: analyticsEN
    },
    ar: {
        common: translationAR,
        auth: authAR,
        layout: layoutAR,
        account: accountAR,
        user: userAr,
        address: AddressAr,
        category: categoryAr,
        author: authorsAr,
        tag: tagAr,
        book: bookAr,
        orders: orderAr,
        analytics: analyticsAr
    },
} as const;