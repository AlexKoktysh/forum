import { type ReactNode, useMemo, useCallback, type ReactElement } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export interface DragEndEvent {
    active: {
        id: string | number;
    };
    over: {
        id: string | number;
    } | null;
}

interface DragAndDropWrapperProps<T> {
    items: T[];
    getItemId: (item: T) => string | number;
    onItemsReorder?: (newItems: T[]) => void;
    children: ReactNode;
    className?: string;
    sortable?: boolean;
}

export const DragAndDropWrapper = <T,>({
    items,
    getItemId,
    onItemsReorder,
    children,
    className,
    sortable = true,
}: DragAndDropWrapperProps<T>): ReactElement => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 0.1,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 50,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const draggedElement = document.querySelector(`[data-sortable-id="${event.active.id}"]`) as HTMLElement;
            if (draggedElement) {
                draggedElement.style.transform = "";
                draggedElement.style.transition = "";
                draggedElement.style.zIndex = "";
            }

            if (!sortable || !onItemsReorder) return;

            const { active, over } = event;

            if (active.id !== over?.id && items && over) {
                const oldIndex = items.findIndex((item) => getItemId(item) === active.id);
                const newIndex = items.findIndex((item) => getItemId(item) === over.id);

                if (oldIndex !== -1 && newIndex !== -1) {
                    const newItems = arrayMove(items, oldIndex, newIndex);
                    onItemsReorder(newItems);
                }
            }
        },
        [sortable, onItemsReorder, items, getItemId],
    );

    const itemIds = useMemo(() => items.map(getItemId), [items, getItemId]);

    if (!sortable) {
        return <div className={className}>{children}</div>;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(event) => {
                const draggedElement = document.querySelector(`[data-sortable-id="${event.active.id}"]`) as HTMLElement;
                if (draggedElement) {
                    draggedElement.style.transform = "scale(1.02) rotate(1deg)";
                    draggedElement.style.transition = "none";
                    draggedElement.style.zIndex = "1001";
                }
            }}
            autoScroll={{
                threshold: {
                    x: 0.1,
                    y: 0.1,
                },
                acceleration: 0.05,
            }}
        >
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                <div className={className}>{children}</div>
            </SortableContext>
        </DndContext>
    );
};
