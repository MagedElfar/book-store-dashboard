import type { Permission, Role } from "../types";

export const rolePermissions: Record<Role, Permission[]> = {
    guest: [
    ],

    user: [
    ],

    support: [
        "book.read",
        "book.create",
        "book.update",

        "order.read",
        "order.manage",

        "author.read",
        "author.create",
        "author.update",

        "category.read",
        "category.create",
        "category.update",

        "tag.read",
        "tag.create",
        "tag.update",

        "chat.manage",
    ],

    admin: [
        "book.read",
        "book.create",
        "book.update",
        "book.delete",

        "author.read",
        "author.create",
        "author.update",
        "author.delete",

        "category.read",
        "category.create",
        "category.update",
        "category.delete",

        "tag.read",
        "tag.create",
        "tag.update",
        "tag.delete",

        "user.read",
        "user.update",
        "user.delete",
        "user.create",

        "order.read",
        "order.manage",

        "analytics.read",

        "chat.manage",
    ],
}
