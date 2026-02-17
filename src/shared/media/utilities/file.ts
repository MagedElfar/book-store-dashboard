import type { UploadFile } from "../types";

export const extractFilePathFromUrl = (url: string, bucket: string): string | null => {
    try {
        const parsedUrl = new URL(url);

        const marker = `/storage/v1/object/public/${bucket}/`;

        const index = parsedUrl.pathname.indexOf(marker);

        if (index === -1) return null;

        const encodedPath =
            parsedUrl.pathname.substring(index + marker.length);

        // ✅ الحل هنا
        const decodedPath = decodeURIComponent(encodedPath);

        return decodedPath;

    } catch {
        return null;
    }
};

export const mapUrlToUploadFile = (url: string): UploadFile => {
    // حاول استخراج الاسم من آخر جزء من الـ URL
    const parts = url.split("/");
    const name = parts[parts.length - 1];

    // حاول تخمين type بناءً على امتداد الملف
    const extension = name.split(".").pop()?.toLowerCase();
    let type = "application/octet-stream"; // default

    if (extension) {
        if (["jpg", "jpeg"].includes(extension)) type = "image/jpeg";
        else if (extension === "png") type = "image/png";
        else if (extension === "gif") type = "image/gif";
        else if (extension === "pdf") type = "application/pdf";
        // أضف أي امتدادات أخرى حسب الحاجة
    }

    return {
        file: { name: decodeURIComponent(name), type, size: 0 },       // ما عندنا ملف محلي
        preview: type.startsWith("image/") ? url : null,
        progress: 100,
        status: "success",
        url,
        // نقدر نضيف name و type كـ properties مؤقتة لو الـ UploadFile type يدعم
    } as unknown as UploadFile;
};
