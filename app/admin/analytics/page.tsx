import Navbar from "@/components/navbar"
import AdminAnalytics from "@/components/admin/admin-analytics"

export default function AdminAnalyticsPage() {
  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Detailed metrics and insights for KIITease</p>
          </div>
        </div>

        <AdminAnalytics />
      </div>
    </div>
  )
}
