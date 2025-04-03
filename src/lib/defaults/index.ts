import { CVData, DesignSettings } from "../types"

export const defaultDesignSettings: DesignSettings = {
  font: "inter",
  colors: {
    primary: "#0ea5e9",
    background: "#ffffff",
    text: "#1e293b",
  },
  layout: "oneColumn",
  spacing: "normal",
  showPhoto: false,
}

export const defaultCVData: CVData = {
  personalInfo: {
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    phone: "+34 123 456 789",
    location: "Madrid, España",
    linkedin: "linkedin.com/in/juanperez",
    github: "github.com/juanperez",
    website: "juanperez.com",
  },
  summary: "Desarrollador Full Stack con 5 años de experiencia...",
  experience: [],
  education: [],
  skills: [],
  customSections: [],
  sectionOrder: ["summary", "experience", "education", "skills", "custom1", "custom2"],
  design: defaultDesignSettings,
}

export const emptyCVData: CVData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  customSections: [],
  sectionOrder: ["summary", "experience", "education", "skills"],
  design: defaultDesignSettings,
}
