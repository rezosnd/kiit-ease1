import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"
import SectionSwapForm from "@/components/section-swap-form"
import RecentSwaps from "@/components/recent-swaps"

export default function SectionSwapPage() {
  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Section Swap</h1>
            <p className="text-muted-foreground">Request to swap your current section with another student</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="sci-fi-card">
              <CardHeader>
                <CardTitle>Create Swap Request</CardTitle>
                <CardDescription>Submit a request to swap your current section</CardDescription>
              </CardHeader>
              <CardContent>
                <SectionSwapForm />
              </CardContent>
            </Card>

            <RecentSwaps />
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="my-requests">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="my-requests">My Requests</TabsTrigger>
                <TabsTrigger value="matched">Matched</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="my-requests">
                <MyRequestsList />
              </TabsContent>

              <TabsContent value="matched">
                <MatchedRequestsList />
              </TabsContent>

              <TabsContent value="completed">
                <CompletedSwapsList />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

// These components will fetch real data from the API
function MyRequestsList() {
  return (
    <div className="space-y-4">
      <Card className="sci-fi-card">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Loading requests...</h3>
          <p className="text-muted-foreground mb-4">Please wait while we fetch your swap requests.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function MatchedRequestsList() {
  return (
    <div className="space-y-4">
      <Card className="sci-fi-card">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Loading matches...</h3>
          <p className="text-muted-foreground mb-4">Please wait while we fetch your matched requests.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function CompletedSwapsList() {
  return (
    <div className="space-y-4">
      <Card className="sci-fi-card">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Loading completed swaps...</h3>
          <p className="text-muted-foreground mb-4">Please wait while we fetch your completed swaps.</p>
        </CardContent>
      </Card>
    </div>
  )
}
