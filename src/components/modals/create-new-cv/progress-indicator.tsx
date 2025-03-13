import React from "react"
import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  return (
    <div className="w-full flex items-center justify-center mt-4 ">
      <div className="flex items-center w-[200px]">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                className={cn("flex-1 h-1 mx-2", currentStep > index ? "bg-primary" : "bg-muted")}
                aria-hidden="true"
              />
            )}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep >= index + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1">{labels[index]}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

