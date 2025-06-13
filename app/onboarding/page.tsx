import OnboardingForm from "@/components/onboarding-form"

export const metadata = {
  title: "Complete Your Profile | KIITease",
  description: "Complete your profile to get started with KIITease",
}

export default function OnboardingPage() {
  return (
    <div className="sci-fi-container min-h-screen flex items-center justify-center p-4">
      <OnboardingForm />
    </div>
  )
}
