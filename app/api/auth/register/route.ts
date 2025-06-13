import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { hashPassword, generateToken, generateReferralCode } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, referralCode } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate unique referral code
    const userReferralCode = generateReferralCode(name)

    // Create user
    const newUser = {
      name,
      email,
      passwordHash: hashedPassword,
      role: "free",
      referralCode: userReferralCode,
      referredBy: referralCode || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertOne(newUser)

    // Process referral if provided
    if (referralCode) {
      const referrer = await db.collection("users").findOne({ referralCode })

      if (referrer) {
        // Create referral record
        await db.collection("referrals").insertOne({
          referrerId: referrer._id,
          referredId: result.insertedId,
          status: "pending", // Will be updated to "completed" when the referred user upgrades to premium
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }

    // Generate JWT token
    const token = generateToken({
      userId: result.insertedId.toString(),
      email,
      role: "free",
    })

    // Create user object to return (without password)
    const user = {
      id: result.insertedId.toString(),
      name,
      email,
      role: "free",
      referralCode: userReferralCode,
    }

    // Set cookie with JWT token
    const response = NextResponse.json({ message: "User registered successfully", user }, { status: 201 })

    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
