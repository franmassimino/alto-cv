"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const myTemplates = [
    { id: 1, name: "CV Profesional", description: "Mi plantilla personalizada para roles técnicos" },
    { id: 2, name: "CV Creativo", description: "Diseño moderno para roles de diseño" },
]

const baseTemplates = [
    { id: 1, name: "Plantilla Profesional", description: "Diseño limpio y moderno para destacar tus habilidades" },
    { id: 2, name: "Plantilla Minimalista", description: "Diseño simple y elegante para cualquier industria" },
    { id: 3, name: "Plantilla Creativa", description: "Diseño llamativo para industrias creativas" },
    { id: 4, name: "Plantilla Ejecutiva", description: "Diseño formal para roles de liderazgo" },
    { id: 5, name: "Plantilla Técnica", description: "Enfocada en habilidades técnicas y proyectos" },
    { id: 6, name: "Plantilla Académica", description: "Ideal para roles académicos y de investigación" },
]

const TemplatesList = () => {
    return (
        <div className="w-full p-8 max-w-[1600px] mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Plantillas de CV</h1>
                <p className="text-muted-foreground">Elige una plantilla para comenzar a crear tu CV</p>
            </div>

            {/* Sección: Mis Plantillas */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Mis Plantillas</h2>
                    <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Plantilla
                    </Button>
                </div>

                {myTemplates.length > 0 ? (
                    <TemplateGrid templates={myTemplates} />
                ) : (
                    <EmptyState message="No tienes plantillas personalizadas" buttonText="Crear Plantilla" />
                )}
            </div>

            {/* Sección: Plantillas Base */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Plantillas Base</h2>
                <TemplateGrid templates={baseTemplates} isBase />
            </div>
        </div>
    )
}

const TemplateGrid = ({ templates, isBase = false }: any) => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template: any) => (
            <Link
                href={`/dashboard/editor?template=${template.id}${isBase ? "&type=base" : ""}`}
                key={template.id}
            >
                <div className="h-[300px] overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md hover:scale-[1.02]">
                    <div className="aspect-[3/4] bg-muted" />
                    <div className="p-4">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                </div>
            </Link>
        ))}
    </div>
)

const EmptyState = ({ message, buttonText }: any) => (
    <div className="rounded-lg border border-dashed p-8 text-center">
        <h3 className="font-medium mb-2">{message}</h3>
        <p className="text-sm text-muted-foreground mb-4">
            Crea tu primera plantilla personalizada o usa una de nuestras plantillas base.
        </p>
        <Button>
            <Plus className="h-4 w-4 mr-2" />
            {buttonText}
        </Button>
    </div>
)

export default TemplatesList
