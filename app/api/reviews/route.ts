import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { teacherId, rating, comment, subject } = await req.json()

    if (!teacherId || !rating || !comment || !subject) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Check if teacher exists
    const teacher = await db.collection("teachers").findOne({ _id: new ObjectId(teacherId) })

    if (!teacher) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 })
    }

    // Check if user has already reviewed this teacher for this subject
    const existingReview = await db.collection("reviews").findOne({
      teacherId: new ObjectId(teacherId),
      userId: session.user.id,
      subject,
    })

    if (existingReview) {
      return NextResponse.json({ message: "You have already reviewed this teacher for this subject" }, { status: 409 })
    }

    // Create review
    const result = await db.collection("reviews").insertOne({
      teacherId: new ObjectId(teacherId),
      userId: session.user.id,
      userName: session.user.name,
      userImage: session.user.image,
      rating,
      comment,
      subject,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Update teacher rating
    const allReviews = await db
      .collection("reviews")
      .find({ teacherId: new ObjectId(teacherId) })
      .toArray()
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / allReviews.length

    await db.collection("teachers").updateOne(
      { _id: new ObjectId(teacherId) },
      {
        $set: {
          rating: Number.parseFloat(averageRating.toFixed(1)),
          reviewCount: allReviews.length,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      reviewId: result.insertedId,
    })
  } catch (error: any) {
    console.error("Error submitting review:", error)
    return NextResponse.json({ message: error.message || "Failed to submit review" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is premium or admin
    if (session.user.role !== "premium" && session.user.role !== "admin") {
      return NextResponse.json({ message: "Premium subscription required" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const teacherId = searchParams.get("teacherId")

    if (!teacherId) {
      return NextResponse.json({ message: "Teacher ID is required" }, { status: 400 })
    }

    if (!ObjectId.isValid(teacherId)) {
      return NextResponse.json({ message: "Invalid teacher ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Get reviews
    const reviews = await db
      .collection("reviews")
      .find({ teacherId: new ObjectId(teacherId) })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: reviews,
    })
  } catch (error: any) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch reviews" }, { status: 500 })
  }
}
