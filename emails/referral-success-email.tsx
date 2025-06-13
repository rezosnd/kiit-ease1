import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface ReferralSuccessEmailProps {
  name: string
  referredName: string
  reward: string
}

export default function ReferralSuccessEmail({ name, referredName, reward }: ReferralSuccessEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your referral was successful! You've earned a reward.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src="https://kiitease.vercel.app/logo.png" width="120" height="40" alt="KIITease" style={logo} />
          <Heading style={heading}>Referral Successful!</Heading>
          <Section style={section}>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Great news! <span style={highlight}>{referredName}</span> has joined KIITease using your referral code.
            </Text>
            <Section style={rewardBox}>
              <Text style={rewardHeading}>Your Reward</Text>
              <Text style={rewardText}>{reward}</Text>
            </Section>
            <Text style={text}>
              Your reward has been added to your account. Keep referring friends to earn more rewards!
            </Text>
          </Section>
          <Section style={buttonContainer}>
            <Link style={button} href="https://kiitease.vercel.app/referrals">
              View Your Referrals
            </Link>
          </Section>
          <Text style={text}>
            Thank you for helping our community grow. If you have any questions about your rewards or referrals, feel
            free to contact our support team.
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

const rewardBox = {
  backgroundColor: "rgba(98, 186, 155, 0.1)",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
  border: "1px solid rgba(98, 186, 155, 0.3)",
  textAlign: "center" as const,
}

const rewardHeading = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#62ba9b",
  margin: "0 0 16px",
}

const rewardText = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0",
}

const footer = {
  fontSize: "12px",
  color: "#666666",
  textAlign: "center" as const,
  margin: "40px 0 0",
}
