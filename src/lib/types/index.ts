export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  website?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  description: string
}

export interface Skill {
  id: string
  name: string
  level?: number // 1-5 para representar nivel de habilidad
}

export interface CustomSection {
  id: string
  title: string
  type: "text" | "list" | "bullets"
  content: string | string[]
}

export interface CVData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  customSections: CustomSection[]
  sectionOrder: string[] // Array de IDs de sección para mantener el orden
}

export interface DesignSettings {
  font: string
  colors: {
    primary: string
    background: string
    text: string
  }
  layout: "oneColumn" | "twoColumns"
  spacing: "compact" | "normal" | "spacious"
  showPhoto: boolean
  photoUrl?: string
}

