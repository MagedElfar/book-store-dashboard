import { useQueryClient } from '@tanstack/react-query';
import { onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAuthState } from '@/features/auth';
import { setupNotificationsApi } from '@/features/notifications';
import { NOTIFICATION_QUERY_KEY } from '@/features/notifications/constants';
import { supabaseClient } from '@/shared/lib';
import { messaging } from '@/shared/lib/firebase/firebase';

export default function AppInitializer() {
    const { user } = useAuthState();
    const queryClient = useQueryClient()

    useEffect(() => {
        if (user?.id) {
            setupNotificationsApi(user.id);
        }

        const unsubscribe = onMessage(messaging, () => {
            // toast.info(
            //     <div>
            //         <strong>{payload.notification?.title}</strong>
            //         <div>{payload.notification?.body}</div>
            //     </div>,
            //     {
            //         icon: <NotificationsActiveIcon />
            //     }
            // );

        });

        return () => unsubscribe();
    }, [user?.id]);


    useEffect(() => {
        if (!user?.id) return;

        const channel = supabaseClient
            .channel('notifications-channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    queryClient.invalidateQueries({
                        queryKey: [NOTIFICATION_QUERY_KEY]
                    });

                    toast.info(payload?.new?.body);
                }
            )
            .subscribe((status) => {
                // eslint-disable-next-line no-console
                console.log("connection status", status);
            });

        return () => {
            supabaseClient.removeChannel(channel);
        };
    }, [queryClient, user?.id]);


    return null;
}