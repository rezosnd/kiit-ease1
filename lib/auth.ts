import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

// Generate a unique referral code
export function generateReferralCode(name: string): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  const namePrefix = name.substring(0, 3).toUpperCase()
  return `${namePrefix}${timestamp}${randomStr}`.toUpperCase()
}

// Generate JWT token
export function generateToken(payload: object): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set")
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" })
}

// Verify JWT token
export function verifyToken(token: string): object | null {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set")
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

// Get user from request (Next.js API Route or Middleware)
export async function getUserFromRequest(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value
    if (!token) return null

    const decoded = verifyToken(token)
    return decoded
  } catch {
    return null
  }
}

