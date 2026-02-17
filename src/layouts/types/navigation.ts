import type { ElementType } from "react";

import type { SystemRole } from "@/shared/types";

export interface NavItem {
    label: string;
    icon?: ElementType;
    path?: string;
    roles?: SystemRole[];
    children?: NavItem[];
}