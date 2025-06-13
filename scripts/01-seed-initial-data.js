import { MongoClient } from "mongodb"
import { hash } from "bcryptjs"

// This script seeds the database with initial data for KIITease
async function seedDatabase() {
  console.log("Seeding KIITease database with initial data...")

  // Connect to MongoDB
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://rehansuman41008:qU5sgnrCY0q8i2rn@kiitease.kcndzbn.mongodb.net/kiitease?retryWrites=true&w=majority&appName=KIITease"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("kiitease")

    // Seed admin user
    console.log("Seeding admin user...")
    const adminPasswordHash = await hash("admin123", 12)

    await db.collection("users").insertOne({
      name: "Admin User",
      email: "admin@kiitease.com",
      passwordHash: adminPasswordHash,
      role: "admin",
      referralCode: "ADMIN2023",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Seed teachers
    console.log("Seeding teachers...")
    const teachers = [
      {
        name: "Dr. Anita Sharma",
        department: "Computer Science",
        subjects: ["Data Structures", "Algorithms"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Prof. Rajesh Kumar",
        department: "Information Technology",
        subjects: ["Database Management", "Web Development"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dr. Priya Patel",
        department: "Computer Science",
        subjects: ["Operating Systems", "Computer Networks"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Prof. Vikram Singh",
        department: "CSSE",
        subjects: ["Software Engineering", "Project Management"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dr. Meera Gupta",
        department: "CSCE",
        subjects: ["Artificial Intelligence", "Machine Learning"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const teacherResult = await db.collection("teachers").insertMany(teachers)
    const teacherIds = Object.values(teacherResult.insertedIds)

    // Seed users
    console.log("Seeding users...")
    const userPasswordHash = await hash("password123", 12)

    const users = [
      {
        name: "Rahul Kumar",
        email: "rahul@example.com",
        passwordHash: userPasswordHash,
        role: "premium",
        referralCode: "RAHU2023",
        premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Priya Sharma",
        email: "priya@example.com",
        passwordHash: userPasswordHash,
        role: "free",
        referralCode: "PRIY2023",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Amit Singh",
        email: "amit@example.com",
        passwordHash: userPasswordHash,
        role: "premium",
        referralCode: "AMIT2023",
        premiumUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const userResult = await db.collection("users").insertMany(users)
    const userIds = Object.values(userResult.insertedIds)

    // Seed reviews
    console.log("Seeding reviews...")
    const reviews = [
      {
        teacherId: teacherIds[0],
        userId: userIds[0],
        subject: "Data Structures",
        rating: 4.8,
        content: "Excellent teacher! Explains concepts clearly and is always willing to help students.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teacherId: teacherIds[1],
        userId: userIds[1],
        subject: "Database Management",
        rating: 4.5,
        content: "Good teaching style, but assignments can be challenging. Overall a knowledgeable professor.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        teacherId: teacherIds[2],
        userId: userIds[2],
        subject: "Operating Systems",
        rating: 4.7,
        content: "Very thorough in explanations. Makes complex topics easy to understand.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("reviews").insertMany(reviews)

    // Seed notes
    console.log("Seeding notes...")
    const notes = [
      {
        title: "Data Structures and Algorithms Complete Notes",
        subject: "Data Structures",
        branch: "CSE",
        year: "2nd Year",
        userId: userIds[0],
        fileUrl: "https://example.com/notes/dsa.pdf",
        fileSize: "2.4 MB",
        fileType: "PDF",
        downloads: 342,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Database Management Systems Handwritten Notes",
        subject: "DBMS",
        branch: "IT",
        year: "3rd Year",
        userId: userIds[1],
        fileUrl: "https://example.com/notes/dbms.pdf",
        fileSize: "3.1 MB",
        fileType: "PDF",
        downloads: 256,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Operating Systems Concepts and Examples",
        subject: "Operating Systems",
        branch: "CSE",
        year: "2nd Year",
        userId: userIds[2],
        fileUrl: "https://example.com/notes/os.pdf",
        fileSize: "1.8 MB",
        fileType: "PDF",
        downloads: 189,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("notes").insertMany(notes)

    // Seed section swap requests
    console.log("Seeding section swap requests...")
    const sectionSwapRequests = [
      {
        userId: userIds[0],
        currentBranch: "CSE",
        currentSection: "CSE 12",
        targetSection: "CSE 5",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[1],
        currentBranch: "CSE",
        currentSection: "CSE 5",
        targetSection: "CSE 12",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("sectionSwapRequests").insertMany(sectionSwapRequests)

    // Seed referrals
    console.log("Seeding referrals...")
    const referrals = [
      {
        referrerId: userIds[0],
        referredId: userIds[1],
        status: "completed",
        rewardType: "premium_days",
        rewardAmount: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("referrals").insertMany(referrals)

    // Seed payments
    console.log("Seeding payments...")
    const payments = [
      {
        userId: userIds[0],
        amount: 499,
        status: "completed",
        paymentMethod: "razorpay",
        transactionId: "pay_123456789",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[2],
        amount: 499,
        status: "completed",
        paymentMethod: "razorpay",
        transactionId: "pay_987654321",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("payments").insertMany(payments)

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
    console.log("Database connection closed")
  }
}

seedDatabase()
