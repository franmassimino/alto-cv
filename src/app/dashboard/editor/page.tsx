"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { EditorSection } from "@/components/dashboard/editor/editor-section"
import { AiSidebar } from "@/components/dashboard/editor/ai-sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const EditorPage = () => {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const templateType = searchParams.get("type")
  const [content, setContent] = useState()

  // Default layout con 70% para el editor y 30% para el sidebar
  const defaultLayout = [70, 30]

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full h-full"
    >
      {/* EditorSection principal */}
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
        <EditorSection content={content} setContent={setContent} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Sidebar derecho (Chat de IA) */}
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={20}>
        <AiSidebar open={true} setOpen={() => { }} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default EditorPage