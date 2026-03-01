import { arrayMove } from "@dnd-kit/sortable";
import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { errorMapper } from "@/shared/utilities";

import type { Banner } from "../types";

import { useBulkReorderBanners } from "./useBulkReorderBanners";

export function useBannerReorder(initialItems: Banner[] = []) {
    const [items, setItems] = useState<Banner[]>(initialItems);
    const { mutateAsync: syncReorder, isPending } = useBulkReorderBanners();

    const initialIds = useMemo(() => initialItems.map(i => i.id).join(','), [initialItems]);

    useEffect(() => {
        setItems(initialItems);
    }, [initialIds, initialItems])

    const handleReorder = useCallback((activeId: any, overId: any) => {
        if (activeId === overId) return;

        setItems((prev) => {
            const oldIndex = prev.findIndex((item) => String(item.id) === String(activeId));
            const newIndex = prev.findIndex((item) => String(item.id) === String(overId));

            if (oldIndex === -1 || newIndex === -1) return prev;

            return arrayMove(prev, oldIndex, newIndex);
        });
    }, []);

    const saveOrder = async (onSuccessCallback?: () => void) => {
        // تحويل المصفوفة لـ Payload مناسب للـ API
        // Senior Note: بنستخدم الـ index الجديد عشان نبعت الـ priority
        const payload = items.map((item, index) => ({
            id: item.id,
            priority: index + 1
        }));

        try {
            await syncReorder(payload);
            toast.success("Order updated successfully");
            onSuccessCallback?.();
        } catch (error) {
            errorMapper(error).forEach(err => toast.error(err));
        }
    };

    const resetOrder = useCallback(() => {
        setItems(initialItems);
    }, [initialItems]);

    // مقارنة ذكية عشان نعرف فيه تغيير ولا لا
    const hasChanges = useMemo(() => {
        const currentIds = items.map(i => i.id).join(',');
        return currentIds !== initialIds;
    }, [items, initialIds]);

    return {
        items,
        handleReorder,
        saveOrder,
        resetOrder,
        isSaving: isPending,
        hasChanges
    };
}