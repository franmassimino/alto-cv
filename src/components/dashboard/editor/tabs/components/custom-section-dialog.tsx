import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CustomSectionDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  editingSectionId: string | null
  newSectionTitle: string
  setNewSectionTitle: (title: string) => void
  newSectionType: "text" | "list" | "bullets"
  setNewSectionType: (type: "text" | "list" | "bullets") => void
  newSectionContent: string
  setNewSectionContent: (content: string) => void
  onSave: () => void
}

export function CustomSectionDialog({
  open,
  setOpen,
  editingSectionId,
  newSectionTitle,
  setNewSectionTitle,
  newSectionType,
  setNewSectionType,
  newSectionContent,
  setNewSectionContent,
  onSave
}: CustomSectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingSectionId ? "Editar sección" : "Añadir sección personalizada"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="section-title">Título de la sección</Label>
            <Input
              id="section-title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Ej: Proyectos, Idiomas, Certificaciones..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-type">Tipo de contenido</Label>
            <Select value={newSectionType} onValueChange={(value) => setNewSectionType(value as any)}>
              <SelectTrigger id="section-type">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="list">Lista numerada</SelectItem>
                <SelectItem value="bullets">Lista con viñetas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-content">
              {newSectionType === "text" ? "Contenido" : "Elementos (uno por línea)"}
            </Label>
            <Textarea
              id="section-content"
              value={newSectionContent}
              onChange={(e) => setNewSectionContent(e.target.value)}
              placeholder={
                newSectionType === "text"
                  ? "Escribe el contenido de la sección..."
                  : "Elemento 1\nElemento 2\nElemento 3"
              }
              className="min-h-[150px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>
            {editingSectionId ? "Guardar cambios" : "Añadir sección"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}