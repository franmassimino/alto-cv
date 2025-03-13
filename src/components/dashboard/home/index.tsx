'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Download, Edit, Clock, Star, Settings } from "lucide-react"
import Image from "next/image"
import { auth } from '@/lib/auth'
import { CreateCVModal } from '@/components/modals/create-new-cv'

const Home =  ({ session }: any) => {
    const [createModalOpen, setCreateModalOpen] = useState(false)

    // Datos de ejemplo para "Mis CVs"
    const myCVs = [
        {
            id: 1,
            name: "CV Desarrollador Frontend",
            lastEdited: "Hace 2 días",
            template: "Profesional",
        },

        {
            id: 2,
            name: "CV AI Developer",
            lastEdited: "Hace 1 semana",
            template: "Creativo",
        },
        {
            id: 2,
            name: "CV Diseñador UX/UI",
            lastEdited: "Hace 1 semana",
            template: "Creativo",
        }, {
            id: 2,
            name: "CV Diseñador UX/UI",
            lastEdited: "Hace 1 semana",
            template: "Creativo",
        },
    ]

    // Datos de ejemplo para "Plantillas predeterminadas"
    const featuredTemplates = [
        { id: 1, name: "Plantilla Profesional", category: "Popular" },
        { id: 2, name: "Plantilla Minimalista", category: "Nuevo" },
        { id: 3, name: "Plantilla Creativa", category: "Destacado" },
    ]

    return (
        <div className="w-full space-y-8 p-8 max-w-[1600px] mx-auto">
            {/* Sección de bienvenida */}
            <div className="rounded-lg border bg-card p-6">
                <h1 className="text-2xl font-bold mb-2">
                    Bienvenido de nuevo, <span className="text-primary">{session?.user?.name?.split(' ')[0]}</span>
                </h1>
                <p className="text-muted-foreground mb-4">Crea, personaliza y optimiza tu CV con la ayuda de nuestra IA.</p>
                <div className="flex flex-wrap gap-3">
                    <Button onClick={() => setCreateModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Crear nuevo CV
                    </Button>
                    <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver plantillas
                    </Button>
                </div>
            </div> {/* This closing div was missing */}

            {/* Mis CVs */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Mis CVs</h2>
                    <Button onClick={() => setCreateModalOpen(true)} size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo CV
                    </Button>
                </div>

                {myCVs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {myCVs.map((cv) => (
                            <div key={cv.id} className="rounded-lg border bg-card overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
                                <Link href={`/dashboard/editor?cv=${cv.id}`}>
                                    <div className="py-4 bg-muted relative cursor-pointer flex items-center justify-center">
                                        <Image
                                            alt=""
                                            width={170}
                                            height={170}
                                            src="/image.png"
                                            className="h-[90%] object-contain"
                                        />
                                    </div>
                                </Link>

                                <div className="p-4">
                                    <h3 className="font-medium">{cv.name}</h3>
                                    <div className="flex items-center text-xs text-muted-foreground mt-1 mb-3">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>{cv.lastEdited}</span>
                                        <span className="mx-2">•</span>
                                        <span>Plantilla: {cv.template}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="flex-1" asChild>
                                            <Link href={`/dashboard/editor?cv=${cv.id}`}>
                                                <Edit className="h-3 w-3 mr-1" />
                                                Editar
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="outline" className="w-9 p-0">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="w-9 p-0">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                        <h3 className="font-medium mb-2">No tienes CVs creados</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Crea tu primer CV personalizado o usa una de nuestras plantillas.
                        </p>
                        <Button onClick={() => setCreateModalOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo CV
                    </Button>
                    </div>
                )}

            </div>

            {/* Plantillas predeterminadas */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Plantillas predeterminadas</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredTemplates.map((template) => (
                        <Link href={`/dashboard/editor?template=${template.id}&type=base`} key={template.id}>
                            <div className="rounded-lg border bg-card overflow-hidden transition-all hover:shadow-md hover:scale-[1.02]">
                                <div className="aspect-[3/2] bg-muted relative">
                                    <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
                                        {template.category}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium">{template.name}</h3>
                                        <div className="flex text-yellow-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Plantilla profesional para destacar tus habilidades
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/templates">Ver todas las plantillas</Link>
                    </Button>
                </div>
            </div>

            {/* Funciones relevantes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-4">
                    <h3 className="font-medium mb-2">Optimización para ATS</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Analiza tu CV para asegurar que pase los filtros de sistemas ATS.
                    </p>
                    <Button size="sm" variant="outline">
                        Analizar CV
                    </Button>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <h3 className="font-medium mb-2">Importar desde LinkedIn</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Importa tu perfil de LinkedIn para crear un CV rápidamente.
                    </p>
                    <Button size="sm" variant="outline">
                        Conectar LinkedIn
                    </Button>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <h3 className="font-medium mb-2">Carta de presentación</h3>
                    <p className="text-sm text-muted-foreground mb-3">Genera una carta de presentación personalizada con IA.</p>
                    <Button size="sm" variant="outline">
                        Crear carta
                    </Button>
                </div>
            </div>


            {/* Modal para crear nuevo CV */}
            <CreateCVModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
        </div>
    )
}

export default Home