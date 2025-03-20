import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FeaturedTemplates = () => {

    const featuredTemplates = [
        { id: 123423, name: "Plantilla Profesional", category: "Popular" },
        { id: 3332, name: "Plantilla Minimalista", category: "Nuevo" },
        { id: 34233, name: "Plantilla Creativa", category: "Destacado" },
    ]

    return (
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
          {/*   <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                    <Link href="/dashboard/templates">Ver todas las plantillas</Link>
                </Button>
            </div> */}
        </div>
    )
}

export default FeaturedTemplates