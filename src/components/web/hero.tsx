"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionContainer } from "./section-container"
import { Button } from "@/components/ui/button"

export function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  }

  return (
    <SectionContainer>
      <motion.div className="grid max-w-[900px]" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <motion.div
              className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              variants={itemVariants}
            >
             Las ofertas varían, tu CV también debería hacerlo.
            </motion.div>

            <motion.h1
              className="text-3xl mb-4 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              Crea y adapta tu CV a cada postulación en minutos con IA
            </motion.h1>

            <motion.p className="max-w-[600px] text-muted-foreground md:text-xl" variants={itemVariants}>
              Genera múltiples versiones de tu CV en segundos, personaliza cada detalle y exporta en PDF con un solo
              clic.
            </motion.p>
          </div>

          <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={itemVariants}>
            <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
              <Button className="py-6 w-full min-[400px]:w-auto relative overflow-hidden group">
                <Link href="/login" className="flex items-center">
                  <span className="relative z-10">Empieza Gratis Ahora</span>
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
              <Button variant="outline" className="py-6 w-full min-[400px]:w-auto group">
                <Link href="#how-it-works" className="flex items-center">
                  <span>Cómo Funciona</span>
                  <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <ChevronRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  )
}

