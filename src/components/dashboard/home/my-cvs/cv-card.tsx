"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Clock, Settings, Trash2, Copy, Check, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import DeleteCvModal from "@/components/modals/delete-cv/delete-cv-modal"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CVData } from "@/lib/types"

interface CvCardProps {
    cv: {
        id: string
        title: string
        updatedAt: string
        content: CVData // ✅ contenido del CV
    }
    editId: string | null
    editTitle: string
    setEditTitle: (title: string) => void
    handleUpdate: (id: string, content: CVData) => void // ✅ incluye content
    setEditId: (id: string | null) => void
    onDelete: (id: string) => void
}

const CvCard = ({
    cv,
    editId,
    editTitle,
    setEditTitle,
    handleUpdate,
    setEditId,
    onDelete,
}: CvCardProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const handleDelete = () => {
        onDelete(cv.id)
        setIsDeleteModalOpen(false)
        toast.success("CV eliminado correctamente")
    }

    return (
        <>
            <div className="rounded-lg border bg-card overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
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
                    <div className="flex items-center gap-2">
                        {editId === cv.id ? (
                            <>
                                <Input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="h-10 text-sm font-medium p-2 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    autoFocus
                                />
                                <div className="flex gap-0">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleUpdate(cv.id, cv.content)} // ✅ pasa content
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => {
                                            setEditId(null)
                                            setEditTitle("")
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <h3 className="font-medium">{cv.title}</h3>
                        )}
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground mt-1 mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                            Última edición: {new Date(cv.updatedAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <Button size="sm" className="flex-1" asChild disabled={editId === cv.id}>
                            <Link href={`/dashboard/editor?cv=${cv.id}`}>
                                <Edit className="h-3 w-3 mr-1" />
                                Editar
                            </Link>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-9 p-0"
                                    disabled={editId === cv.id}
                                >
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => {
                                        setEditId(cv.id)
                                        setEditTitle(cv.title)
                                    }}
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Renombrar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <DeleteCvModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title={cv.title}
            />
        </>
    )
}

export default CvCard
