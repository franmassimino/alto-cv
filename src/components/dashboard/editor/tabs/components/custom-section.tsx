import { CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { SortableItem } from "./sortable-item"
import type { CustomSection as CustomSectionType } from "@/lib/types"

interface CustomSectionProps {
  section: CustomSectionType
  editCustomSection: (sectionId: string) => void
  removeCustomSection: (sectionId: string) => void
}

export function CustomSection({ 
  section, 
  editCustomSection, 
  removeCustomSection 
}: CustomSectionProps) {
  return (
    <SortableItem id={section.id}>
      <div className="flex items-center justify-between w-full">
        <CardTitle>{section.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => editCustomSection(section.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => removeCustomSection(section.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent className="pt-2 px-0">
        {section.type === "text" && <p className="text-sm">{section.content as string}</p>}
        {section.type === "list" && (
          <div className="space-y-2">
            {(section.content as string[]).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm">{index + 1}.</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        )}
        {section.type === "bullets" && (
          <ul className="list-disc list-inside space-y-1">
            {(section.content as string[]).map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </SortableItem>
  )
}