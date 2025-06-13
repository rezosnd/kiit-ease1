"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, RefreshCw, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SwapRequest {
  id: string
  userName: string
  userEmail: string
  currentBranch: string
  currentSection: string
  targetSection: string
  status: "pending" | "matched" | "completed" | "expired" | "cancelled"
  matchedWith?: string
  matchedWithName?: string
  matchedAt?: string
  completedAt?: string
  expiresAt?: string
  createdAt: string
}

export default function AdminSwapsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRunningMatcher, setIsRunningMatcher] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSwapRequests()
  }, [])

  const fetchSwapRequests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/section-swap/list")
      if (!response.ok) {
        throw new Error("Failed to fetch swap requests")
      }
      const data = await response.json()
      setSwapRequests(data.requests)
    } catch (error) {
      console.error("Error fetching swap requests:", error)
      toast({
        title: "Error",
        description: "Failed to load swap requests",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const runMatcher = async () => {
    setIsRunningMatcher(true)
    try {
      const response = await fetch("/api/section-swap/run-matcher", {
        method: "POST",
      })
      if (!response.ok) {
        throw new Error("Failed to run matcher")
      }
      const data = await response.json()
      toast({
        title: "Matcher Run Successfully",
        description: data.message,
      })
      // Refresh the list
      fetchSwapRequests()
    } catch (error) {
      console.error("Error running matcher:", error)
      toast({
        title: "Error",
        description: "Failed to run matcher",
        variant: "destructive",
      })
    } finally {
      setIsRunningMatcher(false)
    }
  }

  // Filter swap requests based on search term
  const filteredRequests = swapRequests.filter(
    (request) =>
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.currentBranch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.currentSection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.targetSection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "matched":
        return <Badge variant="secondary">Matched</Badge>
      case "completed":
        return <Badge className="bg-primary">Completed</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="sci-fi-card">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle>Section Swap Requests</CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="pl-8 sci-fi-input w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="sci-fi-button" onClick={runMatcher} disabled={isRunningMatcher}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRunningMatcher ? "animate-spin" : ""}`} />
            Run Matcher
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : swapRequests.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Swap Requests</h3>
            <p className="text-muted-foreground">There are no section swap requests in the system.</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Request</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Matched With</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="border-t">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium">{request.userName}</div>
                            <div className="text-xs text-muted-foreground">{request.userEmail}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="font-medium">{request.currentSection}</span>
                            <span className="mx-2">→</span>
                            <span className="font-medium">{request.targetSection}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{request.currentBranch}</div>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                        <td className="px-4 py-3 text-sm">{formatDate(request.createdAt)}</td>
                        <td className="px-4 py-3 text-sm">{request.matchedWithName ? request.matchedWithName : "-"}</td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Find Match</DropdownMenuItem>
                              <DropdownMenuItem>Force Match</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Cancel Request</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredRequests.length}</strong> of <strong>{swapRequests.length}</strong> requests
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="sci-fi-button">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="sci-fi-button">
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
