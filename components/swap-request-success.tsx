"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, ArrowRightLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"

interface SwapRequestSuccessProps {
  branch: string
  currentSection: string
  targetSection: string
  onClose: () => void
}

export default function SwapRequestSuccess({
  branch,
  currentSection,
  targetSection,
  onClose,
}: SwapRequestSuccessProps) {
  const { user } = useAuth()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      onClose()
    }
  }, [countdown, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
    >
      <Card className="sci-fi-card max-w-md w-full">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto mb-4"
          >
            <CheckCircle className="h-16 w-16 text-primary" />
          </motion.div>
          <CardTitle className="text-2xl">Request Submitted!</CardTitle>
          <CardDescription>Your section swap request has been submitted successfully</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-lg font-medium">
            <Badge variant="outline" className="sci-fi-badge">
              {branch}
            </Badge>
            <div className="flex items-center">
              <span>{currentSection}</span>
              <ArrowRightLeft className="mx-2 h-4 w-4" />
              <span>{targetSection}</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>Your request will be matched with other students looking for a swap</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>You'll receive an email notification when a match is found</span>
              </li>
              {user?.role === "premium" ? (
                <li className="flex items-start gap-2">
                  <Badge variant="default" className="h-5 sci-fi-badge">
                    Premium
                  </Badge>
                  <span>As a premium user, your request has higher priority in matching</span>
                </li>
              ) : (
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="h-5 sci-fi-badge">
                    Free
                  </Badge>
                  <span>Premium users get priority matching. Consider upgrading for faster results!</span>
                </li>
              )}
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={onClose} className="sci-fi-button w-full">
            Close ({countdown})
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
