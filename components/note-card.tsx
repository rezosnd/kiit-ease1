"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, User, Lock } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface Note {
  _id: string
  title: string
  subject: string
  branch: string
  year: string
  userName: string
  uploadDate?: string
  createdAt: string
  downloads: number
  fileSize: string
  fileType: string
  fileUrl: string
  description?: string
}

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const isPremium = user?.role === "premium" || user?.role === "admin"

  const handleDownload = async () => {
    if (!isPremium) {
      toast({
        title: "Premium Required",
        description: "Upgrade to premium to download notes",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)

    try {
      const response = await fetch(`/api/notes/download/${note._id}`)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to download note")
      }

      const data = await response.json()

      // Create a temporary link to download the file
      const link = document.createElement("a")
      link.href = data.fileUrl
      link.target = "_blank"
      link.download = note.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download Started",
        description: `Downloading ${note.title}`,
      })
    } catch (error: any) {
      console.error("Error downloading note:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to download note",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
    >
      <Card
        className={`sci-fi-card transition-all duration-300 ${isHovered ? "border-primary/30" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <motion.div
                className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FileText className="h-6 w-6 text-primary" />
              </motion.div>

              <div>
                <h3 className="font-medium">{note.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="secondary">{note.subject}</Badge>
                  <Badge variant="outline">{note.branch}</Badge>
                  <Badge variant="outline">{note.year}</Badge>
                </div>

                <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {note.userName}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(note.uploadDate || note.createdAt)}
                  </div>
                  <div>
                    {note.downloads} downloads • {note.fileSize} • {note.fileType}
                  </div>
                </div>

                {note.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{note.description}</p>
                )}
              </div>
            </div>

            <Button
              variant={isPremium ? "default" : "outline"}
              className="sci-fi-button"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isPremium ? (
                <>
                  <motion.div
                    animate={isDownloading ? { rotate: 360 } : {}}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="mr-2"
                  >
                    <Download className="h-4 w-4" />
                  </motion.div>
                  {isDownloading ? "Downloading..." : "Download"}
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Premium
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
