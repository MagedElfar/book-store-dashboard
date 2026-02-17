import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export const createEmotionCache = (rtl: boolean) =>
    createCache({
        key: rtl ? "mui-rtl" : "mui",
        stylisPlugins: rtl ? [prefixer, rtlPlugin] : [],
    });