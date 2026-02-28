import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import React from "react";

interface Props {
    children: React.ReactNode;
    id: string | number;
    disabled?: boolean;
}

export function FullSortableFileItem({ children, id, disabled }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id, disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'none' : transition,
        zIndex: isDragging ? 1000 : 1,
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...(!disabled ? { ...attributes, ...listeners } : {})}
        >
            {children}
        </Box>
    );
}