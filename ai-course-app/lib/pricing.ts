// Multi-currency pricing configuration for Introduction to AI course

export type Currency = 'gbp' | 'usd' | 'cad' | 'eur' | 'aud' | 'hkd' | 'huf'

export interface PriceInfo {
  priceId: string
  amount: number
  symbol: string
  currency: Currency
}

// Price IDs from Stripe (Introduction to AI course)
export const PRICE_IDS = {
  'ai-course-intro': {
    normal: {
      gbp: { priceId: 'price_1SX0s5FaWAVKdu3u1aws1EKO', amount: 49, symbol: '£' },
      usd: { priceId: 'price_1SaGZiFaWAVKdu3uVyMMJ1ej', amount: 59, symbol: '$' },
      cad: { priceId: 'price_1SaGZjFaWAVKdu3uTz7uooOk', amount: 79, symbol: 'C$' },
      eur: { priceId: 'price_1SaGZtFaWAVKdu3ua3i3TGcC', amount: 55, symbol: '€' },
      aud: { priceId: 'price_1SaGZuFaWAVKdu3uNEIV1lhF', amount: 89, symbol: 'A$' },
      hkd: { priceId: 'price_1SaGa2FaWAVKdu3ulMYO4WF0', amount: 459, symbol: 'HK$' },
      huf: { priceId: 'price_1SaGa4FaWAVKdu3uBSOTtRX3', amount: 22900, symbol: 'Ft' },
    },
    partner: {
      gbp: { priceId: 'price_1SX0s5FaWAVKdu3uag4tz6o3', amount: 19, symbol: '£' },
      usd: { priceId: 'price_1SaGZiFaWAVKdu3ug0Wet5ua', amount: 25, symbol: '$' },
      cad: { priceId: 'price_1SaGZjFaWAVKdu3uVOH3sqxj', amount: 35, symbol: 'C$' },
      eur: { priceId: 'price_1SaGZtFaWAVKdu3uwAOi6GWw', amount: 22, symbol: '€' },
      aud: { priceId: 'price_1SaGZvFaWAVKdu3u3uOdwFVD', amount: 35, symbol: 'A$' },
      hkd: { priceId: 'price_1SaGa3FaWAVKdu3uGiFuArOJ', amount: 189, symbol: 'HK$' },
      huf: { priceId: 'price_1SaGa4FaWAVKdu3u5Lzl3PQE', amount: 8900, symbol: 'Ft' },
    },
  },
} as const

// Map browser locale/timezone to currency
export function detectCurrency(): Currency {
  if (typeof window === 'undefined') return 'gbp'
  
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const locale = navigator.language || 'en-GB'
  
  // Timezone-based detection (more accurate)
  if (timezone.startsWith('America/')) {
    // Check for Canada
    if (timezone.includes('Toronto') || timezone.includes('Vancouver') || 
        timezone.includes('Montreal') || timezone.includes('Edmonton') ||
        timezone.includes('Winnipeg') || timezone.includes('Halifax')) {
      return 'cad'
    }
    return 'usd'
  }
  
  if (timezone.startsWith('Australia/')) return 'aud'
  if (timezone.startsWith('Europe/Budapest')) return 'huf'
  if (timezone === 'Asia/Hong_Kong' || timezone === 'Hongkong') return 'hkd'
  
  // European timezones (excluding UK and Hungary)
  if (timezone.startsWith('Europe/') && 
      !timezone.includes('London') && 
      !timezone.includes('Budapest')) {
    return 'eur'
  }
  
  // Locale-based fallback
  const lang = locale.toLowerCase()
  if (lang.includes('en-us') || lang === 'en') return 'usd'
  if (lang.includes('en-ca') || lang.includes('fr-ca')) return 'cad'
  if (lang.includes('en-au')) return 'aud'
  if (lang.includes('zh-hk') || lang.includes('en-hk')) return 'hkd'
  if (lang.includes('hu')) return 'huf'
  if (lang.includes('de') || lang.includes('fr') || lang.includes('es') || 
      lang.includes('it') || lang.includes('nl') || lang.includes('pt')) {
    return 'eur'
  }
  
  // Default to GBP
  return 'gbp'
}

// Get price info for a product
export function getPrice(
  productId: string, 
  tier: 'normal' | 'partner', 
  currency: Currency
): PriceInfo & { currency: Currency } {
  const productPrices = PRICE_IDS[productId as keyof typeof PRICE_IDS]
  if (!productPrices) {
    // Fallback to GBP if product not found
    return { priceId: '', amount: 0, symbol: '£', currency: 'gbp' }
  }
  
  const tierPrices = productPrices[tier]
  const priceInfo = tierPrices[currency] || tierPrices.gbp
  
  return { ...priceInfo, currency }
}

// Format price for display
export function formatPrice(amount: number, currency: Currency): string {
  const symbols: Record<Currency, string> = {
    gbp: '£',
    usd: '$',
    cad: 'C$',
    eur: '€',
    aud: 'A$',
    hkd: 'HK$',
    huf: 'Ft',
  }
  
  const symbol = symbols[currency]
  
  // HUF doesn't use decimals and symbol goes after
  if (currency === 'huf') {
    return `${amount.toLocaleString()} ${symbol}`
  }
  
  return `${symbol}${amount}`
}

