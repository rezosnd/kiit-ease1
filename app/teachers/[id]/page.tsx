import { Card, CardContent } from "@/components/ui/card"
import TeacherRatingChart from "@/components/teacher-rating-chart"
import TeacherReviewsList from "@/components/teacher-reviews-list"
import AddReviewForm from "@/components/add-review-form"

export default function TeacherDetailsPage({ params }: { params: { id: string } }) {
  // Mock data
  const teacher = {
    id: params.id,
    name: "Dr. Anita Sharma",
    rating: 4.7,
    reviewCount: 124,
    ratings: [
      { rating: 5, count: 80 },
      { rating: 4, count: 30 },
      { rating: 3, count: 10 },
      { rating: 2, count: 3 },
      { rating: 1, count: 1 },
    ],
  }

  return (
    <div className="container py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold">{teacher.name}</h1>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TeacherRatingChart
            ratings={teacher.ratings}
            totalReviews={teacher.reviewCount}
            averageRating={teacher.rating}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <TeacherReviewsList teacherId={teacher.id} />
            <AddReviewForm teacherId={teacher.id} teacherName={teacher.name} />
          </div>
        </div>
      </div>
    </div>
  )
}
