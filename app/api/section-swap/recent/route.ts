import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase()

    // Get recent completed swaps
    const recentSwaps = await db.collection("completedSwaps").find().sort({ completedAt: -1 }).limit(10).toArray()

    // Format the data for display
    const formattedSwaps = recentSwaps.map((swap) => ({
      id: swap._id.toString(),
      user1: swap.user1Name,
      user2: swap.user2Name,
      branch: swap.branch,
      fromSection: swap.section1,
      toSection: swap.section2,
      completedAt: swap.completedAt,
    }))

    return NextResponse.json({
      success: true,
      swaps: formattedSwaps,
    })
  } catch (error: any) {
    console.error("Error fetching recent swaps:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch recent swaps" }, { status: 500 })
  }
}
