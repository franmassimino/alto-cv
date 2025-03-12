import { cn } from "@/lib/utils"
import type React from "react"

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SectionContainer({ children, className, ...props }: SectionContainerProps) {
  return (
    <div className={cn("w-full py-[7.5%] px-[5%]", className)} {...props}>
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </div>
  )
}

