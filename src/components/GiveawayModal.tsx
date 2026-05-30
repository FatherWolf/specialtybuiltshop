'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { giveaway, isGiveawayLive, formatGiveawayDate } from '../lib/giveaway'

/**
 * Home-page launcher modal for the active giveaway.
 *
 * Pops up shortly after the home page loads to capture visitor attention and
 * drive them to /giveaway before they wander off to /shop. Standard
 * sweepstakes-conversion pattern.
 *
 * Behavior:
 *  - Hidden entirely when there's no active campaign (date-window check).
 *  - Appears 1.5s after mount so the page paints first (less spammy feel).
 *  - Dismissible via X, "No thanks," Escape key, or backdrop click.
 *  - Dismissal is remembered in localStorage for 7 days — returning visitors
 *    aren't shown the modal every single load.
 *  - Re-shows after 7 days, or whenever a NEW campaign starts (the
 *    suppression key includes the giveaway start date, so a new campaign
 *    invalidates the prior dismissal).
 */

// Suppression window after a dismiss. 7 days hits the sweet spot: long
// enough that frequent visitors aren't pestered, short enough that we
// re-prompt before a month-long campaign ends.
const SUPPRESSION_DAYS = 7

// localStorage key includes the campaign start so dismissing one campaign
// doesn't suppress the next.
const STORAGE_KEY = `giveawayModalDismissedAt:${giveaway.startDate}`

export default function GiveawayModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Server-rendered HTML never shows the modal — render decision is
    // entirely client-side to keep SSR/CSR markup in sync.
    if (!isGiveawayLive(giveaway)) return

    // Skip if recently dismissed
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const dismissedAt = Number.parseInt(raw, 10)
        const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24)
        if (Number.isFinite(daysSince) && daysSince < SUPPRESSION_DAYS) return
      }
    } catch {
      // localStorage may be unavailable (private browsing, etc.) — just
      // proceed without suppression.
    }

    const t = window.setTimeout(() => setOpen(true), 1500)
    return () => window.clearTimeout(t)
  }, [])

  // Escape to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Lock body scroll while the modal is open so the page behind doesn't
  // scroll under the backdrop on mobile.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, Date.now().toString())
    } catch {
      // ignore
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="giveaway-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-labelledby="giveaway-modal-title"
        >
          <motion.div
            key="giveaway-modal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            // Stop propagation so clicks inside the panel don't bubble to the
            // backdrop's dismiss handler.
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 border border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button — top right, always visible */}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close giveaway popup"
              className="absolute top-3 right-3 z-10 p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top accent strip */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-teal-400 to-purple-500" />

            <div className="px-6 sm:px-8 pt-8 pb-6 text-center">
              {/* Trophy badge */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/30 to-teal-500/30 border border-purple-400/40 rounded-full mb-4">
                <Trophy className="w-8 h-8 text-yellow-300" />
              </div>

              <p className="text-xs font-semibold tracking-widest uppercase text-teal-300 mb-2">
                Giveaway Open
              </p>

              <h2
                id="giveaway-modal-title"
                className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight"
              >
                {giveaway.prizeHeadline}
              </h2>

              <p className="text-sm sm:text-base text-gray-300 mb-2 leading-relaxed">
                Free to enter. No purchase necessary. Open to U.S. residents 18+.
              </p>

              <p className="text-xs text-gray-400 mb-6">
                Ends {formatGiveawayDate(giveaway.endDate)}
              </p>

              <Link
                href="/giveaway"
                onClick={dismiss}
                className="block w-full bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white font-bold py-3.5 px-6 rounded-full transition-all shadow-lg hover:shadow-purple-500/30 mb-3"
              >
                Enter the Giveaway →
              </Link>

              <button
                type="button"
                onClick={dismiss}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors underline-offset-4 hover:underline"
              >
                No thanks, continue to site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
