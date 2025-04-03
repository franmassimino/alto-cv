"use client"

import { trpc } from "@/lib/trpc"
import { useEffect, useState } from "react"

export const useShowPersonalDataModal = () => {
  const [dismissed, setDismissed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDismissed = localStorage.getItem("personalDataModalDismissed") === "true"
      setDismissed(isDismissed)
    }
  }, []) 

  const { data, isLoading } = trpc.personalData.checkPersonalData.useQuery()
  const hasPersonalData = data?.exists

  const shouldShow = (!dismissed && data?.exists === false) || modalOpen

  const dismiss = () => {
    localStorage.setItem("personalDataModalDismissed", "true")
    setDismissed(true)
    setModalOpen(false)
  }

  const openModal = () =>  setModalOpen(true)

  return { 
    shouldShow, 
    dismiss,
    openModal,
    loading: isLoading,
    hasPersonalData,
    isDataIncomplete: data?.exists === false
  }
}
