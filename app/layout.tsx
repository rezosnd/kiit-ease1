import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import CustomCursor from "@/components/custom-cursor"
import { Footer } from "@/components/footer"
import Navbar from "@/components/navbar"
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
})

export const metadata: Metadata = {
  title: "KIITease - KIIT University Platform",
  description: "A platform for KIIT University students and faculty",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmMono.variable} font-mono min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CustomCursor />
            <div className="bg"></div>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
