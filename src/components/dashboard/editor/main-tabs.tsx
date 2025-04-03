"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentTab } from "./tabs/content-tab"
import { DesignTab } from "./tabs/design-tab"
import { AITab } from "./tabs/ai-tab"
import type { CVData, DesignSettings } from "@/lib/types"

interface MainTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  cvData: CVData
  setCVData: (data: CVData) => void
  designSettings: DesignSettings
  setDesignSettings: (settings: DesignSettings) => void
}

export function MainTabs({
  activeTab,
  setActiveTab,
  cvData,
  setCVData,
  designSettings,
  setDesignSettings,
}: MainTabsProps) {

  console.log({ cvData })
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="content">Contenido</TabsTrigger>
        <TabsTrigger value="ai">IA</TabsTrigger>
        <TabsTrigger value="design">Diseño</TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <ContentTab cvData={cvData} setCVData={setCVData} />
      </TabsContent>
      <TabsContent value="design">
        <DesignTab designSettings={designSettings} setDesignSettings={setDesignSettings} />
      </TabsContent>
      <TabsContent value="ai">
        <AITab cvData={cvData} setCVData={setCVData} />
      </TabsContent>
    </Tabs>
  )
}

