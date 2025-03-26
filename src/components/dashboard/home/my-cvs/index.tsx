"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CvSkeleton from "../../shared/cv-skeleton";
import { useResumes } from "@/hooks/resume/useResumes";
import { Plus } from "lucide-react";
import CvCard from "./cv-card";

const MyCvs = ({ handleCreate }: any) => {
    const { resumes, isLoading, updateResume, deleteResume } = useResumes();
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");

    const handleUpdate = (id: string) => {
        if (!editTitle.trim()) return;
        updateResume({ id, title: editTitle });
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
                        <CvCard
                            key={cv.id}
                            cv={cv}
                            editId={editId}
                            editTitle={editTitle}
                            setEditTitle={setEditTitle}
                            handleUpdate={handleUpdate}
                            setEditId={setEditId}
                            onDelete={(id) => deleteResume({ id })}
                        />
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