import { useQuery } from "@tanstack/react-query";

import { fetchNotificationsApi } from "../api";
import { NOTIFICATION_QUERY_KEY } from "../constants";

export const useGetNotifications = (userId: string) => {
    return useQuery({
        queryKey: [NOTIFICATION_QUERY_KEY, userId],
        queryFn: () => fetchNotificationsApi(userId),
        enabled: !!userId,
        refetchOnWindowFocus: true,
    });
};