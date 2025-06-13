"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

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
      title: "KIITease",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Features",
      links: [
        { name: "Section Swap", href: "/section-swap" },
        { name: "Teacher Reviews", href: "/teachers" },
        { name: "Notes Sharing", href: "/notes" },
        { name: "Referral Program", href: "/referrals" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ]

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-black/50 border-t border-primary/20 mt-auto backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-primary sci-fi-text-glow">KIITease</h3>
            <p className="text-gray-400 text-sm">Making student life at KIIT University easier and more efficient.</p>
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-primary/20 text-xs text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span>System Status: Online</span>
              </div>
            </div>
          </motion.div>

          {sections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 text-primary sci-fi-text-glow">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                    >
                      <span className="w-1 h-1 bg-primary/50 rounded-full mr-2 group-hover:w-2 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-primary/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">&copy; {currentYear} KIITease. All rights reserved.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {[
              { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
              { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
              { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-primary transition-colors p-2 bg-gray-800/30 rounded-full border border-primary/20 hover:border-primary/50"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
