import { type ReactElement, type ReactNode } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DragEndEvent {
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
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        if (!sortable || !onItemsReorder) return;

        const { active, over } = event;

        if (active.id !== over?.id && items) {
            const oldIndex = items.findIndex((item) => getItemId(item) === active.id);
            const newIndex = items.findIndex((item) => getItemId(item) === over?.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            onItemsReorder(newItems);
        }
    };

    if (!sortable) {
        return <div className={className}>{children}</div>;
    }

    const itemIds = items.map(getItemId);

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                <div className={className}>{children}</div>
            </SortableContext>
        </DndContext>
    );
};
