'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * Return & Refund Policy.
 *
 * Required for Meta Commerce eligibility. Treats stock items differently
 * from custom/made-to-order builds (e.g., custom traction bars), which is
 * standard practice in the diesel parts space — custom fabrication isn't
 * resellable, so it's non-returnable except for defects.
 *
 * Have this reviewed by counsel and adjust the windows / fees to match how
 * you actually operate. Update EFFECTIVE_DATE on any substantive change.
 */
const EFFECTIVE_DATE = 'May 27, 2026'
const SPONSOR_LEGAL_NAME = 'Specialty Built Performance & Fab'
const CONTACT_EMAIL = 'dan@specialtybuilt.com'
const BUSINESS_ADDRESS = '5505 Christopher Rd, Iron Station, NC 28080'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="mb-8">
            <Link
              href="/"
              className="text-teal-400 hover:text-teal-300 text-sm"
            >
              ← Back home
            </Link>
          </div>

          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Return & Refund Policy
            </h1>
            <p className="text-purple-300 font-semibold mb-8">
              Effective {EFFECTIVE_DATE}
            </p>

            <Section title="Overview">
              <p>
                We want you to be happy with every order from{' '}
                {SPONSOR_LEGAL_NAME} (&ldquo;Specialty Built,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). This
                policy explains how returns, exchanges, and refunds work, what
                items qualify, and how to start a return.
              </p>
            </Section>

            <Section title="1. Return Window">
              <p>
                You may request a return within{' '}
                <strong className="text-white">30 days</strong> of the delivery
                date for most in-stock items. Returns initiated after 30 days
                will not be accepted unless required by law.
              </p>
            </Section>

            <Section title="2. Items That Can Be Returned">
              <p>
                To qualify for a return, the item must be:
              </p>
              <ul>
                <li>Unused and in the same condition you received it</li>
                <li>In its original packaging with all tags, hardware, and accessories</li>
                <li>Accompanied by proof of purchase (order number or receipt)</li>
              </ul>
            </Section>

            <Section title="3. Items That Cannot Be Returned">
              <p>
                The following are non-returnable except where required by law
                or where the item arrived defective or damaged:
              </p>
              <ul>
                <li>
                  <strong className="text-white">Custom and made-to-order fabrication</strong>{' '}
                  (e.g., custom traction bars, custom-built brackets, or any
                  item built or modified to your specifications). These items
                  are produced for you specifically and cannot be restocked.
                </li>
                <li>
                  Items that have been installed, used, modified, or show signs
                  of wear
                </li>
                <li>Items returned without original packaging or hardware</li>
                <li>Gift cards and promotional items</li>
                <li>Special-order parts marked &ldquo;Non-Returnable&rdquo; at checkout</li>
              </ul>
              <p>
                If a custom or made-to-order item arrives damaged, defective,
                or built incorrectly on our end, contact us within 7 days of
                delivery and we will repair, replace, or refund it at no cost
                to you.
              </p>
            </Section>

            <Section title="4. How to Start a Return">
              <p>To start a return, email us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-teal-400 hover:text-teal-300"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                with:
              </p>
              <ul>
                <li>Your order number</li>
                <li>The item(s) you want to return</li>
                <li>The reason for the return</li>
                <li>Photos if the item is damaged or defective</li>
              </ul>
              <p>
                We will respond within 1-2 business days with a Return
                Authorization (RA) number and the return shipping address. Do
                not ship items back without an RA number — we may not be able
                to process the return otherwise.
              </p>
            </Section>

            <Section title="5. Return Shipping">
              <p>
                <strong className="text-white">Customer-initiated returns</strong>{' '}
                (e.g., changed your mind, wrong fit, ordered the wrong part):
                you are responsible for return shipping costs. We recommend
                using a trackable shipping service — we are not responsible
                for items lost in transit.
              </p>
              <p>
                <strong className="text-white">Our error or damaged/defective items:</strong>{' '}
                if we sent the wrong item or the item arrived damaged or
                defective, we will provide a prepaid return shipping label.
                Contact us within 7 days of delivery.
              </p>
            </Section>

            <Section title="6. Refunds">
              <p>
                Once we receive and inspect your return (usually within 3-5
                business days of arrival), we will send you an email
                confirming approval or rejection of the refund.
              </p>
              <ul>
                <li>
                  Approved refunds are issued to the original payment method
                  within <strong className="text-white">5-10 business days</strong> of approval.
                </li>
                <li>
                  Depending on your bank or card issuer, the credit may take
                  an additional 3-5 business days to appear on your
                  statement.
                </li>
                <li>
                  Original shipping charges are non-refundable except where
                  the return is due to our error or a defective item.
                </li>
              </ul>
            </Section>

            <Section title="7. Exchanges">
              <p>
                We do not offer direct exchanges. If you need a different
                item, please return the original (per the steps above) and
                place a new order for the replacement. This keeps inventory
                and refund tracking clean for both of us.
              </p>
            </Section>

            <Section title="8. Damaged or Lost Shipments">
              <p>
                If your order arrives damaged or is lost in transit, email
                us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-teal-400 hover:text-teal-300"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                within 7 days of the delivery date (or expected delivery
                date for lost packages). Include your order number and, for
                damaged shipments, photos of the packaging and the damaged
                item. We will work with you and the carrier to resolve it as
                quickly as possible.
              </p>
            </Section>

            <Section title="9. Restocking Fees">
              <p>
                We do not charge a restocking fee on standard returns of
                in-stock items returned in original condition within the
                30-day window. Returns that arrive damaged, used, or missing
                parts may be subject to a deduction reflecting the loss of
                value, or may be rejected entirely.
              </p>
            </Section>

            <Section title="10. Cancellations">
              <p>
                Orders for in-stock items can typically be canceled or
                modified if you contact us before the order ships — usually
                within 24 hours of placing it. Once a label is printed,
                cancellation may not be possible.
              </p>
              <p>
                Custom and made-to-order builds enter our fabrication queue
                immediately. Cancellations after fabrication begins may be
                subject to a charge covering materials and labor already
                committed. Contact us as soon as possible if you need to
                cancel a custom order.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                Questions about a return, exchange, or refund? Reach out:
              </p>
              <p className="not-prose mt-3 mb-3">
                <strong className="text-white">{SPONSOR_LEGAL_NAME}</strong>
                <br />
                {BUSINESS_ADDRESS}
                <br />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-teal-400 hover:text-teal-300"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                You can also reach us through the{' '}
                <Link
                  href="/contact"
                  className="text-teal-400 hover:text-teal-300"
                >
                  Contact page
                </Link>
                .
              </p>
            </Section>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3">
        {title}
      </h2>
      <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}
