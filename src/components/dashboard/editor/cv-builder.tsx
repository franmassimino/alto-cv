"use client"

import { useState } from "react"
import { CVPreview } from "./cv-preview"
import { MainTabs } from "./main-tabs"
import { CVHeader } from "./cv-header"
import { defaultCVData, defaultDesignSettings } from "@/lib/defaults"
import type { CVData, DesignSettings } from "@/lib/types"

export function CVBuilder() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData)
  const [designSettings, setDesignSettings] = useState<DesignSettings>(defaultDesignSettings)
  const [activeTab, setActiveTab] = useState("content")
  const [cvName, setCVName] = useState("Mi CV Profesional")
  const [creationDate] = useState(new Date())

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row overflow-hidden">
        <div className="w-1/2 overflow-auto p-4 md:p-6">
          <CVHeader cvName={cvName} setCVName={setCVName} creationDate={creationDate} />
          <MainTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cvData={cvData}
            setCVData={setCVData}
            designSettings={designSettings}
            setDesignSettings={setDesignSettings}
          />
        </div>
        <div className="w-1/2 border-l bg-background overflow-auto">
          <CVPreview cvData={cvData} designSettings={designSettings} />
        </div>
      </div>
    </div>
  )
}

