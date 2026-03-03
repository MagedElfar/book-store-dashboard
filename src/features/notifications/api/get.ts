import { notificationApiProvider } from "../constants";

export const fetchNotificationsApi = (userId: string, page: number, limit: number = 10) => notificationApiProvider.fetchNotifications(userId, page, limit)