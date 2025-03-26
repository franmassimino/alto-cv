import { CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { SortableItem } from "./sortable-item"
import type { CVData } from "@/lib/types"

interface ExperienceSectionProps {
  id: string
  experience: CVData['experience']
  addExperience: () => void
  updateExperience: (id: string, field: string, value: string) => void
  removeExperience: (id: string) => void
}

export function ExperienceSection({ 
  id, 
  experience, 
  addExperience, 
  updateExperience, 
  removeExperience 
}: ExperienceSectionProps) {
  return (
    <SortableItem id={id}>
      <div className="flex items-center justify-between w-full">
        <CardTitle>Experiencia Laboral</CardTitle>
        <Button onClick={addExperience} size="sm" variant="outline" className="button-contrast">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>
      <CardContent className="space-y-6 pt-2 px-0">
        {experience.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No hay experiencia laboral. Haz clic en "Agregar" para añadir tu primera experiencia.
          </div>
        ) : (
          experience.map((exp) => (
            <div
              key={exp.id}
              className="space-y-4 p-4 border rounded-lg relative section-contrast"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${exp.id}`}>Empresa</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Nombre de la empresa"
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${exp.id}`}>Puesto</Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    placeholder="Título del puesto"
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${exp.id}`}>Fecha de inicio</Label>
                  <Input
                    id={`startDate-${exp.id}`}
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    placeholder="Ene 2020"
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${exp.id}`}>Fecha de fin</Label>
                  <Input
                    id={`endDate-${exp.id}`}
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    placeholder="Dic 2022 (o 'Presente')"
                    className="transition-all focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${exp.id}`}>Descripción</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  placeholder="Describe tus responsabilidades y logros..."
                  className="min-h-[100px] transition-all focus:border-primary"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </SortableItem>
  )
}