"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageSquare, Lock } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface Teacher {
  id: string
  name: string
  department: string
  subjects: string[]
  rating: number
  reviewCount: number
  image: string
}

interface TeacherCardProps {
  teacher: Teacher
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const isPremium = user?.role === "premium" || user?.role === "admin"

  const handleReviewClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to write a review",
        variant: "destructive",
      })
    }
  }

  const handleViewReviews = () => {
    if (!isPremium) {
      toast({
        title: "Premium Required",
        description: "Upgrade to premium to view teacher reviews",
        variant: "destructive",
      })
    }
  }

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className={`sci-fi-card transition-all duration-300 ${isHovered ? "transform-gpu border-primary/30" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Avatar className="h-16 w-16 border-2 border-primary/30">
                <AvatarImage src={teacher.image || "/placeholder.svg"} alt={teacher.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(teacher.name)}</AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <h3 className="text-xl font-bold">{teacher.name}</h3>
              <p className="text-muted-foreground">{teacher.department}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span className="ml-1 font-medium">{teacher.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({teacher.reviewCount} {teacher.reviewCount === 1 ? "review" : "reviews"})
              </span>
              {!isPremium && (
                <Badge variant="outline" className="ml-auto">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {teacher.subjects.map((subject) => (
                <motion.div
                  key={subject}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-6 pt-0">
          <Button variant="outline" className="sci-fi-button" onClick={handleReviewClick} asChild={!!user}>
            {user ? (
              <Link href={`/teachers/${teacher.id}/review`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Write Review
              </Link>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 mr-2" />
                Write Review
              </>
            )}
          </Button>

          <Button className="sci-fi-button" onClick={handleViewReviews} asChild={isPremium}>
            {isPremium ? (
              <Link href={`/teachers/${teacher.id}`}>View Reviews</Link>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                View Reviews
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
