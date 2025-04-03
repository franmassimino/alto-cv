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

export interface CustomSection {
  id: string
  title: string
  type: "text" | "list" | "bullets"
  content: string | string[]
}

export interface DesignSettings {
  font: string // ej: "inter", "poppins"
  colors: {
    primary: string    // títulos, acentos
    background: string // fondo
    text: string       // texto principal
  }
  layout: "oneColumn" | "twoColumns"
  spacing: "compact" | "normal" | "spacious"
  showPhoto: boolean
  photoUrl?: string
}

export interface CVData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  customSections: CustomSection[]
  sectionOrder: string[]
  design: DesignSettings
  [key: string]: any // 👈 Esto lo hace compatible con InputJsonValue
}
