"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import { Check, AlertCircle } from "lucide-react"
import Script from "next/script"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PremiumPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to upgrade to premium",
        variant: "destructive",
      })
      router.push("/login?callbackUrl=/premium")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      // Create order on the server
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 499, // ₹499
          plan: "semester",
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create payment order")
      }

      const data = await response.json()
      const { order } = data

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "KIITease",
        description: "Premium Subscription - One Semester",
        order_id: order.id,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#62ba9b",
        },
        handler: async (response: any) => {
          try {
            // Verify payment on the server
            const verifyResponse = await fetch("/api/payments/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            if (!verifyResponse.ok) {
              const error = await verifyResponse.json()
              throw new Error(error.message || "Payment verification failed")
            }

            toast({
              title: "Payment Successful",
              description: "Your account has been upgraded to premium!",
            })

            // Redirect to dashboard or profile
            router.push("/profile")
          } catch (error: any) {
            setError(error.message || "Payment verification failed")
          }
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      setError(error.message || "Failed to process payment")
    } finally {
      setIsProcessing(false)
    }
  }

  const premiumFeatures = [
    "Access all teacher reviews",
    "Download and upload study notes",
    "Priority in section swapping",
    "Enhanced referral rewards",
    "Ad-free experience",
  ]

  return (
    <div className="sci-fi-container">
      <Navbar />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Upgrade to Premium</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get access to all features and enhance your academic experience at KIIT University
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="sci-fi-card overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-8 md:p-12">
                  <CardTitle className="text-3xl font-bold mb-4">Premium Membership</CardTitle>
                  <CardDescription className="text-muted-foreground mb-6">
                    One semester of premium access to all features
                  </CardDescription>
                  <ul className="space-y-3 mb-6">
                    {premiumFeatures.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="sci-fi-button sci-fi-glow w-full"
                    onClick={handlePayment}
                    disabled={isProcessing || isLoading}
                  >
                    {isProcessing ? "Processing..." : "Upgrade Now - ₹499"}
                  </Button>
                </div>
                <div className="flex-1 bg-gradient-to-br from-primary/20 to-primary/5 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">₹499</div>
                    <div className="text-muted-foreground">per semester</div>
                    <div className="sci-fi-divider"></div>
                    <div className="text-sm text-muted-foreground">One-time payment, no recurring charges</div>
                    <div className="mt-6 text-xs text-muted-foreground">
                      Secure payment powered by <span className="font-medium text-primary">Razorpay</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            By upgrading, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  )
}
