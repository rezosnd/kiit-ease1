"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Users, Lightbulb, Award } from "lucide-react"

export default function AboutClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
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
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-primary sci-fi-text-glow">About KIITease</h1>
        <div className="sci-fi-divider mb-8"></div>

        <div className="sci-fi-card p-6 backdrop-blur-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row gap-8 items-center mb-8 relative z-10">
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-75"></div>
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="KIITease Team"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-2 border-primary/50 rounded-lg"></div>
                <div className="absolute -top-2 -left-2 w-16 h-16 border-2 border-primary/50 rounded-lg"></div>
              </motion.div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4 text-primary sci-fi-text-glow flex items-center">
                <span className="inline-block p-2 bg-gray-800/50 rounded-lg border border-primary/30 mr-3">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </span>
                Our Mission
              </h2>

              <p className="text-gray-300 mb-4 pl-12 border-l border-primary/30">
                KIITease was created with a simple mission: to make student life at KIIT University easier and more
                efficient. We understand the challenges students face and have built a platform that addresses key pain
                points.
              </p>

              <p className="text-gray-300 pl-12 border-l border-primary/30">
                From section swapping to accessing quality notes and teacher reviews, our platform provides tools that
                enhance the academic experience for all KIIT students.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative z-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary sci-fi-text-glow flex items-center">
              <span className="inline-block p-2 bg-gray-800/50 rounded-lg border border-primary/30 mr-3">
                <Users className="h-6 w-6 text-primary" />
              </span>
              Our Story
            </h2>

            <div className="pl-12 border-l border-primary/30">
              <p className="text-gray-300 mb-4">
                KIITease began as a project by KIIT students who experienced firsthand the difficulties of section
                changes, finding reliable study materials, and choosing the right professors. What started as a simple
                solution for section swapping has evolved into a comprehensive platform serving the entire KIIT
                community.
              </p>

              <p className="text-gray-300 mb-4">
                Our team consists of passionate developers, designers, and student advocates who are committed to
                continuously improving the platform based on user feedback and emerging needs.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="sci-fi-card p-6 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <h2 className="text-2xl font-semibold mb-6 text-primary sci-fi-text-glow flex items-center">
            <span className="inline-block p-2 bg-gray-800/50 rounded-lg border border-primary/30 mr-3">
              <Award className="h-6 w-6 text-primary" />
            </span>
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              {
                title: "Student-First",
                description: 'Every feature we build starts with the question: "How does this help students?"',
              },
              {
                title: "Transparency",
                description: "We believe in clear, honest communication with our users about how our platform works.",
              },
              {
                title: "Innovation",
                description:
                  "We're constantly looking for new ways to solve student problems and improve the university experience.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                className="bg-gray-800/50 p-6 rounded-lg border border-primary/30 relative overflow-hidden sci-fi-glow"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>

                <h3 className="text-xl font-medium mb-3 text-primary sci-fi-text-glow">{value.title}</h3>

                <p className="text-gray-300 relative z-10">{value.description}</p>

                <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full"></div>
                <div className="absolute bottom-2 right-6 w-1 h-1 bg-primary rounded-full"></div>
                <div className="absolute bottom-6 right-2 w-1 h-1 bg-primary rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
