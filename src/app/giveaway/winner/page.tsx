'use client'

import Link from 'next/link'
import { Trophy } from 'lucide-react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { giveaway, formatGiveawayDate } from '../../../lib/giveaway'

export default function GiveawayWinnerPage() {
  const w = giveaway.winner

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center bg-yellow-500/10 rounded-full p-5 mb-6">
            <Trophy className="w-12 h-12 text-yellow-400" />
          </div>

          {w ? (
            <>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
                We have a winner!
              </h1>
              <p className="text-purple-300 font-semibold mb-8">
                {giveaway.name}
              </p>

              <div className="bg-gray-800 border border-yellow-500/30 rounded-xl p-8 mb-8">
                <p className="text-gray-300 mb-2">Congratulations to</p>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {w.firstName} {w.lastInitial}.
                </p>
                <p className="text-gray-400">from {w.state}</p>
                <p className="text-sm text-gray-500 mt-4">
                  Drawn on {formatGiveawayDate(w.drawnOn)}
                </p>
              </div>

              <p className="text-gray-300 mb-8">
                Thanks to everyone who entered. The winner has been notified by
                email and the prize will be awarded once eligibility verification
                is complete. Stay tuned for our next giveaway.
              </p>

              <Link
                href="/shop?category=parts"
                className="inline-block bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-full transition-all"
              >
                Browse the Shop
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
                Winner Coming Soon
              </h1>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                The winner of the {giveaway.name} will be announced on this page
                approximately 30 days after the end of the Promotion Period. The
                winner will be notified by email and required to complete
                eligibility verification before the prize is awarded.
              </p>
              <Link
                href="/giveaway"
                className="inline-block bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-full transition-all"
              >
                Back to Giveaway
              </Link>
            </>
          )}

          <p className="text-xs text-gray-500 mt-12">
            For a complete winner&rsquo;s list, see Section 12 of the{' '}
            <Link
              href="/giveaway/rules"
              className="text-teal-400 hover:text-teal-300 underline"
            >
              Official Rules
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
