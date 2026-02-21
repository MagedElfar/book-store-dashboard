import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box } from "@mui/material";

export function SortableFileItem({ children, id, disabled }: { children: React.ReactNode; id: string | number, disabled?: boolean }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : 1,
        opacity: isDragging ? 0.6 : 1,
        touchAction: 'none',
    };

    return (
        <Box ref={setNodeRef} style={style} display="flex" alignItems="center" gap={1}>
            {!disabled && <Box {...attributes} {...listeners} sx={{ cursor: 'grab', display: 'flex' }}>
                <DragIndicatorIcon color="action" />
            </Box>}
            <Box sx={{ flex: 1 }}>
                {children}
            </Box>
        </Box>
    );
}