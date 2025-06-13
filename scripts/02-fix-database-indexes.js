import { MongoClient } from "mongodb"

// This script fixes the database indexes for KIITease
async function fixDatabaseIndexes() {
  console.log("Fixing KIITease database indexes...")

  // Connect to MongoDB
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://rehansuman41008:qU5sgnrCY0q8i2rn@kiitease.kcndzbn.mongodb.net/kiitease?retryWrites=true&w=majority&appName=KIITease"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("kiitease")

    // Drop problematic index
    try {
      await db.collection("users").dropIndex("phone_1")
      console.log("Dropped problematic phone index")
    } catch (error) {
      console.log("Error dropping phone index (might not exist):", error)
    }

    // Recreate index with sparse option
    await db.collection("users").createIndex({ phone: 1 }, { unique: true, sparse: true })
    console.log("Created new phone index with sparse option")

    // Check other indexes
    const userIndexes = await db.collection("users").indexes()
    console.log("Current user collection indexes:", userIndexes)

    console.log("Database indexes fixed successfully!")
  } catch (error) {
    console.error("Error fixing database indexes:", error)
  } finally {
    await client.close()
    console.log("Database connection closed")
  }
}

fixDatabaseIndexes()
