import { supabasNotificationProvider } from "./infrastructure";
import type { NotificationApiProvider } from "./types";

export const notificationApiProvider: NotificationApiProvider = supabasNotificationProvider;

export const NOTIFICATION_QUERY_KEY = "notifications";