"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { ChevronRight, ChevronLeft, Send, File, Image, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "../file-dropzone"

interface RightSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  isResizable?: boolean
  cvContent?: string
}

type FileType = {
  id: string
  name: string
  type: string
  size: number
  url: string
  file?: File // Añadimos el archivo original para enviarlo a la API
}

export function AiSidebar({ open, setOpen, isResizable = true, cvContent = "" }: RightSidebarProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hola, soy tu asistente de CV AI. ¿En qué puedo ayudarte hoy?" },
  ])
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<FileType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Función para desplazarse al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll automático cuando cambian los mensajes
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() && files.length === 0) return
  
    // Crear mensaje con archivos adjuntos si existen
    let content = input
    if (files.length > 0) {
      content +=
        files.length === 1 ? "\n[Archivo adjunto: " + files[0].name + "]" : "\n[" + files.length + " archivos adjuntos]"
    }
  
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { role: "user", content }])
    setIsLoading(true)
  
    try {
      // Preparar los datos para la API
      const attachments = files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size
      }))
  
      // Configuración para streaming con fetch
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvContent,
          userMessage: input,
          attachments
        }),
      })
  
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`)
      }
  
      // Verificar que la respuesta sea un stream
      if (!response.body) {
        throw new Error('ReadableStream no disponible')
      }
  
      // Crear un mensaje vacío para ir llenándolo con la respuesta
      setMessages(prev => [...prev, { role: "assistant", content: "" }])
      
      // Método alternativo usando TextDecoderStream
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader()
      
      let partialResponse = ""
      
      try {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break
          
          console.log("Chunk recibido:", value)
          partialResponse += value
          
          // Actualizar el último mensaje con la respuesta parcial
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = { 
              role: "assistant", 
              content: partialResponse 
            }
            return updated
          })
        }
      } catch (streamError) {
        console.error("Error en la lectura del stream:", streamError)
        // No lanzamos el error para seguir con la finalización
      } finally {
        // Intentar cerrar el reader de manera limpia
        reader.releaseLock()
      }
      
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo." }
      ])
    } finally {
      setIsLoading(false)
      setInput("")
      setFiles([])
    }
  }
  
  const handleFilesDrop = useCallback((acceptedFiles: File[]) => {
    // Convertir archivos a objetos FileType
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      file // Guardamos el archivo original
    }))

    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const removeFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  // Contenido del chat que se usa en ambas versiones (redimensionable y no redimensionable)
  const chatContent = (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Mensajes */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex max-w-[80%] rounded-lg p-3",
              message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Procesando respuesta...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Dropzone permanente */}
      <div className="px-4 pb-2">
        <FileDropzone onDrop={handleFilesDrop} />
      </div>

      {/* Archivos adjuntos */}
      {files.length > 0 && (
        <div className="max-h-32 overflow-y-auto border-t px-4 py-2">
          <div className="text-xs font-medium mb-2">Archivos adjuntos</div>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-md bg-muted p-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  {getFileIcon(file.type)}
                  <span className="truncate">{file.name}</span>
                </div>
                <button onClick={() => removeFile(file.id)} className="ml-2 rounded-full hover:bg-background p-1">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Entrada de mensaje */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            placeholder="Escribe un mensaje..."
            disabled={isLoading}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )

  // Si es redimensionable, no necesitamos el botón de colapsar
  if (isResizable) {
    return (
      <div className="h-full flex flex-col  bg-muted/50">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="font-medium">Asistente IA</div>
        </div>
        {chatContent}
      </div>
    )
  }

  // Versión original con botón de colapsar para otras páginas
  return (
    <div className={cn("h-screen  bg-primary transition-all duration-300", open ? "w-80" : "w-16")}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className={cn("font-medium", open ? "block" : "hidden")}>Asistente IA</div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full p-1 hover:bg-muted"
          aria-label={open ? "Cerrar chat" : "Abrir chat"}
        >
          {open ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {open && chatContent}
    </div>
  )
}