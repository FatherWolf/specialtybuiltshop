'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Clock, Send, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Header from '../../components/Header'
import ContactModal from '../../components/ContactModal'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  topic: z.string().optional(),
  orderNumber: z.string().optional(),
  message: z.string().min(1, 'Please enter a message'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modal, setModal] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    message: string
  }>({
    isOpen: false,
    type: 'success',
    message: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/mpqqzzky', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Formspree error:', result)
        throw new Error(result.error || 'Failed to send message')
      }

      // Success
      setModal({
        isOpen: true,
        type: 'success',
        message: 'Message sent successfully!'
      })
      reset() // Clear the form

    } catch (error) {
      // Error
      console.error('Form submission error:', error)
      setModal({
        isOpen: true,
        type: 'error',
        message: 'Failed to send message. Please try again or email us directly at dan@specialtybuilt.com.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Contact Header */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Questions about a product, an order, or sizing? Send us a message and we&apos;ll get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Contact <span className="text-secondary">Information</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-foreground/70">dan@specialtybuilt.com</p>
                    <p className="text-sm text-foreground/60">For order questions, sizing, or general support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-foreground/70">(980) 241-4823</p>
                    <p className="text-sm text-foreground/60">Call or text — usually a reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                    <div className="text-foreground/70 space-y-1">
                      <p>Most messages get a reply within 24 hours</p>
                      <p>Order status questions: include your order number for the fastest answer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Help Block */}
              <div className="mt-8 p-6 bg-accent rounded-lg border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-2" />
                  Order Help
                </h3>
                <p className="text-foreground/70 mb-2">
                  Tracking, returns, exchanges, sizing, or product questions — drop a note in the form and we&apos;ll sort it out.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-accent p-8 rounded-lg border border-muted">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Send Us a <span className="text-primary">Message</span>
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        {...register('firstName')}
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register('lastName')}
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone <span className="text-foreground/40">(optional)</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="(980) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Topic
                    </label>
                    <select
                      {...register('topic')}
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option value="">What can we help with?</option>
                      <option value="order-status">Order status / tracking</option>
                      <option value="return-exchange">Return or exchange</option>
                      <option value="product-question">Product question</option>
                      <option value="sizing">Sizing question</option>
                      <option value="shipping">Shipping question</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Order Number <span className="text-foreground/40">(optional, helps us help you faster)</span>
                    </label>
                    <input
                      {...register('orderNumber')}
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="#1024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                      placeholder="How can we help?"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Common <span className="text-secondary">Questions</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Quick answers to the most common things customers ask.
            </p>
          </motion.div>

          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg border border-muted">
              <h3 className="font-semibold text-foreground mb-2">When will my order ship?</h3>
              <p className="text-foreground/70">
                Orders typically ship within 1–2 business days. You&apos;ll receive a tracking email as soon as it&apos;s on its way.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-muted">
              <h3 className="font-semibold text-foreground mb-2">What&apos;s the return policy?</h3>
              <p className="text-foreground/70">
                Apparel can be returned within 30 days if unworn. Performance parts: 30-day return window if unused and in original packaging. Send us a message with your order number and we&apos;ll start the return.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-muted">
              <h3 className="font-semibold text-foreground mb-2">Do you fit X part on Y truck?</h3>
              <p className="text-foreground/70">
                Each product page lists supported platforms (Duramax / Cummins / Powerstroke / generations). If you&apos;re not sure, send us a message with your year/make/model and we&apos;ll confirm fitment before you order.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-muted">
              <h3 className="font-semibold text-foreground mb-2">Do you do installations?</h3>
              <p className="text-foreground/70">
                We&apos;re an online parts and apparel shop — installation isn&apos;t something we offer. We can recommend a reputable shop near you if you ask.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        message={modal.message}
      />
    </div>
  )
}