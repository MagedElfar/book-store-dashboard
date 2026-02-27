import { useMutation, useQueryClient } from "@tanstack/react-query";

import { markAllAsReadApi } from "../api";
import { NOTIFICATION_QUERY_KEY } from "../constants";

export const useMarkAllNotificationsRead = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => markAllAsReadApi(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTIFICATION_QUERY_KEY, userId] });
        },
    });
};