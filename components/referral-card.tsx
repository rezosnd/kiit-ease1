import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Gift } from "lucide-react"

interface Referral {
  id: string
  name: string
  email: string
  joinedAt: string
  status: "free" | "premium"
  reward: string
}

interface ReferralCardProps {
  referral: Referral
}

export default function ReferralCard({ referral }: ReferralCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="sci-fi-card border-border/40">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={referral.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{getInitials(referral.name)}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-medium">{referral.name}</h3>
              <p className="text-sm text-muted-foreground">{referral.email}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <Badge variant={referral.status === "premium" ? "default" : "secondary"}>
                {referral.status === "premium" ? "Premium" : "Free"}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Calendar className="h-3 w-3" />
              <span>Joined {formatDate(referral.joinedAt)}</span>
            </div>

            <div className="flex items-center gap-1 text-xs mt-1">
              <Gift className="h-3 w-3 text-primary" />
              <span className={referral.reward === "pending" ? "text-muted-foreground" : "text-primary"}>
                {referral.reward}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
