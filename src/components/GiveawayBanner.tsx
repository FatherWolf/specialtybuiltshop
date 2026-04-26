'use client'

import Link from 'next/link'
import { Trophy, ChevronRight } from 'lucide-react'
import { giveaway, isGiveawayLive } from '../lib/giveaway'

/**
 * Slim promo banner for the active giveaway.
 *
 * Renders nothing when there's no live campaign — safe to drop into any layout
 * unconditionally. The banner is intentionally not dismissible (sticky for the
 * duration of the campaign) since it links to the entry page.
 */
export default function GiveawayBanner() {
  if (!isGiveawayLive(giveaway)) return null

  return (
    <Link
      href="/giveaway"
      className="block bg-gradient-to-r from-purple-600 via-purple-500 to-teal-500 hover:from-purple-700 hover:via-purple-600 hover:to-teal-600 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-center text-white text-sm sm:text-base font-semibold gap-2 sm:gap-3 text-center">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
          <span className="line-clamp-1">
            {giveaway.prizeHeadline} — Enter Free
          </span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        </div>
      </div>
    </Link>
  )
}
