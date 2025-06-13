import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { sendSwapAcceptedEmail } from "@/lib/email-service"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { requestId } = await req.json()

    if (!requestId) {
      return NextResponse.json({ message: "Request ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Find the swap request
    const swapRequest = await db.collection("sectionSwapRequests").findOne({
      _id: new ObjectId(requestId),
      userId: new ObjectId(session.user.id),
      status: "matched",
    })

    if (!swapRequest) {
      return NextResponse.json({ message: "Swap request not found or not in matched state" }, { status: 404 })
    }

    // Find the matched request
    const matchedRequest = await db.collection("sectionSwapRequests").findOne({
      userId: swapRequest.matchedWith,
      matchedWith: new ObjectId(session.user.id),
      status: "matched",
    })

    if (!matchedRequest) {
      return NextResponse.json({ message: "Matched request not found" }, { status: 404 })
    }

    // Update both requests to completed status
    const completedAt = new Date()

    await db.collection("sectionSwapRequests").updateOne(
      { _id: new ObjectId(requestId) },
      {
        $set: {
          status: "completed",
          completedAt,
          updatedAt: new Date(),
        },
      },
    )

    await db.collection("sectionSwapRequests").updateOne(
      { _id: matchedRequest._id },
      {
        $set: {
          status: "completed",
          completedAt,
          updatedAt: new Date(),
        },
      },
    )

    // Get user details for emails
    const user = await db.collection("users").findOne({ _id: new ObjectId(session.user.id) })
    const matchedUser = await db.collection("users").findOne({ _id: matchedRequest.userId })

    if (user && matchedUser) {
      // Send acceptance emails to both users
      await sendSwapAcceptedEmail({
        name: user.name,
        email: user.email,
        currentSection: swapRequest.currentSection,
        targetSection: swapRequest.targetSection,
        matchedWithName: matchedUser.name,
      })

      await sendSwapAcceptedEmail({
        name: matchedUser.name,
        email: matchedUser.email,
        currentSection: matchedRequest.currentSection,
        targetSection: matchedRequest.targetSection,
        matchedWithName: user.name,
      })
    }

    // Create a record of the completed swap for public display
    await db.collection("completedSwaps").insertOne({
      user1Id: new ObjectId(session.user.id),
      user1Name: user?.name || "User",
      user2Id: matchedRequest.userId,
      user2Name: matchedUser?.name || "User",
      branch: swapRequest.currentBranch,
      section1: swapRequest.currentSection,
      section2: swapRequest.targetSection,
      completedAt,
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Section swap completed successfully",
    })
  } catch (error: any) {
    console.error("Error accepting section swap:", error)
    return NextResponse.json({ message: error.message || "Failed to accept swap" }, { status: 500 })
  }
}
