import { Clock, Settings } from "lucide-react";

const CvSkeleton = () => (
    <div className="rounded-lg border bg-card overflow-hidden transition-transform duration-200 hover:scale-[1.01]">
        {/* Simulación de la imagen del CV */}
        <div className="py-4 bg-muted flex items-center justify-center">
            <div className="h-[210px] w-[170px] bg-gray-200 rounded-sm"></div>
        </div>

        {/* Contenido de la Card */}
        <div className="p-4 space-y-2">
            {/* Título del CV */}
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>

            {/* Última edición */}
            <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1 text-gray-400" />
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 mt-3">
                <div className="h-8 bg-gray-100 rounded w-full"></div>
                <div className="h-8 bg-gray-100 rounded w-9 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-gray-400" />
                </div>
            </div>
        </div>
    </div>
);

export default CvSkeleton;
