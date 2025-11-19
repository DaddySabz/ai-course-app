"use client"

import Link from 'next/link'

interface CertificateActionsProps {
  certificateId?: string
}

export default function CertificateActions({ certificateId }: CertificateActionsProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleLinkedInShare = () => {
    // LinkedIn share URL format
    const certificateUrl = `${window.location.origin}/certificate`
    const shareText = "I'm excited to share that I've completed the 30-Day AI Onboarding Course! 🎓 Gained foundational knowledge in AI and hands-on experience with AI tools. #AI #MachineLearning #ProfessionalDevelopment"
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`
    
    // Open LinkedIn share in a new window
    window.open(linkedInUrl, '_blank', 'width=600,height=600')
  }

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <Link 
        href="/dashboard" 
        className="btn-neumorphic px-8 py-4 rounded-2xl font-bold text-text-primary text-center flex items-center justify-center gap-2"
      >
        <span className="text-lg">←</span>
        Back to Dashboard
      </Link>
      <button 
        onClick={handlePrint}
        className="btn-neumorphic px-8 py-4 rounded-2xl font-bold text-text-primary flex items-center justify-center gap-2"
      >
        <span className="text-xl">🖨️</span>
        Print Certificate
      </button>
      <button 
        onClick={handleLinkedInShare}
        className="btn-neumorphic px-8 py-4 rounded-2xl font-bold text-text-primary flex items-center justify-center gap-2"
      >
        <span className="text-xl">📤</span>
        Share on LinkedIn
      </button>
    </div>
  )
}

