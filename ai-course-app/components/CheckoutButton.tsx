'use client'

import { useState, useEffect } from 'react'
import { detectCurrency, getPrice, formatPrice, Currency } from '@/lib/pricing'

interface CheckoutButtonProps {
  productId: string
  tier: 'normal' | 'partner' | 'free'
  userId: string
  label?: string
}

export default function CheckoutButton({ productId, tier, userId, label }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currency, setCurrency] = useState<Currency>('gbp')
  const [priceInfo, setPriceInfo] = useState<{ priceId: string; amount: number; symbol: string } | null>(null)

  // Detect currency on mount
  useEffect(() => {
    const detected = detectCurrency()
    setCurrency(detected)
    
    if (tier !== 'free') {
      const price = getPrice(productId, tier, detected)
      setPriceInfo(price)
    }
  }, [productId, tier])

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // If free, just grant access directly
      if (tier === 'free') {
        const response = await fetch('/api/checkout/free', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            productId,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to enroll')
        }

        // Redirect to dashboard
        window.location.href = '/dashboard?enrolled=true'
        return
      }

      // Otherwise, create Stripe checkout session
      if (!priceInfo) {
        throw new Error('Price information not loaded')
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: priceInfo.priceId,
          userId,
          productId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  // Generate button label
  const buttonLabel = label || (
    tier === 'free' 
      ? 'Enroll Now - FREE' 
      : priceInfo 
        ? `Enroll Now - ${formatPrice(priceInfo.amount, currency)}`
        : 'Loading...'
  )

  return (
    <div className="w-full">
      <button
        onClick={handleCheckout}
        disabled={isLoading || (!priceInfo && tier !== 'free')}
        className="btn-dark w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <span className="inline-block size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>{buttonLabel}</span>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-2xl">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
