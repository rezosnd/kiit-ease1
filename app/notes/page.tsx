"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, RefreshCw } from "lucide-react"
import NoteCard from "@/components/note-card"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import UploadNoteDialog from "@/components/upload-note-dialog"
import Footer from "@/components/footer"

// Filter options
const branches = ["CSE", "IT", "CSSE", "CSCE"]
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]
const subjects = [
  "Data Structures",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "AI & ML",
  "Web Development",
  "Software Engineering",
  "Computer Architecture",
  "Discrete Mathematics",
  "Algorithms",
]

export default function NotesPage() {
  const { user, isPremium } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Get query params
  useEffect(() => {
    const branch = searchParams.get("branch") || ""
    const year = searchParams.get("year") || ""
    const subject = searchParams.get("subject") || ""
    const search = searchParams.get("search") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")

    setSelectedBranch(branch)
    setSelectedYear(year)
    setSelectedSubject(subject)
    setSearchTerm(search)

    fetchNotes(branch, year, subject, search, page)
  }, [searchParams])

  const fetchNotes = async (branch = "", year = "", subject = "", search = "", page = 1) => {
    setIsLoading(true)

    try {
      // Build query string
      const params = new URLSearchParams()
      if (branch) params.append("branch", branch)
      if (year) params.append("year", year)
      if (subject) params.append("subject", subject)
      if (search) params.append("search", search)
      params.append("page", page.toString())
      params.append("limit", "10")

      const response = await fetch(`/api/notes?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }

      const data = await response.json()
      setNotes(data.data.notes)
      setPagination(data.data.pagination)
    } catch (error) {
      console.error("Error fetching notes:", error)
      toast({
        title: "Error",
        description: "Failed to fetch notes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateQueryParams({ search: searchTerm, page: 1 })
  }

  const handleBranchFilter = (branch) => {
    updateQueryParams({ branch: selectedBranch === branch ? "" : branch, page: 1 })
  }

  const handleYearFilter = (year) => {
    updateQueryParams({ year: selectedYear === year ? "" : year, page: 1 })
  }

  const handleSubjectFilter = (subject) => {
    updateQueryParams({ subject: selectedSubject === subject ? "" : subject, page: 1 })
  }

  const handlePageChange = (newPage) => {
    updateQueryParams({ page: newPage })
  }

  const updateQueryParams = (params) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    // Update or delete params
    Object.entries(params).forEach(([key, value]) => {
      if (value === "") {
        current.delete(key)
      } else {
        current.set(key, value.toString())
      }
    })

    // Create new URL
    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.push(`/notes${query}`)
  }

  const handleUploadClick = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to upload notes",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!isPremium) {
      toast({
        title: "Premium Required",
        description: "Upgrade to premium to upload notes",
        variant: "destructive",
      })
      router.push("/premium")
      return
    }

    setIsUploadDialogOpen(true)
  }

  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Study Notes</h1>
            <p className="text-muted-foreground">Browse and download premium study notes</p>
          </div>

          <div className="flex items-center gap-2">
            <Button className="sci-fi-button sci-fi-glow" onClick={handleUploadClick}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Notes
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <Card className="sci-fi-card">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Search</h3>
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search notes..."
                          className="pl-8 sci-fi-input"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Branch</h3>
                    <div className="flex flex-wrap gap-2">
                      {branches.map((branch) => (
                        <Badge
                          key={branch}
                          variant={selectedBranch === branch ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleBranchFilter(branch)}
                        >
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Year</h3>
                    <div className="flex flex-wrap gap-2">
                      {years.map((year) => (
                        <Badge
                          key={year}
                          variant={selectedYear === year ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleYearFilter(year)}
                        >
                          {year}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Subject</h3>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <Badge
                          key={subject}
                          variant={selectedSubject === subject ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleSubjectFilter(subject)}
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="sci-fi-card">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Premium Access</h3>
                  <p className="text-xs text-muted-foreground">
                    Upgrade to premium to download and upload study notes.
                  </p>
                  <Button className="w-full sci-fi-button sci-fi-glow" onClick={() => router.push("/premium")}>
                    Upgrade Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : notes.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground">No notes found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => updateQueryParams({ branch: "", year: "", subject: "", search: "", page: 1 })}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {notes.length > 0 && pagination.pages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="sci-fi-button"
                    disabled={pagination.page === 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                  >
                    Previous
                  </Button>

                  <span className="text-sm">
                    Page {pagination.page} of {pagination.pages}
                  </span>

                  <Button
                    variant="outline"
                    className="sci-fi-button"
                    disabled={pagination.page === pagination.pages}
                    onClick={() => handlePageChange(pagination.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <UploadNoteDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onSuccess={() => {
          fetchNotes(selectedBranch, selectedYear, selectedSubject, searchTerm, pagination.page)
        }}
      />

      <Footer />
    </div>
  )
}
