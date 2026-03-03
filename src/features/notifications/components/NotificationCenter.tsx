import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Badge, IconButton, Menu, Box, Typography,
    Divider, List, Button, CircularProgress, Stack
} from '@mui/material';
import React, { useMemo, useState } from 'react';

import { useLocalize } from '@/shared/lib';

import {
    useGetNotifications,
    useMarkNotificationRead,
    useMarkAllNotificationsRead,
    useDeleteNotification,
    useDeleteAllNotifications
} from '../hooks';

import { NotificationItem } from './NotificationItem';

export const NotificationCenter = ({ userId }: { userId: string }) => {
    const { t } = useLocalize("notification");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useGetNotifications(userId);

    const { mutate: markRead } = useMarkNotificationRead(userId);
    const { mutate: markAllRead } = useMarkAllNotificationsRead(userId);
    const { mutate: deleteOne } = useDeleteNotification(userId);
    const { mutate: deleteAll } = useDeleteAllNotifications(userId);

    const notifications = useMemo(() => data?.pages.flatMap(p => p.items) || [], [data]);

    const unreadCount = useMemo(() => data?.pages[0]?.unreadCount ?? 0, [data]);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton
                sx={{ p: 0.5 }}
                color={anchorEl ? "primary" : "inherit"}
                onClick={handleOpen}
            >
                <Badge badgeContent={unreadCount} color="error" max={99}>
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            width: 360,
                            maxHeight: 520,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2,
                            boxShadow: 3
                        }
                    }
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {t("title")} ({unreadCount})
                    </Typography>
                    {unreadCount > 0 && (
                        <Button
                            size="small"
                            variant="text"
                            onClick={() => markAllRead()}
                        >
                            {t("actions.markAllRead")}
                        </Button>
                    )}
                </Box>

                <Divider />

                <Box sx={{ flexGrow: 1, overflowY: 'auto', minHeight: 100 }}>
                    {isLoading ? (
                        <Stack alignItems="center" justifyContent="center" sx={{ p: 4 }}>
                            <CircularProgress size={28} thickness={4} />
                        </Stack>
                    ) : (
                        <List sx={{ p: 0 }}>
                            {notifications.length === 0 ? (
                                <Box sx={{ py: 5, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {t("empty")}
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    {notifications.map((notification) => (
                                        <NotificationItem
                                            key={notification.id}
                                            notification={notification}
                                            onMarkAsRead={(id) => markRead(id)}
                                            onDelete={(id) => deleteOne(id)}
                                        />
                                    ))}

                                    {hasNextPage && (
                                        <Box sx={{ p: 1.5, textAlign: 'center' }}>
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="outlined"
                                                color="inherit"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    fetchNextPage();
                                                }}
                                                disabled={isFetchingNextPage}
                                                sx={{
                                                    borderRadius: 1.5,
                                                    textTransform: 'none',
                                                    borderColor: 'divider'
                                                }}
                                            >
                                                {isFetchingNextPage ? (
                                                    <CircularProgress size={20} color="inherit" />
                                                ) : (
                                                    t("actions.loadMore")
                                                )}
                                            </Button>
                                        </Box>
                                    )}
                                </>
                            )}
                        </List>
                    )}
                </Box>

                {notifications.length > 0 && (
                    <>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <Box sx={{ p: 1 }}>
                            <Button
                                fullWidth
                                color="error"
                                size="small"
                                onClick={() => deleteAll()}
                            >
                                {t("actions.clearAll")}
                            </Button>
                        </Box>
                    </>
                )}
            </Menu>
        </>
    );
};