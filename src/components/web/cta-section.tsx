import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { SectionContainer } from "./section-container"

export function CTASection() {
  return (
    <SectionContainer>
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Haz que cada oportunidad cuente</h2>
        <p className="max-w-[85%] text-muted-foreground md:text-xl">
          No dejes que un solo CV limite tus oportunidades. Adapta tu perfil profesional en minutos y destaca en cada
          postulación.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Crea tu CV Perfecto Ahora
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionContainer>
  )
}

