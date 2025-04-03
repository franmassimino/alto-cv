"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, UserCircle } from "lucide-react";
import Features from "./features";
import MyCvs from "./my-cvs";
import { CreateCVModal } from "@/components/modals/create-new-cv";
import { PersonalDataModal } from "@/components/modals/welcome-modal";
import { useShowPersonalDataModal } from "@/hooks/personal-data/useShowPersonalDataModal";

const Home = ({ session }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { shouldShow, dismiss, hasPersonalData } = useShowPersonalDataModal();
    const [showPersonalDataModal, setShowPersonalDataModal] = useState(false);
    const handleCreate = () => setIsModalOpen(true);

    // Function to open the personal data modal
    const openPersonalDataModal = () => {
        setShowPersonalDataModal(true);
    };

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

                    {!shouldShow && !hasPersonalData && (
                        <Button variant="outline" onClick={openPersonalDataModal}>
                            <UserCircle className="h-4 w-4 mr-2" />
                            Completar datos personales
                        </Button>
                    )}
                </div>
            </div>

            <MyCvs handleCreate={handleCreate} />
            {/*    <FeaturedTemplates /> */}
            <Features />
            <CreateCVModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            <PersonalDataModal
                open={shouldShow || showPersonalDataModal}
                onDismiss={() => {
                    dismiss();
                    setShowPersonalDataModal(false);
                }}
                userId={session?.user?.id}
            />
        </div>
    );
};

export default Home;
