import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Badge, IconButton, Menu, Box, Typography,
    Divider, List, Button, CircularProgress
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetNotifications, useMarkNotificationRead, useMarkAllNotificationsRead, useDeleteNotification, useDeleteAllNotifications } from '../hooks';

import { NotificationItem } from './NotificationItem';

export const NotificationCenter = ({ userId }: { userId: string }) => {

    const { t } = useTranslation("notification")

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { data: notifications, isLoading } = useGetNotifications(userId);
    const { mutate: markRead } = useMarkNotificationRead(userId);
    const { mutate: markAllRead } = useMarkAllNotificationsRead(userId);
    const { mutate: deleteOne } = useDeleteNotification(userId);
    const { mutate: deleteAll } = useDeleteAllNotifications(userId);

    const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton sx={{ p: 0 }} color="inherit" onClick={handleOpen}>
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 360, maxHeight: 480, overflow: 'auto' }
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Notifications</Typography>
                    {unreadCount > 0 && (
                        <Button size="small" onClick={() => markAllRead()}>Mark all read</Button>
                    )}
                </Box>

                <Divider />

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {notifications?.length === 0 ? (
                            <Typography sx={{ p: 3, textAlign: 'center' }} color="text.secondary">
                                {t("empty")}
                            </Typography>
                        ) : (
                            notifications?.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={(id) => markRead(id)}
                                    onDelete={(id) => deleteOne(id)}
                                />
                            ))
                        )}
                    </List>
                )}

                {notifications && notifications.length > 0 && (
                    <Box sx={{ p: 1, textAlign: 'center' }}>
                        <Button color="error" size="small" onClick={() => deleteAll()}>
                            {t("actions.clearAll")}
                        </Button>
                    </Box>
                )}
            </Menu>
        </>
    );
};