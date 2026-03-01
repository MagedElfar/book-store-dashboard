import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { SupportedLang } from '@/shared/types';

import type { resources } from '../resources';

type AppNamespace = keyof typeof resources.en;

export function useLocalize(nameSpace: AppNamespace | AppNamespace[] = "common") {


    const { i18n, t } = useTranslation(nameSpace);
    const lang = i18n.language as SupportedLang;
    const dir = i18n.dir()

    const getLocalizedValue = useCallback(<T extends Record<string, any>>(
        data: T | null | undefined,
        prefix: string = 'name',
        fallbackKey?: keyof T
    ): string => {
        if (!data) return '';

        const localizedKey = `${prefix}_${lang}`;
        const defaultFallback = `${prefix}_en`;


        const value =
            data[localizedKey] ||
            (fallbackKey ? data[fallbackKey] : data[defaultFallback]);

        return (value || "---") as string;
    }, [lang]);

    const toggleLanguage = useCallback(() => {
        const newLang = lang === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);

        // optional: save manually
        localStorage.setItem("i18nextLng", newLang);
    }, [i18n, lang])


    return useMemo(() => ({
        lang,
        getLocalizedValue,
        t,
        dir,
        toggleLanguage
    }), [dir, getLocalizedValue, lang, t, toggleLanguage]);
}