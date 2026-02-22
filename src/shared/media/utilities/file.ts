import { SUPABASE_BUCKET } from "@/core";

import type { UploadFile } from "../types";

export const extractFilePathFromUrl = (url: string): string | null => {
    try {
        const parsedUrl = new URL(url);

        const marker = `/storage/v1/object/public/${SUPABASE_BUCKET}/`;

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
    const parts = url.split("/");
    const name = parts[parts.length - 1];

    const extension = name.split(".").pop()?.toLowerCase();
    let type = "application/octet-stream"; // default

    if (extension) {
        const ext = extension.toLowerCase();

        if (["jpg", "jpeg"].includes(ext)) type = "image/jpeg";
        else if (ext === "png") type = "image/png";
        else if (ext === "webp") type = "image/webp";
        else if (ext === "gif") type = "image/gif";
        else if (ext === "svg") type = "image/svg+xml";
        else if (ext === "pdf") type = "application/pdf";
        else if (["doc", "docx"].includes(ext)) type = "application/msword";
        else if (["xls", "xlsx"].includes(ext)) type = "application/vnd.ms-excel";
        else if (ext === "txt") type = "text/plain";
        else if (["avif", "bmp", "tiff"].includes(ext)) type = `image/${ext}`;
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
