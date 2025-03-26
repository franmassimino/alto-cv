"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useResumes } from "@/hooks/resume/useResumes";
import FeaturedTemplates from "./featured-templates";
import Features from "./features";
import MyCvs from "./my-cvs";
import { CreateCVModal } from "@/components/modals/create-new-cv";

const Home = ({ session }: any) => {
    const { createResume } = useResumes();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreate = () => setIsModalOpen(true);

    return (
        <div className="w-full space-y-8 p-8 max-w-[1600px] mx-auto">
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
            {/*    <FeaturedTemplates /> */}
            <Features />
            <CreateCVModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </div>
    );
};

export default Home;
