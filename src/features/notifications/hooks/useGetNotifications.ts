
import { useInfiniteLookup } from "@/shared/hooks";

import { fetchNotificationsApi } from "../api";
import { NOTIFICATION_QUERY_KEY } from "../constants";
import type { Notification, NotificationsResponse } from "../types";

export const useGetNotifications = (userId: string) => {
    return useInfiniteLookup<Notification, NotificationsResponse>(
        [NOTIFICATION_QUERY_KEY, "infinite", userId],
        (page) => fetchNotificationsApi(userId, page),

    )
};