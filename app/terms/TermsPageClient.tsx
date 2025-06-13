"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function TermsPageClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg"></div>
      <div className="hud__effects">
        <div className="effect__long"></div>
        <div className="effect__small"></div>
        <div className="effect__small"></div>
        <div className="effect__long"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-primary sci-fi-text-glow">Terms and Conditions</h1>
        <div className="sci-fi-divider"></div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        {[
          {
            title: "1. Acceptance of Terms",
            content:
              "By accessing or using KIITease, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions, you may not access or use our services.",
          },
          {
            title: "2. User Accounts",
            content:
              "When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.",
          },
          {
            title: "3. User Conduct",
            content: "You agree not to use KIITease to:",
            list: [
              "Violate any laws or regulations",
              "Infringe upon the rights of others",
              "Submit false or misleading information",
              "Upload or transmit viruses or malicious code",
              "Interfere with the proper working of the platform",
            ],
          },
          {
            title: "4. Premium Membership",
            content:
              "Premium membership provides access to additional features as described on our website. Payment for premium membership is processed through our payment partners. Refunds are subject to our refund policy.",
          },
          {
            title: "5. Section Swapping",
            content:
              "The section swapping feature is provided as-is. KIITease does not guarantee that a match will be found for your swap request. All swaps are subject to mutual agreement between the parties involved.",
          },
          {
            title: "6. Notes Sharing",
            content:
              "Users who upload notes retain copyright to their original content. By uploading notes, you grant KIITease a license to display and distribute the content to other users of the platform.",
          },
          {
            title: "7. Teacher Reviews",
            content:
              "Reviews must be honest and based on personal experience. KIITease reserves the right to remove reviews that are inappropriate, offensive, or violate our content guidelines.",
          },
          {
            title: "8. Referral Program",
            content:
              "Referral rewards are subject to verification and may be revoked in cases of fraud or abuse. KIITease reserves the right to modify or terminate the referral program at any time.",
          },
          {
            title: "9. Limitation of Liability",
            content:
              "KIITease and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.",
          },
          {
            title: "10. Changes to Terms",
            content:
              "KIITease reserves the right to modify these terms at any time. We will provide notice of significant changes by posting the new terms on this page.",
          },
          {
            title: "11. Contact Us",
            content: (
              <>
                If you have any questions about these Terms, please contact us at{" "}
                <Link href="/contact" className="text-primary hover:underline sci-fi-text-glow">
                  our contact page
                </Link>
                .
              </>
            ),
          },
        ].map((section, index) => (
          <motion.section
            key={index}
            variants={itemVariants}
            className="sci-fi-card p-6 backdrop-blur-sm relative overflow-hidden sci-fi-glow"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/30"></div>
            <div className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary rounded-full"></div>

            <h2 className="text-xl font-semibold mb-3 flex items-center text-primary">
              <ChevronRight className="h-5 w-5 mr-2" />
              {section.title}
            </h2>

            <div className="pl-7">
              {typeof section.content === "string" ? (
                <p className="text-gray-300">{section.content}</p>
              ) : (
                section.content
              )}

              {section.list && (
                <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-1">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.section>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-400">Last updated: June 13, 2025</p>
      </motion.div>
    </div>
  )
}
