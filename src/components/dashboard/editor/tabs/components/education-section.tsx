import { CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { SortableItem } from "./sortable-item"
import type { CVData } from "@/lib/types"

interface EducationSectionProps {
  id: string
  education: CVData['education']
  addEducation: () => void
  updateEducation: (id: string, field: string, value: string) => void
  removeEducation: (id: string) => void
}

export function EducationSection({ 
  id, 
  education, 
  addEducation, 
  updateEducation, 
  removeEducation 
}: EducationSectionProps) {
  return (
    <SortableItem id={id}>
      {/* Title row - this will be placed next to the drag handle */}
      <div className="flex items-center justify-between w-full">
        <CardTitle>Educación</CardTitle>
        <Button onClick={addEducation} size="sm" variant="outline" className="button-contrast">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>
      
      {/* Content - this will be placed below the title row */}
      <CardContent className="space-y-6 pt-2 px-0">
        {education.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No hay educación. Haz clic en "Agregar" para añadir tu primera educación.
          </div>
        ) : (
          education.map((edu) => (
            <div
              key={edu.id}
              className="space-y-4 p-4 border rounded-lg relative section-contrast"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${edu.id}`}>Institución</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="Universidad o centro educativo"
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${edu.id}`}>Título</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Grado, máster, certificación..."
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${edu.id}`}>Fecha de inicio</Label>
                  <Input
                    id={`startDate-${edu.id}`}
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    placeholder="Sep 2016"
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${edu.id}`}>Fecha de fin</Label>
                  <Input
                    id={`endDate-${edu.id}`}
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    placeholder="Jun 2020 (o 'Presente')"
                    className="transition-all focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${edu.id}`}>Descripción</Label>
                <Textarea
                  id={`description-${edu.id}`}
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                  placeholder="Especialización, logros académicos, proyectos relevantes..."
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