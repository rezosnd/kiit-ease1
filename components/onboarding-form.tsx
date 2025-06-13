"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

const formSchema = z.object({
  branch: z.string().min(1, { message: "Please select your branch" }),
  year: z.string().min(1, { message: "Please select your year" }),
  section: z.string().min(1, { message: "Please select your section" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional(),
  referralCode: z.string().optional(),
})

export default function OnboardingForm() {
  const { data: session, update } = useSession()
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
      referralCode: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      // Update session with new user data
      await update({
        ...session,
        user: {
          ...session?.user,
          branch: values.branch,
          year: values.year,
          section: values.section,
          phone: values.phone,
          referredBy: values.referralCode || null,
          onboardingCompleted: true,
        },
      })

      toast({
        title: "Profile Updated",
        description: "Your profile has been completed successfully.",
      })

      // Redirect to home page
      router.push("/")
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="sci-fi-card">
        <CardHeader>
          <CardTitle className="text-center">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">
            Please provide additional information to complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
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

              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter referral code if you have one" className="sci-fi-input" {...field} />
                    </FormControl>
                    <FormDescription>
                      If someone referred you to KIITease, enter their referral code here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full sci-fi-button sci-fi-glow" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Complete Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          You can update this information later in your profile settings
        </CardFooter>
      </Card>
    </motion.div>
  )
}
