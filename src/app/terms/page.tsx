'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * Terms of Service.
 *
 * Strongly recommended for Meta Commerce eligibility and required by most
 * payment processors. Standard US e-commerce terms with diesel-parts-specific
 * disclaimers (off-road / professional installation language) layered in,
 * since improper installation is a real liability vector for performance
 * parts. Governing law set to North Carolina to match the business address.
 *
 * Have this reviewed by counsel before launch. Update EFFECTIVE_DATE on any
 * substantive change.
 */
const EFFECTIVE_DATE = 'May 27, 2026'
const SPONSOR_LEGAL_NAME = 'Specialty Built Performance & Fab'
const CONTACT_EMAIL = 'dan@specialtybuilt.com'
const BUSINESS_ADDRESS = '5505 Christopher Rd, Iron Station, NC 28080'
const GOVERNING_STATE = 'North Carolina'

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-purple-300 font-semibold mb-8">
              Effective {EFFECTIVE_DATE}
            </p>

            <Section title="1. Acceptance of Terms">
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your use
                of the website at{' '}
                <a
                  href="https://www.specialtybuilt.com"
                  className="text-teal-400 hover:text-teal-300"
                >
                  specialtybuilt.com
                </a>{' '}
                (the &ldquo;Site&rdquo;) and any orders you place through it.
                The Site is operated by {SPONSOR_LEGAL_NAME}
                (&ldquo;Specialty Built,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing the Site
                or placing an order, you agree to be bound by these Terms.
                If you do not agree, do not use the Site.
              </p>
            </Section>

            <Section title="2. Eligibility">
              <p>
                You must be at least 18 years old (or the age of majority in
                your jurisdiction) to place an order. By placing an order
                you represent that you meet this age requirement and that
                the information you provide is accurate and complete.
              </p>
            </Section>

            <Section title="3. Use of the Site">
              <p>You agree not to:</p>
              <ul>
                <li>Use the Site for any unlawful purpose or in violation of these Terms</li>
                <li>Attempt to gain unauthorized access to the Site, our servers, or our systems</li>
                <li>Interfere with or disrupt the operation of the Site</li>
                <li>Use any automated means (bots, scrapers, etc.) to access or collect data from the Site without our written permission</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Resell, lease, or commercially exploit any part of the Site without our written permission</li>
              </ul>
            </Section>

            <Section title="4. Products, Pricing, and Availability">
              <p>
                We make reasonable efforts to display products, descriptions,
                images, and prices accurately. However:
              </p>
              <ul>
                <li>
                  Product images and colors may vary from the actual item due
                  to monitor differences and production variation
                </li>
                <li>
                  Prices and availability are subject to change without notice
                </li>
                <li>
                  Typographical errors in pricing, descriptions, or
                  specifications may occur. We reserve the right to correct
                  such errors and to cancel any order placed at an
                  incorrectly listed price, even after the order has been
                  confirmed
                </li>
                <li>
                  All products are sold subject to availability. If an item
                  becomes unavailable after you order, we will notify you
                  and refund any payment for that item
                </li>
              </ul>
            </Section>

            <Section title="5. Orders and Acceptance">
              <p>
                Your order is an offer to purchase. We reserve the right to
                accept or decline any order, in whole or in part, for any
                lawful reason, including suspected fraud, inventory issues,
                or shipping limitations. Your order is not accepted until
                we send you a shipping confirmation email.
              </p>
              <p>
                Custom and made-to-order fabrication requires accurate
                vehicle and specification information from you. You are
                responsible for the accuracy of the information you provide
                for a custom build. See our{' '}
                <Link href="/returns" className="text-teal-400 hover:text-teal-300">
                  Return Policy
                </Link>{' '}
                for how custom orders are handled.
              </p>
            </Section>

            <Section title="6. Payment">
              <p>
                Payment is processed through PCI-compliant third-party payment
                processors (e.g., Shopify Payments, Shop Pay, PayPal). By
                placing an order you authorize us (and our payment processor)
                to charge the full order total, including applicable taxes
                and shipping, to the payment method you provide.
              </p>
              <p>
                You represent that you are authorized to use the payment
                method you submit. If a payment is declined, reversed, or
                charged back, we may suspend or cancel your order and
                pursue any amounts owed.
              </p>
            </Section>

            <Section title="7. Shipping, Returns, and Refunds">
              <p>
                Shipping is governed by our{' '}
                <Link href="/shipping" className="text-teal-400 hover:text-teal-300">
                  Shipping Policy
                </Link>
                . Returns and refunds are governed by our{' '}
                <Link href="/returns" className="text-teal-400 hover:text-teal-300">
                  Return Policy
                </Link>
                . Both are incorporated into these Terms by reference.
              </p>
            </Section>

            <Section title="8. Intellectual Property">
              <p>
                All content on the Site — text, graphics, logos, product
                photos, videos, copy, and software — is owned by
                {' '}{SPONSOR_LEGAL_NAME} or its licensors and is protected
                by U.S. and international copyright, trademark, and other
                intellectual property laws.
              </p>
              <p>
                You may not copy, reproduce, distribute, modify, or create
                derivative works from any content on the Site without our
                prior written permission, except that you may view, download,
                and print pages for your personal, non-commercial use.
              </p>
              <p>
                Specialty Built, the Specialty Built logo, and related marks
                are trademarks of {SPONSOR_LEGAL_NAME}. All other trademarks
                referenced on the Site are the property of their respective
                owners.
              </p>
            </Section>

            <Section title="9. Installation, Use, and Fitment">
              <p>
                Many products we sell are performance parts intended for
                off-road or competition use, or are aftermarket parts that
                modify a vehicle&rsquo;s factory configuration. By purchasing,
                you acknowledge and agree that:
              </p>
              <ul>
                <li>
                  <strong className="text-white">Professional installation is strongly recommended.</strong>{' '}
                  Improper installation can damage your vehicle, void
                  manufacturer warranties, and create safety risks. You
                  assume full responsibility for installation performed by
                  you or anyone you select.
                </li>
                <li>
                  Some products may not be street-legal in all states or
                  jurisdictions. You are responsible for confirming legality
                  in your area before purchase or use.
                </li>
                <li>
                  You are responsible for confirming fitment for your
                  specific vehicle make, model, year, and configuration
                  before ordering. If you are unsure, contact us before
                  placing the order.
                </li>
                <li>
                  Aftermarket parts may affect manufacturer warranties on
                  your vehicle. Consult your vehicle manufacturer or dealer
                  if warranty status is a concern.
                </li>
              </ul>
            </Section>

            <Section title="10. Disclaimer of Warranties">
              <p>
                EXCEPT WHERE EXPRESSLY STATED OTHERWISE IN WRITING OR REQUIRED
                BY LAW, THE SITE AND ALL PRODUCTS ARE PROVIDED ON AN
                &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS. TO
                THE FULLEST EXTENT PERMITTED BY LAW, {SPONSOR_LEGAL_NAME.toUpperCase()}{' '}
                DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTY
                ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.
              </p>
              <p>
                Manufacturer warranties (where applicable) pass through to
                you on covered products. We will assist with warranty
                claims where reasonable but the manufacturer is the
                ultimate warrantor.
              </p>
            </Section>

            <Section title="11. Limitation of Liability">
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW,{' '}
                {SPONSOR_LEGAL_NAME.toUpperCase()} AND ITS OFFICERS,
                EMPLOYEES, AGENTS, AND SUPPLIERS WILL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR
                EXEMPLARY DAMAGES — INCLUDING LOSS OF PROFITS, DATA, USE,
                GOODWILL, OR OTHER INTANGIBLE LOSSES — ARISING OUT OF OR
                RELATING TO YOUR USE OF THE SITE OR ANY PRODUCT PURCHASED
                THROUGH THE SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT
                (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY.
              </p>
              <p>
                OUR TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CLAIM ARISING
                FROM OR RELATING TO THE SITE OR A PRODUCT WILL NOT EXCEED
                THE AMOUNT YOU PAID FOR THE PRODUCT GIVING RISE TO THE
                CLAIM.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion or limitation
                of certain damages, so some of the above may not apply to
                you.
              </p>
            </Section>

            <Section title="12. Indemnification">
              <p>
                You agree to indemnify and hold harmless{' '}
                {SPONSOR_LEGAL_NAME} and its officers, employees, agents,
                and suppliers from any claim, loss, liability, damage, or
                expense (including reasonable attorneys&rsquo; fees) arising
                from: (a) your violation of these Terms; (b) your misuse of
                the Site or any product; (c) your improper installation,
                modification, or use of a product; or (d) your violation of
                any law or third-party right.
              </p>
            </Section>

            <Section title="13. Governing Law and Dispute Resolution">
              <p>
                These Terms are governed by the laws of the State of{' '}
                {GOVERNING_STATE}, without regard to conflict-of-law
                principles. Any dispute arising from or relating to these
                Terms or your use of the Site will be brought exclusively in
                the state or federal courts located in {GOVERNING_STATE},
                and you consent to the jurisdiction and venue of those
                courts.
              </p>
            </Section>

            <Section title="14. Sweepstakes">
              <p>
                From time to time we run sweepstakes, contests, or giveaways
                with their own Official Rules. Those rules govern entry,
                eligibility, prize award, and related terms for the specific
                promotion. Where the Official Rules and these Terms
                conflict, the Official Rules control for that promotion.
              </p>
            </Section>

            <Section title="15. Changes to These Terms">
              <p>
                We may update these Terms from time to time. When we do, we
                will revise the &ldquo;Effective&rdquo; date at the top of
                this page. Your continued use of the Site after the
                effective date of an updated version constitutes acceptance
                of the changes.
              </p>
            </Section>

            <Section title="16. Severability">
              <p>
                If any provision of these Terms is held to be invalid or
                unenforceable, the remaining provisions will remain in full
                force and effect.
              </p>
            </Section>

            <Section title="17. Entire Agreement">
              <p>
                These Terms, together with our{' '}
                <Link href="/privacy" className="text-teal-400 hover:text-teal-300">
                  Privacy Policy
                </Link>
                ,{' '}
                <Link href="/returns" className="text-teal-400 hover:text-teal-300">
                  Return Policy
                </Link>
                , and{' '}
                <Link href="/shipping" className="text-teal-400 hover:text-teal-300">
                  Shipping Policy
                </Link>
                , constitute the entire agreement between you and{' '}
                {SPONSOR_LEGAL_NAME} regarding the Site and supersede any
                prior agreements or communications.
              </p>
            </Section>

            <Section title="18. Contact Us">
              <p>
                Questions about these Terms?
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
