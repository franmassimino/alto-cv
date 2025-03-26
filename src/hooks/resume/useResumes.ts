import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";

export const useResumes = () => {
    const utils = trpc.useContext();
    const router = useRouter();

    // Obtener CVs del usuario
    const { data: resumes, isLoading: isLoadingResumes } = trpc.resume.getUserResumes.useQuery();

    // Crear un nuevo CV
    const { mutate: createResume, isLoading: isCreatingResume, error: createError } = trpc.resume.createResume.useMutation({
        onMutate: async (newResume) => {
            // Cancelar queries en curso
            await utils.resume.getUserResumes.cancel();
            // Guardar el estado anterior
            const previousResumes = utils.resume.getUserResumes.getData();
            // Optimistic update
            utils.resume.getUserResumes.setData(undefined, (old) => {
                if (!old) return [{
                    ...newResume,
                    id: 'temp-' + Date.now(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    userId: '', // Se actualizará con la respuesta del servidor
                    templateId: null,
                    currentVersionId: null,
                    content: ''
                }];
                return [...old, {
                    ...newResume,
                    id: 'temp-' + Date.now(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    userId: '',
                    templateId: null,
                    currentVersionId: null,
                    content: ''
                }];
            });
            return { previousResumes };
        },
        onError: (err, newResume, context) => {
            // Revertir en caso de error
            if (context?.previousResumes) {
                utils.resume.getUserResumes.setData(undefined, context.previousResumes);
            }
        },
        onSuccess: (data) => {
            // Forzar redirección inmediata
            router.replace(`/dashboard/editor?cv=${data.id}`);
            router.refresh();
            // Invalidar la caché para asegurar que los datos estén actualizados
            utils.resume.getUserResumes.invalidate();
        },
    });

    // Editar un CV
    const { mutate: updateResume, isLoading: isUpdatingResume, error: updateError } = trpc.resume.updateResume.useMutation({
        onMutate: async ({ id, title }) => {
            await utils.resume.getUserResumes.cancel();
            const previousResumes = utils.resume.getUserResumes.getData();
            utils.resume.getUserResumes.setData(undefined, (old) => {
                if (!old) return old;
                return old.map((resume) => 
                    resume.id === id ? { ...resume, title } : resume
                );
            });
            return { previousResumes };
        },
        onError: (err, variables, context) => {
            if (context?.previousResumes) {
                utils.resume.getUserResumes.setData(undefined, context.previousResumes);
            }
        },
    });

    // Eliminar un CV
    const { mutate: deleteResume, isLoading: isDeletingResume, error: deleteError } = trpc.resume.deleteResume.useMutation({
        onMutate: async ({ id }) => {
            await utils.resume.getUserResumes.cancel();
            const previousResumes = utils.resume.getUserResumes.getData();
            utils.resume.getUserResumes.setData(undefined, (old) => {
                if (!old) return old;
                return old.filter((resume) => resume.id !== id);
            });
            return { previousResumes };
        },
        onError: (err, variables, context) => {
            if (context?.previousResumes) {
                utils.resume.getUserResumes.setData(undefined, context.previousResumes);
            }
        },
    });

    return {
        // Datos
        resumes,
        
        // Estados de carga
        isLoading: isLoadingResumes,
        isCreating: isCreatingResume,
        isUpdating: isUpdatingResume,
        isDeleting: isDeletingResume,
        
        // Errores
        createError,
        updateError,
        deleteError,
        
        // Mutaciones
        createResume,
        updateResume,
        deleteResume,
    };
};
