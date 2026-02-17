import type { TusUpload } from "./upload";

export interface MediaApiProvider {
    uploadFile: (
        file: File,
        onProgress?: (progress: number) => void
    ) => Promise<{ publicUrl: string; upload: TusUpload }>;

    deleteFile: (
        id: string,
    ) => Promise<void>;
}
