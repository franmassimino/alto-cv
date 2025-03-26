"use client"

import { Button } from "@/components/ui/button"
import type { CVData, DesignSettings, CustomSection } from "@/lib/types"
import { Download } from "lucide-react"

interface CVPreviewProps {
  cvData: CVData
  designSettings: DesignSettings
}

export function CVPreview({ cvData, designSettings }: CVPreviewProps) {
  const handlePrint = () => {
    window.print()
  }

  // Función para obtener la clase de fuente correcta
  const getFontClass = (fontName: string): string => {
    switch (fontName) {
      case "inter":
        return "font-inter"
      case "roboto":
        return "font-roboto"
      case "georgia":
        return "font-georgia"
      case "merriweather":
        return "font-merriweather"
      case "montserrat":
        return "font-montserrat"
      default:
        return "font-inter"
    }
  }

  // Renderizar sección personalizada
  const renderCustomSection = (section: CustomSection) => {
    return (
      <div className="mb-6" key={section.id}>
        <h2
          className="text-lg font-semibold mb-3 pb-1 border-b"
          style={{ borderColor: designSettings.colors.primary, color: designSettings.colors.primary }}
        >
          {section.title}
        </h2>

        {section.type === "text" && <p>{section.content as string}</p>}

        {section.type === "list" && (
          <ol className="list-decimal list-inside space-y-1">
            {(section.content as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        )}

        {section.type === "bullets" && (
          <ul className="list-disc list-inside space-y-1">
            {(section.content as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between bg-card shadow-sm">
        <h2 className="font-semibold">Vista previa</h2>
        <Button onClick={handlePrint} size="sm" className="button-contrast">
          <Download className="h-4 w-4 mr-2" />
          Descargar PDF
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-6 bg-background">
        <div
          className={`cv-preview w-full max-w-[800px] mx-auto shadow-md rounded-md overflow-hidden ${getFontClass(designSettings.font)}`}
          style={{
            backgroundColor: designSettings.colors.background,
            color: designSettings.colors.text,
          }}
        >
          {/* CV Content */}
          <div className={`cv-content p-8 ${designSettings.layout === "twoColumns" ? "grid grid-cols-3 gap-6" : ""}`}>
            {/* Main Column */}
            <div className={designSettings.layout === "twoColumns" ? "col-span-2" : ""}>
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2" style={{ color: designSettings.colors.primary }}>
                  {cvData.personalInfo.name || "Tu Nombre"}
                </h1>
                <div className="flex flex-wrap gap-2 text-sm">
                  {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
                  {cvData.personalInfo.phone && (
                    <>
                      <span>•</span>
                      <span>{cvData.personalInfo.phone}</span>
                    </>
                  )}
                  {cvData.personalInfo.location && (
                    <>
                      <span>•</span>
                      <span>{cvData.personalInfo.location}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-sm mt-1">
                  {cvData.personalInfo.linkedin && <span>LinkedIn: {cvData.personalInfo.linkedin}</span>}
                  {cvData.personalInfo.github && (
                    <>
                      <span>•</span>
                      <span>GitHub: {cvData.personalInfo.github}</span>
                    </>
                  )}
                  {cvData.personalInfo.website && (
                    <>
                      <span>•</span>
                      <span>Web: {cvData.personalInfo.website}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Renderizar secciones según el orden */}
              {cvData.sectionOrder.map((sectionId) => {
                // Saltamos la información personal que ya está renderizada
                if (sectionId === "personal-info") return null

                // Resumen
                if (sectionId === "summary" && cvData.summary) {
                  return (
                    <div className="mb-6" key={sectionId}>
                      <h2
                        className="text-lg font-semibold mb-2 pb-1 border-b"
                        style={{ borderColor: designSettings.colors.primary, color: designSettings.colors.primary }}
                      >
                        Resumen Profesional
                      </h2>
                      <p>{cvData.summary}</p>
                    </div>
                  )
                }

                // Experiencia
                if (sectionId === "experience" && cvData.experience.length > 0) {
                  return (
                    <div className="mb-6" key={sectionId}>
                      <h2
                        className="text-lg font-semibold mb-3 pb-1 border-b"
                        style={{ borderColor: designSettings.colors.primary, color: designSettings.colors.primary }}
                      >
                        Experiencia Laboral
                      </h2>
                      <div className="space-y-4">
                        {cvData.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{exp.position}</h3>
                                <p className="text-sm">{exp.company}</p>
                              </div>
                              <p className="text-sm">
                                {exp.startDate} - {exp.endDate}
                              </p>
                            </div>
                            <p className="text-sm mt-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                // Educación
                if (sectionId === "education" && cvData.education.length > 0) {
                  return (
                    <div className="mb-6" key={sectionId}>
                      <h2
                        className="text-lg font-semibold mb-3 pb-1 border-b"
                        style={{ borderColor: designSettings.colors.primary, color: designSettings.colors.primary }}
                      >
                        Educación
                      </h2>
                      <div className="space-y-4">
                        {cvData.education.map((edu) => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{edu.degree}</h3>
                                <p className="text-sm">{edu.institution}</p>
                              </div>
                              <p className="text-sm">
                                {edu.startDate} - {edu.endDate}
                              </p>
                            </div>
                            <p className="text-sm mt-1">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                // Habilidades para diseño de una columna
                if (sectionId === "skills" && cvData.skills.length > 0 && designSettings.layout === "oneColumn") {
                  return (
                    <div className="mb-6" key={sectionId}>
                      <h2
                        className="text-lg font-semibold mb-3 pb-1 border-b"
                        style={{ borderColor: designSettings.colors.primary, color: designSettings.colors.primary }}
                      >
                        Habilidades
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {cvData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-md text-sm"
                            style={{
                              backgroundColor: `${designSettings.colors.primary}20`,
                              color: designSettings.colors.text,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                }

                // Secciones personalizadas
                const customSection = cvData.customSections.find((s) => s.id === sectionId)
                if (customSection) {
                  return renderCustomSection(customSection)
                }

                return null
              })}
            </div>

            {/* Sidebar for two column layout */}
            {designSettings.layout === "twoColumns" && (
              <div className="col-span-1">
                {/* Habilidades para diseño de dos columnas */}
                {cvData.skills.length > 0 && cvData.sectionOrder.includes("skills") && (
                  <div className="mb-6">
                    <h2
                      className="text-lg font-semibold mb-3 pb-1 border-b"
                      style={{ borderColor: designSettings.colors.primary, color: designSettings.colors.primary }}
                    >
                      Habilidades
                    </h2>
                    <ul className="space-y-1">
                      {cvData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

