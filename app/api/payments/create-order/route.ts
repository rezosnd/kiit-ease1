import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"
import { createRazorpayOrder } from "@/lib/razorpay"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { amount, plan } = await req.json()

    if (!amount || !plan) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Generate a unique receipt ID
    const receipt = `receipt_${Date.now()}_${session.user.id}`

    // Create Razorpay order
    const order = await createRazorpayOrder(amount, receipt)

    // Store order in database
    const { db } = await connectToDatabase()
    await db.collection("payments").insertOne({
      userId: session.user.id,
      orderId: order.id,
      amount,
      plan,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error("Error creating payment order:", error)
    return NextResponse.json({ message: error.message || "Failed to create payment order" }, { status: 500 })
  }
}
