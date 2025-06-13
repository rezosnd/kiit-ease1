import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"
import { verifyRazorpayPayment } from "@/lib/razorpay"
import { sendPaymentSuccessEmail } from "@/lib/email-service"
import { ObjectId } from "mongodb"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ message: "Missing payment details" }, { status: 400 })
    }

    // Verify payment signature
    const isValid = verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!isValid) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Update payment status
    const payment = await db.collection("payments").findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        $set: {
          paymentId: razorpay_payment_id,
          status: "completed",
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )

    if (!payment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 })
    }

    // Calculate premium validity (6 months from now)
    const premiumUntil = new Date()
    premiumUntil.setMonth(premiumUntil.getMonth() + 6)

    // Update user role to premium
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          role: "premium",
          premiumUntil,
          updatedAt: new Date(),
        },
      },
    )

    // Send payment success email
    await sendPaymentSuccessEmail({
      name: session.user.name!,
      email: session.user.email!,
      plan: payment.plan,
      amount: payment.amount,
      validUntil: premiumUntil,
      transactionId: razorpay_payment_id,
    })

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      premiumUntil,
    })
  } catch (error: any) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ message: error.message || "Failed to verify payment" }, { status: 500 })
  }
}
