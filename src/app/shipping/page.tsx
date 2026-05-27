'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * Shipping Policy.
 *
 * Required for Meta Commerce eligibility. Calls out the separate timeline for
 * custom fabrication (traction bars, etc.) because that's the dominant
 * order-time complaint risk — set the expectation up front and you avoid
 * "where is my custom build" support tickets.
 *
 * Adjust processing windows, carriers, and rate language to match how you
 * actually ship. Update EFFECTIVE_DATE on any substantive change.
 */
const EFFECTIVE_DATE = 'May 27, 2026'
const SPONSOR_LEGAL_NAME = 'Specialty Built Performance & Fab'
const CONTACT_EMAIL = 'dan@specialtybuilt.com'
const BUSINESS_ADDRESS = '5505 Christopher Rd, Iron Station, NC 28080'

export default function ShippingPage() {
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
              Shipping Policy
            </h1>
            <p className="text-purple-300 font-semibold mb-8">
              Effective {EFFECTIVE_DATE}
            </p>

            <Section title="Overview">
              <p>
                {SPONSOR_LEGAL_NAME} ships from Iron Station, North Carolina.
                This policy covers processing time, shipping methods,
                delivery estimates, and what to do if something goes wrong.
              </p>
            </Section>

            <Section title="1. Order Processing Time">
              <h3 className="text-white font-semibold mt-4 mb-2">
                In-stock items
              </h3>
              <p>
                Most in-stock items (apparel, accessories, stocked parts)
                ship within{' '}
                <strong className="text-white">1-3 business days</strong>{' '}
                after the order is placed. You will receive a shipping
                confirmation email with tracking once the label is generated.
              </p>

              <h3 className="text-white font-semibold mt-4 mb-2">
                Custom and made-to-order fabrication
              </h3>
              <p>
                Custom traction bars, custom brackets, and other made-to-order
                builds enter our fabrication queue when the order is placed.
                Production typically takes{' '}
                <strong className="text-white">2-4 weeks</strong> depending on
                current queue volume and complexity. You will receive an
                update when fabrication begins and again when the build
                ships.
              </p>
              <p>
                If you need a custom build by a specific date, contact us
                <strong className="text-white"> before</strong> placing the
                order so we can confirm whether the timeline is realistic.
              </p>
            </Section>

            <Section title="2. Shipping Methods and Carriers">
              <p>
                We ship via UPS, USPS, and FedEx depending on package size,
                weight, and destination. Larger parts (traction bars, full
                kits) typically ship via UPS Ground or FedEx Ground.
              </p>
              <p>
                Available shipping options and rates are calculated and
                displayed at checkout based on the items in your cart and
                your shipping address.
              </p>
            </Section>

            <Section title="3. Shipping Destinations">
              <p>
                We ship to all 50 U.S. states. We do not currently ship to
                U.S. territories, APO/FPO addresses, or internationally. If
                you need a quote for an international destination, email us
                directly and we will see what we can do on a case-by-case
                basis.
              </p>
            </Section>

            <Section title="4. Shipping Costs">
              <p>
                Shipping costs are calculated at checkout based on weight,
                dimensions, destination, and the carrier service selected.
                The total shown at checkout is what you pay — there are no
                hidden handling fees.
              </p>
              <p>
                Promotions offering free or discounted shipping (if any) will
                be clearly noted at checkout.
              </p>
            </Section>

            <Section title="5. Tracking Your Order">
              <p>
                Once your order ships, you will receive a shipping
                confirmation email with a tracking number and a link to the
                carrier&rsquo;s tracking page. Tracking updates can take 24
                hours to appear in the carrier&rsquo;s system after the
                label is generated.
              </p>
              <p>
                If your tracking number has not updated in more than 5
                business days, email us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-teal-400 hover:text-teal-300"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                with your order number and we will investigate with the
                carrier.
              </p>
            </Section>

            <Section title="6. Delivery Estimates">
              <p>
                Delivery estimates depend on the carrier service selected
                and the destination. Typical transit times after shipment:
              </p>
              <ul>
                <li>UPS / FedEx Ground: 1-5 business days within the continental U.S.</li>
                <li>USPS Priority Mail: 1-3 business days within the continental U.S.</li>
                <li>Alaska, Hawaii: add 2-5 business days</li>
              </ul>
              <p>
                These estimates are provided by the carriers and are not
                guaranteed. Weather, holidays, and carrier-side delays can
                affect delivery times.
              </p>
            </Section>

            <Section title="7. Address Accuracy">
              <p>
                Please double-check your shipping address before completing
                checkout. We are not responsible for packages delivered to
                an incorrect or incomplete address you provided. If a
                package is returned to us due to an incorrect address, you
                will be responsible for any re-shipping costs.
              </p>
              <p>
                Need to correct an address after placing an order? Email us{' '}
                <strong className="text-white">as soon as possible</strong> —
                we can usually update the address if the order has not yet
                shipped.
              </p>
            </Section>

            <Section title="8. Damaged or Lost Shipments">
              <p>
                If your package arrives damaged, take photos of the
                packaging and contents and email us at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-teal-400 hover:text-teal-300"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                within{' '}
                <strong className="text-white">7 days of delivery</strong>{' '}
                with your order number and the photos. We will work with the
                carrier to file a claim and arrange a replacement or refund.
              </p>
              <p>
                If your tracking shows delivered but the package is missing,
                first check with neighbors and your local carrier office.
                If you still cannot locate it, contact us within 7 days of
                the &ldquo;delivered&rdquo; date so we can file a missing-
                package claim with the carrier.
              </p>
            </Section>

            <Section title="9. Order Changes and Cancellations">
              <p>
                In-stock orders can typically be changed or canceled before
                the shipping label is generated. Email us as quickly as you
                can with your order number and the change you need.
              </p>
              <p>
                Custom and made-to-order builds enter our fabrication queue
                at the time of order. See our{' '}
                <Link href="/returns" className="text-teal-400 hover:text-teal-300">
                  Return Policy
                </Link>{' '}
                for cancellation specifics on custom work.
              </p>
            </Section>

            <Section title="10. Contact Us">
              <p>
                Questions about shipping, tracking, or a delivery issue?
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
