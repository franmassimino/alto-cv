import { useSortable } from "@dnd-kit/sortable"
import React from "react"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { GripVertical } from "lucide-react"

interface SortableItemProps {
  id: string
  children: React.ReactNode
}

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Extract the first child (title row) and the rest of the children
  const childrenArray = React.Children.toArray(children);
  const titleElement = childrenArray[0];
  const restElements = childrenArray.slice(1);

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="card-enhanced p-6">
        <div className="flex flex-col items-start gap-2">
          {/* Render the title with the drag handle */}
          <div className="flex items-center w-full gap-3">
            <div {...attributes} {...listeners} className="cursor-move">
              <GripVertical className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </div>
            {titleElement}
          </div>
          
          {/* Render the rest of the children */}
          {restElements}
        </div>
      </Card>
    </div>
  )
}