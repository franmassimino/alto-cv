"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, ImageIcon, FileArchive } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void
  maxSize?: number
}

export function FileDropzone({ onDrop, maxSize = 10 * 1024 * 1024 }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  })

  const getIconForFileType = useCallback((type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-5 w-5" />
    if (type === "application/pdf") return <FileText className="h-5 w-5" />
    return <FileArchive className="h-5 w-5" />
  }, [])

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 transition-all duration-300 ease-in-out",
        isDragging || isDragActive
          ? "border-primary/50 bg-primary/5 scale-[1.02]"
          : "border-muted-foreground/25 hover:border-primary/25 hover:bg-primary/10",
      )}
    >
      <input {...getInputProps()} />

      <div className="flex items-center justify-center space-x-2 text-center">
        <div
          className={cn(
            "rounded-full p-1 transition-all duration-300",
            isDragging || isDragActive ? "bg-primary/10 text-primary animate-pulse" : "text-muted-foreground",
          )}
        >
          <Upload
            className={cn("h-4 w-4 transition-transform duration-300", isDragging || isDragActive ? "scale-110" : "")}
          />
        </div>
        <p className="text-xs">
          {isDragging || isDragActive ? "Suelta aquí" : "Arrastra archivos o haz clic para seleccionar"}
        </p>
      </div>

      {/* Animación de iconos flotantes cuando se arrastra */}
      {(isDragging || isDragActive) && (
        <>
          <div className="absolute -left-2 top-1/4 animate-float-slow opacity-30">
            {getIconForFileType("image/png")}
          </div>
          <div className="absolute -right-1 top-1/3 animate-float-medium opacity-30">
            {getIconForFileType("application/pdf")}
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float-fast opacity-30">
            {getIconForFileType("application/zip")}
          </div>
        </>
      )}
    </div>
  )
}

