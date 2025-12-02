"use client"

import { useState, useEffect } from 'react'

interface CertificateImageProps {
  certificateId: string
  initialImageUrl: string | null
}

export default function CertificateImage({ certificateId, initialImageUrl }: CertificateImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl)
  const [isGenerating, setIsGenerating] = useState(!initialImageUrl)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // If we already have an image URL, no need to generate
    if (initialImageUrl) {
      setImageUrl(initialImageUrl)
      setIsGenerating(false)
      return
    }

    // Generate the certificate image
    const generateImage = async () => {
      setIsGenerating(true)
      setProgress(10)

      try {
        // Simulate progress while generating
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 500)

        // Call the generate API
        const response = await fetch('/api/certificate/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ certificateId })
        })

        clearInterval(progressInterval)

        if (response.ok) {
          const result = await response.json()
          setProgress(100)
          
          // Small delay to show 100% before displaying image
          setTimeout(() => {
            setImageUrl(result.imageUrl)
            setIsGenerating(false)
          }, 300)
        } else {
          // Fallback to on-the-fly generation
          setImageUrl(`/api/certificate-image?id=${certificateId}`)
          setIsGenerating(false)
        }
      } catch (error) {
        console.error('Failed to generate certificate:', error)
        // Fallback to on-the-fly generation
        setImageUrl(`/api/certificate-image?id=${certificateId}`)
        setIsGenerating(false)
      }
    }

    generateImage()
  }, [certificateId, initialImageUrl])

  if (isGenerating) {
    return (
      <div 
        className="relative flex flex-col items-center justify-center"
        style={{
          backgroundColor: '#f5f3f0',
          aspectRatio: '1.414 / 1',
          minHeight: '400px'
        }}
      >
        {/* Spinning loader */}
        <div className="mb-6">
          <svg 
            className="animate-spin h-16 w-16 text-sage-green" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>

        {/* Text */}
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          Generating Your Certificate
        </h3>
        <p className="text-text-secondary mb-6">
          This only happens once...
        </p>

        {/* Progress bar */}
        <div className="w-64 h-3 bg-white/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sage-green to-mint rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-text-tertiary mt-2">{progress}%</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <img 
        src={imageUrl || `/api/certificate-image?id=${certificateId}`}
        alt="Certificate of Completion"
        className="w-full h-auto"
        style={{ aspectRatio: '1.414 / 1' }}
      />
    </div>
  )
}

