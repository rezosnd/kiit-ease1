"use client"

import { Card, CardContent } from "@/components/ui/card"

interface Rating {
  rating: number
  count: number
}

interface TeacherRatingChartProps {
  ratings: Rating[]
  totalReviews: number
  averageRating: number
}

export default function TeacherRatingChart({ ratings, totalReviews, averageRating }: TeacherRatingChartProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Rating Distribution</h3>
        <p>Average Rating: {averageRating.toFixed(1)}</p>
        <p>Total Reviews: {totalReviews}</p>
      </CardContent>
    </Card>
  )
}
