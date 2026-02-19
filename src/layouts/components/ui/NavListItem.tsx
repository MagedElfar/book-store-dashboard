import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { useState, useEffect } from "react"; // 1. أضفنا useEffect
import { useTranslation } from "react-i18next";

import type { NavItem } from "@/layouts/types";
import { isPathActive } from "@/layouts/utilities";

import { NavList } from "../sections";

interface Props {
    item: NavItem;
    open: boolean;
    pathname: string;
    rootPath?: string;
    onNavigate: (path?: string) => void;
    depth: number;
}

export function NavListItem({
    item,
    open,
    pathname,
    onNavigate,
    depth,
    rootPath = "/"
}: Props) {
    const { t } = useTranslation("layout");
    const Icon = item.icon;
    const hasChildren = !!item.children?.length;

    const isActive = isPathActive(item.path, pathname, rootPath);

    const isChildActive = item.children?.some(child =>
        isPathActive(child.path, pathname, rootPath)
    );

    // 2. نجعل الحالة الابتدائية تعتمد على نشاط الأبناء
    const [expanded, setExpanded] = useState(isChildActive);

    // 3. (التعديل الأهم) مزامنة الحالة عند تغيير المسار
    useEffect(() => {
        if (isChildActive) {
            setExpanded(true);
        }
    }, [pathname, isChildActive]); // سيفتح القائمة تلقائياً إذا أصبح أحد الأبناء Active

    // 4. إذا تم إغلاق الـ Sidebar (Drawer) تماماً، يفضل إغلاق القوائم المنسدلة
    useEffect(() => {
        if (!open) {
            setExpanded(false);
        } else if (isChildActive) {
            setExpanded(true);
        }
    }, [open, isChildActive]);

    function handleClick() {
        if (hasChildren) {
            setExpanded(prev => !prev);
        }

        if (item.path) {
            onNavigate(item.path);
        }
    }

    return (
        <>
            <ListItemButton
                selected={isActive}
                onClick={handleClick}
                sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    pl: open ? depth * 2 + 2 : 2,
                    // تمييز بصري إذا كان أحد الأبناء نشطاً والقائمة مغلقة
                    ...(isChildActive && !isActive && {
                        color: 'primary.main',
                        bgcolor: 'action.selected',
                        fontWeight: 'bold'
                    })
                }}
            >
                {Icon && (
                    <ListItemIcon sx={{
                        minWidth: 40,
                        color: isActive || isChildActive ? 'primary.main' : 'inherit'
                    }}>
                        <Icon fontSize="small" />
                    </ListItemIcon>
                )}

                {open && (
                    <ListItemText
                        primary={t(item.label as any)}
                        primaryTypographyProps={{
                            typography: 'body2',
                            fontWeight: isActive ? 'bold' : 'medium'
                        }}
                    />
                )}

                {hasChildren && open && (
                    expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />
                )}
            </ListItemButton>

            {hasChildren && (
                <Collapse
                    in={expanded && open} // لا تفتح القائمة إلا إذا كان الـ Sidebar نفسه مفتوحاً
                    timeout="auto"
                    unmountOnExit
                >
                    <NavList
                        items={item.children!}
                        open={open}
                        pathname={pathname}
                        onNavigate={onNavigate}
                        depth={depth + 1}
                        rootPath={rootPath} // مرر الـ rootPath لضمان استمرارية المنطق
                    />
                </Collapse>
            )}
        </>
    );
}