
import type { Role } from "@/features/auth";

import type { NavItem } from "../types/navigation";

export function filterNavByRole(items: NavItem[], role?: Role): NavItem[] {

    if (!role) return []
    return items
        .filter(item => !item.roles || item.roles.includes(role))
        .map(item => ({
            ...item,
            children: item.children
                ? filterNavByRole(item.children, role)
                : undefined
        }));
}
