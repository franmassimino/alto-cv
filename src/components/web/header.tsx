import Link from "next/link"
import { ThemeToggle } from "../ui/theme-toggle"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full px-[5%] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex max-w-[1200px] mx-auto  h-16 items-center justify-between">
        <div className="flex items-center font-bold text-xl">
          <span className="text-primary">ALTO</span>
          <span>CV</span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button>
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}