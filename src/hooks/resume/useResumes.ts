"use client"

import { trpc } from "@/lib/trpc"
import { useRouter } from "next/navigation"

export const useResumes = (cvId?: string) => {
    const utils = trpc.useContext()
    const router = useRouter()

    // 📦 Queries
    const {
        data: resumes,
        isLoading: isLoadingResumes,
        error: getResumesError,
    } = trpc.resume.getUserResumes.useQuery(undefined, {
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    })

    const {
        data: resumeById,
        refetch: getResumeById,
        isLoading: isFetchingResume,
        error: getResumeError,
    } = trpc.resume.getResumeById.useQuery(
        { id: cvId ?? "" },
        {
            enabled: false,
            staleTime: 0, // fuerza siempre el refetch
            cacheTime: 0, // (opcional) no lo guarda en caché
        }
    )

    // ✨ Crear CV
    const {
        mutate: createResume,
        isLoading: isCreatingResume,
        error: createResumeError,
    } = trpc.resume.createResume.useMutation({
        onSuccess: ({ id }: any) => {
            router.push(`/dashboard/editor?cv=${id}`)
            utils.resume.getUserResumes.invalidate()
        }
    })

    // ✏️ Editar CV
    const {
        mutate: updateResume,
        isLoading: isUpdatingResume,
        error: updateResumeError,
    } = trpc.resume.updateResume.useMutation({
        onMutate: async (updated) => {
            await utils.resume.getUserResumes.cancel()
            const previousData = utils.resume.getUserResumes.getData()

            utils.resume.getUserResumes.setData(undefined, (old) =>
                old?.map((r: any) => (r.id === updated.id ? { ...r, ...updated } : r)) ?? []
            )

            return { previousData }
        },
        onError: (_, __, ctx) => {
            if (ctx?.previousData) {
                utils.resume.getUserResumes.setData(undefined, ctx.previousData)
            }
        },
        onSuccess: () => {
            utils.resume.getUserResumes.invalidate()
        },
    })

    // 🗑️ Eliminar CV
    const {
        mutate: deleteResume,
        isLoading: isDeletingResume,
        error: deleteResumeError,
    } = trpc.resume.deleteResume.useMutation({
        onMutate: async ({ id }) => {
            await utils.resume.getUserResumes.cancel()
            const previousData = utils.resume.getUserResumes.getData()

            utils.resume.getUserResumes.setData(undefined, (old) =>
                old?.filter((r: any) => r.id !== id) ?? []
            )

            return { previousData }
        },
        onError: (_, __, ctx) => {
            if (ctx?.previousData) {
                utils.resume.getUserResumes.setData(undefined, ctx.previousData)
            }
        },
        onSuccess: () => {
            utils.resume.getUserResumes.invalidate()
        },
    })

    return {
        // Datos
        resumes,
        resumeById,

        // Acciones
        getResumeById,
        createResume,
        updateResume,
        deleteResume,

        // Estados de carga
        isLoadingResumes,
        isCreatingResume,
        isUpdatingResume,
        isDeletingResume,
        isFetchingResume,

        // Errores
        createResumeError,
        updateResumeError,
        deleteResumeError,
        getResumesError,
        getResumeError,
    }
}
