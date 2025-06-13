"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  userId: string
  userName: string
  userImage?: string
  rating: number
  comment: string
  subject: string
  createdAt: string
}

export default function TeacherReviewsList({ teacherId }: { teacherId: string }) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // In production, this would fetch from your API
        // For now, we'll use mock data
        const mockReviews = [
          {
            id: "1",
            userId: "user1",
            userName: "Rahul Sharma",
            userImage: "/placeholder.svg?height=40&width=40",
            rating: 5,
            comment: "Excellent teacher! Explains concepts very clearly and is always willing to help.",
            subject: "Data Structures",
            createdAt: "2023-05-15T10:30:00Z",
          },
          {
            id: "2",
            userId: "user2",
            userName: "Priya Patel",
            userImage: "/placeholder.svg?height=40&width=40",
            rating: 4,
            comment: "Very knowledgeable and helpful. Sometimes the assignments are too difficult though.",
            subject: "Algorithms",
            createdAt: "2023-06-20T14:15:00Z",
          },
          {
            id: "3",
            userId: "user3",
            userName: "Amit Kumar",
            userImage: "/placeholder.svg?height=40&width=40",
            rating: 5,
            comment: "One of the best teachers in the department. Makes complex topics easy to understand.",
            subject: "Programming Fundamentals",
            createdAt: "2023-07-05T09:45:00Z",
          },
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setReviews(mockReviews)
        setLoading(false)
      } catch (err) {
        setError("Failed to load reviews")
        setLoading(false)
      }
    }

    fetchReviews()
  }, [teacherId])

  // Check if user is premium or admin
  const canViewReviews = user && (user.role === "premium" || user.role === "admin")

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse text-center">
          <p>Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!canViewReviews) {
    return (
      <Card className="sci-fi-card">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Premium Feature</h3>
          <p className="mb-6">
            Teacher reviews are only visible to premium users. Upgrade to premium to view all reviews.
          </p>
          <Button className="sci-fi-button">Upgrade to Premium</Button>
        </CardContent>
      </Card>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card className="sci-fi-card">
        <CardContent className="p-8 text-center">
          <p>No reviews yet. Be the first to review this teacher!</p>
        </CardContent>
      </Card>
    )
  }

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        <p>Reviews for teacher {teacherId}</p>
      </CardContent>
    </Card>
  )
}
