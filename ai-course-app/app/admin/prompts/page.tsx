'use client'

import { useState } from 'react'

const heroPrompts = [
  {
    day: 1,
    title: "The Day Everything Changed",
    prompt: "A woman in her 30s looking up in wonder, soft golden hour light illuminating her face, floating translucent question marks and glowing symbols gently surrounding her, expression of curiosity and amazement, shallow depth of field, Canon EOS R5, 85mm f/1.2 lens, cinematic color grading, warm tones, bokeh background"
  },
  {
    day: 2,
    title: "Research Without the Rabbit Holes",
    prompt: "A focused professional at a clean desk, multiple floating holographic search results and data streams around them, confident expression, organized chaos of information being filtered, soft natural window light, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, warm neutral tones, bokeh background"
  },
  {
    day: 3,
    title: "The Art of Talking to Machines",
    prompt: "A person speaking expressively with glowing text bubbles and conversation threads floating between them and an unseen presence, intimate close-up, warm ambient lighting, expression of engaged conversation, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, cinematic, soft bokeh"
  },
  {
    day: 4,
    title: "The Multimodal Mind",
    prompt: "A creative person surrounded by floating images, text, audio waves, and video frames all interconnecting, expression of inspiration and possibility, soft studio lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, vibrant but warm color palette, dreamy bokeh"
  },
  {
    day: 5,
    title: "Your Second Brain",
    prompt: "A person with eyes closed in peaceful concentration, subtle glowing neural network patterns floating around their head, serene expression of deep thought, soft ethereal lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, cool blue and warm gold tones, gentle bokeh"
  },
  {
    day: 6,
    title: "Pictures From Thin Air",
    prompt: "An artist with hands raised, colorful paint strokes and digital pixels materializing from nothing in the air before them, expression of creative joy, dramatic side lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, vibrant colors against soft background, magical bokeh"
  },
  {
    day: 7,
    title: "Google's Free Image Revolution",
    prompt: "A person looking at their phone screen with amazement, colorful light from the screen reflecting on their face, floating generated images emerging from the device, evening ambient light, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, warm inviting tones, city lights bokeh"
  },
  {
    day: 8,
    title: "Words That Look Perfect",
    prompt: "A writer at a vintage desk, floating letters and perfectly formatted paragraphs swirling elegantly around them, expression of satisfaction, warm lamp light, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, cozy warm tones, soft golden bokeh"
  },
  {
    day: 9,
    title: "Open-Source Power",
    prompt: "A diverse group of hands reaching toward a glowing central orb of light representing shared knowledge, sense of community and collaboration, dramatic uplighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, warm hopeful tones, ethereal bokeh"
  },
  {
    day: 10,
    title: "The Asset Factory",
    prompt: "A content creator surrounded by floating social media posts, thumbnails, and graphics being automatically generated, expression of productive excitement, modern workspace lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, energetic warm tones, dynamic bokeh"
  },
  {
    day: 11,
    title: "Words Become Video",
    prompt: "A filmmaker watching as written script pages transform into floating video frames and movie scenes, expression of wonder, cinematic dramatic lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, rich cinematic color grading, film-like bokeh"
  },
  {
    day: 12,
    title: "The Video Revolution",
    prompt: "A person holding a smartphone horizontally, professional-quality video scenes projecting outward from the screen, expression of empowerment, golden hour outdoor lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, warm sunset tones, natural bokeh"
  },
  {
    day: 13,
    title: "Sound and Vision",
    prompt: "A musician with headphones, visible sound waves and musical notes interweaving with visual elements around them, eyes closed in creative flow, moody studio lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, purple and gold tones, atmospheric bokeh"
  },
  {
    day: 14,
    title: "The Honest Conversation",
    prompt: "Two people in genuine conversation, one human and one represented by a subtle AI glow, expressions of mutual understanding and respect, warm coffee shop lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, intimate warm tones, cozy bokeh"
  },
  {
    day: 15,
    title: "Hallway of Mirrors",
    prompt: "A person looking thoughtfully at multiple reflections of information, some clear and some distorted, expression of careful discernment, dramatic mirror lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, cool analytical tones with warm highlights, reflective bokeh"
  },
  {
    day: 16,
    title: "The Productivity Lie",
    prompt: "A relaxed person stepping back from a chaotic desk of tasks, floating checkmarks and completed items behind them, expression of calm confidence, soft natural light, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, balanced warm tones, peaceful bokeh"
  },
  {
    day: 17,
    title: "AI at Work",
    prompt: "A professional in a modern office, subtle AI assistance visualized as helpful floating guides and suggestions, expression of enhanced capability, clean corporate lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, professional warm tones, office bokeh"
  },
  {
    day: 18,
    title: "The Small Business Edge",
    prompt: "A small business owner in their shop, AI-powered analytics and customer insights floating around them, expression of competitive confidence, warm storefront lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, entrepreneurial warm tones, ambient bokeh"
  },
  {
    day: 19,
    title: "Learning Reimagined",
    prompt: "A student surrounded by floating interactive lessons, 3D models, and personalized learning paths, expression of engaged curiosity, bright educational lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, inspiring warm tones, knowledge bokeh"
  },
  {
    day: 20,
    title: "The Presentation Shortcut",
    prompt: "A presenter watching as rough notes transform into polished presentation slides floating before them, expression of relief and confidence, conference room lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, professional warm tones, presentation bokeh"
  },
  {
    day: 21,
    title: "Design for Non-Designers",
    prompt: "A non-designer person creating beautiful graphics with simple gestures, professional designs materializing effortlessly, expression of surprised delight, creative studio lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, artistic warm tones, creative bokeh"
  },
  {
    day: 22,
    title: "The Meeting Scribe",
    prompt: "A person in a video call with floating transcription text and key points being automatically highlighted, expression of focused engagement, home office lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, productive warm tones, screen-lit bokeh"
  },
  {
    day: 23,
    title: "The Workspace Brain",
    prompt: "A knowledge worker with interconnected floating documents, notes, and ideas forming a personal knowledge network, expression of clarity and organization, modern workspace lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, intellectual warm tones, connected bokeh"
  },
  {
    day: 24,
    title: "The Brand Voice",
    prompt: "A marketer with consistent brand elements and messaging flowing from their creative direction, expression of brand confidence, agency studio lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, brand-appropriate warm tones, marketing bokeh"
  },
  {
    day: 25,
    title: "Presentations in Seconds",
    prompt: "A busy professional watching a complete presentation deck assemble itself from a simple brief, expression of time-saving relief, fast-paced office lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, efficient warm tones, speed bokeh"
  },
  {
    day: 26,
    title: "Never Miss a Meeting",
    prompt: "A person reviewing floating meeting summaries and action items while their past self is visible in a faded meeting scene, expression of being informed, transitional lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, organizational warm tones, time-shift bokeh"
  },
  {
    day: 27,
    title: "Design Like a Pro",
    prompt: "An everyday person confidently creating professional-quality designs, Canva-style elements floating around them, expression of creative empowerment, bright creative lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, vibrant warm tones, design bokeh"
  },
  {
    day: 28,
    title: "Meet Custom AI Assistants",
    prompt: "A person being introduced to multiple friendly AI assistant avatars each with different specialties, expression of welcoming curiosity, warm introduction lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, friendly warm tones, personality bokeh"
  },
  {
    day: 29,
    title: "Create Your First AI Assistant",
    prompt: "A person actively building and customizing their own AI assistant, configuration options and personality traits floating around, expression of creative ownership, workshop lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, builder warm tones, creation bokeh"
  },
  {
    day: 30,
    title: "Your AI Future",
    prompt: "A confident person standing at a crossroads with multiple glowing paths representing AI possibilities stretching into a bright horizon, expression of optimistic determination, epic sunrise lighting, Canon EOS R5, 85mm f/1.2 lens, shallow depth of field, hopeful golden tones, future bokeh"
  }
]

