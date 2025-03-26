"use client"

import React, { useState } from "react"

import { CVBuilder } from "@/components/dashboard/editor/cv-builder"

const EditorPage = () => {
  // const searchParams = useSearchParams()
  // const templateId = searchParams.get("template")
  // const templateType = searchParams.get("type")
  const [content, setContent] = useState()

  return <CVBuilder />
}

export default EditorPage