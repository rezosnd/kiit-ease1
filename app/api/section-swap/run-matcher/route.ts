import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { findMatchingSwapRequests, expireOldMatches } from "@/lib/section-swap-matcher"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Only admins can manually run the matcher
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // First expire old matches
    const expiredCount = await expireOldMatches()

    // Then find new matches
    const matches = await findMatchingSwapRequests()

    return NextResponse.json({
      success: true,
      expiredCount,
      matchesFound: matches.length,
      message: `Successfully expired ${expiredCount} old matches and found ${matches.length} new matches.`,
    })
  } catch (error: any) {
    console.error("Error running section swap matcher:", error)
    return NextResponse.json({ message: error.message || "Failed to run matcher" }, { status: 500 })
  }
}
