"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Send, Save } from "lucide-react"

export default function AdminBulkMail() {
  const { toast } = useToast()
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [recipientType, setRecipientType] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendEmail = async () => {
    if (!subject || !content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Email Sent",
        description: "Your bulk email has been sent successfully",
      })

      // Reset form
      setSubject("")
      setContent("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send bulk email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveTemplate = () => {
    if (!subject || !content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Template Saved",
      description: "Your email template has been saved",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="sci-fi-card">
          <CardHeader>
            <CardTitle>Compose Bulk Email</CardTitle>
            <CardDescription>Send emails to multiple users at once</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="sci-fi-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your email content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="sci-fi-input min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-type">Recipients</Label>
                <Select value={recipientType} onValueChange={setRecipientType}>
                  <SelectTrigger id="recipient-type" className="sci-fi-input">
                    <SelectValue placeholder="Select recipient type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="premium">Premium Users Only</SelectItem>
                    <SelectItem value="free">Free Users Only</SelectItem>
                    <SelectItem value="cse">CSE Branch</SelectItem>
                    <SelectItem value="it">IT Branch</SelectItem>
                    <SelectItem value="csse">CSSE Branch</SelectItem>
                    <SelectItem value="csce">CSCE Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="schedule" />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>

              <div className="flex items-center gap-2">
                <Button className="sci-fi-button sci-fi-glow" onClick={handleSendEmail} disabled={isLoading}>
                  <Send className="h-4 w-4 mr-2" />
                  {isLoading ? "Sending..." : "Send Email"}
                </Button>
                <Button variant="outline" className="sci-fi-button" onClick={handleSaveTemplate}>
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sci-fi-card">
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Reuse saved email templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="font-medium">Welcome Email</div>
                <div className="text-xs text-muted-foreground mt-1">Welcome new users to the platform</div>
              </div>

              <div className="rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="font-medium">Premium Promotion</div>
                <div className="text-xs text-muted-foreground mt-1">Encourage free users to upgrade to premium</div>
              </div>

              <div className="rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="font-medium">New Features Announcement</div>
                <div className="text-xs text-muted-foreground mt-1">Inform users about new platform features</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sci-fi-card mt-6">
          <CardHeader>
            <CardTitle>Email Stats</CardTitle>
            <CardDescription>Recent email campaign performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Sent</span>
                <span className="font-medium">1,248</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Delivered</span>
                <span className="font-medium">1,236 (99%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Opened</span>
                <span className="font-medium">856 (69%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Clicked</span>
                <span className="font-medium">324 (26%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
