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

    const { branch, year, section, phone, referralCode } = await req.json()

    // Validate required fields
    if (!branch || !year || !section) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate phone number format if provided
    if (phone && !/^\+?[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json({ message: "Invalid phone number format" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Process referral code if provided
    let referredBy = null
    if (referralCode) {
      // Check if referral code exists and is not the user's own code
      const referrer = await db.collection("users").findOne({ referralCode })

      if (!referrer) {
        return NextResponse.json({ message: "Invalid referral code" }, { status: 400 })
      }

      if (referrer._id.toString() === session.user.id) {
        return NextResponse.json({ message: "You cannot use your own referral code" }, { status: 400 })
      }

      referredBy = referralCode

      // Create referral record
      await db.collection("referrals").insertOne({
        referrerId: referrer._id,
        referredId: new ObjectId(session.user.id),
        status: "pending", // Will be updated to "completed" when the referred user upgrades to premium
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      // Give referrer 3 days of premium access for the referral
      const premiumUntil = referrer.premiumUntil || new Date()
      if (premiumUntil < new Date()) {
        premiumUntil.setDate(new Date().getDate() + 3) // 3 days from now
      } else {
        premiumUntil.setDate(premiumUntil.getDate() + 3) // 3 more days
      }

      await db.collection("users").updateOne(
        { _id: referrer._id },
        {
          $set: {
            role: "premium",
            premiumUntil,
            updatedAt: new Date(),
          },
        },
      )
    }

    // Update user profile
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          branch,
          year,
          section,
          phone,
          referredBy,
          onboardingCompleted: true,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({
      success: true,
      message: "Profile completed successfully",
    })
  } catch (error: any) {
    console.error("Error completing profile:", error)
    return NextResponse.json({ message: error.message || "Failed to complete profile" }, { status: 500 })
  }
}
