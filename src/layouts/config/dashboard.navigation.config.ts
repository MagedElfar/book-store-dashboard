import {
    Dashboard,
    MenuBook,
    People,
    ShoppingCart,
    Category,
    Person,
    Analytics,
    Notifications,
    Chat,
    Settings,
    Image,
    Label,
    Add,
    List,
} from "@mui/icons-material";

import { paths } from "@/shared/constants";

import type { NavItem } from "../types/navigation";

export const dashboardNav: NavItem[] = [
    // =========================
    // Dashboard Home
    // =========================
    {
        label: "nav.dashboard",
        icon: Dashboard,
        path: paths.dashboard.home,
        roles: ["admin", "support"],
    },

    // =========================
    // Books Management
    // =========================
    {
        label: "nav.books.root",
        icon: MenuBook,
        roles: ["admin", "support"],
        children: [
            {
                label: "nav.books.list",
                icon: List,
                path: paths.dashboard.books.list,
                roles: ["admin", "support"],
            },
            {
                label: "nav.books.create",
                icon: Add,
                path: paths.dashboard.books.create,
                roles: ["admin", "support"],
            },
            {
                label: "nav.categories",
                icon: Category,
                path: paths.dashboard.categories.root,
                roles: ["admin", "support"],
            },
            {
                label: "nav.authors",
                icon: Person,
                path: paths.dashboard.authors.root,
                roles: ["admin", "support"],
            },
            {
                label: "nav.tags",
                icon: Label,
                path: paths.dashboard.tags.root,
                roles: ["admin", "support"],
            },
        ],
    },

    // =========================
    // Orders
    // =========================
    {
        label: "nav.orders",
        icon: ShoppingCart,
        path: paths.dashboard.orders.root,
        roles: ["admin", "support"],
    },

    // =========================
    // Users (Admin only)
    // =========================
    {
        label: "nav.users.root",
        icon: People,
        roles: ["admin"],
        children: [
            {
                label: "nav.users.list",
                icon: List,
                path: paths.dashboard.users.list,
                roles: ["admin"],
            },
            {
                label: "nav.users.create",
                icon: Add,
                path: paths.dashboard.users.create,
                roles: ["admin"],
            },
        ],
    },

    // =========================
    // Banners
    // =========================
    {
        label: "nav.banners",
        icon: Image,
        path: paths.dashboard.banners.root,
        roles: ["admin", "support"],
    },

    // =========================
    // Chat
    // =========================
    {
        label: "nav.chat",
        icon: Chat,
        path: paths.dashboard.chat.root,
        roles: ["admin", "support"],
    },

    // =========================
    // Notifications
    // =========================
    {
        label: "nav.notifications",
        icon: Notifications,
        path: paths.dashboard.notifications.root,
        roles: ["admin", "support"],
    },

    // =========================
    // Analytics (Admin only)
    // =========================
    {
        label: "nav.analytics",
        icon: Analytics,
        path: paths.dashboard.analytics.root,
        roles: ["admin"],
    },

    // =========================
    // Settings (Admin only)
    // =========================
    {
        label: "nav.settings",
        icon: Settings,
        path: paths.dashboard.settings.root,
        roles: ["admin"],
    },
];
