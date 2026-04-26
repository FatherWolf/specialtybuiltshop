'use client'

import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { giveaway, formatGiveawayDate } from '../../../lib/giveaway'

export default function MailInEntryPage() {
  const endDate = formatGiveawayDate(giveaway.endDate)

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <Link
            href="/giveaway"
            className="inline-flex items-center text-teal-400 hover:text-teal-300 text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to giveaway
          </Link>

          <div className="bg-gray-800 border border-purple-500/20 rounded-xl p-6 sm:p-10">
            <Mail className="w-12 h-12 text-teal-400 mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Free Mail-In Entry
            </h1>
            <p className="text-gray-300 mb-6">
              No internet, no purchase, no problem. You can enter the{' '}
              <strong>{giveaway.name}</strong> for free by mail. Mail-in entries
              are weighted equally to online entries.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-3">
              How to enter by mail
            </h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-3 mb-6">
              <li>
                On a 3&rdquo; x 5&rdquo; piece of paper, hand-print the
                following:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400 text-sm">
                  <li>Full name</li>
                  <li>Complete street address (no P.O. boxes)</li>
                  <li>City, state, ZIP code</li>
                  <li>Daytime telephone number</li>
                  <li>Email address</li>
                  <li>Date of birth</li>
                </ul>
              </li>
              <li>Place the paper in a #10 envelope (standard letter size).</li>
              <li>
                Mail to:
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-2 font-mono text-sm text-teal-200 whitespace-pre-line">
{`${giveaway.name} — Mail-In Entry
c/o ${giveaway.sponsor.legalName}
${giveaway.sponsor.address}`}
                </div>
              </li>
            </ol>

            <h2 className="text-xl font-bold text-white mt-8 mb-3">Deadline</h2>
            <p className="text-gray-300 mb-6">
              Mail-in entries must be{' '}
              <strong>postmarked by {endDate}</strong> and received by Sponsor
              no later than seven (7) days after the end of the Promotion
              Period.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-3">Limits</h2>
            <p className="text-gray-300 mb-6">
              Limit one (1) mail-in entry per outer mailing envelope.
              Mechanically reproduced entries are not eligible.
            </p>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-8 text-sm text-gray-400">
              Sponsor is not responsible for lost, late, misdirected, mutilated,
              illegible, postage-due, or undelivered mail-in entries. See the{' '}
              <Link
                href="/giveaway/rules"
                className="text-teal-400 hover:text-teal-300 underline"
              >
                Official Rules
              </Link>{' '}
              for complete eligibility and entry requirements.
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
