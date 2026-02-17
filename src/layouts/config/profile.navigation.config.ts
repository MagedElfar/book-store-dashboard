import {
    AccountBox,
    Email,
    Password
} from "@mui/icons-material";

import { paths } from "@/shared/constants";

import type { NavItem } from "../types/navigation";

export const profileNav: NavItem[] = [
    {
        label: "nav.myAccount",
        icon: AccountBox,
        path: paths.account.root,
    },
    {
        label: "nav.email",
        icon: Email,
        path: paths.account.email,
    },
    {
        label: "nav.password",
        icon: Password,
        path: paths.account.password,
    },
];
