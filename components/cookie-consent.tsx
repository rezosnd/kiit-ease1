"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Cookie, X, Check } from "lucide-react"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="container mx-auto px-4 py-4 mb-4">
            <div className="sci-fi-card p-4 backdrop-blur-sm border border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-800/50 rounded-full border border-primary/30 mr-4">
                    <Cookie className="h-5 w-5 text-primary" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-300">
                      We use cookies to enhance your experience. By continuing to visit this site, you agree to our use
                      of cookies.{" "}
                      <Link href="/privacy" className="text-primary hover:underline sci-fi-text-glow">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBanner(false)}
                    className="border-primary/30 hover:bg-gray-800/50 group"
                  >
                    <X className="h-4 w-4 mr-1 group-hover:text-primary" />
                    Decline
                  </Button>

                  <Button size="sm" onClick={acceptCookies} className="sci-fi-button group">
                    <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-700 h-full bg-primary/20"></span>
                    <Check className="h-4 w-4 mr-1 relative z-10" />
                    <span className="relative z-10">Accept</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
