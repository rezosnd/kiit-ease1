import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, TrendingUp, CreditCard } from "lucide-react"

export default function AdminStats() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="sci-fi-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Users</p>
                <div className="text-3xl font-bold mt-1">5,248</div>
                <div className="flex items-center text-xs text-primary mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12% this month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Free Users</p>
                <p className="font-medium">3,412</p>
              </div>
              <div>
                <p className="text-muted-foreground">Premium Users</p>
                <p className="font-medium">1,836</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sci-fi-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Revenue</p>
                <div className="text-3xl font-bold mt-1">₹916,500</div>
                <div className="flex items-center text-xs text-primary mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+8% this month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">This Month</p>
                <p className="font-medium">₹78,500</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Month</p>
                <p className="font-medium">₹72,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="sci-fi-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Content Stats</p>
                <div className="text-3xl font-bold mt-1">11,842</div>
                <div className="flex items-center text-xs text-primary mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+15% this month</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Notes</p>
                <p className="font-medium">3,456</p>
              </div>
              <div>
                <p className="text-muted-foreground">Reviews</p>
                <p className="font-medium">7,612</p>
              </div>
              <div>
                <p className="text-muted-foreground">Swaps</p>
                <p className="font-medium">774</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
