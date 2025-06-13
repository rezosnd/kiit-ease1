"use client"

import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2, Users, Gift, AlertCircle } from "lucide-react"
import ReferralCard from "@/components/referral-card"

// Mock data for referrals
const referrals = [
  {
    id: "1",
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    joinedAt: "2023-11-10T14:20:00Z",
    status: "premium",
    reward: "7 days premium",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    joinedAt: "2023-11-15T09:45:00Z",
    status: "free",
    reward: "pending",
  },
  {
    id: "3",
    name: "Amit Singh",
    email: "amit.singh@example.com",
    joinedAt: "2023-10-28T16:30:00Z",
    status: "premium",
    reward: "7 days premium",
  },
]

export default function ReferralsPage() {
  const referralCode = "KIIT2023REF"
  const referralLink = `https://kiitease.com/register?ref=${referralCode}`

  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Referrals</h1>
            <p className="text-muted-foreground">Invite friends and earn rewards</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="sci-fi-card">
              <CardHeader>
                <CardTitle>Your Referral Code</CardTitle>
                <CardDescription>Share this code with your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Input value={referralCode} readOnly className="sci-fi-input pr-10 font-mono text-center" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => {
                        navigator.clipboard.writeText(referralCode)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>

                  <div className="relative">
                    <Input value={referralLink} readOnly className="sci-fi-input pr-10 font-mono text-xs" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => {
                        navigator.clipboard.writeText(referralLink)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>

                  <Button className="w-full sci-fi-button sci-fi-glow">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Referral Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="sci-fi-card mt-6">
              <CardHeader>
                <CardTitle>Referral Rewards</CardTitle>
                <CardDescription>Benefits you earn for successful referrals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Free User Referral</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn 3 days of premium access when a referred user signs up
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Premium User Referral</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn 7 days of premium access when a referred user upgrades to premium
                      </p>
                    </div>
                  </div>

                  <div className="sci-fi-divider"></div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Your total earned premium days</p>
                    <div className="text-3xl font-bold text-primary">14 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="sci-fi-card">
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
                <CardDescription>Track the status of your referrals</CardDescription>
              </CardHeader>
              <CardContent>
                {referrals.length > 0 ? (
                  <div className="space-y-4">
                    {referrals.map((referral) => (
                      <ReferralCard key={referral.id} referral={referral} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Referrals Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your referral code with friends to start earning rewards
                    </p>
                    <Button className="sci-fi-button sci-fi-glow">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Your Code
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
