import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

const CvPreviewDialog = ({ isPreviewOpen, togglePreview, content }: { isPreviewOpen: boolean, togglePreview: () => void, content: string }) => {
    const [loading, setLoading] = useState(false);

    const exportToPDF = async () => {
        setLoading(true);
        try {
            // Implementar la lógica de exportación a PDF
        } catch (error) {
            console.error('Error al exportar a PDF:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isPreviewOpen} onOpenChange={togglePreview}>
            <DialogContent className="max-w-[1200px] w-full h-[90vh] p-0 flex flex-col">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="text-xl font-semibold">Vista Previa del CV</DialogTitle>
                </DialogHeader>

                <ScrollArea className="px-4 pb-4 overflow-auto flex-1">
                    <div className="prose max-w-none">
                        <ReactMarkdown>{content || "Sin contenido"}</ReactMarkdown>
                    </div>
                </ScrollArea>

                <DialogFooter className="p-4 border-t">
                    <Button onClick={togglePreview} variant="outline" className="mr-2">Cerrar</Button>
                    <Button onClick={exportToPDF} disabled={loading}>
                        {loading ? "Generando PDF..." : "Bajar PDF"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CvPreviewDialog;
