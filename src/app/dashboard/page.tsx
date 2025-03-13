import Home from "@/components/dashboard/home"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth()
  
  return (
    <Home session={session} />
  )
}

