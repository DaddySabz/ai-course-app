// Multi-currency pricing configuration for Introduction to AI course

export type Currency = 'gbp' | 'usd' | 'cad' | 'eur' | 'aud' | 'hkd' | 'huf'

export interface PriceInfo {
  priceId: string
  amount: number
  symbol: string
  currency: Currency
}

// LIVE Price IDs from Stripe (Introduction to AI course)
export const PRICE_IDS = {
  'ai-course-intro': {
    normal: {
      gbp: { priceId: 'price_1SaJFCFDt9aGqs933Af77h2e', amount: 49, symbol: '£' },
      usd: { priceId: 'price_1SaJFDFDt9aGqs933yvMHXSO', amount: 59, symbol: '$' },
      cad: { priceId: 'price_1SaJFFFDt9aGqs93ctvjPsaq', amount: 79, symbol: 'C$' },
      eur: { priceId: 'price_1SaJFNFDt9aGqs93gdFpvcId', amount: 55, symbol: '€' },
      aud: { priceId: 'price_1SaJFOFDt9aGqs93w2LJSW5w', amount: 89, symbol: 'A$' },
      hkd: { priceId: 'price_1SaJFQFDt9aGqs93WTpjbLpm', amount: 459, symbol: 'HK$' },
      huf: { priceId: 'price_1SaJFRFDt9aGqs93to6akRly', amount: 22900, symbol: 'Ft' },
    },
    partner: {
      gbp: { priceId: 'price_1SaJFDFDt9aGqs93edQA2cdV', amount: 19, symbol: '£' },
      usd: { priceId: 'price_1SaJFEFDt9aGqs93hIEjnNVD', amount: 25, symbol: '$' },
      cad: { priceId: 'price_1SaJFFFDt9aGqs93ZYIo6gIF', amount: 35, symbol: 'C$' },
      eur: { priceId: 'price_1SaJFOFDt9aGqs93riEJljTu', amount: 22, symbol: '€' },
      aud: { priceId: 'price_1SaJFPFDt9aGqs93zKQyPqhm', amount: 35, symbol: 'A$' },
      hkd: { priceId: 'price_1SaJFQFDt9aGqs93yVnMSLfO', amount: 189, symbol: 'HK$' },
      huf: { priceId: 'price_1SaJFSFDt9aGqs9397Ixsl0r', amount: 8900, symbol: 'Ft' },
    },
  },
} as const

// Country code to currency mapping (ISO 3166-1 alpha-2)
const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  // GBP
  'GB': 'gbp',
  'UK': 'gbp',
  
  // USD
  'US': 'usd',
  
  // CAD
  'CA': 'cad',
  
  // AUD
  'AU': 'aud',
  
  // HKD
  'HK': 'hkd',
  
  // HUF
  'HU': 'huf',
  
  // EUR - Eurozone countries
  'AT': 'eur', // Austria
  'BE': 'eur', // Belgium
  'CY': 'eur', // Cyprus
  'EE': 'eur', // Estonia
  'FI': 'eur', // Finland
  'FR': 'eur', // France
  'DE': 'eur', // Germany
  'GR': 'eur', // Greece
  'IE': 'eur', // Ireland
  'IT': 'eur', // Italy
  'LV': 'eur', // Latvia
  'LT': 'eur', // Lithuania
  'LU': 'eur', // Luxembourg
  'MT': 'eur', // Malta
  'NL': 'eur', // Netherlands
  'PT': 'eur', // Portugal
  'SK': 'eur', // Slovakia
  'SI': 'eur', // Slovenia
  'ES': 'eur', // Spain
  'HR': 'eur', // Croatia
}

// Get currency from country code (Vercel provides this via x-vercel-ip-country header)
export function getCurrencyFromCountry(countryCode: string | null): Currency {
  if (!countryCode) return 'usd'
  return COUNTRY_TO_CURRENCY[countryCode.toUpperCase()] || 'usd'
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

