"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DesignSettings } from "@/lib/types"
import { LayoutGrid, Columns } from "lucide-react"

interface DesignTabProps {
    designSettings: DesignSettings
    setDesignSettings: (settings: DesignSettings) => void
}

export function DesignTab({ designSettings, setDesignSettings }: DesignTabProps) {
    const updateFont = (font: string) => {
        setDesignSettings({
            ...designSettings,
            font,
        })
    }

    const updateColor = (colorType: "primary" | "background" | "text", color: string) => {
        setDesignSettings({
            ...designSettings,
            colors: {
                ...designSettings.colors,
                [colorType]: color,
            },
        })
    }

    const updateLayout = (layout: "oneColumn" | "twoColumns") => {
        setDesignSettings({
            ...designSettings,
            layout,
        })
    }

    const fonts = [
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "georgia", label: "Georgia" },
        { value: "merriweather", label: "Merriweather" },
        { value: "montserrat", label: "Montserrat" },
    ]

    const colors = [
        { value: "#0ea5e9", label: "Azul" },
        { value: "#10b981", label: "Verde" },
        { value: "#f59e0b", label: "Ámbar" },
        { value: "#ef4444", label: "Rojo" },
        { value: "#8b5cf6", label: "Violeta" },
        { value: "#6b7280", label: "Gris" },
        { value: "#000000", label: "Negro" },
    ]

    const backgroundColors = [
        { value: "#ffffff", label: "Blanco" },
        { value: "#f8fafc", label: "Gris claro" },
        { value: "#f0f9ff", label: "Azul claro" },
        { value: "#f0fdf4", label: "Verde claro" },
        { value: "#fffbeb", label: "Ámbar claro" },
    ]

    const textColors = [
        { value: "#000000", label: "Negro" },
        { value: "#1e293b", label: "Gris oscuro" },
        { value: "#334155", label: "Gris medio" },
        { value: "#475569", label: "Gris" },
    ]

    return (
        <div className="space-y-8 pb-10">
            {/* Typography */}
            <Card>
                <CardHeader>
                    <CardTitle>Tipografía</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="font">Fuente principal</Label>
                            <Select value={designSettings.font} onValueChange={updateFont}>
                                <SelectTrigger id="font">
                                    <SelectValue placeholder="Selecciona una fuente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {fonts.map((font) => (
                                        <SelectItem key={font.value} value={font.value}>
                                            {font.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="pt-2">
                            <p className="text-sm text-muted-foreground mb-2">Vista previa:</p>
                            <div className="p-4 border rounded-md" style={{ fontFamily: designSettings.font }}>
                                <p className="text-2xl font-bold">Título de ejemplo</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Colors */}
            <Card>
                <CardHeader>
                    <CardTitle>Colores</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Color principal</Label>
                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                                {colors.map((color) => (
                                    <Button
                                        key={color.value}
                                        type="button"
                                        variant="outline"
                                        className={`h-10 p-0 ${designSettings.colors.primary === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => updateColor("primary", color.value)}
                                    >
                                        <span className="sr-only">{color.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Color de fondo</Label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {backgroundColors.map((color) => (
                                    <Button
                                        key={color.value}
                                        type="button"
                                        variant="outline"
                                        className={`h-10 p-0 ${designSettings.colors.background === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => updateColor("background", color.value)}
                                    >
                                        <span className="sr-only">{color.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Color de texto</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {textColors.map((color) => (
                                    <Button
                                        key={color.value}
                                        type="button"
                                        variant="outline"
                                        className={`h-10 p-0 ${designSettings.colors.text === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => updateColor("text", color.value)}
                                    >
                                        <span className="sr-only">{color.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2">
                            <p className="text-sm text-muted-foreground mb-2">Vista previa de colores:</p>
                            <div
                                className="p-4 rounded-md"
                                style={{
                                    backgroundColor: designSettings.colors.background,
                                    color: designSettings.colors.text,
                                    borderColor: designSettings.colors.primary,
                                    borderWidth: "1px",
                                }}
                            >
                                <p className="text-lg font-bold mb-2" style={{ color: designSettings.colors.primary }}>
                                    Título con color principal
                                </p>
                                <p className="mb-1">Este texto usa el color de texto seleccionado.</p>
                                <p className="text-sm">Todo sobre un fondo del color seleccionado.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Layout */}
            <Card>
                <CardHeader>
                    <CardTitle>Diseño</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={designSettings.layout}
                        onValueChange={(value) => updateLayout(value as "oneColumn" | "twoColumns")}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <div
                            className={`border rounded-lg p-4 ${designSettings.layout === "oneColumn" ? "ring-2 ring-primary" : ""}`}
                        >
                            <RadioGroupItem value="oneColumn" id="oneColumn" className="sr-only" />
                            <div className="flex flex-col items-center gap-2">
                                <LayoutGrid className="h-10 w-10 text-muted-foreground" />
                                <Label htmlFor="oneColumn" className="cursor-pointer">
                                    Una columna
                                </Label>
                                <p className="text-xs text-center text-muted-foreground">
                                    Diseño tradicional con todas las secciones en una columna.
                                </p>
                            </div>
                        </div>
                        <div
                            className={`border rounded-lg p-4 ${designSettings.layout === "twoColumns" ? "ring-2 ring-primary" : ""}`}
                        >
                            <RadioGroupItem value="twoColumns" id="twoColumns" className="sr-only" />
                            <div className="flex flex-col items-center gap-2">
                                <Columns className="h-10 w-10 text-muted-foreground" />
                                <Label htmlFor="twoColumns" className="cursor-pointer">
                                    Dos columnas
                                </Label>
                                <p className="text-xs text-center text-muted-foreground">
                                    Experiencia y educación en la columna principal, habilidades y datos en la lateral.
                                </p>
                            </div>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
    )
}

