/**
 * Giveaway / Sweepstakes configuration.
 *
 * Single source of truth for the active campaign. Set `active: false` between
 * campaigns and the giveaway pages will show a "no active giveaway" placeholder
 * (and the banner / header link will hide automatically).
 *
 * To launch a new campaign:
 *   1. Update the fields below (prize, dates, sponsor info, etc.)
 *   2. Paste the ViralSweep embed snippet into `widgetEmbedHtml`
 *   3. Update Official Rules content as needed (or rely on ViralSweep-generated
 *      rules and link to those externally — see `externalRulesUrl`)
 *   4. Set `active: true` and deploy
 *
 * IMPORTANT — LEGAL NOTICE
 * The Official Rules content in this file is a TEMPLATE that covers the most
 * common required sections for a US sweepstakes under $5,000. You should
 * still:
 *   - Verify the language with a sweepstakes attorney or your CPA before
 *     launching any campaign.
 *   - Use ViralSweep's (or equivalent) generated Official Rules as the
 *     authoritative version when possible — they're maintained by lawyers.
 *   - Confirm state-specific rules — RI is excluded by default below; check
 *     thresholds for FL/NY if your prize value exceeds $5,000.
 */

export type Giveaway = {
  /** When false, all giveaway pages show a "no active campaign" message and
   *  the header/banner promos hide. */
  active: boolean

  /** Short marketing name, e.g. "Specialty Built Spring Giveaway". */
  name: string

  /** Plain-language prize description for marketing copy. */
  prizeHeadline: string

  /** Approximate Retail Value of the full prize (USD), used in Official Rules
   *  and IRS compliance language. Total of all components (store credit + tax
   *  bonus + anything else). */
  prizeARV: number

  /** Detailed prize description for legal use in Official Rules. */
  prizeDescription: string

  /** ISO date strings for promotion period start/end (UTC). */
  startDate: string
  endDate: string

  /** Sponsor info for legal compliance. Must be the exact legal entity. */
  sponsor: {
    legalName: string
    address: string // Street address used for AMOE and Official Rules
    contactEmail: string
  }

  /** States/regions excluded from eligibility. RI is the standard exclusion
   *  for any US sweepstakes with prizes over $500 (RI registration trigger). */
  excludedStates: string[]

  /** Minimum age (typically 18). */
  minAge: number

  /** ViralSweep (or equivalent) widget embed code. Paste the entire snippet
   *  including <div> placeholder and <script> tag. Rendered with
   *  dangerouslySetInnerHTML on /giveaway, so only paste from a trusted source.
   *  Leave blank string ('') if you want the page to show "coming soon". */
  widgetEmbedHtml: string

  /** Optional — URL to externally-hosted Official Rules (e.g. ViralSweep's).
   *  If set, the on-site /giveaway/rules page redirects/links to this instead
   *  of rendering the template below. */
  externalRulesUrl: string | null

  /** Winner info — populate after drawing for the /giveaway/winner page. */
  winner: null | {
    firstName: string
    lastInitial: string
    state: string
    drawnOn: string // ISO date
  }
}

/**
 * Pretty-print helpers used by giveaway pages.
 */
export function formatGiveawayDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatGiveawayDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

/**
 * The currently configured giveaway.
 * Edit this object to launch a new campaign.
 */
export const giveaway: Giveaway = {
  active: false,

  name: 'Specialty Built $1,500 Giveaway',

  prizeHeadline: 'Win $1,500 in Specialty Built store credit',

  prizeARV: 1800,

  prizeDescription:
    'One (1) winner will receive: (a) one $1,500 USD Specialty Built ' +
    'Performance & Fab store credit, redeemable at specialtybuilt.com only, ' +
    'with no cash value, non-transferable, and expiring twelve (12) months ' +
    'from issuance; and (b) $300 USD cash bonus paid via PayPal or check, ' +
    'intended to assist with associated tax obligations. ' +
    'Approximate Retail Value (ARV): $1,800 USD. ' +
    'All federal, state, and local taxes on the prize are the sole ' +
    'responsibility of the winner. Sponsor will issue IRS Form 1099-MISC ' +
    'reporting the prize value.',

  // PLACEHOLDER DATES — update before launch
  startDate: '2026-05-01T00:00:00Z',
  endDate: '2026-05-31T23:59:59Z',

  sponsor: {
    legalName: 'Specialty Built Performance & Fab',
    // PLACEHOLDER ADDRESS — replace with the actual mailing address before launch
    address: '[Sponsor Mailing Address — TO BE FILLED IN]',
    contactEmail: 'dan@specialtybuilt.com',
  },

  excludedStates: ['Rhode Island'],

  minAge: 18,

  widgetEmbedHtml: '',

  externalRulesUrl: null,

  winner: null,
}

/**
 * Returns true if the giveaway should be visible on the site right now.
 * Considers both the manual `active` flag and the date window.
 */
export function isGiveawayLive(g: Giveaway = giveaway): boolean {
  if (!g.active) return false
  const now = Date.now()
  const start = new Date(g.startDate).getTime()
  const end = new Date(g.endDate).getTime()
  return now >= start && now <= end
}

/**
 * Returns true if the giveaway has ended (and may have a winner to display).
 */
export function isGiveawayEnded(g: Giveaway = giveaway): boolean {
  if (!g.active) return false
  return Date.now() > new Date(g.endDate).getTime()
}
