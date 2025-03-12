'use client'

import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Error during sign-in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Button variant="outline" onClick={handleSignIn}>
        {isLoading ?
          <Loader2 className="animate-spin" /> :
          <img src="/assets/google.webp" alt="Google Logo" className="h-4 w-4" />
        }
        Acceder con Google
      </Button>
    </div>
  )
}
