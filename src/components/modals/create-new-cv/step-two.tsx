"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { FileUp, Linkedin, FileText, CheckCircle2 } from "lucide-react"
import { FileDropzone } from "@/components/dashboard/file-dropzone"

export type FileType = {
  id: string
  name: string
  type: string
  size: number
  url: string
}

interface StepTwoProps {
  contextSource: "linkedin" | "file" | null
  setContextSource: (source: "linkedin" | "file") => void
  files: FileType[]
  setFiles: (files: FileType[]) => void
  linkedinUrl: string
  setLinkedinUrl: (url: string) => void
  isLinkedinValid: boolean
  setIsLinkedinValid: (valid: boolean) => void
}

export function StepTwo({
  contextSource,
  setContextSource,
  files,
  setFiles,
  linkedinUrl,
  setLinkedinUrl,
  isLinkedinValid,
  setIsLinkedinValid,
}: StepTwoProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFilesDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Simulate upload process
      setIsUploading(true)

      setTimeout(() => {
        // Convert files to FileType objects
        const newFiles = acceptedFiles.map((file) => ({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
        }))

        setFiles(newFiles)
        setIsUploading(false)
      }, 1000)
    },
    [setFiles],
  )

  const handleLinkedinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLinkedinUrl(url)

    // Simple validation - just checking if it contains linkedin.com
    const isValid = url.includes("linkedin.com/")
    setIsLinkedinValid(isValid)
  }

  return (
    <div className="grid gap-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all",
            contextSource === "file"
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-primary/50 hover:bg-muted/50",
          )}
          onClick={() => setContextSource("file")}
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Subir CV Existente</h3>
          <p className="text-sm text-muted-foreground text-center">
            Sube un CV que ya tengas para que la IA lo use como referencia
          </p>
        </div>

        <div
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all",
            contextSource === "linkedin"
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-primary/50 hover:bg-muted/50",
          )}
          onClick={() => setContextSource("linkedin")}
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Linkedin className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Conectar LinkedIn</h3>
          <p className="text-sm text-muted-foreground text-center">
            Usa tu perfil de LinkedIn como base para crear tu CV
          </p>
        </div>
      </div>

      {/* File upload area */}
      {contextSource === "file" && (
        <div className="mt-2">
          {files.length === 0 ? (
            <FileDropzone
              onDrop={handleFilesDrop}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          ) : (
            <div className="rounded-lg border p-4 bg-muted/20">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{files[0].name}</p>
                  <p className="text-xs text-muted-foreground">{(files[0].size / 1024).toFixed(1)} KB</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}

          {isUploading && <div className="mt-2 text-sm text-center text-muted-foreground">Subiendo archivo...</div>}
        </div>
      )}

      {/* LinkedIn input */}
      {contextSource === "linkedin" && (
        <div className="mt-2">
          <div className="rounded-lg border p-4">
            <label className="text-sm font-medium mb-2 block">URL de tu perfil de LinkedIn</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={linkedinUrl}
                  onChange={handleLinkedinChange}
                  placeholder="https://www.linkedin.com/in/tu-perfil"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {isLinkedinValid && (
                  <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              La IA extraerá información de tu perfil público para crear tu CV
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

