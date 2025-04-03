"use client"

import { CVPreview } from "../editor/cv-preview"
import type { CVData, DesignSettings } from "@/lib/types"

export function CVMiniPreview({
  cvData,
  designSettings,
}: {
  cvData: CVData
  designSettings: DesignSettings
}) {
  return (
    <div className="scale-[0.35] origin-top-left w-[380px] h-[540px] overflow-hidden pointer-events-none rounded-md border shadow-sm bg-white">
      <CVPreview cvData={cvData} designSettings={designSettings} />
    </div>
  )
}
