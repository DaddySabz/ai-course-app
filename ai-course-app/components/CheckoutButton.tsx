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
        className="btn-dark w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
