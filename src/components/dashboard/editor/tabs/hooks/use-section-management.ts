import { useState, useRef } from "react"
import type { CVData, CustomSection } from "@/lib/types"

export function useSectionManagement(cvData: CVData, setCVData: (data: CVData) => void) {
  const [showCustomSectionDialog, setShowCustomSectionDialog] = useState(false)
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [newSectionType, setNewSectionType] = useState<"text" | "list" | "bullets">("text")
  const [newSectionContent, setNewSectionContent] = useState("")
  
  // Referencia para el contenedor de secciones (para scroll automático)
  const sectionsContainerRef = useRef<HTMLDivElement>(null)

  // Asegurar que una sección está en el orden
  const ensureSectionInOrder = (order: string[], sectionId: string): string[] => {
    if (order.includes(sectionId)) {
      return order
    }
    return [...order, sectionId]
  }

  // Scroll al final después de añadir
  const scrollToBottom = () => {
    setTimeout(() => {
      if (sectionsContainerRef.current) {
        sectionsContainerRef.current.scrollTop = sectionsContainerRef.current.scrollHeight
      }
    }, 100)
  }

  // Funciones para información personal
  const updatePersonalInfo = (field: string, value: string) => {
    setCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value,
      },
    })
  }

  // Funciones para resumen
  const updateSummary = (value: string) => {
    setCVData({
      ...cvData,
      summary: value,
    })
  }

  // Funciones para experiencia
  const addExperience = () => {
    const newExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }

    setCVData({
      ...cvData,
      experience: [...cvData.experience, newExperience],
      sectionOrder: ensureSectionInOrder(cvData.sectionOrder, "experience"),
    })

    scrollToBottom()
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  // Funciones para educación
  const addEducation = () => {
    const newEducation = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    }

    setCVData({
      ...cvData,
      education: [...cvData.education, newEducation],
      sectionOrder: ensureSectionInOrder(cvData.sectionOrder, "education"),
    })

    scrollToBottom()
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  // Funciones para habilidades
  const addSkill = () => {
    const newSkill = ""
    setCVData({
      ...cvData,
      skills: [...cvData.skills, newSkill],
      sectionOrder: ensureSectionInOrder(cvData.sectionOrder, "skills"),
    })
  }

  const updateSkill = (index: number, value: string) => {
    const updatedSkills = [...cvData.skills]
    updatedSkills[index] = value
    setCVData({
      ...cvData,
      skills: updatedSkills,
    })
  }

  const removeSkill = (index: number) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter((_, i) => i !== index),
    })
  }

  // Funciones para secciones personalizadas
  const addCustomSection = () => {
    if (!newSectionTitle.trim()) return

    const newSection: CustomSection = {
      id: `custom-${Date.now()}`,
      title: newSectionTitle,
      type: newSectionType,
      content:
        newSectionType === "text" ? newSectionContent : newSectionContent.split("\n").filter((line) => line.trim()),
    }

    setCVData({
      ...cvData,
      customSections: [...cvData.customSections, newSection],
      sectionOrder: [...cvData.sectionOrder, newSection.id],
    })

    // Limpiar el formulario
    resetCustomSectionForm()
    setShowCustomSectionDialog(false)
  }

  const editCustomSection = (sectionId: string) => {
    const section = cvData.customSections.find((s) => s.id === sectionId)
    if (!section) return

    setEditingSectionId(sectionId)
    setNewSectionTitle(section.title)
    setNewSectionType(section.type)
    setNewSectionContent(Array.isArray(section.content) ? section.content.join("\n") : section.content)
    setShowCustomSectionDialog(true)
  }

  const updateCustomSection = () => {
    if (!editingSectionId || !newSectionTitle.trim()) return

    setCVData({
      ...cvData,
      customSections: cvData.customSections.map((section) =>
        section.id === editingSectionId
          ? {
              ...section,
              title: newSectionTitle,
              type: newSectionType,
              content:
                newSectionType === "text"
                  ? newSectionContent
                  : newSectionContent.split("\n").filter((line) => line.trim()),
            }
          : section
      ),
    })

    // Limpiar el formulario
    resetCustomSectionForm()
    setShowCustomSectionDialog(false)
  }

  const removeCustomSection = (sectionId: string) => {
    setCVData({
      ...cvData,
      customSections: cvData.customSections.filter((section) => section.id !== sectionId),
      sectionOrder: cvData.sectionOrder.filter((id) => id !== sectionId),
    })
  }

  const resetCustomSectionForm = () => {
    setNewSectionTitle("")
    setNewSectionType("text")
    setNewSectionContent("")
    setEditingSectionId(null)
  }

  // Manejar el reordenamiento de secciones
  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = cvData.sectionOrder.indexOf(active.id)
      const newIndex = cvData.sectionOrder.indexOf(over.id)

      setCVData({
        ...cvData,
        sectionOrder: arrayMove(cvData.sectionOrder, oldIndex, newIndex),
      })

      console.log(cvData.sectionOrder) 
    }
  }

  return {
    showCustomSectionDialog,
    setShowCustomSectionDialog,
    editingSectionId,
    newSectionTitle,
    setNewSectionTitle,
    newSectionType,
    setNewSectionType,
    newSectionContent,
    setNewSectionContent,
    sectionsContainerRef,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addCustomSection,
    editCustomSection,
    updateCustomSection,
    removeCustomSection,
    resetCustomSectionForm,
    handleDragEnd,
    ensureSectionInOrder
  }
}

// Helper function for array reordering
export const arrayMove = <T,>(array: T[], from: number, to: number): T[] => {
  const newArray = array.slice()
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0])
  return newArray
}