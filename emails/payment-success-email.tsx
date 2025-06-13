import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface PaymentSuccessEmailProps {
  name: string
  plan: string
  amount: number
  validUntil: Date
  transactionId: string
}

export default function PaymentSuccessEmail({
  name,
  plan,
  amount,
  validUntil,
  transactionId,
}: PaymentSuccessEmailProps) {
  const formattedDate = new Date(validUntil).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Html>
      <Head />
      <Preview>Your KIITease Premium subscription is now active!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src="https://kiitease.vercel.app/logo.png" width="120" height="40" alt="KIITease" style={logo} />
          <Heading style={heading}>Payment Successful!</Heading>
          <Section style={section}>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Thank you for upgrading to <span style={highlight}>KIITease Premium</span>! Your payment has been
              successfully processed, and your premium features are now active.
            </Text>
            <Section style={receiptBox}>
              <Text style={receiptHeading}>Payment Receipt</Text>
              <Text style={receiptItem}>
                <span style={receiptLabel}>Plan:</span> {plan}
              </Text>
              <Text style={receiptItem}>
                <span style={receiptLabel}>Amount:</span> ₹{amount}
              </Text>
              <Text style={receiptItem}>
                <span style={receiptLabel}>Valid Until:</span> {formattedDate}
              </Text>
              <Text style={receiptItem}>
                <span style={receiptLabel}>Transaction ID:</span> {transactionId}
              </Text>
            </Section>
            <Text style={text}>You now have access to:</Text>
            <Text style={listItem}>✨ All teacher reviews and ratings</Text>
            <Text style={listItem}>✨ Premium study notes upload and download</Text>
            <Text style={listItem}>✨ Priority in section swapping</Text>
            <Text style={listItem}>✨ Enhanced referral rewards</Text>
          </Section>
          <Section style={buttonContainer}>
            <Link style={button} href="https://kiitease.vercel.app/dashboard">
              Explore Premium Features
            </Link>
          </Section>
          <Text style={text}>
            If you have any questions about your subscription or need assistance, feel free to contact our support team.
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

const highlight = {
  color: "#62ba9b",
  fontWeight: "700",
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

const receiptBox = {
  backgroundColor: "rgba(98, 186, 155, 0.1)",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
  border: "1px solid rgba(98, 186, 155, 0.3)",
}

const receiptHeading = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#62ba9b",
  margin: "0 0 16px",
}

const receiptItem = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#cccccc",
  margin: "8px 0",
}

const receiptLabel = {
  fontWeight: "600",
  color: "#ffffff",
}

const footer = {
  fontSize: "12px",
  color: "#666666",
  textAlign: "center" as const,
  margin: "40px 0 0",
}
