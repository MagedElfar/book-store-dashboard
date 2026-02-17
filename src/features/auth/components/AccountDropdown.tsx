import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { paths } from '@/shared/constants';

import { useAuthActions } from '../hooks/useAuthActions';
import { useAuthState } from '../hooks/useAuthState';

export function AccountDropdown() {

    const { t } = useTranslation("auth")
    const { user } = useAuthState();
    const { logout } = useAuthActions();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccount = () => {
        navigate(paths.account.root);
        handleClose();
    };

    const handleLogout = async () => {
        await logout();
        handleClose();
    };

    if (!user) return null;

    return (
        <>
            <IconButton onClick={handleOpen} size="small" sx={{ p: 0 }}>
                <Avatar
                    src={user?.avatar_url || ""}
                    sx={{
                        width: 40,
                        height: 40,
                        textTransform: "uppercase",
                        fontSize: "14px"
                    }}
                >
                    {user?.full_name?.slice(0, 2)}
                </Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleAccount}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("myAccount")}</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t("logout")}</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
