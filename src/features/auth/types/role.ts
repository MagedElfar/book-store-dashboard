export type Role =
    | "guest"
    | "user"
    | "support"
    | "admin"

export type Permission =
    | "book.read"
    | "book.create"
    | "book.update"
    | "book.delete"

    | "banner.read"
    | "banner.create"
    | "banner.update"
    | "banner.delete"

    | "category.read"
    | "category.create"
    | "category.update"
    | "category.delete"

    | "author.read"
    | "author.create"
    | "author.update"
    | "author.delete"

    | "tag.read"
    | "tag.create"
    | "tag.update"
    | "tag.delete"

    | "category.read"
    | "category.create"
    | "category.update"
    | "category.delete"


    | "user.read"
    | "user.update"
    | "user.delete"
    | "user.create"

    | "address.read"
    | "address.update"
    | "address.delete"
    | "address.create"

    | "order.read"
    | "order.manage"

    | "analytics.read"
    | "chat.manage"
