import { MongoClient } from "mongodb"

// This script sets up the MongoDB database for KIITease
async function setupDatabase() {
  console.log("Setting up KIITease database...")

  // Connect to MongoDB
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://rehansuman41008:qU5sgnrCY0q8i2rn@kiitease.kcndzbn.mongodb.net/kiitease?retryWrites=true&w=majority&appName=KIITease"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("kiitease")

    // Drop existing collections and indexes to avoid conflicts
    try {
      const collections = await db.listCollections().toArray()
      for (const collection of collections) {
        await db.collection(collection.name).drop()
      }
      console.log("Dropped existing collections")
    } catch (error) {
      console.log("No existing collections to drop or error dropping collections:", error)
    }

    // Create collections with validation
    console.log("Creating collections...")

    // Users collection
    await db.createCollection("users")
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ referralCode: 1 }, { unique: true })
    await db.collection("users").createIndex({ role: 1 })

    // Teachers collection
    await db.createCollection("teachers")
    await db.collection("teachers").createIndex({ email: 1 }, { unique: true })
    await db.collection("teachers").createIndex({ department: 1 })

    // Reviews collection
    await db.createCollection("reviews")
    await db.collection("reviews").createIndex({ teacherId: 1 })
    await db.collection("reviews").createIndex({ userId: 1 })
    await db.collection("reviews").createIndex({ teacherId: 1, userId: 1, subject: 1 }, { unique: true })

    // Notes collection
    await db.createCollection("notes")
    await db.collection("notes").createIndex({ branch: 1, year: 1, subject: 1 })
    await db.collection("notes").createIndex({ userId: 1 })

    // Section swaps collection
    await db.createCollection("sectionSwapRequests")
    await db.collection("sectionSwapRequests").createIndex({ userId: 1 })
    await db.collection("sectionSwapRequests").createIndex({ status: 1 })
    await db.collection("sectionSwapRequests").createIndex({ currentBranch: 1, currentSection: 1, targetSection: 1 })

    // Completed swaps collection
    await db.createCollection("completedSwaps")
    await db.collection("completedSwaps").createIndex({ user1Id: 1 })
    await db.collection("completedSwaps").createIndex({ user2Id: 1 })

    // Referrals collection
    await db.createCollection("referrals")
    await db.collection("referrals").createIndex({ referrerId: 1 })
    await db.collection("referrals").createIndex({ referredId: 1 })

    // Payments collection
    await db.createCollection("payments")
    await db.collection("payments").createIndex({ userId: 1 })
    await db.collection("payments").createIndex({ transactionId: 1 }, { sparse: true })

    console.log("Database setup completed successfully!")
  } catch (error) {
    console.error("Error setting up database:", error)
  } finally {
    await client.close()
    console.log("Database connection closed")
  }
}

setupDatabase()
