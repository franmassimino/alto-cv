"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useResumes } from "@/hooks/resume/useResumes";
import FeaturedTemplates from "./featured-templates";
import Features from "./features";
import MyCvs from "./my-cvs";

const Home = ({ session }: any) => {
    const { createResume } = useResumes();

    const handleCreate = () => createResume.mutate({ title: "Nuevo CV" });

    return (
        <div className="w-full space-y-12 p-8 max-w-[1600px] mx-auto">
            {/* Sección de bienvenida */}
            <div className="rounded-lg border bg-card p-6">
                <h1 className="text-2xl font-bold mb-2">
                    Bienvenido de nuevo, <span className="text-primary">{session?.user?.name?.split(" ")[0]}</span>
                </h1>
                <p className="text-muted-foreground mb-4">Crea, personaliza y optimiza tu CV con la ayuda de nuestra IA.</p>
                <div className="flex flex-wrap gap-3">
                    <Button onClick={handleCreate}>
                        <Plus className="h-4 w-4 mr-2" />
                        Crear nuevo CV
                    </Button>
                </div>
            </div>

            <MyCvs handleCreate={handleCreate} />
            <FeaturedTemplates />
            <Features />
        </div>
    );
};

export default Home;
