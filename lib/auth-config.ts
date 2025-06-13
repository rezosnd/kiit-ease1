// lib/auth-config.ts
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/db"
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
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role || "free"
        session.user.referralCode = token.referralCode
        session.user.onboardingCompleted = token.onboardingCompleted || false
        session.user.branch = token.branch
        session.user.year = token.year
        session.user.section = token.section
        session.user.phone = token.phone
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        token.role = user.role || "free"
        token.referralCode = user.referralCode
        token.onboardingCompleted = user.onboardingCompleted || false
        token.branch = user.branch
        token.year = user.year
        token.section = user.section
        token.phone = user.phone
      }
      return token
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET!,
}

