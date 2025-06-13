"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function AddTeacherForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    qualification: "",
    subjects: [] as string[],
  })
  const [subjectInput, setSubjectInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSubject = () => {
    if (subjectInput.trim() && !formData.subjects.includes(subjectInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subjectInput.trim()],
      }))
      setSubjectInput("")
    }
  }

  const removeSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s !== subject),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.qualification ||
      formData.subjects.length === 0
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/teachers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to add teacher")
      }

      toast({
        title: "Success",
        description: "Teacher added successfully",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        department: "",
        qualification: "",
        subjects: [],
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add teacher",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="sci-fi-card w-full">
      <CardHeader>
        <CardTitle>Add New Teacher</CardTitle>
        <CardDescription>Add a new teacher to the database</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Teacher Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Dr. John Doe"
                value={formData.name}
                onChange={handleChange}
                className="sci-fi-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                className="sci-fi-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                placeholder="Computer Science"
                value={formData.department}
                onChange={handleChange}
                className="sci-fi-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                name="qualification"
                placeholder="Ph.D. in Computer Science"
                value={formData.qualification}
                onChange={handleChange}
                className="sci-fi-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects</Label>
            <div className="flex gap-2">
              <Input
                id="subjects"
                placeholder="Add a subject"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                className="sci-fi-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSubject()
                  }
                }}
              />
              <Button type="button" onClick={addSubject} className="sci-fi-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.subjects.map((subject) => (
                <Badge key={subject} className="sci-fi-badge flex items-center gap-1">
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-1 hover:text-destructive focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {subject}</span>
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="sci-fi-button sci-fi-glow w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding Teacher...
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Teacher
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
