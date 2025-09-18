'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Header from '../../components/Header'
import ContactModal from '../../components/ContactModal'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  vehicleInfo: z.string().optional(),
  serviceNeeded: z.string().optional(),
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      // Success
      setModal({
        isOpen: true,
        type: 'success',
        message: 'Message sent successfully!'
      })
      reset() // Clear the form

    } catch {
      // Error
      setModal({
        isOpen: true,
        type: 'error',
        message: 'Failed to send message. Please try again or contact Dan directly.'
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
              Ready to boost your diesel&apos;s performance? Contact Dan for expert service and custom solutions.
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
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-foreground/70">(980) 241-4823</p>
                    <p className="text-sm text-foreground/60">Call or text anytime - Dan responds evenings</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-foreground/70">dan@specialtybuilt.com</p>
                    <p className="text-sm text-foreground/60">Dan responds to emails personally</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-foreground/70">Shop Location<br />Contact for address</p>
                    <p className="text-sm text-foreground/60">Working with FABMD partnership</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                    <div className="text-foreground/70 space-y-1">
                      <p>Flexible scheduling available</p>
                      <p>Call or text to arrange appointment</p>
                      <p>Evening responses typical</p>
                    </div>
                    <p className="text-sm text-foreground/60">Accommodating schedule for diesel needs</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 p-6 bg-accent rounded-lg border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-2" />
                  Direct Contact
                </h3>
                <p className="text-foreground/70 mb-2">For questions, advice, or consultation:</p>
                <p className="text-primary font-bold text-lg">(980) 241-4823</p>
                <p className="text-sm text-foreground/60">Text or call anytime - Dan will get back to you</p>
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
                  Send Dan a <span className="text-primary">Message</span>
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
                      Phone *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="(980) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Vehicle Information
                    </label>
                    <input
                      {...register('vehicleInfo')}
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="Year, Make, Model (e.g., 2015 Ford F-350)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service Needed
                    </label>
                    <select 
                      {...register('serviceNeeded')}
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option value="">Select a service</option>
                      <option value="duramax">Duramax Specialist Services</option>
                      <option value="powerstroke">6.0 Powerstroke Bulletproofing</option>
                      <option value="cummins">Cummins Maintenance</option>
                      <option value="fabrication">Custom Fabrication (FABMD)</option>
                      <option value="gas">Gas Vehicle Service</option>
                      <option value="consultation">Consultation/Advice</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                      placeholder="Tell Dan about your diesel's needs or any specific concerns..."
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
                        <span>Send Message to Dan</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Visit Our <span className="text-secondary">Shop</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Working with FABMD partnership for comprehensive diesel and fabrication services
            </p>
          </motion.div>
          
          <div className="bg-background rounded-lg p-2 shadow-lg">
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-foreground/60">Contact Dan for shop location details</p>
                <p className="text-sm text-foreground/40 mt-2">Call or text: (980) 241-4823</p>
              </div>
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