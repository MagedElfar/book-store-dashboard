import { List } from "@mui/material";

import type { NavItem } from "@/layouts/types";

import { NavListItem } from "../ui";

interface Props {
    items: NavItem[];
    open: boolean;
    pathname: string;
    onNavigate: (path?: string) => void;
    depth?: number;
    rootPath?: string
}

export function NavList({
    items,
    open,
    pathname,
    onNavigate,
    depth = 0,
    rootPath = "/"
}: Props) {
    return (
        <List
            disablePadding
            sx={{
                px: depth === 0 ? 1 : 0,

            }}
        >
            {items.map((item) => (
                <NavListItem
                    key={item.path || item.label}
                    item={item}
                    open={open}
                    pathname={pathname}
                    onNavigate={onNavigate}
                    depth={depth}
                    rootPath={rootPath}
                />
            ))}
        </List>
    );
}