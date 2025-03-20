"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CvSkeleton from "../../shared/cv-skeleton";
import { useResumes } from "@/hooks/resume/useResumes";
import { Plus, Edit, Clock, Settings, Trash2, Copy } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MyCvs = ({ handleCreate }: any) => {
    const { resumes, isLoading, updateResume, deleteResume } = useResumes();
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const handleUpdate = (id: string) => {
        if (!editTitle.trim()) return;
        updateResume.mutate({ id, title: editTitle });
        setEditId(null);
        setEditTitle("");
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Mis CVs</h2>
                <Button onClick={handleCreate} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo CV
                </Button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <CvSkeleton />
                    <CvSkeleton />
                    <CvSkeleton />
                </div>
            ) : resumes && resumes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resumes.map((cv) => (
                        <div key={cv.id} className="rounded-lg border bg-card overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
                            <Link href={`/dashboard/editor?cv=${cv.id}`}>
                                <div className="py-4 bg-muted relative cursor-pointer flex items-center justify-center">
                                    <Image alt="" width={170} height={170} src="/image.png" className="h-[90%] object-contain" />
                                </div>
                            </Link>

                            <div className="p-4">
                                {editId === cv.id ? (
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="border p-1 w-full text-sm"
                                    />
                                ) : (
                                    <h3 className="font-medium">{cv.title}</h3>
                                )}

                                <div className="flex items-center text-xs text-muted-foreground mt-1 mb-3">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>Última edición: {new Date(cv.updatedAt).toLocaleDateString()}</span>
                                </div>

                                <div className="flex gap-2">
                                    {editId === cv.id ? (
                                        <Button size="sm" variant="outline" onClick={() => handleUpdate(cv.id)}>
                                            Guardar
                                        </Button>
                                    ) : (
                                        <Button size="sm" className="flex-1" asChild>
                                            <Link href={`/dashboard/editor?cv=${cv.id}`}>
                                                <Edit className="h-3 w-3 mr-1" />
                                                Editar
                                            </Link>
                                        </Button>
                                    )}

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="outline" className="w-9 p-0">
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => { setEditId(cv.id); setEditTitle(cv.title); }}>
                                                <Edit className="h-4 w-4 mr-2" />
                                                Renombrar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Copy className="h-4 w-4 mr-2" />
                                                Duplicar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive" onClick={() => deleteResume.mutate({ id: cv.id })}>
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
                    <Button onClick={handleCreate}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo CV
                    </Button>
                </div>
            )}
        </div>
    )
}

export default MyCvs