import { LeftSidebar } from "@/components/dashboard/sidebar/sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth()
    if (!session) redirect('/login')

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar izquierda */}
            <LeftSidebar />

            {/* Contenido principal (Editor y Chat de IA ahora están en EditorPage) */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}
