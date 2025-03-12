"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Settings, User, ChevronLeft, ChevronRight, Edit } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "../../ui/theme-toggle"
import { useState } from "react"

export function LeftSidebar({ session }: any) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)


  const navItems = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Editor",
      href: "/dashboard/editor",
      icon: Edit,
    },
    {
      title: "Plantillas",
      href: "/dashboard/templates",
      icon: FileText,
    },
  ]

  const bottomNavItems = [
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={cn("h-screen border-r bg-muted/50 transition-all duration-300", open ? "w-64" : "w-16")}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        {open &&
          <div className="flex items-center justify-center gap-2">
            <Link href={'/'}>
              <div className={cn("flex items-center cursor-pointer font-bold", open ? "text-xl" : "text-xs")}>
                <span className="text-primary">ALTO</span>
                <span className={open ? "block" : "hidden"}>CV</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        }
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full cursor-pointer p-1 hover:bg-muted"
          aria-label={open ? "Cerrar sidebar" : "Abrir sidebar"}
        >
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
        <nav className="space-y-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className={open ? "block" : "hidden"}>{item.title}</span>
            </Link>
          ))}
        </nav>

        <nav className="space-y-1 p-2 border-t">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className={open ? "block" : "hidden"}>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

