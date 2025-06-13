import type { Metadata } from "next"
import TermsPageClient from "./TermsPageClient"

export const metadata: Metadata = {
  title: "Terms and Conditions | KIITease",
  description: "Terms and conditions for using the KIITease platform",
}

export default function TermsPage() {
  return <TermsPageClient />
}
