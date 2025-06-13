import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Only admins can access this endpoint
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    // Get all swap requests with user details
    const requests = await db
      .collection("sectionSwapRequests")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            id: { $toString: "$_id" },
            userName: "$user.name",
            userEmail: "$user.email",
            currentBranch: 1,
            currentSection: 1,
            targetSection: 1,
            status: 1,
            matchedWith: { $toString: "$matchedWith" },
            matchedWithName: 1,
            matchedAt: 1,
            completedAt: 1,
            expiresAt: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray()

    return NextResponse.json({
      success: true,
      requests,
    })
  } catch (error: any) {
    console.error("Error fetching swap requests:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch swap requests" }, { status: 500 })
  }
}
