import { rolePermissions } from "../constants"
import type { Permission, Role } from "../types"


export function hasPermission(
    role: Role,
    permission: Permission
) {
    return rolePermissions[role]?.includes(permission)
}

export function hasAnyPermission(
    role: Role,
    permissions: Permission[]
) {
    return permissions.some(p =>
        rolePermissions[role]?.includes(p)
    )
}

export function hasRole(
    role: Role,
    allowedRoles: Role[]
) {
    return allowedRoles.includes(role)
}
