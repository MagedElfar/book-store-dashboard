import { rolePermissions } from "@/features/auth/constants";
import type { Permission, Role } from "@/features/auth/types/role";

import { useAuthState } from "./useAuthState";

/**
 * Helper functions
 */
function _hasPermission(role: Role, permission: Permission) {
    return rolePermissions[role]?.includes(permission) ?? false;
}

function _hasAnyPermission(role: Role, permissions: Permission[]) {
    return permissions.some(p => _hasPermission(role, p));
}

function _hasRole(role: Role, allowedRoles: Role[]) {
    return allowedRoles.includes(role);
}

/**
 * Hook to access current user permissions & role
 */
export function usePermission() {
    const authState = useAuthState();
    const role = authState?.role ?? "guest";

    const hasRole = (allowedRoles: Role | Role[]) => {
        const arr = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        return _hasRole(role, arr);
    };

    const hasPermission = (perm: Permission | Permission[]) => {
        const arr = Array.isArray(perm) ? perm : [perm];
        return _hasAnyPermission(role, arr);
    };

    const hasAccess = (
        perm: Permission | Permission[],
        allowedRoles?: Role | Role[]
    ) => {
        const permArr = Array.isArray(perm) ? perm : [perm];
        const roleArr = allowedRoles
            ? Array.isArray(allowedRoles)
                ? allowedRoles
                : [allowedRoles]
            : [];

        const permCheck = _hasAnyPermission(role, permArr);
        const roleCheck = roleArr.length ? _hasRole(role, roleArr) : true;

        return permCheck && roleCheck;
    };

    return {
        hasRole,
        hasPermission,
        hasAccess,
    };
}
