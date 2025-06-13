"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for analytics
const userGrowthData = [
  { month: "Jan", users: 120, premium: 40 },
  { month: "Feb", users: 180, premium: 65 },
  { month: "Mar", users: 250, premium: 90 },
  { month: "Apr", users: 310, premium: 120 },
  { month: "May", users: 390, premium: 150 },
  { month: "Jun", users: 450, premium: 180 },
  { month: "Jul", users: 520, premium: 210 },
  { month: "Aug", users: 590, premium: 240 },
  { month: "Sep", users: 670, premium: 280 },
  { month: "Oct", users: 750, premium: 320 },
  { month: "Nov", users: 820, premium: 360 },
  { month: "Dec", users: 900, premium: 400 },
]

const revenueData = [
  { month: "Jan", revenue: 20000 },
  { month: "Feb", revenue: 32000 },
  { month: "Mar", revenue: 45000 },
  { month: "Apr", revenue: 60000 },
  { month: "May", revenue: 75000 },
  { month: "Jun", revenue: 90000 },
  { month: "Jul", revenue: 105000 },
  { month: "Aug", revenue: 120000 },
  { month: "Sep", revenue: 140000 },
  { month: "Oct", revenue: 160000 },
  { month: "Nov", revenue: 180000 },
  { month: "Dec", revenue: 200000 },
]

const contentDistributionData = [
  { name: "Teacher Reviews", value: 7612 },
  { name: "Study Notes", value: 3456 },
  { name: "Section Swaps", value: 774 },
]

const COLORS = ["#62ba9b", "#8884d8", "#82ca9d", "#ffc658"]

export default function AdminAnalytics() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleExportData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Data Exported",
        description: "Analytics data has been exported to CSV",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Button className="sci-fi-button" onClick={handleExportData} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user growth over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    users: {
                      label: "Total Users",
                      color: "hsl(var(--chart-1))",
                    },
                    premium: {
                      label: "Premium Users",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
                      <Line type="monotone" dataKey="premium" stroke="var(--color-premium)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card className="sci-fi-card">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Total Users</div>
                    <div className="text-2xl font-bold">5,248</div>
                    <div className="text-xs text-primary mt-1">+12% this month</div>
                  </CardContent>
                </Card>
                <Card className="sci-fi-card">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Premium Conversion Rate</div>
                    <div className="text-2xl font-bold">35%</div>
                    <div className="text-xs text-primary mt-1">+5% this month</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Monthly revenue over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue (₹)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card className="sci-fi-card">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                    <div className="text-2xl font-bold">₹916,500</div>
                    <div className="text-xs text-primary mt-1">+8% this month</div>
                  </CardContent>
                </Card>
                <Card className="sci-fi-card">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Average Revenue Per User</div>
                    <div className="text-2xl font-bold">₹499</div>
                    <div className="text-xs text-primary mt-1">+0% this month</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="sci-fi-card">
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
              <CardDescription>Distribution of content types on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {contentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card className="sci-fi-card">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Teacher Reviews</div>
                    <div className="text-2xl font-bold">7,612</div>
                    <div className="text-xs text-primary mt-1">+15% this month</div>
                  </CardContent>
                </Card>
                <Card className="sci-fi-card">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Study Notes</div>
                    <div className="text-2xl font-bold">3,456</div>
                    <div className="text-xs text-primary mt-1">+12% this month</div>
                  </CardContent>
                </Card>
                <Card className="sci-fi-card">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Section Swaps</div>
                    <div className="text-2xl font-bold">774</div>
                    <div className="text-xs text-primary mt-1">+8% this month</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
