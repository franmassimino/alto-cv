import { CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { SortableItem } from "./sortable-item"

interface SkillsSectionProps {
  id: string
  skills: string[]
  addSkill: () => void
  updateSkill: (index: number, value: string) => void
  removeSkill: (index: number) => void
}

export function SkillsSection({ 
  id, 
  skills, 
  addSkill, 
  updateSkill, 
  removeSkill 
}: SkillsSectionProps) {
  return (
    <SortableItem id={id}>
      <div className="flex items-center justify-between w-full">
        <CardTitle>Habilidades</CardTitle>
        <Button onClick={addSkill} size="sm" variant="outline" className="button-contrast">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>
      <CardContent className="pt-2 px-0">
        <div className="space-y-4">
          {skills.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No hay habilidades. Haz clic en "Agregar" para añadir tu primera habilidad.
            </div>
          ) : (
            skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="Ej: JavaScript, Gestión de proyectos, Diseño UX/UI..."
                  className="transition-all focus:border-primary"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </SortableItem>
  )
}