"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreVertical, Star, MessageSquare } from "lucide-react"

// Mock data for reviews
const reviews = [
  {
    id: "1",
    teacherName: "Dr. Anita Sharma",
    teacherDepartment: "Computer Science",
    subject: "Data Structures",
    rating: 4.8,
    content: "Excellent teacher! Explains concepts clearly and is always willing to help students.",
    reviewedBy: "Rahul Kumar",
    reviewDate: "2023-10-15",
  },
  {
    id: "2",
    teacherName: "Prof. Rajesh Kumar",
    teacherDepartment: "Information Technology",
    subject: "Database Management",
    rating: 4.5,
    content: "Good teaching style, but assignments can be challenging. Overall a knowledgeable professor.",
    reviewedBy: "Priya Sharma",
    reviewDate: "2023-11-02",
  },
  {
    id: "3",
    teacherName: "Dr. Priya Patel",
    teacherDepartment: "Computer Science",
    subject: "Operating Systems",
    rating: 4.7,
    content: "Very thorough in explanations. Makes complex topics easy to understand.",
    reviewedBy: "Amit Kumar",
    reviewDate: "2023-09-28",
  },
  {
    id: "4",
    teacherName: "Prof. Vikram Singh",
    teacherDepartment: "CSSE",
    subject: "Software Engineering",
    rating: 4.3,
    content: "Practical approach to teaching. Focuses on real-world applications.",
    reviewedBy: "Neha Singh",
    reviewDate: "2023-10-10",
  },
  {
    id: "5",
    teacherName: "Dr. Meera Gupta",
    teacherDepartment: "CSCE",
    subject: "Artificial Intelligence",
    rating: 4.9,
    content: "Brilliant professor! Her lectures are engaging and she's very knowledgeable in the field.",
    reviewedBy: "Vikram Reddy",
    reviewDate: "2023-11-15",
  },
]

export default function AdminReviewsList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter reviews based on search term
  const filteredReviews = reviews.filter(
    (review) =>
      review.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.teacherDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()),
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

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`h-4 w-4 ${i <= rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />,
      )
    }
    return <div className="flex">{stars}</div>
  }

  return (
    <Card className="sci-fi-card">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle>Reviews Management</CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reviews..."
              className="pl-8 sci-fi-input w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="sci-fi-card border-border/40">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={review.teacherName} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(review.teacherName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.teacherName}</div>
                        <div className="text-xs text-muted-foreground">
                          {review.teacherDepartment} • {review.subject}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>

                    <div className="text-sm mb-2">
                      <MessageSquare className="h-4 w-4 inline mr-2 text-muted-foreground" />
                      {review.content}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Reviewed by {review.reviewedBy} on {formatDate(review.reviewDate)}
                    </div>
                  </div>

                  <div className="flex items-start">
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
                        <DropdownMenuItem>Edit Review</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Review</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredReviews.length}</strong> of <strong>{reviews.length}</strong> reviews
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
      </CardContent>
    </Card>
  )
}
