import { arrayMove } from "@dnd-kit/sortable";
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
    maxSize?: number;
}

export function useFileUpload({ name, multiple = false, maxSize }: UseDropzoneLogicProps) {
    const { t } = useTranslation("common");
    const { setValue, getValues, watch, setError, clearErrors } = useFormContext();
    const [files, setFiles] = useState<UploadFile[]>([]);

    // مراقبة قيمة الحقل في React Hook Form
    const fieldValue = watch(name);

    // 1. منطق الـ Reset: إذا أصبحت قيمة الفورم فارغة، نفرغ المصفوفة المحلية
    useEffect(() => {
        const hasNoValue = !fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0);
        const hasLocalFiles = files.length > 0;

        if (hasNoValue && hasLocalFiles) {
            // التحقق من أن الملفات الموجودة ليست في حالة "جاري الرفع" لتجنب مسحها أثناء العمل
            const isUploading = files.some(f => f.status === "uploading");
            if (!isUploading) {
                setFiles(prev => {
                    prev.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
                    return [];
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldValue]);

    // 2. تعيين القيم الابتدائية (عند فتح الصفحة للتعديل مثلاً)
    useEffect(() => {
        const initialValue = getValues(name);
        if (initialValue && files.length === 0) {
            const mapped = (Array.isArray(initialValue) ? initialValue : [initialValue])
                .map(url => mapUrlToUploadFile(url));
            setFiles(mapped);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

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
            if (copy[index]) copy[index].status = "uploading";
            return copy;
        });

        uploadPromise.then(({ publicUrl, upload }) => {
            setFiles(prev => {
                const copy = [...prev];
                if (!copy[index]) return prev;

                copy[index] = { ...copy[index], status: "success", progress: 100, url: publicUrl, tusUpload: upload };

                const urls = copy.filter(f => f.status === "success" && f.url).map(f => f.url!);
                setValue(name, multiple ? urls : urls[0] ?? null, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true
                });
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
        if (!droppedFiles?.length) return;

        if (!multiple && files.length > 0) {
            toast.warning(t("dropzone.removeExisting"));
            return;
        }

        const validFiles: UploadFile[] = [];
        droppedFiles.forEach(file => {
            if (maxSize && file.size > maxSize) {
                toast.error(t("dropzone.fileTooLarge", {
                    name: file.name,
                    size: Math.round(maxSize / 1024 / 1024)
                }));
            } else {
                validFiles.push({
                    file,
                    preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
                    progress: 0,
                    status: "idle",
                });
            }
        });

        const currentLength = files.length;
        setFiles(prev => multiple ? [...prev, ...validFiles] : validFiles);

        validFiles.forEach((fileObj, idx) => {
            uploadSingle(fileObj, multiple ? currentLength + idx : idx);
        });
    }, [multiple, files, t, maxSize, uploadSingle]);

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
            if (updated[index]?.preview) URL.revokeObjectURL(updated[index].preview!);
            updated.splice(index, 1);

            const urls = updated.filter(f => f.status === "success" && f.url).map(f => f.url!);
            setValue(name, multiple ? urls : urls[0] ?? null, { shouldDirty: true, shouldValidate: true });
            return updated;
        });
    }, [files, multiple, name, setValue]);

    const handleCancelUpload = useCallback((index: number) => {
        setFiles(prev => {
            const copy = [...prev];
            const fileObj = copy[index];
            if (fileObj?.tusUpload) {
                fileObj.tusUpload.abort();
                copy[index].status = "canceled";
            }
            return copy;
        });
    }, []);

    const handleRetry = useCallback((index: number) => {
        if (files[index]) uploadSingle(files[index], index);
    }, [files, uploadSingle]);


    const handleReorder = useCallback((activeId: string | number, overId: string | number) => {
        setFiles((prev) => {
            const oldIndex = prev.findIndex(f => (f.url || f.preview) === activeId);
            const newIndex = prev.findIndex(f => (f.url || f.preview) === overId);

            if (oldIndex === -1 || newIndex === -1) return prev;

            const newOrder = arrayMove(prev, oldIndex, newIndex);

            // تحديث react-hook-form
            const urls = newOrder.filter(f => f.status === "success" && f.url).map(f => f.url!);
            setValue(name, multiple ? urls : urls[0] ?? null, { shouldDirty: true });

            return newOrder;
        });
    }, [multiple, name, setValue]);

    useEffect(() => {
        const isUploading = files.some(f => f.status === "uploading");

        if (isUploading) {
            setError(name, { type: "manual", message: "uploading" });
        } else {
            clearErrors(name);
        }
    }, [files, name, setError, clearErrors]);

    return { files, handleDrop, handleCancelUpload, handleRemoveFile, handleRetry, handleReorder };
}