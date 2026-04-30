'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy, Mail, Instagram, Users, ShoppingBag, Calendar, ShieldCheck } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {
  giveaway,
  isGiveawayLive,
  isGiveawayEnded,
  formatGiveawayDate,
} from '../../lib/giveaway'

export default function GiveawayPage() {
  const live = isGiveawayLive(giveaway)
  const ended = isGiveawayEnded(giveaway)
  const widgetRef = useRef<HTMLDivElement>(null)
  // Mount gate: the ViralSweep widget rewrites its own DOM after the script
  // loads (it injects an iframe), which mismatches the SSR HTML and triggers
  // a hydration error. Only render the embed on the client.
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // React's dangerouslySetInnerHTML inserts <script> tags as inert DOM nodes
  // that never execute. Walk the rendered embed and re-create each <script>
  // as a real DOM element so the widget loader can run.
  useEffect(() => {
    if (!mounted || !live || !widgetRef.current) return
    const scripts = widgetRef.current.querySelectorAll('script')
    scripts.forEach((orig) => {
      const next = document.createElement('script')
      Array.from(orig.attributes).forEach((attr) => {
        next.setAttribute(attr.name, attr.value)
      })
      if (orig.textContent) next.textContent = orig.textContent
      orig.replaceWith(next)
    })
  }, [mounted, live])

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-teal-800 text-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Trophy className="w-5 h-5 text-yellow-300 mr-2" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                {live ? 'Giveaway Open' : ended ? 'Giveaway Ended' : 'Giveaway'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {giveaway.prizeHeadline}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
              No purchase necessary. Open to U.S. residents 18+
              {giveaway.excludedStates.length > 0
                ? `, excluding ${giveaway.excludedStates.join(', ')}.`
                : '.'}{' '}
              Winner&rsquo;s choice: take the custom traction bars or $1,600 cash.
            </p>

            {live && (
              <div className="flex items-center justify-center text-sm sm:text-base text-teal-200">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  Ends {formatGiveawayDate(giveaway.endDate)}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* No active giveaway state */}
      {!live && !ended && (
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
            <div className="bg-gray-800 border border-purple-500/20 rounded-xl p-8 sm:p-12">
              <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-6 opacity-60" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                No Active Giveaway Right Now
              </h2>
              <p className="text-gray-300 mb-8">
                We&apos;re between campaigns. Subscribe to our newsletter and follow us on
                Instagram to be the first to hear when our next giveaway drops.
              </p>
              <Link
                href="/shop?category=parts"
                className="inline-block bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-full transition-all"
              >
                Browse the Shop
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Ended state — point to winner page */}
      {ended && (
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
            <div className="bg-gray-800 border border-teal-500/20 rounded-xl p-8 sm:p-12">
              <Trophy className="w-16 h-16 text-teal-400 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                This Giveaway Has Ended
              </h2>
              <p className="text-gray-300 mb-8">
                Thanks to everyone who entered. Check the winner page to see who took
                home the prize.
              </p>
              <Link
                href="/giveaway/winner"
                className="inline-block bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-full transition-all"
              >
                See the Winner
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Live state — entry widget + how-to */}
      {live && (
        <>
          {/* Embed widget slot */}
          <section className="py-12 sm:py-16 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
              {/* AMOE notice — required wherever purchase-based entries are advertised */}
              <div className="bg-yellow-900/20 border border-yellow-600/40 text-yellow-100 rounded-lg p-4 mb-6 text-sm leading-relaxed">
                <strong className="text-yellow-200">
                  No purchase necessary.
                </strong>{' '}
                A purchase will not improve your chances of winning. Every
                entry — free email, free mail-in, or any purchase-based bonus
                entry — has the same odds of winning. Prefer to skip the
                widget?{' '}
                <Link
                  href="/giveaway/mail-in"
                  className="underline hover:text-white"
                >
                  Enter for free by mail →
                </Link>
              </div>

              <div className="bg-gray-800 border border-purple-500/20 rounded-xl p-6 sm:p-8 shadow-xl">
                {giveaway.widgetEmbedHtml ? (
                  // Widget HTML comes from a config file maintained by the site
                  // owner — never user input — so dangerouslySetInnerHTML is
                  // an acceptable injection point for the third-party embed.
                  // Only filled in after mount; the loader's iframe injection
                  // would otherwise cause a hydration mismatch on subsequent
                  // navigations. The useEffect above re-instantiates any
                  // <script> tags so the loader actually runs.
                  <div
                    ref={widgetRef}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={
                      mounted
                        ? { __html: giveaway.widgetEmbedHtml }
                        : { __html: '' }
                    }
                  />
                ) : (
                  <div className="text-center py-8">
                    <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Entry Form Coming Soon
                    </h3>
                    <p className="text-gray-400 text-sm">
                      The entry widget will appear here once the campaign goes live.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Shop & Earn — purchase bonus shown big; AMOE inline note keeps
              equal-dignity disclosure clear and conspicuous without a
              matched-size mail-in panel. */}
          <section className="py-12 sm:py-16 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
              <div className="bg-gradient-to-br from-teal-900/40 via-gray-800 to-purple-900/30 border border-teal-500/40 rounded-2xl p-6 sm:p-10 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-teal-400 mr-3" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    Shop &amp; Earn
                  </h2>
                </div>
                <p className="text-center text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Every <strong className="text-teal-300">$1</strong> spent at
                  SpecialtyBuilt.com automatically earns you{' '}
                  <strong className="text-teal-300">1 sweepstakes entry</strong>
                  . The more you spend, the more entries you stack — calculated
                  on the order subtotal (taxes and shipping don&rsquo;t count).
                </p>

                <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-4 sm:p-6 max-w-md mx-auto mb-8">
                  <div className="grid grid-cols-2 gap-3 text-base sm:text-lg">
                    <div className="text-gray-300">$50 order</div>
                    <div className="text-teal-300 font-bold text-right">
                      50 entries
                    </div>
                    <div className="text-gray-300">$200 order</div>
                    <div className="text-teal-300 font-bold text-right">
                      200 entries
                    </div>
                    <div className="text-gray-300">$500 order</div>
                    <div className="text-teal-300 font-bold text-right">
                      500 entries
                    </div>
                    <div className="text-gray-300">$1,000 order</div>
                    <div className="text-teal-300 font-bold text-right">
                      1,000 entries
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-300 mb-6 max-w-xl mx-auto">
                  Use the same email at checkout that you used to enter the
                  sweepstakes — that&rsquo;s how your entries get credited
                  automatically.
                </p>

                <div className="flex justify-center mb-6">
                  <Link
                    href="/shop?category=all"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-bold py-4 px-10 text-lg rounded-full transition-all shadow-lg hover:shadow-teal-500/30"
                  >
                    Shop the Store
                  </Link>
                </div>

                {/* Inline AMOE disclosure — clear and conspicuous, sits within
                    the purchase-entry section so a reader sees the free
                    alternative in the same eyeshot. */}
                <p className="text-center text-xs sm:text-sm text-gray-400 border-t border-gray-700/60 pt-5 max-w-2xl mx-auto">
                  <ShieldCheck className="w-4 h-4 inline-block mr-1 -mt-0.5 text-teal-400" />
                  No purchase necessary. Every entry — including a free{' '}
                  <Link
                    href="/giveaway/mail-in"
                    className="text-teal-300 hover:text-teal-200 underline"
                  >
                    mail-in entry
                  </Link>{' '}
                  — has the same odds of winning. Purchasing does not improve
                  your chances; it just earns you more individual entries.
                </p>
              </div>
            </div>
          </section>

          {/* How to enter */}
          <section className="py-12 sm:py-16 bg-gradient-to-r from-purple-900/20 to-teal-900/20">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3">
                Ways to Enter
              </h2>
              <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
                Multiple entries allowed. Every entry — free email, free
                mail-in letter, or any purchase-based bonus — has the same
                chance of winning. Purchasing does not improve your odds; it
                just earns you more individual entries. You can match any
                purchaser&rsquo;s entry count by mailing in additional free
                letters.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  {
                    icon: Mail,
                    title: 'Submit Email',
                    detail: '+1 entry. Free. Required to start.',
                    color: 'purple',
                  },
                  {
                    icon: Mail,
                    title: 'Free Mail-In Letter',
                    detail:
                      '+1 entry per envelope. Send as many as you like.',
                    color: 'teal',
                  },
                  {
                    icon: Users,
                    title: 'Refer / Follow / Subscribe',
                    detail: 'Bonus entries — see the entry widget',
                    color: 'purple',
                  },
                  {
                    icon: ShoppingBag,
                    title: 'Shop the Store',
                    detail: '+1 per $1 spent (subtotal)',
                    color: 'teal',
                  },
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-gray-800 border border-purple-500/20 rounded-xl p-5 text-center"
                  >
                    <m.icon
                      className={`w-8 h-8 mx-auto mb-3 ${
                        m.color === 'purple' ? 'text-purple-400' : 'text-teal-400'
                      }`}
                    />
                    <h3 className="font-semibold text-white mb-1">{m.title}</h3>
                    <p className="text-sm text-gray-400">{m.detail}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto">
                Want to enter without an internet connection? See the{' '}
                <Link
                  href="/giveaway/mail-in"
                  className="text-teal-400 hover:text-teal-300 underline"
                >
                  free mail-in entry method
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Eligibility / fine print */}
          <section className="py-12 sm:py-16 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sm:p-8">
                <div className="flex items-start mb-4">
                  <ShieldCheck className="w-6 h-6 text-teal-400 mr-3 flex-shrink-0 mt-1" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    The Fine Print
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-300 text-sm sm:text-base ml-9">
                  <li>
                    <strong className="text-white">No purchase necessary.</strong>{' '}
                    Email entry is free. Purchase will not increase your chances of
                    winning beyond the bonus entries described.
                  </li>
                  <li>
                    <strong className="text-white">Open to U.S. residents</strong> who
                    are at least {giveaway.minAge} years old at time of entry, except
                    residents of {giveaway.excludedStates.join(', ')}. Void where
                    prohibited.
                  </li>
                  <li>
                    <strong className="text-white">One winner</strong> selected at
                    random from all eligible entries on or about{' '}
                    {formatGiveawayDate(giveaway.endDate)}.
                  </li>
                  <li>
                    <strong className="text-white">Winner is responsible</strong> for
                    all federal, state, and local taxes. Sponsor will issue Form
                    1099-MISC for the prize value.
                  </li>
                  <li>
                    <strong className="text-white">Sponsor:</strong>{' '}
                    {giveaway.sponsor.legalName}.
                  </li>
                </ul>
                <div className="mt-6 ml-9">
                  <Link
                    href={giveaway.externalRulesUrl ?? '/giveaway/rules'}
                    className="inline-flex items-center text-teal-400 hover:text-teal-300 font-semibold"
                    {...(giveaway.externalRulesUrl
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    Read the full Official Rules →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}
