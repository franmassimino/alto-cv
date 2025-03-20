import { trpc } from "@/lib/trpc";

export const useResumes = () => {
    const utils = trpc.useContext();

    // Obtener CVs del usuario
    const { data: resumes, isLoading } = trpc.resume.getUserResumes.useQuery();

    // Crear un nuevo CV
    const createResume = trpc.resume.createResume.useMutation({
        onSuccess: () => {
            utils.resume.getUserResumes.invalidate();
        },
    });

    // Editar un CV
    const updateResume = trpc.resume.updateResume.useMutation({
        onSuccess: () => {
            utils.resume.getUserResumes.invalidate();
        },
    });

    // Eliminar un CV
    const deleteResume = trpc.resume.deleteResume.useMutation({
        onSuccess: () => {
            utils.resume.getUserResumes.invalidate();
        },
    });

    return { resumes, isLoading, createResume, updateResume, deleteResume };
};
