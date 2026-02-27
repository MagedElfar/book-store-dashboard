import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAllNotificationsApi } from '../api';
import { NOTIFICATION_QUERY_KEY } from '../constants';

export const useDeleteAllNotifications = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteAllNotificationsApi(userId),
        onSuccess: () => {
            queryClient.setQueryData([NOTIFICATION_QUERY_KEY, userId], []);
            queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
        },
    });
};