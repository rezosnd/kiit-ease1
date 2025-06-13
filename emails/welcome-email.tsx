import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface WelcomeEmailProps {
  name: string
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to KIITease - Your KIIT University Platform</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src="https://kiitease.vercel.app/logo.png" width="120" height="40" alt="KIITease" style={logo} />
          <Heading style={heading}>Welcome to KIITease, {name}!</Heading>
          <Section style={section}>
            <Text style={text}>
              We're excited to have you join our platform designed specifically for KIIT University students and
              faculty.
            </Text>
            <Text style={text}>With KIITease, you can:</Text>
            <Text style={listItem}>✅ Access teacher reviews and ratings</Text>
            <Text style={listItem}>✅ Share and download premium study notes</Text>
            <Text style={listItem}>✅ Request section swaps with other students</Text>
            <Text style={listItem}>✅ Earn rewards through our referral program</Text>
            <Text style={text}>
              To get the most out of KIITease, consider upgrading to our Premium plan for just ₹499 per semester.
            </Text>
          </Section>
          <Section style={buttonContainer}>
            <Link style={button} href="https://kiitease.vercel.app/premium">
              Upgrade to Premium
            </Link>
          </Section>
          <Text style={text}>
            If you have any questions or need assistance, feel free to reply to this email or contact our support team.
          </Text>
          <Text style={text}>
            Best regards,
            <br />
            The KIITease Team
          </Text>
          <Text style={footer}>
            © {new Date().getFullYear()} KIITease. All rights reserved.
            <br />
            KIIT University, Bhubaneswar, Odisha, India
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#000000",
  color: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
}

const logo = {
  margin: "0 auto 20px",
  display: "block",
}

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#62ba9b",
  textAlign: "center" as const,
}

const section = {
  margin: "30px 0",
}

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#cccccc",
  margin: "16px 0",
}

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#cccccc",
  margin: "8px 0 8px 20px",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const button = {
  backgroundColor: "#62ba9b",
  borderRadius: "4px",
  color: "#000000",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 24px",
  display: "inline-block",
}

const footer = {
  fontSize: "12px",
  color: "#666666",
  textAlign: "center" as const,
  margin: "40px 0 0",
}
