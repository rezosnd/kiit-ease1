import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const branch = searchParams.get("branch")
    const year = searchParams.get("year")
    const subject = searchParams.get("subject")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const { db } = await connectToDatabase()

    // Build query
    const query: any = {}

    if (branch) query.branch = branch
    if (year) query.year = year
    if (subject) query.subject = subject
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    // Get total count
    const total = await db.collection("notes").countDocuments(query)

    // Get notes with pagination
    const notes = await db
      .collection("notes")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      success: true,
      data: {
        notes,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error: any) {
    console.error("Error fetching notes:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch notes" }, { status: 500 })
  }
}
