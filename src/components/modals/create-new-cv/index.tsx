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
import { ArrowRight, ArrowLeft } from "lucide-react"
import { StepOne } from "./step-one"
import { StepTwo, type FileType } from "./step-two"
import { ProgressIndicator } from "./progress-indicator"

interface CreateCVModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCVModal({ open, onOpenChange }: CreateCVModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState<"template" | "new" | null>(null)
  const [contextSource, setContextSource] = useState<"linkedin" | "file" | null>(null)
  const [files, setFiles] = useState<FileType[]>([])
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [isLinkedinValid, setIsLinkedinValid] = useState(false)

  const handleContinue = () => {
    if (step === 1) {
        setStep(2)
    } else if (step === 2) {
      // Prepare context data based on source
      let contextData = {}

      if (contextSource === "file" && files.length > 0) {
        contextData = {
          contextType: "file",
          fileName: files[0].name,
          fileId: files[0].id,
        }
      } else if (contextSource === "linkedin" && isLinkedinValid) {
        contextData = {
          contextType: "linkedin",
          linkedinUrl: encodeURIComponent(linkedinUrl),
        }
      }

      // Redirect to editor with context data
      const queryParams = new URLSearchParams()
      Object.entries(contextData).forEach(([key, value]) => {
        queryParams.append(key, value as string)
      })

      router.push(`/dashboard/editor?${queryParams.toString()}`)
      onOpenChange(false)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Reset state when modal closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setStep(1)
      setSelectedOption(null)
      setContextSource(null)
      setFiles([])
      setLinkedinUrl("")
      setIsLinkedinValid(false)
    }
    onOpenChange(open)
  }

  // Check if current step is valid
  const isStepValid = () => {
    if (step === 1) {
      return selectedOption !== null
    }
    if (step === 2) {
      if (contextSource === "file") {
        return files.length > 0
      }
      if (contextSource === "linkedin") {
        return isLinkedinValid
      }
      return false
    }
    return false
  }

  // Get step title and description
  const getStepInfo = () => {
    if (step === 1) {
      return {
        title: "Crear Nuevo CV",
        description: "Elige cómo quieres comenzar a crear tu nuevo CV",
      }
    } else {
      return {
        title: "Proporciona Contexto",
        description: "Sube un CV existente o conecta tu perfil de LinkedIn para darle contexto a la IA",
      }
    }
  }

  const { title, description } = getStepInfo()

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <ProgressIndicator currentStep={step} totalSteps={2} labels={["Tipo", "Contexto"]} />

        {/* Step content */}
        {step === 1 ? (
          <StepOne selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        ) : (
          <StepTwo
            contextSource={contextSource}
            setContextSource={setContextSource}
            files={files}
            setFiles={setFiles}
            linkedinUrl={linkedinUrl}
            setLinkedinUrl={setLinkedinUrl}
            isLinkedinValid={isLinkedinValid}
            setIsLinkedinValid={setIsLinkedinValid}
          />
        )}

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Atrás
            </Button>
          ) : (
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
          )}

          <Button onClick={handleContinue} disabled={!isStepValid()} className="gap-2">
            {step === 2 ? "Finalizar" : "Continuar"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

