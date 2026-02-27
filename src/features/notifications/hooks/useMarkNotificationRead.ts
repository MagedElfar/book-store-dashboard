import { useMutation, useQueryClient } from "@tanstack/react-query";

import { markAsReadApi } from "../api";
import { NOTIFICATION_QUERY_KEY } from "../constants";

export const useMarkNotificationRead = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (notificationId: string) => markAsReadApi(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTIFICATION_QUERY_KEY, userId] });
        },
    });
};