import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { CVData } from "@/lib/types"

interface PersonalInfoSectionProps {
  personalInfo: CVData['personalInfo']
  updatePersonalInfo: (field: string, value: string) => void
}

export function PersonalInfoSection({ personalInfo, updatePersonalInfo }: PersonalInfoSectionProps) {
  return (
    <Card className="card-enhanced">
      <CardHeader className="bg-card">
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={personalInfo.name}
              onChange={(e) => updatePersonalInfo("name", e.target.value)}
              placeholder="Juan Pérez"
              className="transition-all focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="juan@ejemplo.com"
              className="transition-all focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              placeholder="+34 123 456 789"
              className="transition-all focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Ciudad, País</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo("location", e.target.value)}
              placeholder="Madrid, España"
              className="transition-all focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin || ""}
              onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              placeholder="linkedin.com/in/juanperez"
              className="transition-all focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={personalInfo.github || ""}
              onChange={(e) => updatePersonalInfo("github", e.target.value)}
              placeholder="github.com/juanperez"
              className="transition-all focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Sitio Web</Label>
            <Input
              id="website"
              value={personalInfo.website || ""}
              onChange={(e) => updatePersonalInfo("website", e.target.value)}
              placeholder="juanperez.com"
              className="transition-all focus:border-primary"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}