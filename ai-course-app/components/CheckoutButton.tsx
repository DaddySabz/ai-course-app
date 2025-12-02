'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  productId: string
  priceId: string
  amount: number
  label: string
  userId: string
}

export default function CheckoutButton({ productId, priceId, amount, label, userId }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // If free, just grant access directly
      if (amount === 0) {
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
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
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

  return (
    <div className="w-full">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out hover:-translate-y-[3px]"
        style={{
          background: 'linear-gradient(135deg, #2D2520 0%, #4A4340 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(45, 37, 32, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {isLoading ? (
          <>
            <span className="inline-block size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>{label}</span>
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
