"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { useResumes } from "@/hooks/resume/useResumes"
import { CVHeader } from "./cv-header"
import { MainTabs } from "./main-tabs"
import { CVPreview } from "./cv-preview"
import { emptyCVData, defaultDesignSettings } from "@/lib/defaults"
import type { CVData, DesignSettings } from "@/lib/types"

export function CVBuilder() {
  const searchParams = useSearchParams()
  const cvId = searchParams.get("cv") ?? undefined

  const {
    resumeById: resume,
    getResumeById,
    updateResume,
  } = useResumes(cvId)

  const [cvData, setCVData] = useState<CVData>(emptyCVData)
  const [designSettings, setDesignSettings] = useState<DesignSettings>(defaultDesignSettings)
  const [activeTab, setActiveTab] = useState("content")
  const [cvName, setCVName] = useState("")
  const [creationDate, setCreationDate] = useState<Date | null>(null)

  const [isReady, setIsReady] = useState(false)

  const debouncedCVData = useDebounce(cvData, 1000)
  const debouncedDesign = useDebounce(designSettings, 1000)
  const debouncedName = useDebounce(cvName, 1000)

  const prevDataRef = useRef<string>("")

  // ⚡ Obtener el CV del backend
  useEffect(() => {
    if (cvId) {
      setIsReady(false)
      getResumeById()
    }
  }, [cvId, getResumeById])

  // ✅ Cargar el contenido inicial
  useEffect(() => {
    if (resume && resume.content && Object.keys(resume.content).length > 0) {
      setCVData(resume.content as CVData)
      setCVName(resume.title)
      setCreationDate(new Date(resume.createdAt))
      setIsReady(true)

      // Guardamos el snapshot inicial para comparación
      prevDataRef.current = JSON.stringify({
        content: resume.content,
        design: designSettings,
        title: resume.title,
      })
    }
  }, [resume])

  // 💾 Autosave seguro
  useEffect(() => {
    if (!cvId || !isReady) return

    const currentData = JSON.stringify({
      content: debouncedCVData,
      design: debouncedDesign,
      title: debouncedName,
    })

    const hasChanged = prevDataRef.current !== currentData

    if (hasChanged) {
      updateResume({
        id: cvId,
        content: { ...debouncedCVData, design: debouncedDesign },
        title: debouncedName,
      })

      prevDataRef.current = currentData
    }
  }, [cvId, isReady, debouncedCVData, debouncedDesign, debouncedName, updateResume])

  if (!resume || !cvId || !isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground text-lg">Cargando CV...</p>
      </div>
    )
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="flex w-full flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 overflow-auto p-4 md:p-6">
          <CVHeader
            cvName={cvName}
            setCVName={setCVName}
            creationDate={creationDate ?? new Date()}
          />
          <MainTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cvData={cvData}
            setCVData={setCVData}
            designSettings={designSettings}
            setDesignSettings={setDesignSettings}
          />
        </div>
        <div className="w-full md:w-1/2 border-l bg-background overflow-auto">
          <CVPreview cvData={cvData} designSettings={designSettings} />
        </div>
      </div>
    </div>
  )
}
