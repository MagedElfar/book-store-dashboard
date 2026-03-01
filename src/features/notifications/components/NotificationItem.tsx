import { Delete as DeleteIcon, Done as DoneIcon, FiberManualRecord as UnreadIcon } from '@mui/icons-material';
import { ListItem, ListItemText, IconButton, Box, Typography, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';

import { paths } from '@/shared/constants';
import { useLocalize } from '@/shared/lib';
import { fToNow } from '@/shared/utilities';

import type { Notification } from '../types';


interface Props {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: Props) {
    const { t, dir } = useLocalize("notification");
    const navigate = useNavigate();

    const handleClick = () => {
        const orderId = notification.data;

        if (orderId) {
            navigate(paths.dashboard.orders.details(orderId));
        }
    };

    return (
        <ListItem
            onClick={handleClick}
            sx={{
                cursor: notification.data ? 'pointer' : 'default',
                bgcolor: notification.is_read ? 'transparent' : 'action.hover',
                borderBottom: '1px solid',
                borderColor: 'divider',
                textAlign: 'left',
                '& .MuiListItemText-root': {
                    textAlign: dir === "rtl" ? 'right' : 'left'
                }
            }}
            secondaryAction={
                <Box onClick={(e) => e.stopPropagation()}>
                    {!notification.is_read && (
                        <Tooltip title={t('actions.markAsRead')}>
                            <IconButton
                                edge="end"
                                onClick={() => onMarkAsRead(notification.id)}
                            >
                                <DoneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title={t('actions.delete')}>
                        <IconButton
                            edge="end"
                            onClick={() => onDelete(notification.id)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            }
        >
            {!notification.is_read && (
                <UnreadIcon
                    sx={{
                        fontSize: 10,
                        mr: dir === "rtl" ? 0 : 1,
                        ml: dir === "rtl" ? 1 : 0,
                        color: 'primary.main'
                    }}
                />
            )}

            <ListItemText
                primary={notification.title}
                secondary={
                    <>
                        <Typography variant="body2" component="span" display="block">
                            {notification.body}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {fToNow(notification.created_at)}
                        </Typography>
                    </>
                }
            />
        </ListItem>
    );
}