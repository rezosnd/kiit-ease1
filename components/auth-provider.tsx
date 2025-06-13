"use client"

import { SessionProvider, useSession } from "next-auth/react"
import type { ReactNode } from "react"

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

// Create and export useAuth hook
export function useAuth() {
  const { data: session } = useSession()
  return {
    user: session?.user,
    status: session ? "authenticated" : "unauthenticated"
  }
}
