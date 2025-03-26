"use client"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CVData } from "@/lib/types"

// Import custom hooks
import { useSectionManagement } from "./hooks/use-section-management"

// Import components
import { PersonalInfoSection } from "./components/personal-info-section"
import { SummarySection } from "./components/summary-section"
import { ExperienceSection } from "./components/experience-section"
import { EducationSection } from "./components/education-section"
import { SkillsSection } from "./components/skills-section"
import { CustomSection } from "./components/custom-section"
import { CustomSectionDialog } from "./components/custom-section-dialog"

interface ContentTabProps {
  cvData: CVData
  setCVData: (data: CVData) => void
}

export function ContentTab({ cvData, setCVData }: ContentTabProps) {
  const {
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
    handleDragEnd
  } = useSectionManagement(cvData, setCVData)

  // Configuración de sensores para dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div className="space-y-8 pb-10" ref={sectionsContainerRef}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cvData.sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {/* Información Personal - Siempre primera y no arrastrable */}
            <PersonalInfoSection 
              personalInfo={cvData.personalInfo} 
              updatePersonalInfo={updatePersonalInfo} 
            />

            {/* Renderizar secciones según el orden */}
            {cvData.sectionOrder.map((sectionId) => {
              // Saltamos la información personal que ya está renderizada
              if (sectionId === "personal-info") return null

              // Renderizar resumen
              if (sectionId === "summary") {
                return (
                  <SummarySection 
                    key={sectionId} 
                    id={sectionId} 
                    summary={cvData.summary} 
                    updateSummary={updateSummary} 
                  />
                )
              }

              // Renderizar experiencia
              if (sectionId === "experience") {
                return (
                  <ExperienceSection 
                    key={sectionId} 
                    id={sectionId} 
                    experience={cvData.experience} 
                    addExperience={addExperience} 
                    updateExperience={updateExperience} 
                    removeExperience={removeExperience} 
                  />
                )
              }

              // Renderizar educación
              if (sectionId === "education") {
                return (
                  <EducationSection 
                    key={sectionId} 
                    id={sectionId} 
                    education={cvData.education} 
                    addEducation={addEducation} 
                    updateEducation={updateEducation} 
                    removeEducation={removeEducation} 
                  />
                )
              }

              // Renderizar habilidades
              if (sectionId === "skills") {
                return (
                  <SkillsSection 
                    key={sectionId} 
                    id={sectionId} 
                    skills={cvData.skills} 
                    addSkill={addSkill} 
                    updateSkill={updateSkill} 
                    removeSkill={removeSkill} 
                  />
                )
              }

              // Renderizar secciones personalizadas
              const customSection = cvData.customSections.find((s) => s.id === sectionId)
              if (customSection) {
                return (
                  <CustomSection 
                    key={sectionId} 
                    section={customSection} 
                    editCustomSection={editCustomSection} 
                    removeCustomSection={removeCustomSection} 
                  />
                )
              }

              return null
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* Botón para añadir sección personalizada */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setShowCustomSectionDialog(true)}
          className="add-custom-section-button button-contrast"
          variant="outline"
          size="lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir sección personalizada
        </Button>
      </div>

      {/* Diálogo para añadir/editar sección personalizada */}
      <CustomSectionDialog 
        open={showCustomSectionDialog}
        setOpen={setShowCustomSectionDialog}
        editingSectionId={editingSectionId}
        newSectionTitle={newSectionTitle}
        setNewSectionTitle={setNewSectionTitle}
        newSectionType={newSectionType}
        setNewSectionType={setNewSectionType}
        newSectionContent={newSectionContent}
        setNewSectionContent={setNewSectionContent}
        onSave={editingSectionId ? updateCustomSection : addCustomSection}
      />
    </div>
  )
}

