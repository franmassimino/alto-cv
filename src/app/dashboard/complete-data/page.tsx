"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { emptyCVData } from '@/lib/defaults'
import { CVData } from '@/lib/types'

const CompleteDataPage = () => {
  const searchParams = useSearchParams()
  const source = searchParams.get('source')
  const [loading, setLoading] = useState(!!source)
  const [formData, setFormData] = useState<CVData>(emptyCVData)

  useEffect(() => {
    if (source) {
      // Simulate loading data from LinkedIn or PDF
      const loadData = async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000))

          // For demo purposes, we'll just set some sample data
          if (source === 'linkedin') {
            setFormData({
              ...emptyCVData,
              personalInfo: {
                ...emptyCVData.personalInfo,
                name: "LinkedIn User",
                email: "linkedin.user@example.com",
                linkedin: "linkedin.com/in/linkedinuser"
              }
            })
          } else if (source === 'pdf') {
            setFormData({
              ...emptyCVData,
              personalInfo: {
                ...emptyCVData.personalInfo,
                name: "PDF User",
                email: "pdf.user@example.com"
              }
            })
          }

          setLoading(false)
        } catch (error) {
          console.error("Error loading data:", error)
          setLoading(false)
        }
      }

      loadData()
    }
  }, [source])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith('personalInfo.')) {
      const field = name.split('.')[1]
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [field]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically save the data to your backend
    alert("Profile updated successfully!")
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-semibold">Loading your data from {source}...</h2>
        <p className="text-muted-foreground">Please wait while we process your information</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Complete your professional profile</h1>
      <p className="text-muted-foreground mb-6">Complete your professional information to create your CV.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                name="personalInfo.name"
                placeholder="E.g. Juan Pérez"
                value={formData.personalInfo.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="personalInfo.email"
                placeholder="E.g. juan.perez@email.com"
                value={formData.personalInfo.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                name="personalInfo.phone"
                placeholder="E.g. +34 612 345 678"
                value={formData.personalInfo.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                name="personalInfo.location"
                placeholder="E.g. Madrid, España"
                value={formData.personalInfo.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn (optional)</label>
              <Input
                name="personalInfo.linkedin"
                placeholder="E.g. linkedin.com/in/yourprofile"
                value={formData.personalInfo.linkedin}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub (optional)</label>
              <Input
                name="personalInfo.github"
                placeholder="E.g. github.com/yourusername"
                value={formData.personalInfo.github}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Website (optional)</label>
              <Input
                name="personalInfo.website"
                placeholder="E.g. yourwebsite.com"
                value={formData.personalInfo.website}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
            <CardDescription>Briefly describe your professional background and expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Textarea
                name="summary"
                placeholder="E.g. Full Stack Developer with 5 years of experience in creating web and mobile applications..."
                className="min-h-[120px]"
                value={formData.summary}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Note: Experience, Education, Skills and Custom Sections would be added here */}

        <div className="flex justify-end">
          <Button type="submit" size="lg">Save profile</Button>
        </div>
      </form>
    </div >
  )
}

export default CompleteDataPage