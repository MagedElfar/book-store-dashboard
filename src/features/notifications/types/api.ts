import type { Notification } from "./notification";

export interface NotificationApiProvider {
    setupNotifications: (userId: string) => Promise<void>;

    fetchNotifications: (userId: string) => Promise<Notification[]>;

    markAsRead: (notificationId: string) => Promise<void>;
    markAllAsRead: (userId: string) => Promise<void>;

    deleteNotification: (notificationId: string) => Promise<void>;
    deleteAllNotifications: (userId: string) => Promise<void>;
}