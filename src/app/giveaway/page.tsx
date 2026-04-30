import GiveawayPageClient from './GiveawayPageClient'

/**
 * Server-component wrapper around the interactive giveaway UI.
 *
 * The actual page is a client component (it uses framer-motion, refs, and
 * mounts the third-party widget after hydration). Wrapping it here lets us
 * export route-segment config like `revalidate` — Next.js only honors those
 * exports from server components.
 *
 * `revalidate = 300` makes the static prerender refresh every 5 minutes, so
 * date-driven UI (e.g. flipping from "No Active Giveaway" to live state at
 * the configured start time) updates without a manual rebuild.
 */
export const revalidate = 300

export default function GiveawayPage() {
  return <GiveawayPageClient />
}
