"use client"

import { useRef } from "react"
import { Check } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { SectionContainer } from "./section-container"

export function ProblemSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

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

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2 + i * 0.1,
      },
    }),
  }

  const checkVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.4,
      },
    },
  }

  const problems = [
    {
      title: "Personalización limitada",
      description: "Un CV genérico no resalta tus habilidades específicas para cada posición.",
    },
    {
      title: "Tiempo perdido",
      description: "Adaptar manualmente tu CV para cada postulación consume horas valiosas. No seas tu propio enemigo.",
    },
    {
      title: "Menos oportunidades",
      description: "Los sistemas ATS filtran CVs que no contienen las palabras clave específicas del puesto.",
    },
  ]

  return (
    <div className="bg-primary/10">
      <SectionContainer className="bg-primary/10 relative overflow-hidden">
        <motion.div
          className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          ref={sectionRef}
        >
          <motion.h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" variants={textVariants}>
            Un solo CV no es suficiente para destacar
          </motion.h2>
          <motion.p className="text-muted-foreground md:text-xl" variants={textVariants}>
            Cada trabajo es distinto y tu CV debería adaptarse a cada oportunidad. Pero hacerlo manualmente es tedioso,
            y enviar siempre el mismo documento puede hacerte perder oportunidades clave.
          </motion.p>
        </motion.div>

        <motion.ul 
          className="flex flex-col md:flex-row items-center justify-around gap-4 mt-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {problems.map((problem, index) => (
            <motion.li
              key={index}
              className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full md:w-1/3 text-center"
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
                <div className="flex items-center flex-col justify-center gap-3 mb-2">
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    variants={checkVariants}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold">{problem.title}</h3>
                </div>
                <p className="text-muted-foreground">{problem.description}</p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Background decoration */}
        <motion.div
          className="absolute -z-10 top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
      </SectionContainer>
    </div>
  )
}

