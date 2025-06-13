import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-config"

export async function POST(req: Request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    const data = await req.json()

    // Validate required fields
    const { name, department, subjects, email, qualification } = data
    if (!name || !department || !subjects || !email || !qualification) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create teacher document
    const teacher = {
      name,
      department,
      subjects: Array.isArray(subjects) ? subjects : [subjects],
      email,
      qualification,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert into database
    const result = await db.collection("teachers").insertOne(teacher)

    return NextResponse.json({
      success: true,
      message: "Teacher added successfully",
      data: { teacherId: result.insertedId },
    })
  } catch (error: any) {
    console.error("Error adding teacher:", error)
    return NextResponse.json({ message: error.message || "Failed to add teacher" }, { status: 500 })
  }
}
