import { CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SortableItem } from "./sortable-item"

interface SummarySectionProps {
  id: string
  summary: string
  updateSummary: (value: string) => void
}

export function SummarySection({ id, summary, updateSummary }: SummarySectionProps) {
  return (
    <SortableItem id={id}>
      <CardTitle>Resumen Profesional</CardTitle>
      <CardContent className="pt-2 px-0">
        <Textarea
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Breve descripción de tu perfil profesional, experiencia y objetivos..."
          className="min-h-[120px] transition-all focus:border-primary"
        />
      </CardContent>
    </SortableItem>
  )
}