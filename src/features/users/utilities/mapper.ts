import type { User } from "../types";

export function mapUserToOption(item: User) {
    return {
        label: `${item.full_name} - ${item.email} ${item.phone && `(${item.phone})`}`,
        value: item.id,
        image: item?.avatar_url || "",
        full_name: item.full_name,
        phone: item?.phone,
        email: item.email,
        id: item.id
    }
}