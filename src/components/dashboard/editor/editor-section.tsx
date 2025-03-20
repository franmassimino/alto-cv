import { Button } from "@/components/ui/button"
import MarkdownEditor from "../markdown"
import CvPreviewDialog from "./cv-preview-dialog"
import { useState } from "react"

export function EditorSection({ content, setContent }: any) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen)

  return (
    <div className="w-full h-screen flex flex-col p-8">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Editor de CV</h1>
          <p className="text-muted-foreground">
            Personaliza tu CV utilizando el editor Markdown o chatea con la IA para obtener ayuda.
          </p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={togglePreview}>Vista Previa</Button>
        </div>
      </div>

      {/* Área de edición */}
      <MarkdownEditor setContent={setContent} content={content} />

      {/* Modal de Vista Previa */}
      <CvPreviewDialog isPreviewOpen={isPreviewOpen} togglePreview={togglePreview} content={content} />
    </div>
  )
}
