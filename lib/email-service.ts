import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import WelcomeEmail from "@/emails/welcome-email"
import PaymentSuccessEmail from "@/emails/payment-success-email"
import ReferralSuccessEmail from "@/emails/referral-success-email"
import SwapMatchEmail from "@/emails/swap-match-email"

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendWelcomeEmail(user: { name: string; email: string }) {
  const emailHtml = render(
    WelcomeEmail({
      name: user.name,
    }),
  )

  const mailOptions = {
    from: `"KIITease" <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Welcome to KIITease! 🚀",
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Welcome email sent to ${user.email}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { success: false, error }
  }
}

export async function sendPaymentSuccessEmail(user: {
  name: string
  email: string
  plan: string
  amount: number
  validUntil: Date
  transactionId: string
}) {
  const emailHtml = render(
    PaymentSuccessEmail({
      name: user.name,
      plan: user.plan,
      amount: user.amount,
      validUntil: user.validUntil,
      transactionId: user.transactionId,
    }),
  )

  const mailOptions = {
    from: `"KIITease" <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Payment Successful! Welcome to KIITease Premium ✨",
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Payment success email sent to ${user.email}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending payment success email:", error)
    return { success: false, error }
  }
}

export async function sendReferralSuccessEmail(user: {
  name: string
  email: string
  referredName: string
  reward: string
}) {
  const emailHtml = render(
    ReferralSuccessEmail({
      name: user.name,
      referredName: user.referredName,
      reward: user.reward,
    }),
  )

  const mailOptions = {
    from: `"KIITease" <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Referral Successful! You've Earned a Reward 🎁",
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Referral success email sent to ${user.email}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending referral success email:", error)
    return { success: false, error }
  }
}

export async function sendBulkEmail(recipients: string[], subject: string, htmlContent: string) {
  try {
    // Split recipients into batches of 50 to avoid rate limits
    const batchSize = 50
    const batches = []

    for (let i = 0; i < recipients.length; i += batchSize) {
      batches.push(recipients.slice(i, i + batchSize))
    }

    let successCount = 0
    let failCount = 0

    for (const batch of batches) {
      const mailOptions = {
        from: `"KIITease" <${process.env.GMAIL_USER}>`,
        bcc: batch, // Use BCC for bulk emails
        subject,
        html: htmlContent,
      }

      try {
        await transporter.sendMail(mailOptions)
        successCount += batch.length
      } catch (error) {
        console.error("Error sending batch email:", error)
        failCount += batch.length
      }

      // Add a small delay between batches to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return {
      success: true,
      stats: {
        total: recipients.length,
        success: successCount,
        failed: failCount,
      },
    }
  } catch (error) {
    console.error("Error in bulk email process:", error)
    return { success: false, error }
  }
}

export async function sendSwapMatchEmail(user: {
  name: string
  email: string
  currentSection: string
  targetSection: string
  matchedWithName: string
  expiresAt: Date
}) {
  const emailHtml = render(
    SwapMatchEmail({
      name: user.name,
      currentSection: user.currentSection,
      targetSection: user.targetSection,
      matchedWithName: user.matchedWithName,
      expiresAt: user.expiresAt,
    }),
  )

  const mailOptions = {
    from: `"KIITease" <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Section Swap Match Found! Action Required ⚠️",
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Swap match email sent to ${user.email}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending swap match email:", error)
    return { success: false, error }
  }
}

export async function sendSwapAcceptedEmail(user: {
  name: string
  email: string
  currentSection: string
  targetSection: string
  matchedWithName: string
}) {
  const mailOptions = {
    from: `"KIITease" <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Section Swap Accepted! ✅",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000000; color: #ffffff;">
        <h2 style="color: #62ba9b;">Section Swap Accepted!</h2>
        <p>Hi ${user.name},</p>
        <p>Great news! Your section swap from ${user.currentSection} to ${user.targetSection} has been accepted by ${user.matchedWithName}.</p>
        <p>Your section has been officially changed. Please check your university portal for the updated information.</p>
        <p>Thank you for using KIITease!</p>
        <p>Best regards,<br>The KIITease Team</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Swap accepted email sent to ${user.email}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending swap accepted email:", error)
    return { success: false, error }
  }
}

export async function sendSwapExpiredEmail(user: {
  name: string
  email: string
  currentSection: string
  targetSection: string
}) {
  const mailOptions = {
    from: `"KIITease" <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Section Swap Match Expired ⏰",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000000; color: #ffffff;">
        <h2 style="color: #62ba9b;">Section Swap Match Expired</h2>
        <p>Hi ${user.name},</p>
        <p>Unfortunately, your section swap match for ${user.currentSection} to ${user.targetSection} has expired because one or both parties did not confirm in time.</p>
        <p>Your request has been returned to the pending state and will be matched again if a suitable match is found.</p>
        <p>Thank you for your patience!</p>
        <p>Best regards,<br>The KIITease Team</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Swap expired email sent to ${user.email}`)
    return { success: true }
  } catch (error) {
    console.error("Error sending swap expired email:", error)
    return { success: false, error }
  }
}
