import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const CvPreviewDialog = ({ isPreviewOpen, togglePreview, content }: { isPreviewOpen: boolean, togglePreview: () => void, content: string }) => {
    const [loading, setLoading] = useState(false);

    // Function to replace unsupported color functions (like 'oklch') with supported ones
    const sanitizeContentForPDF = (content: string) => {
        // Replace any 'oklch' color functions with a valid fallback (like 'rgb()')
        return content.replace(/oklch\([^\)]+\)/g, 'rgb(0, 0, 0)'); // Replace with a fallback color
    };

    const exportToPDF = () => {
        // Sanitize the content before passing it to html2pdf
        const sanitizedContent = sanitizeContentForPDF(content);

        const element = document.createElement('div');
        element.innerHTML = sanitizedContent;

        setLoading(true);
        console.log("Exporting PDF...");

    };

    return (
        <Dialog open={isPreviewOpen} onOpenChange={togglePreview}>
            <DialogContent className="max-w-[1200px] w-full h-[90vh] p-0 flex flex-col">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="text-xl font-semibold">Vista Previa del CV</DialogTitle>
                </DialogHeader>

                <ScrollArea className="px-4 pb-4 overflow-auto flex-1">
                    <div className="prose" dangerouslySetInnerHTML={{ __html: content || "<p>Sin contenido</p>" }} />
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
