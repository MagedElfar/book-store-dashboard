import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNotificationApi } from '../api';
import { NOTIFICATION_QUERY_KEY } from '../constants';

export const useDeleteNotification = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (notificationId: string) => deleteNotificationApi(notificationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [NOTIFICATION_QUERY_KEY, userId] });
        },
    });
};