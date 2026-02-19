import accountAR from "@/features/account/locales/ar.json";
import accountEN from "@/features/account/locales/en.json";
import authAR from "@/features/auth/locales/ar.json";
import authEN from "@/features/auth/locales/en.json";
import userAr from "@/features/users/locales/ar.json";
import userEN from "@/features/users/locales/en.json";
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
        user: userEN
    },
    ar: {
        common: translationAR,
        auth: authAR,
        layout: layoutAR,
        account: accountAR,
        user: userAr
    },
} as const;
