import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"
import { uploadFile } from "@/lib/cloudinary"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is premium
    if (session.user.role !== "premium" && session.user.role !== "admin") {
      return NextResponse.json({ message: "Premium subscription required" }, { status: 403 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const subject = formData.get("subject") as string
    const branch = formData.get("branch") as string
    const year = formData.get("year") as string
    const description = (formData.get("description") as string) || ""

    if (!file || !title || !subject || !branch || !year) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate file type (PDF only)
    if (file.type !== "application/pdf") {
      return NextResponse.json({ message: "Only PDF files are allowed" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ message: "File size exceeds 10MB limit" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload file to Cloudinary
    const fileUrl = await uploadFile(buffer, "kiitease/notes")

    // Store note in database
    const { db } = await connectToDatabase()
    const result = await db.collection("notes").insertOne({
      title,
      subject,
      branch,
      year,
      description,
      userId: session.user.id,
      userName: session.user.name,
      fileUrl,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileType: "PDF",
      downloads: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Note uploaded successfully",
      noteId: result.insertedId,
    })
  } catch (error: any) {
    console.error("Error uploading note:", error)
    return NextResponse.json({ message: error.message || "Failed to upload note" }, { status: 500 })
  }
}
