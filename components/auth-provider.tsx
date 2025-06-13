"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode
  session?: any // Use proper session type from next-auth if available
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {children}
    </SessionProvider>
  )
}

