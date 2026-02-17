import { mediaProvider } from "../constants";

export const uploadFile = (
    file: File, onProgress?: (progress: number) => void) => mediaProvider.uploadFile(file, onProgress);

export const deleteFile = (id: string) =>
    mediaProvider.deleteFile(id);
