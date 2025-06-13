import type { Metadata } from "next"
import PrivacyClientPage from "./PrivacyClientPage"

export const metadata: Metadata = {
  title: "Privacy Policy | KIITease",
  description: "Privacy policy for the KIITease platform",
}

export default function PrivacyPage() {
  return <PrivacyClientPage />
}
