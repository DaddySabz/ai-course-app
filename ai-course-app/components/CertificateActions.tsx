"use client"

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

interface CertificateActionsProps {
  certificateId?: string
}

export default function CertificateActions({ certificateId }: CertificateActionsProps) {
  // Detect if user is on mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    const certificate = document.getElementById('certificate-content')
    if (!certificate) {
      alert('Certificate not found. Please refresh the page and try again.')
      return
    }

    try {
      // Show loading indicator
      const loadingMsg = document.createElement('div')
      loadingMsg.textContent = 'Generating PDF...'
      loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:9999;'
      document.body.appendChild(loadingMsg)

      // Higher quality settings
      const scale = 3

      // Capture the certificate as canvas
      const canvas = await html2canvas(certificate, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#f5f1ed',
        width: certificate.scrollWidth,
        height: certificate.scrollHeight,
        x: 0,
        y: 0
      })

      // Remove loading indicator
      document.body.removeChild(loadingMsg)

      // Create PDF with custom dimensions matching the certificate exactly
      // This avoids white margins/letterboxing on the digital file
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })

      // Add image at 0,0 with 100% width and height
      const imgData = canvas.toDataURL('image/png', 1.0)
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)

      pdf.save(`AI-Certificate-${certificateId ? certificateId.replace(/-/g, '').slice(0, 8).toUpperCase() : 'DOWNLOAD'}.pdf`)
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate PDF. Error: ' + (error instanceof Error ? error.message : 'Unknown error') + '\n\nPlease try the "Download Image" option instead.')
    }
  }

  const handleDownloadImage = async () => {
    const certificate = document.getElementById('certificate-content')
    if (!certificate) {
      alert('Certificate not found. Please refresh the page and try again.')
      return
    }

    try {
      // Show loading indicator
      const loadingMsg = document.createElement('div')
      loadingMsg.textContent = 'Generating image...'
      loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:9999;'
      document.body.appendChild(loadingMsg)

      // High resolution for A3 quality
      const scale = 4

      // Capture at high resolution
      const canvas = await html2canvas(certificate, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#f5f1ed',
        width: certificate.scrollWidth,
        height: certificate.scrollHeight,
        x: 0,
        y: 0
      })

      // Remove loading indicator
      document.body.removeChild(loadingMsg)

      // Convert to blob and download
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          alert('Failed to generate image. Please try again.')
          return
        }
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `AI-Certificate-${certificateId ? certificateId.replace(/-/g, '').slice(0, 8).toUpperCase() : 'DOWNLOAD'}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }, 'image/png', 1.0)
    } catch (error) {
      console.error('Image generation failed:', error)
      alert('Failed to generate image. Error: ' + (error instanceof Error ? error.message : 'Unknown error') + '\n\nPlease try the Print option instead.')
    }
  }

  const handleNativeShare = async () => {
    // Check if Web Share API with files is supported
    if (!('canShare' in navigator)) {
      showToast('Native sharing not supported on this browser!')
      return
    }

    const certificate = document.getElementById('certificate-content')
    if (!certificate) {
      alert('Certificate not found. Please refresh the page and try again.')
      return
    }

    try {
      // Show loading indicator
      const loadingMsg = document.createElement('div')
      loadingMsg.textContent = 'Preparing to share...'
      loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:9999;'
      document.body.appendChild(loadingMsg)

      // Generate high-quality image (1080x1080 for Instagram Stories)
      const scale = 4
      const canvas = await html2canvas(certificate, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#f5f1ed',
        width: certificate.scrollWidth,
        height: certificate.scrollHeight,
        x: 0,
        y: 0
      })

      // Remove loading indicator
      document.body.removeChild(loadingMsg)

      // Convert canvas to Blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to generate image blob'))
        }, 'image/png', 1.0)
      })

      // Create File object from Blob
      const file = new File(
        [blob],
        `AI-Certificate-${certificateId ? certificateId.replace(/-/g, '').slice(0, 8).toUpperCase() : 'SHARE'}.png`,
        { type: 'image/png' }
      )

      // Check if browser can share this file
      if (!navigator.canShare({ files: [file] })) {
        showToast('File sharing not supported on this device!')
        return
      }

      // Build share data
      const shareData = {
        files: [file],
        title: '🎓 AI Certificate - Introduction to AI',
        text: `I just completed the Introduction to AI course and earned my certificate! 🎉\n\nCheck it out: ${getShareUrl()}`
      }

      // Trigger native share sheet
      await navigator.share(shareData)
      showToast('Shared successfully!')

    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // User cancelled the share - not an error
        console.log('Share cancelled by user')
      } else {
        console.error('Native share failed:', error)
        showToast('Share failed. Try download instead!')
      }
    }
  }

  // LinkedIn "Add to Profile" Deep Link - Pre-fills certification modal
  const shareToLinkedInProfile = () => {
    const params = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: 'Introduction to AI',
      // Wacky Works Digital LinkedIn Organization ID
      organizationId: '109555093',
      issueYear: new Date().getFullYear().toString(),
      issueMonth: (new Date().getMonth() + 1).toString(),
      certUrl: `${window.location.origin}/c/${certificateId}`,
      certId: certificateId || 'CERT-ID'
    });

    window.open(`https://www.linkedin.com/profile/add?${params.toString()}`, '_blank');
  }

  // Instagram Story Clipboard Hack - Copies image and opens Instagram
  const shareToInstagramStory = async () => {
    const certificate = document.getElementById('certificate-content')
    if (!certificate) {
      alert('Certificate not found. Please refresh the page and try again.')
      return
    }

    try {
      // Show loading indicator
      const loadingMsg = document.createElement('div')
      loadingMsg.textContent = 'Preparing for Instagram...'
      loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:9999;'
      document.body.appendChild(loadingMsg)

      // Generate high-quality image
      const scale = 3
      const canvas = await html2canvas(certificate, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#f5f1ed',
        width: certificate.scrollWidth,
        height: certificate.scrollHeight,
        x: 0,
        y: 0
      })

      // Remove loading indicator
      document.body.removeChild(loadingMsg)

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to generate image blob'))
        }, 'image/png', 1.0)
      })

      // Try to copy to clipboard
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ])

        // Show instructions
        alert("✨ Certificate Copied!\n\n1. Instagram Stories will open\n2. Tap 'Aa' (Text tool)\n3. Long-press and tap 'Paste'\n4. Your certificate appears as a sticker!")

        // Try to open Instagram Stories
        window.location.href = 'instagram-stories://story-camera'
      } catch (clipboardError) {
        // Fallback to download if clipboard fails
        showToast('Clipboard not supported - downloading instead')
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `AI-Certificate-Instagram-${certificateId ? certificateId.replace(/-/g, '').slice(0, 8).toUpperCase() : 'SHARE'}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Instagram share failed:', error)
      alert('Failed to prepare for Instagram. Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  // Helper to open share links (full screen, centered)

  const openShareLink = (url: string) => {
    // Use available screen dimensions (accounts for taskbars)
    const screenWidth = window.screen.availWidth || window.screen.width
    const screenHeight = window.screen.availHeight || window.screen.height

    // Get availLeft/availTop with type safety (not in standard Screen interface)
    const screen = window.screen as Screen & { availLeft?: number; availTop?: number }
    const availLeft = screen.availLeft ?? 0
    const availTop = screen.availTop ?? 0

    // Calculate window dimensions (80% of available screen, centered)
    const width = Math.floor(screenWidth * 0.8)
    const height = Math.floor(screenHeight * 0.8)
    const left = Math.floor((screenWidth - width) / 2) + availLeft
    const top = Math.floor((screenHeight - height) / 2) + availTop

    window.open(
      url,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes`
    )
  }

  const getShareUrl = () => {
    if (certificateId) {
      return `${window.location.origin}/c/${certificateId}`
    }
    return `${window.location.origin}/login`
  }

  // Helper to show a non-intrusive toast notification
  const showToast = (message: string) => {
    const toast = document.createElement('div')
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(45, 37, 32, 0.9);
      color: #fff;
      padding: 12px 24px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 10000;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      align-items: center;
      gap: 8px;
      backdrop-filter: blur(10px);
    `
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      ${message}
    `
    document.body.appendChild(toast)

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)'
    })

    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)'
      setTimeout(() => document.body.removeChild(toast), 400)
    }, 3000)
  }

  const shareOnLinkedIn = async () => {
    const url = getShareUrl()
    const text = "🎓 Excited to share that I've completed the 'Introduction to AI' course and earned my certificate! 🚀\n\nOver 30 days, I gained practical skills in:\n✅ AI fundamentals\n✅ Prompt engineering\n✅ Real-world AI applications\n✅ Machine learning concepts\n\nReady to apply these skills in my work! 💼\n\n#AI #MachineLearning #ArtificialIntelligence #EdTech #OnlineLearning #TechSkills #AICertificate #ProfessionalDevelopment"

    // Silently copy text to clipboard for better UX
    try {
      await navigator.clipboard.writeText(text)
      showToast('Post text copied! Just paste it.')
    } catch (err) {
      // Ignore clipboard errors, just open window
    }

    openShareLink(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
  }

  const shareOnFacebook = () => {
    const url = getShareUrl()
    // Facebook supports quote parameter for pre-filled text
    const quote = "🎉 Just finished the Introduction to AI course! 🎓\n\n30 days of learning and I've got my certificate! Really interesting stuff about how AI actually works - from ChatGPT to machine learning fundamentals.\n\n#AI #MachineLearning #OnlineLearning #TechEducation #Certificate"
    openShareLink(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`)
  }

  const shareOnTwitter = () => {
    const url = getShareUrl()
    // Twitter/X supports text parameter (280 char limit)
    const text = "✅ Completed Introduction to AI course! 🎓 30 days, certificate earned. Learned AI fundamentals, prompt engineering, and real-world applications. #AI #MachineLearning #EdTech #AICertificate"
    const fullText = `${text} ${url}`
    openShareLink(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`)
  }

  const shareOnWhatsApp = () => {
    const url = getShareUrl()
    const text = `🎓 Hey! Just wanted to share - I completed this AI course and got my certificate! 🎉\n\n30 days of learning about AI fundamentals, prompt engineering, and real-world applications. Really interesting stuff!\n\nCheck it out if you're interested: ${url}\n\n#AI #MachineLearning #OnlineLearning`
    const encodedText = encodeURIComponent(text)

    // Use WhatsApp API link (works on both mobile and desktop)
    if (isMobile()) {
      // Mobile: Use whatsapp:// protocol for native app
      window.location.href = `whatsapp://send?text=${encodedText}`
    } else {
      // Desktop: Use web.whatsapp.com with proper centering
      const screenWidth = window.screen.availWidth || window.screen.width
      const screenHeight = window.screen.availHeight || window.screen.height
      const screen = window.screen as Screen & { availLeft?: number; availTop?: number }
      const availLeft = screen.availLeft ?? 0
      const availTop = screen.availTop ?? 0
      const width = Math.floor(screenWidth * 0.8)
      const height = Math.floor(screenHeight * 0.8)
      const left = Math.floor((screenWidth - width) / 2) + availLeft
      const top = Math.floor((screenHeight - height) / 2) + availTop
      window.open(
        `https://web.whatsapp.com/send?text=${encodedText}`,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      )
    }
  }

  const shareOnInstagram = async () => {
    // Instagram: Auto-download image (1080x1080 square) + copy caption
    const certificate = document.getElementById('certificate-content')
    if (!certificate) {
      alert('Certificate not found. Please refresh the page and try again.')
      return
    }

    try {
      // Show loading indicator
      const loadingMsg = document.createElement('div')
      loadingMsg.textContent = 'Preparing Instagram image...'
      loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:9999;'
      document.body.appendChild(loadingMsg)

      // Instagram square format (1080x1080) - high quality
      const scale = 4

      // Capture certificate
      const canvas = await html2canvas(certificate, {
        scale: scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#f5f1ed',
        width: certificate.scrollWidth,
        height: certificate.scrollHeight,
        x: 0,
        y: 0
      })

      // Remove loading indicator
      document.body.removeChild(loadingMsg)

      // Convert to blob and download
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          alert('Failed to generate image for Instagram. Please try again.')
          return
        }
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `AI-Certificate-Instagram-${certificateId ? certificateId.replace(/-/g, '').slice(0, 8).toUpperCase() : 'SHARE'}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }, 'image/png', 1.0)

      // Copy caption to clipboard
      const url = getShareUrl()
      const caption = `🎓 Certificate unlocked! ✨\n\nJust completed my 30-day Introduction to AI course journey! Learned AI fundamentals, prompt engineering, and real-world applications.\n\nReady to apply these skills! 💼\n\nCheck it out: ${url}\n\n#AI #MachineLearning #ArtificialIntelligence #AICertificate #TechEducation #OnlineLearning #ProfessionalDevelopment #TechSkills #EdTech #Certificate`

      // Try to copy to clipboard
      try {
        await navigator.clipboard.writeText(caption)
        showToast('Image downloaded & caption copied!')
      } catch (clipboardError) {
        showToast('Image downloaded! Copy caption manually.')
      }
    } catch (error) {
      console.error('Instagram share failed:', error)
      alert('Failed to prepare Instagram share. Error: ' + (error instanceof Error ? error.message : 'Unknown error') + '\n\nPlease try the "Download Image" option instead.')
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Share Section - Subtle peach base with colored buttons */}
      <div className="p-6 rounded-3xl" style={{
        background: 'rgba(245, 241, 237, 0.6)',
        boxShadow: '-8px 8px 20px rgba(180, 160, 145, 0.2), 8px -8px 20px rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 className="text-lg font-bold text-text-primary mb-4">Share Your Achievement</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* Native Share - Purple gradient (primary CTA on mobile) */}
          {typeof navigator !== 'undefined' && 'canShare' in navigator && (
            <button
              onClick={handleNativeShare}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 sm:col-span-3 md:col-span-1"
              style={{
                background: 'linear-gradient(145deg, rgba(184, 168, 212, 0.15) 0%, rgba(157, 169, 211, 0.10) 100%)',
                boxShadow: '-6px 6px 16px rgba(184, 168, 212, 0.15), 6px -6px 16px rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                backfaceVisibility: 'hidden',
                willChange: 'transform, box-shadow'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
                e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(184, 168, 212, 0.22), 8px -8px 20px rgba(255, 255, 255, 0.95)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
                e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(184, 168, 212, 0.15), 6px -6px 16px rgba(255, 255, 255, 0.9)'
              }}
            >
              <svg className="w-6 h-6" style={{ color: '#B8A8D4' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
              <span className="text-xs font-semibold text-text-primary">Share</span>
            </button>
          )}

          {/* LinkedIn "Add to Profile" - Dark Blue (Premium Feature) */}
          <button
            onClick={shareToLinkedInProfile}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
            title="Pre-fill LinkedIn certification form - just click Save!"
            style={{
              background: 'linear-gradient(145deg, rgba(0, 72, 117, 0.15) 0%, rgba(0, 102, 153, 0.10) 100%)',
              boxShadow: '-6px 6px 16px rgba(0, 102, 153, 0.15), 6px -6px 16px rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              backfaceVisibility: 'hidden',
              willChange: 'transform, box-shadow'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
              e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(0, 102, 153, 0.22), 8px -8px 20px rgba(255, 255, 255, 0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
              e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(0, 102, 153, 0.15), 6px -6px 16px rgba(255, 255, 255, 0.9)'
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#006699' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">Add to Profile</span>
          </button>

          {/* Instagram Story - Pink/Purple Gradient (Clipboard Hack) */}
          <button
            onClick={shareToInstagramStory}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
            title="Copy to clipboard & open Instagram Stories"
            style={{
              background: 'linear-gradient(145deg, rgba(225, 48, 108, 0.15) 0%, rgba(193, 53, 132, 0.10) 100%)',
              boxShadow: '-6px 6px 16px rgba(225, 48, 108, 0.15), 6px -6px 16px rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              backfaceVisibility: 'hidden',
              willChange: 'transform, box-shadow'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
              e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(225, 48, 108, 0.22), 8px -8px 20px rgba(255, 255, 255, 0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
              e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(225, 48, 108, 0.15), 6px -6px 16px rgba(255, 255, 255, 0.9)'
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#E1306C' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">Instagram Story</span>
          </button>

          {/* LinkedIn Feed - Muted blue */}

          <button
            onClick={shareOnLinkedIn}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(0, 119, 181, 0.12) 0%, rgba(0, 119, 181, 0.08) 100%)',
              boxShadow: '-6px 6px 16px rgba(0, 119, 181, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              backfaceVisibility: 'hidden',
              willChange: 'transform, box-shadow'
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
              e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(0, 119, 181, 0.18), 8px -8px 20px rgba(255, 255, 255, 0.95)'
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
              e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(0, 119, 181, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)'
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#0077B5' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">LinkedIn</span>
          </button>

          {/* Facebook - Muted blue */}
          <button
            onClick={shareOnFacebook}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(24, 119, 242, 0.12) 0%, rgba(24, 119, 242, 0.08) 100%)',
              boxShadow: '-6px 6px 16px rgba(24, 119, 242, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              backfaceVisibility: 'hidden',
              willChange: 'transform, box-shadow'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
              e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(24, 119, 242, 0.18), 8px -8px 20px rgba(255, 255, 255, 0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
              e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(24, 119, 242, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)'
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#1877F2' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">Facebook</span>
          </button>

          {/* Instagram - Muted pink/purple */}
          <button
            onClick={shareOnInstagram}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(225, 48, 108, 0.12) 0%, rgba(193, 53, 132, 0.08) 100%)',
              boxShadow: '-6px 6px 16px rgba(225, 48, 108, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              backfaceVisibility: 'hidden',
              willChange: 'transform, box-shadow'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
              e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(225, 48, 108, 0.18), 8px -8px 20px rgba(255, 255, 255, 0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
              e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(225, 48, 108, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)'
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#E1306C' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">Instagram</span>
          </button>

          {/* X - Muted gray */}
          <button
            onClick={shareOnTwitter}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(70, 70, 70, 0.10) 0%, rgba(50, 50, 50, 0.06) 100%)',
              boxShadow: '-6px 6px 16px rgba(70, 70, 70, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              backfaceVisibility: 'hidden',
              willChange: 'transform, box-shadow'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
              e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(70, 70, 70, 0.18), 8px -8px 20px rgba(255, 255, 255, 0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
              e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(70, 70, 70, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)'
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#000000' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">X</span>
          </button>

          {/* WhatsApp - Muted green */}
          <button
            onClick={shareOnWhatsApp}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(37, 211, 102, 0.12) 0%, rgba(37, 211, 102, 0.08) 100%)',
              boxShadow: '-6px 6px 16px rgba(37, 211, 102, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              backfaceVisibility: 'hidden',
              willChange: 'transform, box-shadow'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, -3px, 0) scale(1.02)'
              e.currentTarget.style.boxShadow = '-8px 8px 20px rgba(37, 211, 102, 0.18), 8px -8px 20px rgba(255, 255, 255, 0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)'
              e.currentTarget.style.boxShadow = '-6px 6px 16px rgba(37, 211, 102, 0.12), 6px -6px 16px rgba(255, 255, 255, 0.9)'
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#25D366' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="text-xs font-semibold text-text-primary">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Download Section - Colored base with white buttons */}
      <div className="glass-sage p-6 rounded-3xl">
        <h3 className="text-lg font-bold text-text-primary mb-4">Download Your Certificate</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleDownloadPDF}
            className="glass-clickable py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Download PDF
          </button>

          <button
            onClick={handleDownloadImage}
            className="glass-clickable py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Download Image
          </button>

          <button
            onClick={handlePrint}
            className="glass-clickable py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <a
          href="/dashboard"
          className="btn-neumorphic px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </a>
      </div>
    </div>
  )
}
