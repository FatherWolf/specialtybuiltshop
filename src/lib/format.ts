/**
 * Display formatters for product/cart prices.
 *
 * Shopify's Storefront API returns money values as strings like "30.0" or
 * "1500" — never with thousands separators or guaranteed cents. Always run
 * displayed values through formatPrice so the storefront never shows
 * "$30.0" or "$1500".
 */

export function formatPrice(value: string | number | null | undefined): string {
  const num = typeof value === 'string' ? parseFloat(value) : (value ?? 0)
  if (!Number.isFinite(num)) return '0.00'
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Includes the leading "$" sign. Use whenever a price stands alone in copy
 * (e.g. CTA buttons or summaries) — for grids/cards prefer the bare
 * formatPrice() so the surrounding markup controls typography.
 */
export function formatUSD(value: string | number | null | undefined): string {
  return `$${formatPrice(value)}`
}
