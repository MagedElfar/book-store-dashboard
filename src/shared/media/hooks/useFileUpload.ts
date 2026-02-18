import { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import * as mediaApi from "@/shared/media/api";
import type { UploadFile } from "@/shared/media/types";
import { errorMapper } from "@/shared/utilities";

import { extractFilePathFromUrl, mapUrlToUploadFile } from "../utilities";

interface UseDropzoneLogicProps {
    name: string;
    multiple?: boolean;
    maxSize?: number; // الحجم الأقصى بالبايت (اختياري)
}

export function useFileUpload({ name, multiple = false, maxSize }: UseDropzoneLogicProps) {

    const { t } = useTranslation("common");
    const { getValues, setValue } = useFormContext();
    const [files, setFiles] = useState<UploadFile[]>([]);

    const uploadSingle = useCallback((fileObj: UploadFile, index: number) => {
        const { file } = fileObj;
        if (!file) return;

        const uploadPromise = mediaApi.uploadFile(file, (progress) => {
            setFiles(prev => {
                const copy = [...prev];
                if (copy[index]) copy[index].progress = progress;
                return copy;
            });
        });

        setFiles(prev => {
            const copy = [...prev];
            copy[index].status = "uploading";
            return copy;
        });

        uploadPromise.then(({ publicUrl, upload }) => {
            setFiles(prev => {
                const copy = [...prev];
                copy[index] = { ...copy[index], status: "success", progress: 100, url: publicUrl, tusUpload: upload };
                const urls = copy.filter(f => f.status === "success" && f.url).map(f => f.url!);
                setValue(name, multiple ? urls : urls[0] ?? null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                return copy;
            });
        }).catch(() => {
            setFiles(prev => {
                const copy = [...prev];
                if (copy[index] && copy[index].status !== "canceled") copy[index].status = "error";
                return copy;
            });
        });
    }, [name, multiple, setValue]);

    const handleDrop = useCallback((droppedFiles: File[]) => {
        if (!droppedFiles || droppedFiles.length === 0) return;

        if (!multiple && files.length > 0) {
            toast.warning(t("dropzone.removeExisting"));
            return;
        }

        const validFiles: UploadFile[] = [];

        droppedFiles.forEach(file => {
            if (maxSize && file.size > maxSize) {
                toast.error(t("dropzone.fileTooLarge", { name: file.name, size: Math.round(maxSize / 1024 / 1024) }));
            } else {
                validFiles.push({
                    file,
                    preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
                    progress: 0,
                    status: "idle",
                });
            }
        });

        const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(updatedFiles);

        validFiles.forEach((fileObj, idx) => uploadSingle(fileObj, multiple ? files.length + idx : 0));
    }, [multiple, files, t, maxSize, uploadSingle]);


    const handleCancelUpload = useCallback((index: number) => {
        setFiles(prev => {
            const copy = [...prev];
            const fileObj = copy[index];
            if (fileObj && fileObj.status === "uploading" && fileObj.tusUpload) {
                fileObj.tusUpload.abort();
                copy[index].status = "canceled";
                copy[index].progress = 0;
            }
            return copy;
        });
    }, []);

    const handleRemoveFile = useCallback(async (index: number) => {
        const fileObj = files[index];

        if (fileObj.url && fileObj.status === "success") {
            const filePath = extractFilePathFromUrl(fileObj.url);
            if (filePath) {
                try { await mediaApi.deleteFile(filePath); }
                catch (error) { errorMapper(error).forEach(err => toast.error(err)) }
            }
        }

        setFiles(prev => {
            const updated = [...prev];
            updated.splice(index, 1);
            const urls = updated.filter(f => f.status === "success" && f.url).map(f => f.url!);
            setValue(name, multiple ? urls : urls[0] ?? null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
            return updated;
        });
    }, [files, multiple, name, setValue]);

    const handleRetry = useCallback((index: number) => {
        const fileObj = files[index];
        if (fileObj) uploadSingle(fileObj, index);
    }, [files, uploadSingle]);

    useEffect(() => {
        return () => {
            files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
        };
    }, [files]);

    useEffect(() => {
        const existingValue = getValues(name);
        if (existingValue) {
            const initialFiles = (Array.isArray(existingValue) ? existingValue : [existingValue])
                .map(url => mapUrlToUploadFile(url));
            setFiles(initialFiles);
        }
    }, [getValues, name]);

    return { files, handleDrop, handleCancelUpload, handleRemoveFile, handleRetry };
}
