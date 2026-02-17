import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { NavItem } from "@/layouts/types";
import { isPathActive } from "@/layouts/utilities";

import { NavList } from "../sections";


interface Props {
    item: NavItem;
    open: boolean;
    pathname: string;
    rootPath?: string
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

    const { t } = useTranslation("layout")

    const Icon = item.icon;



    const hasChildren = !!item.children?.length;

    const isActive = isPathActive(item.path, pathname, rootPath);

    const isChildActive = item.children?.some(child =>
        isPathActive(child.path, pathname, rootPath)
    );


    const [expanded, setExpanded] = useState(
        isChildActive
    );

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
                }}
            >

                {Icon && (
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Icon fontSize="small" />
                    </ListItemIcon>
                )}

                {open && (
                    <ListItemText primary={t(item.label as any)} />
                )}

                {hasChildren && open && (
                    expanded
                        ? <ExpandLess fontSize="small" />
                        : <ExpandMore fontSize="small" />
                )}

            </ListItemButton>

            {hasChildren && (
                <Collapse
                    in={expanded && open}
                    timeout="auto"
                    unmountOnExit
                >
                    <NavList
                        items={item.children!}
                        open={open}
                        pathname={pathname}
                        onNavigate={onNavigate}
                        depth={depth + 1}
                    />
                </Collapse>
            )}

        </>
    );
}
