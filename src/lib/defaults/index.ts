import { DesignSettings, CVData } from '../types/';

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
  summary:
    "Desarrollador Full Stack con 5 años de experiencia en la creación de aplicaciones web y móviles. Especializado en React, Node.js y arquitecturas cloud. Enfocado en crear soluciones escalables y de alto rendimiento con código limpio y mantenible.",
  experience: [
    {
      id: "exp1",
      company: "Empresa Tecnológica S.L.",
      position: "Desarrollador Full Stack Senior",
      startDate: "Enero 2021",
      endDate: "Presente",
      description:
        "• Desarrollo y mantenimiento de aplicaciones web utilizando React, TypeScript y Node.js\n• Implementación de arquitectura de microservicios con Docker y Kubernetes\n• Optimización de rendimiento que mejoró los tiempos de carga en un 40%\n• Liderazgo técnico de un equipo de 4 desarrolladores",
    },
    {
      id: "exp2",
      company: "Agencia Digital",
      position: "Desarrollador Frontend",
      startDate: "Marzo 2018",
      endDate: "Diciembre 2020",
      description:
        "• Desarrollo de interfaces de usuario con React y Redux\n• Implementación de diseños responsivos y accesibles\n• Integración con APIs RESTful y GraphQL\n• Participación en más de 15 proyectos para clientes de diversos sectores",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Universidad Politécnica",
      degree: "Ingeniería Informática",
      startDate: "Septiembre 2014",
      endDate: "Junio 2018",
      description: "Especialización en desarrollo de software y sistemas de información.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Git",
    "CI/CD",
    "Jest",
    "REST APIs",
    "GraphQL",
  ],
  customSections: [
    {
      id: "custom1",
      title: "Proyectos Destacados",
      type: "list",
      content: [
        "Sistema de gestión de inventario - Aplicación web full stack con React y Node.js",
        "Plataforma de e-learning - Desarrollo frontend con React y Material UI",
        "API de procesamiento de pagos - Microservicio con Node.js y Express",
      ],
    },
    {
      id: "custom2",
      title: "Idiomas",
      type: "bullets",
      content: ["Español - Nativo", "Inglés - Profesional (C1)", "Francés - Básico (A2)"],
    },
  ],
  sectionOrder: ["summary", "experience", "education", "skills", "custom1", "custom2"],
}

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

