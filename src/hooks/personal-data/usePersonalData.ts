import { trpc } from "@/lib/trpc"

export const usePersonalData = () => {
    const utils = trpc.useContext()

    // Obtener datos personales
    const {
        data: personalData,
        isLoading: isLoadingPersonalData,
        error: getError,
    } = trpc.personalData.getPersonalData.useQuery()

    // Verificar si existen datos personales
    const {
        data: checkData,
        isLoading: isChecking,
        error: checkError,
    } = trpc.personalData.checkPersonalData.useQuery()

    const hasPersonalData = checkData?.exists ?? false

    // Actualizar / crear datos personales
    const {
        mutate: updatePersonalData,
        isLoading: isUpdating,
        error: updateError,
    } = trpc.personalData.updatePersonalData.useMutation({
        onSuccess: () => {
            utils.personalData.getPersonalData.invalidate()
            utils.personalData.checkPersonalData.invalidate()
        },
    })

    return {
        // Datos
        personalData,
        hasPersonalData,

        // Estados
        isLoadingPersonalData,
        isChecking,
        isUpdating,

        // Mutaciones
        updatePersonalData,

        // Errores
        getError,
        checkError,
        updateError,
    }
}
