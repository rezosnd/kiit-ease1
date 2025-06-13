import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface SwapMatchEmailProps {
  name: string
  email: string
  currentSection: string
  targetSection: string
  matchedWithName: string
  matchedWithPhone?: string
  expiresAt: Date
}

export const SwapMatchEmail = ({
  name,
  email,
  currentSection,
  targetSection,
  matchedWithName,
  matchedWithPhone,
  expiresAt,
}: SwapMatchEmailProps) => {
  const formattedExpiryDate = new Date(expiresAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  return (
    <Html>
      <Head />
      <Preview>
        Section Swap Match Found! {currentSection} → {targetSection}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-[600px]">
            <Section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <Heading className="text-2xl font-bold text-center text-teal-600 mb-4">Section Swap Match Found!</Heading>

              <Text className="text-gray-700 mb-4">Hello {name},</Text>

              <Text className="text-gray-700 mb-4">
                Great news! We've found a match for your section swap request from <strong>{currentSection}</strong> to{" "}
                <strong>{targetSection}</strong>.
              </Text>

              <Section className="bg-teal-50 p-4 rounded-md border border-teal-200 mb-4">
                <Text className="text-gray-700 mb-2">
                  <strong>Match Details:</strong>
                </Text>
                <Text className="text-gray-700 mb-1">
                  • You want to move from <strong>{currentSection}</strong> to <strong>{targetSection}</strong>
                </Text>
                <Text className="text-gray-700 mb-1">
                  • <strong>{matchedWithName}</strong> wants to move from <strong>{targetSection}</strong> to{" "}
                  <strong>{currentSection}</strong>
                </Text>
                {matchedWithPhone && (
                  <Text className="text-gray-700 mb-1">
                    • Contact: <strong>{matchedWithPhone}</strong>
                  </Text>
                )}
                <Text className="text-gray-700 mb-1">
                  • This match will expire on: <strong>{formattedExpiryDate}</strong>
                </Text>
              </Section>

              <Text className="text-gray-700 mb-4">
                Please log in to your KIITease account to accept this match. If you don't accept within 24 hours, the
                match will expire and your request will return to the pending state.
              </Text>

              <Section className="text-center mb-4">
                <Link
                  href="https://kiitease.vercel.app/section-swap"
                  className="bg-teal-600 text-white py-3 px-6 rounded-md font-medium no-underline inline-block"
                >
                  View Match Details
                </Link>
              </Section>

              <Text className="text-gray-700 mb-4">
                Once both you and {matchedWithName} accept the swap, you'll receive further instructions on how to
                proceed with the section change.
              </Text>

              <Text className="text-gray-700 mb-4">
                If you have any questions, please reply to this email or contact our support team.
              </Text>

              <Text className="text-gray-700">
                Best regards,
                <br />
                The KIITease Team
              </Text>
            </Section>

            <Text className="text-center text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} KIITease. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default SwapMatchEmail
