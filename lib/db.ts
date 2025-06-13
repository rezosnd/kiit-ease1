// lib/db.ts
import { MongoClient, Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined")
}

const uri = process.env.MONGODB_URI
const options = {}

// Global variables for serverless connection preservation
declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

// Serverless-friendly client promise
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Traditional connection handler with caching
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await clientPromise
  const db = client.db("kiitease")

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export default clientPromise

