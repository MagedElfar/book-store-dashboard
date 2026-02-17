import * as tus from "tus-js-client"

export interface UploadFile {
    file: File;
    preview: string | null;
    progress: number;
    status: FileStatus;
    url?: string;
    tusUpload?: TusUpload;
}

export interface UploadProgress {
    fileName: string;
    progress: number;
    status: FileStatus
}

export type FileStatus = "idle" | "uploading" | "success" | "error" | "canceled";

export type TusUpload = tus.Upload; 