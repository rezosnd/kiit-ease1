// lib/auth-config.ts
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/db" // Updated import
import { generateReferralCode } from "@/lib/auth"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "free",
          referralCode: generateReferralCode(profile.name),
          onboardingCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role || "free"
        session.user.referralCode = user.referralCode
        session.user.onboardingCompleted = user.onboardingCompleted || false
        session.user.branch = user.branch
        session.user.year = user.year
        session.user.section = user.section
        session.user.phone = user.phone
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "database", // Required for MongoDB adapter
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET!,
}
