"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface RecentSwap {
  id: string
  user1: string
  user2: string
  branch: string
  fromSection: string
  toSection: string
  completedAt: string
}

export default function RecentSwaps() {
  const [recentSwaps, setRecentSwaps] = useState<RecentSwap[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchRecentSwaps = async () => {
      try {
        const response = await fetch("/api/section-swap/recent")
        if (!response.ok) {
          throw new Error("Failed to fetch recent swaps")
        }
        const data = await response.json()
        setRecentSwaps(data.swaps)
      } catch (error) {
        console.error("Error fetching recent swaps:", error)
        toast({
          title: "Error",
          description: "Failed to load recent swaps",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentSwaps()
  }, [toast])

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`
    }
  }

  return (
    <Card className="sci-fi-card">
      <CardHeader>
        <CardTitle>Recent Successful Swaps</CardTitle>
        <CardDescription>Recently completed section swaps</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : recentSwaps.length > 0 ? (
          <div className="space-y-4">
            {recentSwaps.map((swap) => (
              <div key={swap.id} className="flex items-center justify-between border-b border-border/40 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {swap.fromSection} ↔ {swap.toSection}
                    </span>
                    <span className="text-xs text-muted-foreground">({swap.branch})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {swap.user1} swapped with {swap.user2}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{formatTimeAgo(swap.completedAt)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">No recent swaps found</div>
        )}
      </CardContent>
    </Card>
  )
}
