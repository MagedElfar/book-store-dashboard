import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type Modifier,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    type SortingStrategy,
} from "@dnd-kit/sortable";
import type { ReactNode } from "react";

interface SortableListProps {
    itemIds: (string | number)[];
    onReorder: (activeId: string | number, overId: string | number) => void;
    children: ReactNode;
    strategy?: SortingStrategy;
    modifiers?: Modifier[];
    disabled?: boolean
}
export function SortableList({
    itemIds,
    onReorder,
    children,
    strategy = verticalListSortingStrategy,
    modifiers,
    disabled = false,
}: SortableListProps) {
    // const sensors = useSensors(
    //     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    //     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    // );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!disabled && over && active.id !== over.id) {
            onReorder(active.id as string, over.id as string);
        }
    };
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={modifiers}>
            <SortableContext items={itemIds} strategy={strategy} disabled={disabled}>
                {children}
            </SortableContext>
        </DndContext>
    );
}