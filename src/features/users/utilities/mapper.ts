import type { AutocompleteOptions } from "@/shared/types";

import type { User } from "../types";

export function mapUserToOption(item: User): AutocompleteOptions<User> {
    return {
        label: `${item.full_name} - ${item.email} ${item.phone && `(${item.phone})`}`,
        value: item.id,
        image: item.avatar_url,
        data: item
    }
}