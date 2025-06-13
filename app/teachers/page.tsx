import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import TeacherCard from "@/components/teacher-card"

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
  {
    id: "6",
    name: "Prof. Sanjay Mishra",
    department: "Information Technology",
    subjects: ["Cloud Computing", "Big Data Analytics"],
    rating: 4.6,
    reviewCount: 103,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Filter options
const departments = ["Computer Science", "Information Technology", "CSSE", "CSCE"]
const subjects = [
  "Data Structures",
  "Algorithms",
  "Database Management",
  "Web Development",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Project Management",
  "Artificial Intelligence",
  "Machine Learning",
  "Cloud Computing",
  "Big Data Analytics",
]

export default function TeachersPage() {
  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Teachers</h1>
            <p className="text-muted-foreground">Browse and review teachers at KIIT University</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search teachers..." className="pl-8 w-full md:w-[250px] sci-fi-input" />
            </div>
            <Button variant="outline" className="sci-fi-button">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="sci-fi-button">
            Load More Teachers
          </Button>
        </div>
      </div>
    </div>
  )
}
