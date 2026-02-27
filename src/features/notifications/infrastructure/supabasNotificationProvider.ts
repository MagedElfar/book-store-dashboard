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

    fetchNotifications: async (userId: string) => {
        const { data, error } = await supabaseClient
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data
    },

    markAsRead: async (notificationId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .update({ is_read: true })
            .eq('id', notificationId);

        if (error) throw error;
    },

    markAllAsRead: async (userId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', userId)
            .eq('is_read', false);

        if (error) throw error;
    },

    deleteNotification: async (notificationId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .delete()
            .eq('id', notificationId);

        if (error) throw error;
    },

    deleteAllNotifications: async (userId: string) => {
        const { error } = await supabaseClient
            .from('notifications')
            .delete()
            .eq('user_id', userId);

        if (error) throw error;
    }

};