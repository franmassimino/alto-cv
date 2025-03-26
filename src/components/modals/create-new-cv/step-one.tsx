"use client"

import { cn } from "@/lib/utils"
import { LayoutTemplateIcon, PenTool } from "lucide-react"

interface StepOneProps {
  selectedOption: "template" | "new" | null
  setSelectedOption: (option: "template" | "new") => void
  isCreating: boolean
}

export function StepOne({ selectedOption, setSelectedOption, isCreating }: StepOneProps) {
  return (
    <div className="grid gap-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all",
            selectedOption === "template"
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-primary/50 hover:bg-muted/50",
          )}
          onClick={() => setSelectedOption("template")}
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <LayoutTemplateIcon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Usar Plantilla</h3>
          <p className="text-sm text-muted-foreground text-center">
            Comienza con una plantilla prediseñada y personalízala
          </p>
        </div>

        <div
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all",
            selectedOption === "new"
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-primary/50 hover:bg-muted/50",
          )}
          onClick={() => setSelectedOption("new")}
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <PenTool className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Crear Desde Cero</h3>
          <p className="text-sm text-muted-foreground text-center">
            Comienza con un documento en blanco y crea tu CV a tu manera
          </p>
        </div>
      </div>
    </div>
  )
}

