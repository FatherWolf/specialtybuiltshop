'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/format'

/**
 * Slide-in toast shown whenever a product is added to the cart.
 *
 * Lives at the root layout level so it can render above any page.
 * Listens to `notification` on CartContext, auto-dismisses after a few
 * seconds, and lets the user click the dismiss button or "View Cart" CTA
 * to act on it sooner.
 */
const AUTO_DISMISS_MS = 3500

export default function CartToast() {
  const { notification, dismissNotification } = useCart()

  // Auto-dismiss timer. Resets if a new notification arrives (because
  // CartContext writes a new object with a new id when addItem fires).
  useEffect(() => {
    if (!notification) return
    const t = window.setTimeout(dismissNotification, AUTO_DISMISS_MS)
    return () => window.clearTimeout(t)
  }, [notification, dismissNotification])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-24 right-4 sm:right-6 z-[60] pointer-events-none"
    >
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="pointer-events-auto w-[20rem] sm:w-96 max-w-[calc(100vw-2rem)] bg-gray-900 border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Top accent bar — purple/teal gradient that matches the brand */}
            <div className="h-1 bg-gradient-to-r from-purple-500 to-teal-500" />

            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Product image (or fallback) */}
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden flex items-center justify-center">
                  {notification.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={notification.image}
                      alt={notification.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ShoppingCart className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Status row */}
                  <div className="flex items-center text-teal-400 text-xs font-semibold uppercase tracking-wide mb-1">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Added to Cart
                  </div>

                  {/* Product title */}
                  <p className="text-white font-semibold leading-snug truncate">
                    {notification.title}
                  </p>

                  {/* Quantity x price */}
                  <p className="text-sm text-gray-400 mt-0.5">
                    {notification.quantity} ×{' '}
                    <span className="text-teal-300">
                      ${formatPrice(notification.price)}
                    </span>
                  </p>
                </div>

                {/* Dismiss */}
                <button
                  onClick={dismissNotification}
                  aria-label="Dismiss notification"
                  className="flex-shrink-0 p-1 -m-1 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* CTA row */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={dismissNotification}
                  className="flex-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Keep Shopping
                </button>
                <Link
                  href="/shop?category=parts"
                  onClick={dismissNotification}
                  className="hidden sm:inline-flex"
                >
                  {/* placeholder; real "view cart" handled below */}
                </Link>
                <button
                  onClick={() => {
                    dismissNotification()
                    // Trigger the existing CartIcon click handler by dispatching
                    // a custom event — keeps this component decoupled from
                    // the Header's local state.
                    window.dispatchEvent(new CustomEvent('open-cart'))
                  }}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 mr-1.5" />
                  View Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
