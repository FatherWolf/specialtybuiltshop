'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error'
  message: string
}

export default function ContactModal({ isOpen, onClose, type, message }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-background border border-muted rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              {type === 'success' ? (
                <div className="mb-6">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-foreground/70">
                    Thanks for reaching out! Dan will get back to you within 24 hours, 
                    typically in the evening.
                  </p>
                  <p className="text-sm text-foreground/60 mt-4">
                    For immediate assistance, call or text: <br />
                    <span className="text-primary font-semibold">(980) 241-4823</span>
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {message}
                  </p>
                  <p className="text-sm text-foreground/60">
                    Please try again or contact Dan directly: <br />
                    <span className="text-primary font-semibold">(980) 241-4823</span>
                  </p>
                </div>
              )}
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                  type === 'success' 
                    ? 'bg-secondary hover:bg-secondary/90' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                Got it!
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}