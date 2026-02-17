import * as tus from "tus-js-client";

import { env } from "@/core";
import { supabaseClient } from "@/shared/lib";
import type { MediaApiProvider } from "@/shared/media/types";

const bucket = "store"

export const supabaseMediaProvider: MediaApiProvider = {
    uploadFile: async function (
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<{ publicUrl: string; upload: tus.Upload }> { // ⚡ ترجع publicUrl + upload instance
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session?.access_token) {
            throw new Error("No valid Supabase session found");
        }

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${fileName}`;

        return new Promise((resolve, reject) => {
            const upload = new tus.Upload(file, {
                endpoint: `https://${env.supabaseProjectId}/storage/v1/upload/resumable`,
                retryDelays: [0, 3000, 5000, 10000, 20000],
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                    "x-upsert": "true",
                },
                uploadDataDuringCreation: true,
                removeFingerprintOnSuccess: true,
                metadata: {
                    bucketName: bucket,
                    objectName: filePath,
                    contentType: file.type,
                    cacheControl: "3600",
                },
                chunkSize: 6 * 1024 * 1024, // 6MB
                onError: (error) => reject(error),
                onProgress: (bytesUploaded, bytesTotal) => {
                    const percentage = Math.floor((bytesUploaded / bytesTotal) * 100);
                    if (onProgress) onProgress(percentage);
                },
                onSuccess: () => {
                    const publicUrl = supabaseClient.storage.from(bucket).getPublicUrl(filePath).data?.publicUrl;
                    if (!publicUrl) return reject("Failed to generate public URL");
                    resolve({ publicUrl, upload }); // ⚡ رجع الـ upload instance
                },

            });

            // استئناف أي رفع سابق
            upload.findPreviousUploads().then((previousUploads) => {
                if (previousUploads.length) {
                    upload.resumeFromPreviousUpload(previousUploads[0]);
                }
                upload.start();
            });
        });
    },

    deleteFile: async function (id: string): Promise<void> {
        const { error } = await supabaseClient.storage.from(bucket).remove([id]);
        if (error) throw new Error(error.message || "Delete failed");
    },
};
