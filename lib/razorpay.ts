import crypto from "crypto"

export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  created_at: number
}

export async function createRazorpayOrder(amount: number, receipt: string): Promise<RazorpayOrder> {
  const url = "https://api.razorpay.com/v1/orders"
  const username = process.env.RAZORPAY_KEY_ID!
  const password = process.env.RAZORPAY_KEY_SECRET!

  const auth = Buffer.from(`${username}:${password}`).toString("base64")

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to create Razorpay order: ${error.error.description}`)
  }

  return response.json()
}

export function verifyRazorpayPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
): boolean {
  const text = `${razorpay_order_id}|${razorpay_payment_id}`
  const secret = process.env.RAZORPAY_KEY_SECRET!
  const generatedSignature = crypto.createHmac("sha256", secret).update(text).digest("hex")

  return generatedSignature === razorpay_signature
}
