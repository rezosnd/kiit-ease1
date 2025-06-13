"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const cardHoverEffect = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
  }

  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center py-12 md:py-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 sci-fi-text-glow">Welcome to KIITease</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl text-muted-foreground">
            Your ultimate platform for KIIT University students to swap sections, share notes, and review teachers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="sci-fi-button" asChild>
              <Link href="/section-swap">Section Swap</Link>
            </Button>
            <Button size="lg" variant="outline" className="sci-fi-button" asChild>
              <Link href="/teachers">Teacher Reviews</Link>
            </Button>
            <Button size="lg" variant="outline" className="sci-fi-button" asChild>
              <Link href="/notes">Notes Sharing</Link>
            </Button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
        >
          {[
            {
              title: "Section Swap",
              description:
                "Easily swap your section with other students. Submit your request and get matched automatically.",
            },
            {
              title: "Teacher Reviews",
              description: "Read and write reviews for teachers. Make informed decisions about your courses.",
              premium: true,
            },
            {
              title: "Notes Sharing",
              description: "Access and share notes with your peers. Collaborate and excel in your studies.",
              premium: true,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-primary/20 bg-black/30 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-xl font-semibold mb-3 sci-fi-text-glow">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              {feature.premium && (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                  Premium Feature
                </div>
              )}
            </div>
          ))}
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold text-primary sci-fi-text-glow">KIIT{"{ease}"}</div>
              <p className="text-muted-foreground mt-2">A platform for KIIT University students and faculty</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="sci-fi-divider"></div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} KIITease. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
