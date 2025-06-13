"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

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
        <h1 className="text-3xl font-bold mb-6 text-primary sci-fi-text-glow">Contact Us</h1>
        <div className="sci-fi-divider mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="sci-fi-card p-6 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/30"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-primary/30"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/30"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/30"></div>

            <h2 className="text-2xl font-semibold mb-6 text-primary sci-fi-text-glow">Get in Touch</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
                  Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="h-4 w-4" />
                  </span>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="pl-10 sci-fi-input bg-gray-800/50 border-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <AtSign className="h-4 w-4" />
                  </span>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="pl-10 sci-fi-input bg-gray-800/50 border-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-300">
                  Subject
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="pl-10 sci-fi-input bg-gray-800/50 border-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={5}
                  required
                  className="sci-fi-input bg-gray-800/50 border-primary/30 focus:border-primary"
                />
              </div>

              <Button type="submit" className="w-full sci-fi-button group" disabled={isSubmitting}>
                <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-700 h-full bg-primary/20"></span>
                {isSubmitting ? (
                  <span className="flex items-center relative z-10">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center relative z-10">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="sci-fi-card p-6 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/30"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-primary/30"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/30"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/30"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

            <h2 className="text-2xl font-semibold mb-6 text-primary sci-fi-text-glow">Contact Information</h2>

            <div className="space-y-8">
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="p-3 bg-gray-800/50 rounded-lg border border-primary/30 mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-200">Email</h3>
                  <p className="text-primary sci-fi-text-glow">support@kiitease.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="p-3 bg-gray-800/50 rounded-lg border border-primary/30 mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-200">Phone</h3>
                  <p className="text-primary sci-fi-text-glow">+91 1234567890</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="p-3 bg-gray-800/50 rounded-lg border border-primary/30 mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-200">Address</h3>
                  <p className="text-gray-300">
                    KIIT University
                    <br />
                    Patia, Bhubaneswar
                    <br />
                    Odisha, India - 751024
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <h3 className="font-medium mb-3 text-gray-200">Office Hours</h3>
              <p className="text-gray-300">
                Monday - Friday: <span className="text-primary">9:00 AM - 5:00 PM</span>
                <br />
                Saturday: <span className="text-primary">10:00 AM - 2:00 PM</span>
                <br />
                Sunday: <span className="text-gray-400">Closed</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
