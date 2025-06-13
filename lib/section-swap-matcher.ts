import { connectToDatabase } from "@/lib/db"
import { ObjectId } from "mongodb"
import { sendSwapMatchEmail } from "@/lib/email-service"

export async function findAndMatchSwapRequests() {
  const { db } = await connectToDatabase()
  const swapCollection = db.collection("section_swaps")
  const userCollection = db.collection("users")

  // Get all pending swap requests with user details including role
  const pendingRequests = await swapCollection
    .aggregate([
      { $match: { status: "pending" } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          userId: 1,
          userName: "$user.name",
          userEmail: "$user.email",
          userPhone: "$user.phone",
          userRole: "$user.role", // Include user role
          branch: 1,
          currentSection: 1,
          targetSection: 1,
          status: 1,
          createdAt: 1,
        },
      },
      // Sort by role (premium first) and then by creation date
      { $sort: { userRole: -1, createdAt: 1 } },
    ])
    .toArray()

  console.log(`Found ${pendingRequests.length} pending swap requests`)

  // Group requests by branch
  const requestsByBranch = {}
  pendingRequests.forEach((request) => {
    const { branch } = request
    if (!requestsByBranch[branch]) {
      requestsByBranch[branch] = []
    }
    requestsByBranch[branch].push(request)
  })

  let matchCount = 0
  const matchedPairs = []

  // Process each branch separately
  for (const branch in requestsByBranch) {
    const branchRequests = requestsByBranch[branch]

    // Create maps for faster lookup
    const fromSectionMap = {}

    // First pass: build the maps
    branchRequests.forEach((request) => {
      const { currentSection, targetSection } = request

      if (!fromSectionMap[currentSection]) {
        fromSectionMap[currentSection] = []
      }

      fromSectionMap[currentSection].push(request)
    })

    // Second pass: find matches
    for (const request of branchRequests) {
      // Skip if already matched
      if (request.status !== "pending") continue

      const { currentSection, targetSection, userId } = request

      // Find potential matches: someone who wants to move from our target to our current section
      const potentialMatches = fromSectionMap[targetSection] || []

      for (const potentialMatch of potentialMatches) {
        // Skip if already matched or if it's the same user
        if (potentialMatch.status !== "pending" || potentialMatch.userId === userId) continue

        // Check if this is a valid match
        if (potentialMatch.targetSection === currentSection) {
          // We found a match!
          const matchId = new ObjectId()
          const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

          // Update both requests
          await swapCollection.updateOne(
            { _id: request._id },
            {
              $set: {
                status: "matched",
                matchId,
                matchedWith: potentialMatch.userId,
                matchedWithName: potentialMatch.userName,
                matchedWithEmail: potentialMatch.userEmail,
                matchedWithPhone: potentialMatch.userPhone || null,
                expiresAt,
                updatedAt: new Date(),
              },
            },
          )

          await swapCollection.updateOne(
            { _id: potentialMatch._id },
            {
              $set: {
                status: "matched",
                matchId,
                matchedWith: userId,
                matchedWithName: request.userName,
                matchedWithEmail: request.userEmail,
                matchedWithPhone: request.userPhone || null,
                expiresAt,
                updatedAt: new Date(),
              },
            },
          )

          // Send email notifications
          await sendSwapMatchEmail({
            name: request.userName,
            email: request.userEmail,
            currentSection: currentSection,
            targetSection: targetSection,
            matchedWithName: potentialMatch.userName,
            matchedWithPhone: potentialMatch.userPhone || null,
            expiresAt,
          })

          await sendSwapMatchEmail({
            name: potentialMatch.userName,
            email: potentialMatch.userEmail,
            currentSection: potentialMatch.currentSection,
            targetSection: potentialMatch.targetSection,
            matchedWithName: request.userName,
            matchedWithPhone: request.userPhone || null,
            expiresAt,
          })

          matchCount++
          matchedPairs.push({
            user1: {
              id: userId,
              name: request.userName,
              email: request.userEmail,
              phone: request.userPhone || null,
              role: request.userRole,
              currentSection,
              targetSection,
            },
            user2: {
              id: potentialMatch.userId,
              name: potentialMatch.userName,
              email: potentialMatch.userEmail,
              phone: potentialMatch.userPhone || null,
              role: potentialMatch.userRole,
              currentSection: potentialMatch.currentSection,
              targetSection: potentialMatch.targetSection,
            },
            matchId,
            expiresAt,
          })

          // Break the inner loop as we've found a match for this request
          break
        }
      }
    }
  }

  console.log(`Created ${matchCount} new matches`)
  return { matchCount, matchedPairs }
}

export async function checkExpiredMatches() {
  const { db } = await connectToDatabase()
  const swapCollection = db.collection("section_swaps")

  // Find all matched requests that have expired
  const expiredMatches = await swapCollection
    .find({
      status: "matched",
      expiresAt: { $lt: new Date() },
    })
    .toArray()

  console.log(`Found ${expiredMatches.length} expired matches`)

  // Group by matchId
  const matchGroups = {}
  expiredMatches.forEach((match) => {
    if (!matchGroups[match.matchId]) {
      matchGroups[match.matchId] = []
    }
    matchGroups[match.matchId].push(match)
  })

  let expiredCount = 0

  // Process each match group
  for (const matchId in matchGroups) {
    const matches = matchGroups[matchId]

    // Update all requests in this match group back to pending
    for (const match of matches) {
      await swapCollection.updateOne(
        { _id: match._id },
        {
          $set: {
            status: "pending",
            matchId: null,
            matchedWith: null,
            matchedWithName: null,
            matchedWithEmail: null,
            matchedWithPhone: null,
            expiresAt: null,
            updatedAt: new Date(),
          },
        },
      )
    }

    expiredCount++
  }

  console.log(`Reset ${expiredCount} expired matches`)
  return { expiredCount }
}
