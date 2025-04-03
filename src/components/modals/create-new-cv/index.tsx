"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { StepOne } from "./step-one"
import { useResumes } from "@/hooks/resume/useResumes"

interface CreateCVModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCVModal({ open, onOpenChange }: CreateCVModalProps) {
  const [selectedOption, setSelectedOption] = useState<"template" | "new" | null>(null)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const { createResume } = useResumes()

  const handleContinue = () => {
    if (selectedOption) {
      setIsCreating(true)
      createResume({
        title: selectedOption === "template" ? "Mi CV con Plantilla" : "Mi CV Personalizado"
      })
    }
  }

  // Reset state when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) setSelectedOption(null)
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isCreating ? "Creando tu CV..." : "Crear Nuevo CV"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isCreating 
              ? "Por favor espera mientras creamos tu CV..."
              : "Elige cómo quieres comenzar a crear tu nuevo CV"
            }
          </DialogDescription>
        </DialogHeader>

        <StepOne 
          selectedOption={selectedOption} 
          setSelectedOption={setSelectedOption} 
          isCreating={isCreating}
        />

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isCreating}>Cancelar</Button>
          </DialogClose>

          <Button onClick={handleContinue} disabled={!selectedOption || isCreating} className="gap-2">
            {isCreating ? (
              <>
                Creando CV...
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

