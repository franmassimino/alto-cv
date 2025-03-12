import Login from "@/components/login"
import { auth } from "@/lib/auth/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <Login />
  )
}

