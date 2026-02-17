export function isPathActive(itemPath?: string, pathname?: string, rootPath?: string) {
    if (!itemPath || !pathname) return false;

    if (itemPath === rootPath) {
        return pathname === rootPath
    }

    return pathname.startsWith(itemPath);
}
