import { notificationApiProvider } from "../constants";

export const fetchNotificationsApi = (userId: string) => notificationApiProvider.fetchNotifications(userId)