"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, FileText, Download, Upload } from "lucide-react"

// Mock data for notes
const notes = [
  {
    id: "1",
    title: "Data Structures and Algorithms Complete Notes",
    subject: "Data Structures",
    branch: "CSE",
    year: "2nd Year",
    uploadedBy: "Rahul Sharma",
    uploadDate: "2023-10-15",
    downloads: 342,
    fileSize: "2.4 MB",
    fileType: "PDF",
  },
  {
    id: "2",
    title: "Database Management Systems Handwritten Notes",
    subject: "DBMS",
    branch: "IT",
    year: "3rd Year",
    uploadedBy: "Priya Patel",
    uploadDate: "2023-11-02",
    downloads: 256,
    fileSize: "3.1 MB",
    fileType: "PDF",
  },
  {
    id: "3",
    title: "Operating Systems Concepts and Examples",
    subject: "Operating Systems",
    branch: "CSE",
    year: "2nd Year",
    uploadedBy: "Amit Kumar",
    uploadDate: "2023-09-28",
    downloads: 189,
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: "4",
    title: "Computer Networks Complete Reference",
    subject: "Computer Networks",
    branch: "CSSE",
    year: "3rd Year",
    uploadedBy: "Neha Singh",
    uploadDate: "2023-10-10",
    downloads: 275,
    fileSize: "4.2 MB",
    fileType: "PDF",
  },
  {
    id: "5",
    title: "Artificial Intelligence and Machine Learning",
    subject: "AI & ML",
    branch: "CSCE",
    year: "4th Year",
    uploadedBy: "Vikram Reddy",
    uploadDate: "2023-11-15",
    downloads: 312,
    fileSize: "5.6 MB",
    fileType: "PDF",
  },
]

export default function AdminNotesList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="sci-fi-card">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle>Notes Management</CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="pl-8 sci-fi-input w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="sci-fi-button">
            <Upload className="h-4 w-4 mr-2" />
            Upload Note
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Branch/Year</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Uploaded By</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Downloads</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map((note) => (
                  <tr key={note.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="font-medium">{note.title}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{note.subject}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">{note.branch}</Badge>
                        <Badge variant="outline">{note.year}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <div>{note.uploadedBy}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(note.uploadDate)}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 text-muted-foreground mr-1" />
                        <span>{note.downloads}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Edit Metadata</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Note</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{filteredNotes.length}</strong> of <strong>{notes.length}</strong> notes
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="sci-fi-button">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="sci-fi-button">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
