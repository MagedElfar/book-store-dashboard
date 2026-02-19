export function isPathActive(itemPath?: string, pathname?: string, rootPath: string = "/dashboard") {
    if (!itemPath || !pathname) return false;

    // تنظيف المسارات من السلاش الزائد في النهاية
    const cleanPathname = pathname.replace(/\/+$/, "") || "/";
    const cleanItemPath = itemPath.replace(/\/+$/, "") || "/";

    // الحالة 1: إذا كان المسار الحالي يطابق تماماً مسار التبويب
    // هذا سيجعل /dashboard نشطة فقط عندما تكون في /dashboard
    if (cleanPathname === cleanItemPath) {
        return true;
    }

    // الحالة 2: إذا كان التبويب هو "الرئيسية" (rootPath)
    // نتحقق من التطابق التام فقط
    if (cleanItemPath === rootPath) {
        return cleanPathname === rootPath;
    }

    // افتراضياً: لا نستخدم startsWith للأزرار العادية لمنع تداخل users مع users/create
    return false;
}