// src/features/banners/hooks/useBannerReorder.ts

import { arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { errorMapper } from "@/shared/utilities";

import type { Banner } from "../types";

import { useBulkReorderBanners } from "./useBulkReorderBanners";

export function useBannerReorder(initialItems: Banner[] = []) {
    const [items, setItems] = useState<Banner[]>(initialItems);
    const { mutateAsync: syncReorder, isPending } = useBulkReorderBanners();

    useEffect(() => {
        if (initialItems.length !== items.length) {
            setItems(initialItems);
        }
    }, [initialItems, items.length]);

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
            onSuccessCallback?.();
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err))
        }
    };

    const resetOrder = useCallback(() => {
        setItems(initialItems);
    }, [initialItems]);


    const hasChanges = useMemo(() => items.length !== initialItems.length ||
        items.some((item, index) => item.id !== initialItems[index]?.id), [initialItems, items])

    return {
        items,
        handleReorder,
        saveOrder,
        resetOrder,
        isSaving: isPending,
        hasChanges
    };
}