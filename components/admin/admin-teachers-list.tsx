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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreVertical, UserPlus, Star } from "lucide-react"

// Mock data for teachers
const teachers = [
  {
    id: "1",
    name: "Dr. Anita Sharma",
    department: "Computer Science",
    subjects: ["Data Structures", "Algorithms"],
    rating: 4.8,
    reviewCount: 124,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Prof. Rajesh Kumar",
    department: "Information Technology",
    subjects: ["Database Management", "Web Development"],
    rating: 4.5,
    reviewCount: 98,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Dr. Priya Patel",
    department: "Computer Science",
    subjects: ["Operating Systems", "Computer Networks"],
    rating: 4.7,
    reviewCount: 112,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Prof. Vikram Singh",
    department: "CSSE",
    subjects: ["Software Engineering", "Project Management"],
    rating: 4.3,
    reviewCount: 87,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Dr. Meera Gupta",
    department: "CSCE",
    subjects: ["Artificial Intelligence", "Machine Learning"],
    rating: 4.9,
    reviewCount: 156,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function AdminTeachersList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="sci-fi-card">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CardTitle>Teachers Management</CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teachers..."
              className="pl-8 sci-fi-input w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="sci-fi-button">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Teacher</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Subjects</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Rating</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={teacher.image || "/placeholder.svg"} alt={teacher.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(teacher.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{teacher.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{teacher.department}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-primary fill-primary mr-1" />
                        <span>{teacher.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({teacher.reviewCount})</span>
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
                          <DropdownMenuItem>Edit Teacher</DropdownMenuItem>
                          <DropdownMenuItem>View Reviews</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Teacher</DropdownMenuItem>
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
            Showing <strong>{filteredTeachers.length}</strong> of <strong>{teachers.length}</strong> teachers
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
