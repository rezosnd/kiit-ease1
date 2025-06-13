"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import Footer from "@/components/footer"

const formSchema = z.object({
  branch: z.string().min(1, { message: "Please select your branch" }),
  year: z.string().min(1, { message: "Please select your year" }),
  section: z.string().min(1, { message: "Please select your section" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional(),
})

export default function ProfilePage() {
  const { user, loading, updateUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: "",
      year: "",
      section: "",
      phone: "",
    },
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }

    if (user) {
      form.reset({
        branch: user.branch || "",
        year: user.year || "",
        section: user.section || "",
        phone: user.phone || "",
      })
    }
  }, [user, loading, router, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const data = await response.json()

      // Update user in context
      updateUser({
        ...user,
        branch: values.branch,
        year: values.year,
        section: values.section,
        phone: values.phone,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="sci-fi-container">
        <Navbar />
        <div className="container py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle className="text-center">Your Profile</CardTitle>
              <CardDescription className="text-center">Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary/30 sci-fi-glow">
                    {user?.image ? (
                      <img
                        src={user.image || "/placeholder.svg"}
                        alt={user.name || "Profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{user?.name?.charAt(0) || "U"}</span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="mt-4 font-medium text-lg">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="mt-2 flex items-center">
                  <span
                    className={`inline-block h-2 w-2 rounded-full mr-2 ${
                      user?.role === "premium" ? "bg-green-500" : "bg-amber-500"
                    }`}
                  ></span>
                  <span className="text-xs font-medium capitalize">{user?.role} User</span>
                </div>
                {user?.referralCode && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">Your Referral Code</p>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm">{user.referralCode}</code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(user.referralCode)
                          toast({
                            title: "Copied!",
                            description: "Referral code copied to clipboard",
                          })
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="sci-fi-input">
                              <SelectValue placeholder="Select your branch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CSE">Computer Science Engineering (CSE)</SelectItem>
                            <SelectItem value="IT">Information Technology (IT)</SelectItem>
                            <SelectItem value="CSSE">Computer Science & Systems Engineering (CSSE)</SelectItem>
                            <SelectItem value="CSCE">Computer Science & Communication Engineering (CSCE)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="sci-fi-input">
                              <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1st Year">1st Year</SelectItem>
                            <SelectItem value="2nd Year">2nd Year</SelectItem>
                            <SelectItem value="3rd Year">3rd Year</SelectItem>
                            <SelectItem value="4th Year">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="sci-fi-input">
                              <SelectValue placeholder="Select your section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px]">
                            {form.watch("branch") === "CSE" &&
                              Array.from({ length: 55 }, (_, i) => (
                                <SelectItem key={i + 1} value={`CSE ${i + 1}`}>
                                  CSE {i + 1}
                                </SelectItem>
                              ))}
                            {form.watch("branch") === "IT" &&
                              Array.from({ length: 5 }, (_, i) => (
                                <SelectItem key={i + 1} value={`IT ${i + 1}`}>
                                  IT {i + 1}
                                </SelectItem>
                              ))}
                            {form.watch("branch") === "CSSE" &&
                              Array.from({ length: 3 }, (_, i) => (
                                <SelectItem key={i + 1} value={`CSSE ${i + 1}`}>
                                  CSSE {i + 1}
                                </SelectItem>
                              ))}
                            {form.watch("branch") === "CSCE" &&
                              Array.from({ length: 3 }, (_, i) => (
                                <SelectItem key={i + 1} value={`CSCE ${i + 1}`}>
                                  CSCE {i + 1}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" className="sci-fi-input" {...field} type="tel" />
                        </FormControl>
                        <FormDescription>
                          Your phone number will only be shared with users you match with for section swaps.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full sci-fi-button sci-fi-glow" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Update Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              {user?.role === "free" && (
                <Button variant="outline" className="sci-fi-button" onClick={() => router.push("/premium")}>
                  Upgrade to Premium
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
