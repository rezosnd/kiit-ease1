"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the User type
interface User {
  id: string
  name: string
  email: string
  role: "free" | "premium" | "admin"
  image?: string
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  googleLogin: () => Promise<void>
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In production, this would be an API call to check session
        // For now, we'll check localStorage for demo purposes
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In production, this would be an API call
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: "123",
        name: "Demo User",
        email: email,
        role: "premium", // For demo purposes
        image: "/placeholder.svg?height=32&width=32",
      }

      // Store user in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Google login function
  const googleLogin = async () => {
    setLoading(true)
    try {
      // In production, this would redirect to Google OAuth
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: "456",
        name: "Google User",
        email: "google.user@example.com",
        role: "premium", // For demo purposes
        image: "/placeholder.svg?height=32&width=32",
      }

      // Store user in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Google login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setLoading(true)
    try {
      // In production, this would be an API call
      // For now, we'll just clear localStorage
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, googleLogin }}>{children}</AuthContext.Provider>
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
