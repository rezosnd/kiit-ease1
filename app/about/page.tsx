import type { Metadata } from "next"
import AboutClientPage from "./AboutClientPage"

export const metadata: Metadata = {
  title: "About Us | KIITease",
  description: "Learn more about KIITease and our mission",
}

export default function AboutPage() {
  return <AboutClientPage />
}
