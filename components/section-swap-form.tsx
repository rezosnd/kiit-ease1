"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import SwapRequestSuccess from "@/components/swap-request-success"
import { Loader2 } from "lucide-react"

// Branch and section data
const branches = [
  {
    name: "CSE",
    sections: Array.from({ length: 55 }, (_, i) => `CSE ${i + 1}`),
  },
  {
    name: "IT",
    sections: Array.from({ length: 5 }, (_, i) => `IT ${i + 1}`),
  },
  {
    name: "CSSE",
    sections: Array.from({ length: 3 }, (_, i) => `CSSE ${i + 1}`),
  },
  {
    name: "CSCE",
    sections: Array.from({ length: 3 }, (_, i) => `CSCE ${i + 1}`),
  },
]

export default function SectionSwapForm() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [branch, setBranch] = useState("")
  const [currentSection, setCurrentSection] = useState("")
  const [targetSection, setTargetSection] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to create a section swap request",
        variant: "destructive",
      })
      return
    }

    if (!branch || !currentSection || !targetSection) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (currentSection === targetSection) {
      toast({
        title: "Invalid Selection",
        description: "Current and target sections cannot be the same",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setShowSuccess(true)

      // Reset form
      setBranch("")
      setCurrentSection("")
      setTargetSection("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit section swap request",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get sections for the selected branch
  const selectedBranchData = branches.find((b) => b.name === branch)
  const sections = selectedBranchData?.sections || []

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger id="branch" className="sci-fi-input">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.name} value={branch.name}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentSection">Current Section</Label>
          <Select value={currentSection} onValueChange={setCurrentSection} disabled={!branch}>
            <SelectTrigger id="currentSection" className="sci-fi-input">
              <SelectValue placeholder="Select Current Section" />
            </SelectTrigger>
            <SelectContent>
              {sections.map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetSection">Target Section</Label>
          <Select value={targetSection} onValueChange={setTargetSection} disabled={!branch || !currentSection}>
            <SelectTrigger id="targetSection" className="sci-fi-input">
              <SelectValue placeholder="Select Target Section" />
            </SelectTrigger>
            <SelectContent>
              {sections
                .filter((section) => section !== currentSection)
                .map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full sci-fi-button sci-fi-glow"
          disabled={isSubmitting || !branch || !currentSection || !targetSection}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>

      {showSuccess && (
        <SwapRequestSuccess
          branch={branch}
          currentSection={currentSection}
          targetSection={targetSection}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  )
}
