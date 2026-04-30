'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

/**
 * Privacy Policy.
 *
 * This is a TEMPLATE that covers the typical bases for a US e-commerce + sweepstakes
 * operator. Have it reviewed by counsel before launch, or replace with a
 * lawyer-drafted version. Update the EFFECTIVE_DATE below whenever the policy
 * substantively changes.
 */
const EFFECTIVE_DATE = 'April 28, 2026'
const SPONSOR_LEGAL_NAME = 'Specialty Built Performance & Fab'
const CONTACT_EMAIL = 'dan@specialtybuilt.com'

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-purple-300 font-semibold mb-8">
              Effective {EFFECTIVE_DATE}
            </p>

            <Section title="Overview">
              <p>
                {SPONSOR_LEGAL_NAME} (&ldquo;Specialty Built,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website at{' '}
                <a
                  href="https://www.specialtybuilt.com"
                  className="text-teal-400 hover:text-teal-300"
                >
                  specialtybuilt.com
                </a>{' '}
                and related services (the &ldquo;Site&rdquo;). This Privacy
                Policy explains what information we collect about you, how we
                use it, and the choices you have. By using the Site, placing an
                order, entering a sweepstakes, or contacting us, you agree to
                the practices described here.
              </p>
            </Section>

            <Section title="1. Information We Collect">
              <p>We collect the following categories of information:</p>

              <h3 className="text-white font-semibold mt-4 mb-2">
                Information you give us
              </h3>
              <ul>
                <li>
                  <strong>Contact details</strong> — name, email address, phone
                  number, mailing address (collected when you place an order,
                  enter a sweepstakes, sign up for our newsletter, or send a
                  contact-form message).
                </li>
                <li>
                  <strong>Order details</strong> — items purchased, payment
                  method type, billing and shipping addresses. Full payment
                  card numbers are processed by our payment processors and are
                  not stored on our systems.
                </li>
                <li>
                  <strong>Sweepstakes entry details</strong> — when you enter a
                  giveaway, we collect the information you submit on the entry
                  form (name, email, optionally phone) and any mail-in entry
                  details you provide. We also record the entry source
                  (purchase, free email entry, mail-in, referral, social
                  click).
                </li>
                <li>
                  <strong>Communications</strong> — messages and information you
                  send us by email, contact form, or social media.
                </li>
              </ul>

              <h3 className="text-white font-semibold mt-4 mb-2">
                Information we collect automatically
              </h3>
              <ul>
                <li>
                  <strong>Device and usage data</strong> — IP address, browser
                  type, device identifiers, pages viewed, time spent on the
                  Site, and referring URL.
                </li>
                <li>
                  <strong>Cookies and similar technologies</strong> — small
                  data files stored on your device that help us recognize
                  returning visitors, keep your shopping cart working, measure
                  Site performance, and (where applicable) deliver advertising.
                </li>
              </ul>

              <h3 className="text-white font-semibold mt-4 mb-2">
                Information from third parties
              </h3>
              <ul>
                <li>
                  Order, fulfillment, and customer information from our
                  e-commerce platform (Shopify) and shipping carriers.
                </li>
                <li>
                  Payment confirmation data from payment processors (e.g.,
                  Stripe, Shop Pay, PayPal).
                </li>
                <li>
                  Sweepstakes referral and engagement data when participants
                  share entry links or arrive via a referral URL.
                </li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>
                  Process and fulfill your orders, including shipping, returns,
                  and customer support.
                </li>
                <li>
                  Administer sweepstakes — verify eligibility, calculate entry
                  counts, communicate with entrants, draw winners, deliver
                  prizes, and comply with the Official Rules.
                </li>
                <li>
                  Respond to your inquiries, technical-support requests, and
                  feedback.
                </li>
                <li>
                  Send you transactional messages (order confirmations,
                  shipping notifications, sweepstakes updates) and, when you
                  opt in, marketing emails and SMS messages. You can
                  unsubscribe at any time using the link in any marketing
                  email or by replying STOP to a marketing SMS.
                </li>
                <li>
                  Operate, secure, and improve the Site, prevent fraud, and
                  enforce our Terms of Service and Sweepstakes Rules.
                </li>
                <li>
                  Comply with applicable law, respond to lawful requests, and
                  protect our legal rights.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Share Your Information">
              <p>
                We do not sell your personal information. We share information
                only with the parties below and only as needed to operate our
                business:
              </p>
              <ul>
                <li>
                  <strong>Service providers</strong> — companies that perform
                  services on our behalf, including: Shopify (e-commerce),
                  payment processors, shipping carriers, sweepstakes-platform
                  vendors, email and SMS providers, analytics providers, and
                  hosting providers. These providers are bound by contract to
                  use the information only for the services they provide to
                  us.
                </li>
                <li>
                  <strong>Sweepstakes administration</strong> — the name,
                  state, and last initial of a winner may be published on the
                  Site, on social media, or in winner-announcement
                  communications, as described in the applicable Official
                  Rules.
                </li>
                <li>
                  <strong>Legal and safety</strong> — we may disclose
                  information when required by law, to comply with legal
                  process, or to protect the rights, property, or safety of
                  Specialty Built, our customers, or others.
                </li>
                <li>
                  <strong>Business transfers</strong> — if we are acquired or
                  merged with another company, customer information may be
                  transferred as part of that transaction. You will be
                  notified of any such change.
                </li>
              </ul>
            </Section>

            <Section title="4. Cookies and Tracking">
              <p>
                We and our service providers use cookies, pixels, and similar
                technologies to keep the Site working (for example, to
                maintain your shopping cart and login state), measure traffic
                and performance, and — where applicable — measure the
                effectiveness of advertising. Most browsers allow you to
                refuse or delete cookies in their settings; doing so may
                affect the functionality of the Site.
              </p>
              <p>
                If we use third-party analytics or advertising tools (such as
                Google Analytics or Meta Pixel), those tools may collect
                information about your visits across our Site and other sites
                in accordance with their own privacy policies.
              </p>
            </Section>

            <Section title="5. Data Retention">
              <p>
                We retain personal information for as long as needed to
                provide our services, comply with our legal obligations,
                resolve disputes, and enforce our agreements. Order records
                are retained for the period required by applicable tax,
                accounting, and consumer-protection laws. Sweepstakes entry
                records are retained until the campaign concludes and any
                winner-verification or prize-fulfillment period ends, plus a
                reasonable additional period for record-keeping.
              </p>
            </Section>

            <Section title="6. Security">
              <p>
                We use reasonable administrative, technical, and physical
                safeguards designed to protect personal information. Payment
                processing occurs through PCI-compliant payment processors;
                we do not store full payment card numbers on our systems.
                However, no method of transmission over the internet or
                method of electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section title="7. Your Choices and Rights">
              <p>You have the following choices regarding your information:</p>
              <ul>
                <li>
                  <strong>Marketing communications</strong> — you can
                  unsubscribe from marketing emails using the unsubscribe link
                  in any email, or reply STOP to a marketing SMS. You will
                  still receive transactional messages related to your
                  orders or sweepstakes entries.
                </li>
                <li>
                  <strong>Access, correction, deletion</strong> — you may
                  request access to, correction of, or deletion of personal
                  information we hold about you by contacting us at the email
                  below. We will respond consistent with applicable law.
                </li>
                <li>
                  <strong>California residents</strong> — under the California
                  Consumer Privacy Act (CCPA), you have rights to know what
                  personal information we collect, to request deletion, to
                  correct inaccurate information, and to opt out of any
                  &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
                  information (we do not sell personal information). To
                  exercise these rights, contact us at the email below.
                </li>
                <li>
                  <strong>Browser controls</strong> — most browsers allow you
                  to manage cookies and respond to Do-Not-Track signals.
                  Because there is no industry consensus on Do-Not-Track,
                  our Site does not currently respond to those signals.
                </li>
              </ul>
            </Section>

            <Section title="8. Children's Privacy">
              <p>
                The Site is not directed to children under 13, and we do not
                knowingly collect personal information from children under
                13. Sweepstakes are restricted to entrants who are at least
                18 years old at the time of entry. If you believe a child
                under 13 has provided us with personal information, please
                contact us at the email below and we will delete the
                information.
              </p>
            </Section>

            <Section title="9. International Visitors">
              <p>
                The Site is operated in the United States. If you access the
                Site from outside the United States, your information will be
                transferred to, processed in, and stored in the United
                States, where data-protection laws may differ from those of
                your country. By using the Site you consent to that
                transfer.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we
                do, we will revise the &ldquo;Effective&rdquo; date at the
                top of this page. If the changes are material, we will
                provide additional notice (for example, by email or a notice
                on the Site). Your continued use of the Site after the
                effective date of an updated policy constitutes acceptance
                of those updates.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                Questions, requests, or concerns about this Privacy Policy or
                our handling of your information? Contact us at:
              </p>
              <p className="not-prose mt-3 mb-3">
                <strong className="text-white">{SPONSOR_LEGAL_NAME}</strong>
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
