import { useCallback, useState } from "react";

import type { DialogState } from "../types";

export function useDialog<T>(initialState: DialogState<T> = { type: null }) {
    const [dialog, setDialog] = useState<DialogState<T>>(initialState);

    const openCreate = useCallback(() => {
        setDialog({ type: "create" });
    }, []);

    const openEdit = useCallback((data: T) => {
        setDialog({ type: "edit", data });
    }, []);

    const openDelete = useCallback((data: T) => {
        setDialog({ type: "delete", data });
    }, []);

    const closeDialog = useCallback(() => {
        setDialog({ type: null });
    }, []);

    return {
        dialog,
        isOpen: dialog.type !== null,
        isCreate: dialog.type === "create",
        isEdit: dialog.type === "edit",
        isDelete: dialog.type === "delete",

        // data
        data: dialog.type === "edit" || dialog.type === "delete"
            ? dialog.data
            : null,

        // actions
        openCreate,
        openEdit,
        openDelete,
        closeDialog,

        // raw setter (optional)
        setDialog,
    };
}