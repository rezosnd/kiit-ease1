import Navbar from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, FileText, Mail, RefreshCw, BarChart3, Settings, UserPlus, Download } from "lucide-react"
import AdminStats from "@/components/admin/admin-stats"
import AdminUsersList from "@/components/admin/admin-users-list"
import AdminTeachersList from "@/components/admin/admin-teachers-list"
import AdminNotesList from "@/components/admin/admin-notes-list"
import AdminReviewsList from "@/components/admin/admin-reviews-list"
import AdminBulkMail from "@/components/admin/admin-bulk-mail"
import AdminSwapsList from "@/components/admin/admin-swaps-list"

export default function AdminDashboardPage() {
  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, content, and platform settings</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="sci-fi-button">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button className="sci-fi-button sci-fi-glow">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <AdminStats />

        <Tabs defaultValue="users" className="mt-8">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Teachers</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Notes</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="swaps" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Swaps</span>
            </TabsTrigger>
            <TabsTrigger value="mail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Bulk Mail</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <AdminUsersList />
          </TabsContent>

          <TabsContent value="teachers">
            <AdminTeachersList />
          </TabsContent>

          <TabsContent value="notes">
            <AdminNotesList />
          </TabsContent>

          <TabsContent value="reviews">
            <AdminReviewsList />
          </TabsContent>

          <TabsContent value="swaps">
            <AdminSwapsList />
          </TabsContent>

          <TabsContent value="mail">
            <AdminBulkMail />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
