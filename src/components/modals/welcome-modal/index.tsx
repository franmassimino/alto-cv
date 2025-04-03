"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogDescription, DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, Linkedin, FileText, Clock, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PersonalDataModal({ open, onDismiss, userId }: { open: boolean, onDismiss: () => void, userId?: string }) {
    const [fileUploaded, setFileUploaded] = useState(false)
    const router = useRouter()

    const handleManualEntry = () => {
        router.push("/dashboard/complete-data")
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileUploaded(true)
            // aquí irá la IA en el futuro
        }
        router.push("/dashboard/complete-data?source=pdf")
    }

    const handleLinkedIn = () => {
        router.push("/dashboard/complete-data?source=linkedin")
    }

    const handleLater = () => {
        localStorage.setItem("personalDataModalDismissed", "true")
        onDismiss()
    }

    // Función para cerrar el modal que también marca como descartado
    const handleCloseModal = () => {
        localStorage.setItem("personalDataModalDismissed", "true")
        onDismiss()
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-xl md:max-w-3xl w-[95vw] max-h-[85vh] overflow-y-auto px-6 py-5 rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl leading-tight">¡Bienvenido a tu creador de CV profesional!</DialogTitle>
                    <DialogDescription className="">
                        Completa tu perfil personal para empezar más rápido.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col md:flex-row gap-4 py-1">
                    {/* OPCIÓN 1 */}
                    <div className="flex-1 border rounded-xl p-4 group hover:bg-muted/50 transition-colors cursor-pointer hover:border-primary/60 hover:shadow-sm min-w-[200px]">
                        <div className="flex flex-col items-center text-center h-full">
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                                <Upload className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-medium mb-1 text-sm md:text-base">Subir un CV existente</h3>
                            <p className="text-xs text-muted-foreground mb-3 flex-grow">
                                Nuestra IA extraerá tu información.
                            </p>
                            <div className="mt-auto w-full">
                                <Input id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                                <Label
                                    htmlFor="cv-upload"
                                    className="cursor-pointer text-sm px-4 py-2 rounded-md border bg-background hover:bg-accent transition-all block text-center"
                                >
                                    Seleccionar archivo
                                </Label>
                            </div>
                        </div>
                    </div>

                    {/* OPCIÓN 2 */}
                    <div className="flex-1 border rounded-xl p-4 group hover:bg-muted/50 transition-colors cursor-pointer hover:border-primary/60 hover:shadow-sm min-w-[200px]">
                        <div className="flex flex-col items-center text-center h-full" onClick={handleLinkedIn}>
                            <div className="bg-[#0077B5]/10 p-3 rounded-full mb-3">
                                <Linkedin className="h-6 w-6 text-[#0077B5]" />
                            </div>
                            <h3 className="font-medium mb-1 text-sm md:text-base">Conectar con LinkedIn</h3>
                            <p className="text-xs text-muted-foreground mb-3 flex-grow">Importar desde LinkedIn.</p>
                            <Button variant="outline" className="mt-auto w-full" onClick={handleLinkedIn}>
                                Conectar
                            </Button>
                        </div>
                    </div>

                    {/* OPCIÓN 3 */}
                    <div className="flex-1 border rounded-xl p-4 group hover:bg-muted/50 transition-colors cursor-pointer hover:border-primary/60 hover:shadow-sm min-w-[200px]">
                        <div className="flex flex-col items-center text-center h-full" onClick={handleManualEntry}>
                            <div className="bg-primary/10 p-3 rounded-full mb-3">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-medium mb-1 text-sm md:text-base">Crear desde cero</h3>
                            <p className="text-xs text-muted-foreground mb-3 flex-grow">Completa el formulario paso a paso.</p>
                            <Button variant="outline" className="mt-auto w-full" onClick={handleManualEntry}>
                                Comenzar
                            </Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-col gap-2 border-t pt-4 mt-2">
                    <p className="text-xs text-muted-foreground mb-1 text-center">
                        También completar tu perfil en cualquier momento desde tu panel.
                    </p>
                    <div className="flex gap-2 w-full">
                        <Button
                            onClick={handleLater}
                            className="mx-auto justify-center gap-2 hover:ring hover:bg-accent transition-all"
                        >
                            Continuar sin completar perfil
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
