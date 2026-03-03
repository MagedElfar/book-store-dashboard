/* eslint-disable no-console */
import { supabaseClient } from "@/shared/lib";
import { fetchToken } from "@/shared/lib/firebase/firebase";

import type {
    NotificationApiProvider
} from "../types";

export const supabasNotificationProvider: NotificationApiProvider = {

    setupNotifications: async function (userId: string) {
        try {
            const token = await fetchToken();

            if (token && userId) {
                const { error } = await supabaseClient
                    .from('profiles')
                    .update({ fcm_token: token })
                    .eq('id', userId);

                if (error) {
                    console.error("Error saving token to Supabase:", error);
                } else {
                    console.log("Token synced with Supabase profile!");
                }
            }
        } catch (err) {
            console.error("Setup failed:", err);
        }
    },

    fetchNotifications: async (userId: string, page: number = 1, limit: number = 10) => {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const [notificationsQuery, unreadCountQuery] = await Promise.all([
            supabaseClient
                .from('notifications')
                .select('*', { count: 'exact' })
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .range(from, to),

            supabaseClient
                .from('notifications')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('is_read', false)
        ]);

        if (notificationsQuery.error) throw new Error(notificationsQuery.error.message);
        if (unreadCountQuery.error) throw new Error(unreadCountQuery.error.message);

        return {
            items: notificationsQuery.data || [],
            total: notificationsQuery.count || 0,
            unreadCount: unreadCountQuery.count || 0
        };
    },

    markAsRead: async (notificationId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .update({ is_read: true })
            .eq('id', notificationId);

        if (error) throw new Error(error.message);
    },

    markAllAsRead: async (userId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', userId)
            .eq('is_read', false);

        if (error) throw new Error(error.message);
    },

    deleteNotification: async (notificationId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .delete()
            .eq('id', notificationId);

        if (error) throw new Error(error.message);
    },

    deleteAllNotifications: async (userId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .delete()
            .eq('user_id', userId);

        if (error) throw new Error(error.message);
    }

};