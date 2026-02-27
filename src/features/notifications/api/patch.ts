import { notificationApiProvider } from "../constants";

export const setupNotificationsApi = (userId: string) => notificationApiProvider.setupNotifications(userId)

export const markAllAsReadApi = (userId: string) => notificationApiProvider.markAllAsRead(userId)

export const markAsReadApi = (id: string) => notificationApiProvider.markAsRead(id)