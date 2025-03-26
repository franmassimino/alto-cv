"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  Bot,
  CheckCircle,
  ChevronRight,
  FileText,
  LinkIcon,
  Paperclip,
  Send,
  User,
  X,
  FileUp,
  Image,
  FileQuestion,
} from "lucide-react"
import type { CVData } from "@/lib/types"

interface AITabProps {
  cvData: CVData
  setCVData: (data: CVData) => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  attachments?: Attachment[]
}

interface Attachment {
  id: string
  type: "file" | "image" | "link"
  name: string
  url?: string
  size?: string
}

interface ATSResult {
  score: number
  details: {
    keywords: number
    format: number
    length: number
    essentialData: number
  }
  recommendations: string[]
  status: "not_analyzed" | "analyzing" | "completed"
}

export function AITab({ cvData, setCVData }: AITabProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hola, soy tu asistente de CV. Puedo ayudarte a mejorar tu currículum. Prueba a pedirme que mejore tu resumen profesional o que te ayude con la descripción de tu experiencia laboral.",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [atsResult, setAtsResult] = useState<ATSResult>({
    score: 0,
    details: {
      keywords: 0,
      format: 0,
      length: 0,
      essentialData: 0,
    },
    recommendations: [],
    status: "not_analyzed",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!input.trim() && attachments.length === 0) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setAttachments([])
    setIsLoading(true)

    // Scroll to bottom
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, 100)

    // Simulate AI response
    setTimeout(() => {
      const mockResponses: { [key: string]: string } = {
        resumen: "He mejorado tu resumen profesional para destacar tus logros y habilidades clave.",
        experiencia: "He refinado la descripción de tu experiencia laboral para enfatizar resultados cuantificables.",
        traducir: "He traducido tu CV al inglés manteniendo el tono profesional.",
        habilidades: "He reorganizado tus habilidades por relevancia y añadido algunas que complementan tu perfil.",
      }

      // Determine which mock response to use based on user input
      let responseContent =
        "He analizado tu CV y realizado algunas mejoras. ¿Hay algo específico en lo que quieras que me enfoque?"

      for (const [keyword, response] of Object.entries(mockResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          responseContent = response

          // Mock updating the CV data based on the request
          if (keyword === "resumen") {
            const improvedSummary =
              "Profesional con más de 5 años de experiencia en desarrollo de software y gestión de proyectos. Especializado en soluciones tecnológicas innovadoras que optimizan procesos y mejoran la experiencia del usuario. Historial probado de entrega de proyectos exitosos dentro del presupuesto y los plazos establecidos."
            setCVData({
              ...cvData,
              summary: improvedSummary,
            })
          }
          break
        }
      }

      // Si hay archivos adjuntos, personalizar la respuesta
      if (newUserMessage.attachments && newUserMessage.attachments.length > 0) {
        responseContent = `He analizado el contenido que me has compartido. Basándome en ${newUserMessage.attachments[0].name}, puedo sugerirte mejoras específicas para tu CV. ¿Quieres que me enfoque en alguna sección en particular?`
      }

      const newAIMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
      }

      setMessages((prev) => [...prev, newAIMessage])
      setIsLoading(false)

      // Scroll to bottom again after response
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
      }, 100)
    }, 1500)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const newAttachments: Attachment[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileType = file.type.startsWith("image/") ? "image" : "file"
      const fileSize = formatFileSize(file.size)

      newAttachments.push({
        id: Date.now().toString() + i,
        type: fileType,
        name: file.name,
        size: fileSize,
      })
    }

    setAttachments([...attachments, ...newAttachments])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const handleAddLink = () => {
    const url = prompt("Introduce la URL:")
    if (!url) return

    try {
      new URL(url) // Validar que es una URL válida

      const linkName = url.replace(/^https?:\/\//, "").split("/")[0]

      setAttachments([
        ...attachments,
        {
          id: Date.now().toString(),
          type: "link",
          name: linkName,
          url: url,
        },
      ])
    } catch (e) {
      alert("Por favor, introduce una URL válida")
    }
  }

  const startATSAnalysis = () => {
    setIsAnalyzing(true)
    setAtsResult({
      ...atsResult,
      status: "analyzing",
    })

    // Simulación del análisis ATS
    setTimeout(() => {
      setAtsResult({
        score: 76,
        details: {
          keywords: 72,
          format: 85,
          length: 90,
          essentialData: 68,
        },
        recommendations: [
          "Añade más palabras clave relacionadas con tu industria",
          "Incluye logros cuantificables en tus descripciones",
          "Completa todos los campos de contacto en información personal",
          "Utiliza verbos de acción al inicio de cada punto en tu experiencia laboral",
        ],
        status: "completed",
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-4 w-4" />
      case "link":
        return <LinkIcon className="h-4 w-4" />
      default:
        return <FileQuestion className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="chat">Asistente IA</TabsTrigger>
          <TabsTrigger value="ats">Análisis ATS</TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="mt-0">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Asistente IA</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col h-[550px]">
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="mr-2 mt-0.5">
                          {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm">{message.content}</p>

                          {/* Mostrar archivos adjuntos si existen */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="flex flex-col gap-2 mt-2">
                              {message.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className={`flex items-center gap-2 p-2 rounded-md text-xs ${
                                    message.role === "user"
                                      ? "bg-primary-foreground/20 text-primary-foreground"
                                      : "bg-background text-foreground"
                                  }`}
                                >
                                  {getFileIcon(attachment.type)}
                                  <span className="truncate">{attachment.name}</span>
                                  {attachment.size && <span className="text-xs opacity-70">{attachment.size}</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] rounded-lg p-3 bg-muted">
                        <div className="mr-2 mt-0.5">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm">Escribiendo...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Archivos adjuntos */}
                {attachments.length > 0 && (
                  <div className="border-t p-3 bg-muted/30">
                    <div className="flex flex-wrap gap-2">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center gap-2 bg-background border rounded-md px-3 py-1.5 text-sm"
                        >
                          {getFileIcon(attachment.type)}
                          <span className="max-w-[150px] truncate">{attachment.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full hover:bg-muted"
                            onClick={() => handleRemoveAttachment(attachment.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input area */}
                <div className="border-t p-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                    className="space-y-3"
                  >
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        disabled={(!input.trim() && attachments.length === 0) || isLoading}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="h-4 w-4" />
                        Adjuntar archivo
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="gap-1" onClick={handleAddLink}>
                        <LinkIcon className="h-4 w-4" />
                        Añadir enlace
                      </Button>
                      <p className="text-xs text-muted-foreground ml-auto">
                        Soporta PDFs, imágenes, documentos y enlaces
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ATS Analysis Tab */}
        <TabsContent value="ats" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Compatibilidad ATS</CardTitle>
            </CardHeader>
            <CardContent>
              {atsResult.status === "not_analyzed" ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <div className="text-center space-y-2">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="text-xl font-medium mt-4">Analiza tu CV para sistemas ATS</h3>
                    <p className="text-muted-foreground max-w-md">
                      Los sistemas de seguimiento de candidatos (ATS) son utilizados por la mayoría de empresas. Analiza
                      tu CV para asegurarte de que pasa estos filtros automáticos.
                    </p>
                  </div>

                  <Button size="lg" className="gap-2" onClick={startATSAnalysis}>
                    <FileUp className="h-4 w-4" />
                    Analizar mi CV
                  </Button>
                </div>
              ) : atsResult.status === "analyzing" ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                    <h3 className="text-xl font-medium mt-4">Analizando tu CV</h3>
                    <p className="text-muted-foreground">
                      Estamos evaluando tu CV para determinar su compatibilidad con sistemas ATS...
                    </p>
                  </div>
                  <Progress value={45} className="w-64 h-2" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Puntuación general</span>
                    <span className="text-2xl font-bold">{atsResult.score}%</span>
                  </div>
                  <Progress value={atsResult.score} className="h-2" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Palabras clave</span>
                        <span>{atsResult.details.keywords}%</span>
                      </div>
                      <Progress value={atsResult.details.keywords} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Formato</span>
                        <span>{atsResult.details.format}%</span>
                      </div>
                      <Progress value={atsResult.details.format} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Longitud</span>
                        <span>{atsResult.details.length}%</span>
                      </div>
                      <Progress value={atsResult.details.length} className="h-1.5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Datos esenciales</span>
                        <span>{atsResult.details.essentialData}%</span>
                      </div>
                      <Progress value={atsResult.details.essentialData} className="h-1.5" />
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg mt-4">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      Recomendaciones para mejorar
                    </h3>
                    <ul className="space-y-2 mt-2">
                      {atsResult.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={startATSAnalysis}>
                      <FileUp className="h-4 w-4 mr-2" />
                      Volver a analizar
                    </Button>
                    <Button
                      onClick={() => {
                        // Simular mejora automática del CV
                        alert("CV optimizado para ATS (simulación)")
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Optimizar automáticamente
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

