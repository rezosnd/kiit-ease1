import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user is premium
    if (session.user.role !== "premium" && session.user.role !== "admin") {
      return NextResponse.json({ message: "Premium subscription required" }, { status: 403 })
    }

    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid note ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Get note
    const note = await db.collection("notes").findOne({ _id: new ObjectId(id) })

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 })
    }

    // Increment download count
    await db.collection("notes").updateOne({ _id: new ObjectId(id) }, { $inc: { downloads: 1 } })

    // Return the file URL
    return NextResponse.json({
      success: true,
      fileUrl: note.fileUrl,
    })
  } catch (error: any) {
    console.error("Error downloading note:", error)
    return NextResponse.json({ message: error.message || "Failed to download note" }, { status: 500 })
  }
}
