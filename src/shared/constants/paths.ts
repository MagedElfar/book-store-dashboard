export const paths = {

    forbidden: "/403",
    notfound: "/404",

    account: {
        root: "/account",
        verified: "/account/verified",
        email: "/account/email",
        password: "/account/password"
    },

    // =========================
    // AUTH
    // =========================

    auth: {
        login: "/auth/login",
        forgetPassword: "/auth/forget-password",
        restPassword: "/auth/rest-password"
    },

    // =========================
    // DASHBOARD ROOT
    // =========================
    dashboard: {
        root: "/dashboard",
        home: "/",

        books: {
            root: "/dashboard/books",
            list: "/dashboard/books",
            create: "/dashboard/books/create",

            details: (id: string) => `/dashboard/books/${id}`,
            edit: (id: string) => `/dashboard/books/${id}/edit`,
        },

        // =========================
        // CATEGORIES
        // =========================
        categories: {
            root: "/dashboard/categories",
            list: "/dashboard/categories",

            create: "/dashboard/categories/create",

            edit: (id: string) => `/dashboard/categories/${id}/edit`,
        },

        // =========================
        // AUTHORS
        // =========================
        authors: {
            root: "/dashboard/authors",
            list: "/dashboard/authors",

            create: "/dashboard/authors/create",

            edit: (id: string) => `/dashboard/authors/${id}/edit`,
        },

        // =========================
        // TAGS
        // =========================
        tags: {
            root: "/dashboard/tags",
            list: "/dashboard/tags",

            create: "/dashboard/tags/create",

            edit: (id: string) => `/dashboard/tags/${id}/edit`,
        },

        // =========================
        // USERS (Admin only)
        // =========================
        users: {
            root: "/dashboard/users",

            list: "/dashboard/users",

            create: "/dashboard/users/create",

            details: (id: string) => `/dashboard/users/${id}`,

            edit: (id: string) => `/dashboard/users/${id}/edit`,

            roles: "/dashboard/users/roles",
        },

        // =========================
        // ORDERS
        // =========================
        orders: {
            root: "/dashboard/orders",

            list: "/dashboard/orders",

            details: (id: string) => `/dashboard/orders/${id}`,
        },

        // =========================
        // BANNERS
        // =========================
        banners: {
            root: "/dashboard/banners",

            list: "/dashboard/banners",

            create: "/dashboard/banners/create",

            edit: (id: string) => `/dashboard/banners/${id}/edit`,
        },

        // =========================
        // CHAT
        // =========================
        chat: {
            root: "/dashboard/chat",

            conversation: (id: string) => `/dashboard/chat/${id}`,
        },

        // =========================
        // NOTIFICATIONS
        // =========================
        notifications: {
            root: "/dashboard/notifications",
        },

        // =========================
        // ANALYTICS (Admin only)
        // =========================
        analytics: {
            root: "/dashboard/analytics",
        },

        // =========================
        // SETTINGS (Admin only)
        // =========================
        settings: {
            root: "/dashboard/settings",

            profile: "/dashboard/settings/profile",

            general: "/dashboard/settings/general",
        },
    },
};
