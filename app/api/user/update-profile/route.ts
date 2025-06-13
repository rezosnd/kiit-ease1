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

    const { branch, year, section, phone } = await req.json()

    // Validate required fields
    if (!branch || !year || !section) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate phone number format if provided
    if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json({ message: "Invalid phone number format" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Update user profile
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          branch,
          year,
          section,
          phone,
          onboardingCompleted: true,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ message: error.message || "Failed to update profile" }, { status: 500 })
  }
}
