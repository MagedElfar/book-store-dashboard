import type { ElementType } from "react";

import type { Role } from "@/features/auth";

export interface NavItem {
    label: string;
    icon?: ElementType;
    path?: string;
    roles?: Role[];
    children?: NavItem[];
}