export default function PromptsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-text-primary mb-2">Midjourney Hero Prompts</h1>
          <p className="text-text-secondary">30 prompts for course hero images • Style: Photorealistic Portrait • Aspect: 16:9</p>
          <p className="text-text-tertiary text-sm mt-2">Click any prompt to copy. Set your Midjourney to 16:9 aspect ratio before generating.</p>
        </div>

        <div className="space-y-4">
          {heroPrompts.map((item, index) => (
            <div key={item.day} className="card-neumorphic rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-lavender/30 text-text-primary text-sm font-bold">
                      DAY {item.day}
                    </span>
                    <h3 className="font-bold text-text-primary">{item.title}</h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed font-mono bg-white/50 rounded-xl p-4">
                    {item.prompt}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(item.prompt, index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    copiedIndex === index
                      ? 'bg-sage-green text-white'
                      : 'bg-white/70 text-text-primary hover:bg-white'
                  }`}
                >
                  {copiedIndex === index ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 glass-sage rounded-2xl">
          <h3 className="font-bold text-text-primary mb-2">📝 Midjourney Settings Reminder</h3>
          <ul className="text-text-secondary text-sm space-y-1">
            <li>• Set aspect ratio to <strong>16:9</strong> (--ar 16:9 or use settings)</li>
            <li>• Use <strong>v6.1</strong> or latest for best photorealism</li>
            <li>• Stylize around <strong>100-250</strong> for balanced results</li>
            <li>• Raw mode off for more polished look</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

