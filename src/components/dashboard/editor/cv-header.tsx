"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Copy,
    MoreVertical,
    Pencil,
    Share2,
    Trash2,
    Globe,
    Mail,
    Linkedin,
    Twitter,
    Facebook,
    MessageCircle,
} from "lucide-react"

interface CVHeaderProps {
    cvName: string
    setCVName: (name: string) => void
    creationDate: Date
}

export function CVHeader({ cvName, setCVName, creationDate }: CVHeaderProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [tempName, setTempName] = useState(cvName)
    const [showRenameDialog, setShowRenameDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showShareDialog, setShowShareDialog] = useState(false)


    const handleRename = () => {
        setCVName(tempName)
        setShowRenameDialog(false)
    }

    const handleDelete = () => {
        // En un caso real, aquí eliminaríamos el CV
        alert("CV eliminado (simulación)")
        setShowDeleteDialog(false)
    }

    const handleDuplicate = () => {
        // En un caso real, aquí duplicaríamos el CV
        alert("CV duplicado (simulación)")
    }

    const handleShare = (platform: string) => {
        // En un caso real, aquí compartiríamos el CV según la plataforma
        alert(`CV compartido por ${platform} (simulación)`)
        setShowShareDialog(false)
    }

    const handlePublish = () => {
        // En un caso real, aquí publicaríamos el CV
        alert("CV publicado (simulación)")
    }

    const shareUrl = "https://cv-builder.com/share/abc123"
    const shareText = `Mira mi CV profesional: ${cvName}`

    return (
        <div className="border-b pb-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <Input
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="h-8 text-lg font-semibold"
                                autoFocus
                                onBlur={() => {
                                    setCVName(tempName)
                                    setIsEditing(false)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setCVName(tempName)
                                        setIsEditing(false)
                                    } else if (e.key === "Escape") {
                                        setTempName(cvName)
                                        setIsEditing(false)
                                    }
                                }}
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setCVName(tempName)
                                    setIsEditing(false)
                                }}
                            >
                                Guardar
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">{cvName}</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                    setTempName(cvName)
                                    setIsEditing(true)
                                }}
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                <span className="sr-only">Editar nombre</span>
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowShareDialog(true)}>
                        <Share2 className="h-4 w-4" />
                        Compartir
                    </Button>

                    <Button variant="outline" size="sm" className="gap-1" onClick={handlePublish}>
                        <Globe className="h-4 w-4" />
                        Publicar
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Más opciones</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setShowRenameDialog(true)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Renombrar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDuplicate}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setShowDeleteDialog(true)}
                                className="text-destructive focus:text-destructive"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Rename Dialog */}
            <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Renombrar CV</DialogTitle>
                        <DialogDescription>Introduce un nuevo nombre para tu CV.</DialogDescription>
                    </DialogHeader>
                    <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Nombre del CV"
                        className="mt-4"
                    />
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleRename}>Guardar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminar CV</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que quieres eliminar este CV? Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Share Dialog */}
            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Compartir CV</DialogTitle>
                        <DialogDescription>Comparte tu CV a través de diferentes plataformas.</DialogDescription>
                    </DialogHeader>

                    <div className="mt-6 space-y-6">
                        {/* Enlace para compartir */}
                        <div>
                            <p className="text-sm font-medium mb-2">Enlace para compartir</p>
                            <div className="flex gap-2">
                                <Input value={shareUrl} readOnly className="flex-1" />
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareUrl)
                                        alert("Enlace copiado al portapapeles")
                                    }}
                                >
                                    Copiar
                                </Button>
                            </div>
                        </div>

                        {/* Opciones de compartir */}
                        <div>
                            <p className="text-sm font-medium mb-3">Compartir en plataformas</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <Button
                                    variant="outline"
                                    className="flex flex-col h-auto py-3 gap-2"
                                    onClick={() => {
                                        // En un caso real, abriríamos WhatsApp Web con el enlace
                                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ": " + shareUrl)}`
                                        window.open(whatsappUrl, "_blank")
                                        handleShare("WhatsApp")
                                    }}
                                >
                                    <MessageCircle className="h-5 w-5 text-green-600" />
                                    <span className="text-xs">WhatsApp</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex flex-col h-auto py-3 gap-2"
                                    onClick={() => {
                                        // En un caso real, abriríamos el cliente de correo
                                        const mailtoUrl = `mailto:?subject=${encodeURIComponent("Mi CV Profesional")}&body=${encodeURIComponent(shareText + ": " + shareUrl)}`
                                        window.open(mailtoUrl, "_blank")
                                        handleShare("Email")
                                    }}
                                >
                                    <Mail className="h-5 w-5 text-blue-500" />
                                    <span className="text-xs">Email</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex flex-col h-auto py-3 gap-2"
                                    onClick={() => {
                                        // En un caso real, abriríamos LinkedIn con el enlace
                                        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
                                        window.open(linkedinUrl, "_blank")
                                        handleShare("LinkedIn")
                                    }}
                                >
                                    <Linkedin className="h-5 w-5 text-blue-700" />
                                    <span className="text-xs">LinkedIn</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex flex-col h-auto py-3 gap-2"
                                    onClick={() => {
                                        // En un caso real, abriríamos Twitter con el enlace
                                        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
                                        window.open(twitterUrl, "_blank")
                                        handleShare("Twitter")
                                    }}
                                >
                                    <Twitter className="h-5 w-5 text-sky-500" />
                                    <span className="text-xs">Twitter</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="flex flex-col h-auto py-3 gap-2"
                                    onClick={() => {
                                        // En un caso real, abriríamos Facebook con el enlace
                                        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                                        window.open(facebookUrl, "_blank")
                                        handleShare("Facebook")
                                    }}
                                >
                                    <Facebook className="h-5 w-5 text-blue-600" />
                                    <span className="text-xs">Facebook</span>
                                </Button>
                            </div>
                        </div>

                        {/* Compartir por correo específico */}
                        <div>
                            <p className="text-sm font-medium mb-2">Enviar a un correo específico</p>
                            <div className="flex gap-2">
                                <Input placeholder="Introduce un correo electrónico" type="email" className="flex-1" />
                                <Button onClick={() => handleShare("correo específico")}>Enviar</Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

