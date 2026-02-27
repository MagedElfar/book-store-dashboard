import { notificationApiProvider } from "../constants"

export const deleteAllNotificationsApi = (userId: string) => notificationApiProvider.deleteAllNotifications(userId)

export const deleteNotificationApi = (id: string) => notificationApiProvider.deleteNotification(id)