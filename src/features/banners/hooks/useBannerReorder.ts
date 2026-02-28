// src/features/banners/hooks/useBannerReorder.ts

import { arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import { errorMapper } from "@/shared/utilities";

import type { Banner } from "../types";

import { useBulkReorderBanners } from "./useBulkReorderBanners";

export function useBannerReorder(initialItems: Banner[] = []) {
    const [items, setItems] = useState<Banner[]>(initialItems);
    const { mutateAsync: syncReorder, isPending } = useBulkReorderBanners();

    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    const handleReorder = useCallback((activeId: string | number, overId: string | number) => {
        if (activeId === overId) return;

        setItems((prev) => {
            const oldIndex = prev.findIndex((item) => item.id === activeId);
            const newIndex = prev.findIndex((item) => item.id === overId);
            const newArray = arrayMove(prev, oldIndex, newIndex);
            return newArray;
        });
    }, []);

    const saveOrder = async (onSuccessCallback?: () => void) => {
        const payload = items.map((item, index) => ({
            id: item.id,
            priority: index + 1
        }));

        try {
            await syncReorder(payload);
            toast.success("Order updated successfully");
            if (onSuccessCallback) onSuccessCallback();
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    };

    // 6. وظيفة إلغاء التغييرات (الرجوع للترتيب الأصلي)
    const resetOrder = useCallback(() => {
        setItems(initialItems);
    }, [initialItems]);

    return {
        items,
        handleReorder,
        saveOrder,
        resetOrder,
        isSaving: isPending,
        hasChanges: JSON.stringify(items) !== JSON.stringify(initialItems)
    };
}