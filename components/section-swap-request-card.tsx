"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Check, X, Clock, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface SectionSwapRequest {
  id: string
  currentBranch: string
  currentSection: string
  targetSection: string
  status: "pending" | "matched" | "completed" | "expired" | "cancelled"
  matchedWith?: string
  matchedAt?: string
  completedAt?: string
  expiresAt?: string
  createdAt: string
}

interface SectionSwapRequestCardProps {
  request: SectionSwapRequest
}

export default function SectionSwapRequestCard({ request }: SectionSwapRequestCardProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  // Calculate time remaining for matched requests
  const getTimeRemaining = (expiresAt?: string) => {
    if (!expiresAt) return null

    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()

    if (diff <= 0) return "Expired"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m remaining`
  }

  const handleAccept = async () => {
    setIsLoading(true)
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Swap Accepted",
        description: "You have accepted the section swap",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept section swap",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecline = async () => {
    setIsLoading(true)
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Swap Declined",
        description: "You have declined the section swap",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline section swap",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    setIsLoading(true)
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Request Cancelled",
        description: "Your section swap request has been cancelled",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel section swap request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Determine status badge color and icon
  const getStatusBadge = () => {
    switch (request.status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "matched":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            Matched
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="default" className="flex items-center gap-1 bg-primary">
            <Check className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Expired
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <X className="h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
    >
      <Card
        className={`sci-fi-card ${isHovered ? "border-primary/30" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <motion.h3 className="font-medium" animate={request.status === "matched" ? { color: "#62ba9b" } : {}}>
                  {request.currentSection} → {request.targetSection}
                </motion.h3>
                {getStatusBadge()}
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Branch: {request.currentBranch}</p>
                <p>Created: {formatDate(request.createdAt)}</p>

                {request.matchedWith && request.status === "matched" && (
                  <>
                    <p>Matched with: {request.matchedWith}</p>
                    <p>Matched at: {formatDate(request.matchedAt!)}</p>
                    {request.expiresAt && (
                      <motion.p
                        className="text-primary font-medium"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        {getTimeRemaining(request.expiresAt)}
                      </motion.p>
                    )}
                  </>
                )}

                {request.completedAt && <p>Completed: {formatDate(request.completedAt)}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              {request.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="sci-fi-button"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel Request
                </Button>
              )}

              {request.status === "matched" && !request.completedAt && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="sci-fi-button"
                    onClick={handleDecline}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" className="sci-fi-button sci-fi-glow" onClick={handleAccept} disabled={isLoading}>
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
