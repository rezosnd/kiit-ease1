import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const department = searchParams.get("department")
    const subject = searchParams.get("subject")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const { db } = await connectToDatabase()

    // Build query
    const query: any = {}

    if (department) query.department = department
    if (subject) query.subjects = { $in: [subject] }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { subjects: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Get total count
    const total = await db.collection("teachers").countDocuments(query)

    // Get teachers with pagination
    const teachers = await db
      .collection("teachers")
      .find(query)
      .sort({ rating: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      success: true,
      data: {
        teachers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error: any) {
    console.error("Error fetching teachers:", error)
    return NextResponse.json({ message: error.message || "Failed to fetch teachers" }, { status: 500 })
  }
}
