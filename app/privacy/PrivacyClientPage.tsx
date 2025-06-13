"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, Bell, Share2, Cookie, RefreshCw, MessageSquare } from "lucide-react"

export default function PrivacyClientPage() {
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

  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye className="h-6 w-6 text-primary" />,
      content:
        "We collect information you provide directly to us when you create an account, such as your name, email address, password, and academic information. We may also collect information about your use of our services.",
    },
    {
      title: "How We Use Your Information",
      icon: <Shield className="h-6 w-6 text-primary" />,
      content: "We use the information we collect to:",
      list: [
        "Provide, maintain, and improve our services",
        "Process transactions and send related information",
        "Send you technical notices, updates, and administrative messages",
        "Respond to your comments, questions, and requests",
        "Monitor and analyze trends, usage, and activities",
      ],
    },
    {
      title: "Sharing of Information",
      icon: <Share2 className="h-6 w-6 text-primary" />,
      content: "We may share your information with:",
      list: [
        "Other users as part of the section swapping feature",
        "Service providers who perform services on our behalf",
        "Law enforcement or other parties if required by law",
      ],
    },
    {
      title: "Data Security",
      icon: <Lock className="h-6 w-6 text-primary" />,
      content:
        "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of your information.",
    },
    {
      title: "Your Choices",
      icon: <Bell className="h-6 w-6 text-primary" />,
      content:
        "You can update your account information at any time by logging into your account. You may also opt out of receiving promotional emails by following the instructions in those emails.",
    },
    {
      title: "Cookies",
      icon: <Cookie className="h-6 w-6 text-primary" />,
      content:
        "We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our website.",
    },
    {
      title: "Changes to This Privacy Policy",
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
      content:
        "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.",
    },
    {
      title: "Contact Us",
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      content: (
        <>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <Link href="/contact" className="text-primary hover:underline sci-fi-text-glow">
            our contact page
          </Link>
          .
        </>
      ),
    },
  ]

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
        <h1 className="text-3xl font-bold text-primary sci-fi-text-glow">Privacy Policy</h1>
        <div className="sci-fi-divider"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="sci-fi-card p-6 backdrop-blur-sm relative overflow-hidden sci-fi-glow"
          >
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gray-800/50 rounded-lg border border-primary/30 backdrop-blur-sm">
                {section.icon}
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3 text-primary">{section.title}</h2>

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
            </div>
          </motion.div>
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
