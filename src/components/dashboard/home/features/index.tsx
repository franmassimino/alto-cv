import { Button } from '@/components/ui/button'
import React from 'react'

const Features = () => {
    return (
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
    )
}

export default Features