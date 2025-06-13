import Navbar from "@/components/navbar"
import LoadingAnimation from "@/components/loading-animation"

export default function Loading() {
  return (
    <div className="sci-fi-container">
      <Navbar />
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <LoadingAnimation />
          <p className="mt-4 text-muted-foreground">Loading teachers...</p>
        </div>
      </div>
    </div>
  )
}
