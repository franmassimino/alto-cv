import Link from "next/link"
import { Check } from "lucide-react"
import { SectionContainer } from "./section-container"

export function Pricing() {
  return (
    <SectionContainer id="pricing" className="bg-primary/10">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Elige el plan que impulse tu carrera
        </h2>
        <p className="max-w-[85%] text-muted-foreground md:text-xl">
          Desde la versión gratuita hasta opciones premium con personalización avanzada y análisis de optimización.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
        <PricingCard
          title="Plan Gratis"
          price="€0"
          period="para siempre"
          features={[
            "Genera y edita tu primer CV con IA",
            "Exportación en PDF",
            "Plantillas básicas",
            "Almacenamiento de 1 CV",
          ]}
          buttonText="Empieza Gratis"
        />
        <PricingCard
          title="Plan Premium"
          price="€9.99"
          period="por mes"
          features={[
            "Crea múltiples versiones de tu CV",
            "Integración con LinkedIn y otras fuentes",
            "Plantillas premium y personalizables",
            "Análisis de optimización para ATS",
            "Almacenamiento ilimitado de CVs",
          ]}
          buttonText="Activa Premium"
          popular
        />
      </div>
    </SectionContainer>
  )
}

function PricingCard({ title, price, period, features, buttonText, popular = false }: unknown) {
  return (
    <div className={`relative bg-background flex flex-col rounded-2xl p-6 shadow-lg`}>
      {popular && (
        <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Popular
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="text-right">
          <div className="text-4xl font-bold">{price}</div>
          <div className="text-sm text-muted-foreground">{period}</div>
        </div>
      </div>
      <ul className="my-6 space-y-4">
        {features.map((feature: unknown, index: unknown) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <Link
          href="#"
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

