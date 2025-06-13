"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface AddReviewFormProps {
  teacherId: string
  teacherName: string
}

export default function AddReviewForm({ teacherId, teacherName }: AddReviewFormProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState<number>(5)
  const [subject, setSubject] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock subjects - in production, these would come from the teacher's data
  const subjects = ["Data Structures", "Algorithms", "Programming Fundamentals"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !subject || !comment.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In production, this would be an API call
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Review submitted",
        description: `Your review for ${teacherName} has been submitted successfully.`,
      })

      // Reset form
      setRating(5)
      setSubject("")
      setComment("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <Card className="sci-fi-card">
        <CardContent className="p-8 text-center">
          <p>Please log in to submit a review.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sci-fi-card">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Add Review</h3>
        <p>Add review for {teacherName}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" onClick={() => setRating(value)} className="focus:outline-none">
                  <Star
                    className={`h-8 w-8 ${value <= rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
              <span className="ml-2 font-medium">{rating}/5</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Review</Label>
            <Textarea
              id="comment"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          <Button type="submit" className="sci-fi-button w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Note: Free users can submit reviews but only premium users can view reviews.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
