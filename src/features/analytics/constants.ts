import { supabaseAnalyticsProvider } from "./infrastructure";
import type { AnalyticsApiProvider } from "./type";


export const apiProvider: AnalyticsApiProvider = supabaseAnalyticsProvider

export const ANALYTICS_QUERY_KEY = "analytics"