export type CourseModule = {
  day: number;
  title: string;
  subtitle: string;
  content: string; // Learning/reading content
  handsOn?: {
    title: string;
    description: string;
    affiliateLinks?: {
      text: string;
      url: string;
    }[];
    exercise?: string;
  };
};

// Generate 30 days of placeholder content
export const courseData: CourseModule[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  
  // First few days have detailed content
  if (day === 1) {
    return {
      day: 1,
      title: "What Is AI?",
      subtitle: "The Beginner's True Introduction",
      content: `
        <p>For most people, "Artificial Intelligence" sounds like a futuristic invention — something from sci-fi movies, robot uprisings, or sleek machines talking in perfect monotone. But the truth is far more interesting: <strong>AI has quietly been woven into your everyday life for years.</strong></p>
        
        <p>Think about your last 24 hours.</p>
        
        <p>Did you open Netflix and instantly find something you actually wanted to watch?<br/>
        Did Google Maps alert you about traffic before you saw a single brake light?<br/>
        Did your phone magically brighten your photos, blur the background, or remove noise?<br/>
        Did Spotify recommend a song you didn't know you needed?</p>
        
        <p>None of that was luck. That was <strong>AI making predictions about your preferences, behaviour, and context.</strong></p>
        
        <p>And this is the first misconception beginners have: AI isn't about robots. It's about <strong>systems that learn patterns</strong> so well that they can make smart, helpful decisions — sometimes even before you realise you need them.</p>
        
        <p>But modern AI, the kind we now talk about with tools like ChatGPT, Gemini, Claude, NotebookLM, Midjourney, and AutoGPT, is something different — something far more powerful.</p>
        
        <p>It's based on a breakthrough approach:<br/>
        👉 <strong>AI models trained on huge amounts of data to recognise patterns in language, images, sounds, and more.</strong></p>
        
        <p>Think of it this way:</p>
        
        <p>If you read one book, you understand that book.<br/>
        Read 100 books, you get good at spotting writing styles.<br/>
        Read 1,000 books, you can probably write like some authors.<br/>
        Read a million books…<br/>
        Well, now you can predict language so well that you can summarise, translate, explain, brainstorm, and even create new content.</p>
        
        <p>That's what modern AI systems do.</p>
        
        <p>But the important thing for a beginner is this:</p>
        
        <h3>AI doesn't replace your intelligence — it amplifies it.</h3>
        
        <ul>
          <li>If you're creative, AI gives you more ideas.</li>
          <li>If you're busy, AI gets things done faster.</li>
          <li>If you're curious, AI explains things in ways you'll actually understand.</li>
          <li>If you want to build something, AI gives you the first draft, the blueprint, the plan.</li>
        </ul>
        
        <p>And you don't need to be "technical". You don't need to code. You don't need to understand mathematics or neural networks. You just need to know <em>how to ask</em>.</p>
        
        <p>That's your superpower for the next 30 days: <strong>Learning how to think with AI.</strong></p>
        
        <p>Today, you'll begin with ChatGPT — the easiest way to experience that "wait, how did it do that?!" moment. Expect a few jaw-drops today. That's the point.</p>
      `,
      handsOn: {
        title: "AI Rewrites Any Mess Into Clarity",
        description: "This is the first magical beginner moment — seeing AI take something confusing and turn it into something clear.",
        affiliateLinks: [
          {
            text: "Try ChatGPT Free →",
            url: "https://chat.openai.com"
          }
        ],
        exercise: `Step 1 — Copy/paste this into ChatGPT:

"I'm a complete beginner to AI. I want you to take the text I paste next and transform it in 4 ways:
1. Rewrite it in perfectly clear, simple English.
2. Rewrite it in a friendly, casual tone.
3. Make a professional version for work.
4. Make a fun, humorous version.
Say 'Ready!' and wait for my text."

Step 2 — Paste any messy text you have: a confusing email, a paragraph from a website, a recipe, something from your notes, even something from this course.

You will watch AI instantly rewrite it into 4 totally different versions — this is the moment people realise AI is a superpower for communication.

BONUS EXPERIMENTS:
• AI as a Storyteller: "Tell me a short bedtime story about a robot who wants to learn emotions, in under 150 words."
• AI as Your Coach: "Ask me 5 questions about my life and goals, then give me 10 ways AI could help in the next 30 days."
• AI as a Creativity Booster: "Give me 10 creative things I could do with AI this week, based on hobbies most people have."
• AI as a "Human Translator": Paste any paragraph and ask: "Explain this to me as if I'm 10 years old."`
      }
    };
  }
  
  if (day === 2) {
    return {
      day: 2,
      title: "What Is a Large Language Model?",
      subtitle: "How AI Learned to Talk",
      content: `
        <p>Now that you've met AI in action, let's lift the curtain a little.</p>
        
        <p>The most magical part of modern AI is its ability to <strong>understand and generate language</strong>. It can write essays, explain science, summarise books, create poems, give advice, translate text, roleplay characters, draft emails — all from a single sentence you give it.</p>
        
        <p>So how did AI learn to "talk" so well?</p>
        
        <p>The answer is something called a <strong>Large Language Model</strong>, or LLM.</p>
        
        <p>Imagine you had to become the world's best communicator. How would you train yourself? You'd read <em>a lot</em>. Not just books — articles, websites, stories, scripts, code, conversations, everything.</p>
        
        <p>As you read more and more, you start recognising patterns:</p>
        
        <ul>
          <li>how stories flow</li>
          <li>how sentences are structured</li>
          <li>how explanations work</li>
          <li>what answers fit what questions</li>
          <li>how tone changes meaning</li>
        </ul>
        
        <p>That's exactly what an LLM does — except instead of reading a few thousand pages, it learns from <strong>billions of sentences</strong>.</p>
        
        <p>These models don't memorise facts like a school child. They learn <em>patterns</em>:</p>
        
        <ul>
          <li>how language behaves</li>
          <li>how ideas relate</li>
          <li>how people communicate</li>
          <li>what words tend to come next</li>
          <li>how to structure consistent answers</li>
        </ul>
        
        <p>This pattern-learning is why LLMs can:</p>
        
        <ul>
          <li>summarise a long text in 2 seconds</li>
          <li>brainstorm 30 ideas instantly</li>
          <li>write poems and emails</li>
          <li>explain quantum physics in a friendly way</li>
          <li>help students with homework</li>
          <li>generate business plans</li>
          <li>write or fix code</li>
          <li>translate between tones, not just languages</li>
        </ul>
        
        <p>They're not "thinking". They're predicting. But the predictions are so good, so human-like, that they feel intelligent.</p>
        
        <p>And here's the real beginner secret: LLMs are only as powerful as the <strong>prompts you give them</strong>.</p>
        
        <p>The better your prompts, the more impressive the results. You will learn this skill throughout the 30 days.</p>
        
        <p>Today, you'll use Google Gemini — a free LLM known for being smart, fast, and incredibly creative.</p>
      `,
      handsOn: {
        title: "AI Creates a Mini Illustrated Guide From Nothing",
        description: "This exercise shows how well LLMs explain concepts visually (even without real images).",
        affiliateLinks: [
          {
            text: "Try Google Gemini →",
            url: "https://gemini.google.com"
          }
        ],
        exercise: `Copy/paste this into Gemini:

"Create a beginner-friendly illustrated mini-guide called 'How AI Learned to Talk'. Use headings, emojis, simple diagrams (drawn in text), and extremely clear explanations. Cover:
1. What a Large Language Model is
2. How it learns
3. Why it can talk like a human
4. What it can and can't do
Make it fun, simple, visual, and easy to read."

You'll get a cute little "visual" article made entirely from text and diagrams. Beginners love this — it's the "Ohhh, now I get it" moment.

OTHER EXPERIMENTS TO TRY:
• Style Transformation: "Explain how email works in these styles: a children's book, a detective novel, a sarcastic comedian, a Zen monk"
• Photo Reasoning: Upload a photo (desk, kitchen, bookshelf) and ask: "What small improvements could I make to this space to be more productive? Be practical."
• Skill Builder: "Ask me 5 questions about my writing style, then give me personalised advice to improve it."
• Creativity Challenge: "Give me 10 fun ways I can use AI this week even if I'm not technical."`
      }
    };
  }
  
  // Days 3-10
  if (day === 3) {
    return {
      day: 3,
      title: "Machine Learning Explained",
      subtitle: "How AI Actually Learns",
      content: `
        <p>Machine learning sounds technical, but the core idea is surprisingly simple: <strong>teaching computers to learn from examples instead of following fixed rules.</strong></p>
        
        <p>Traditional programming works like this: a human writes explicit instructions for every scenario. If the temperature is below 20°C, turn on the heater. If someone types "hello," respond with "hi." Every possibility must be coded by hand.</p>
        
        <p>Machine learning flips this. Instead of programming rules, you show the system thousands of examples, and it figures out the patterns itself.</p>
        
        <p>Here's a real example: email spam filters. In the old days, programmers would write rules like "if the email contains 'FREE MONEY,' mark it as spam." But spammers adapt. They write "FR33 M0N3Y" instead. The rules break.</p>
        
        <p>With machine learning, you feed the system 10,000 emails — half spam, half legitimate. The system learns patterns humans might miss: spam emails tend to use certain word combinations, have specific formatting, or come from suspicious domains. It builds its own internal "rules" based on what it learned.</p>
        
        <p>The magic? <strong>The system improves as it sees more examples.</strong> Show it 100,000 emails, and it gets better at catching spam than any human-written rule ever could.</p>
        
        <p>This is why modern AI feels so powerful. Instead of being limited to what programmers anticipated, machine learning systems can:</p>
        
        <ul>
          <li>Recognise faces in photos without being told what a "face" is</li>
          <li>Translate languages without memorising every word pair</li>
          <li>Recommend products you'll actually want without explicit preference lists</li>
          <li>Detect fraud patterns no human noticed</li>
        </ul>
        
        <p>But here's the catch: machine learning is only as good as the examples it learns from. Biased training data creates biased AI. Limited examples create limited understanding. This is why responsible AI development matters — not just clever algorithms, but thoughtful data selection.</p>
        
        <p>The three main types of machine learning are:</p>
        
        <p><strong>Supervised learning</strong> — learning from labelled examples (like spam/not spam).<br/>
        <strong>Unsupervised learning</strong> — finding patterns in unlabelled data.<br/>
        <strong>Reinforcement learning</strong> — learning through trial and error with rewards.</p>
        
        <p>The large language models powering ChatGPT, Gemini, and Claude? They use supervised learning combined with reinforcement learning from human feedback. They learned patterns from billions of text examples, then fine-tuned their responses based on what humans preferred.</p>
        
        <p>Machine learning isn't magic. It's pattern recognition at massive scale. And once you understand that, every AI tool suddenly makes sense.</p>
      `,
      handsOn: {
        title: "Train a Visual AI",
        description: "See machine learning in action by teaching an AI to recognise images.",
        affiliateLinks: [
          {
            text: "Try Teachable Machine →",
            url: "https://teachablemachine.withgoogle.com/"
          }
        ],
        exercise: `1. Go to Teachable Machine
2. Choose "Image Project" → "Standard image model"
3. Create two classes: "Smiling" and "Not Smiling"
4. Use your webcam to capture 20-30 photos of yourself smiling
5. Capture 20-30 photos with a neutral expression
6. Click "Train Model"
7. Watch it learn in real-time
8. Test it — smile and watch it detect your expression instantly

This is machine learning happening live. You just trained an AI model in 2 minutes.

Try These Variations:
• Train it to recognise hand gestures (thumbs up vs peace sign)
• Teach it to identify objects on your desk
• Show it photos of different pets
• Try with different lighting conditions — notice how more examples = better accuracy`
      }
    };
  }
  
  if (day === 4) {
    return {
      day: 4,
      title: "Prompt Engineering Basics",
      subtitle: "How to Talk to AI Effectively",
      content: `
        <p>Most people treat AI like a search engine: type a few keywords, hope for the best. But AI responds to language, not just keywords. The way you ask determines the quality of what you get back.</p>
        
        <p>This is called <strong>prompt engineering</strong> — the art of crafting inputs that produce better outputs.</p>
        
        <p>Here's a simple example. Compare these two prompts:</p>
        
        <p><strong>Weak prompt:</strong> "Write about dogs"<br/>
        <strong>Strong prompt:</strong> "Write a 200-word friendly guide explaining why dogs make great companions for first-time pet owners, focusing on loyalty, trainability, and emotional support."</p>
        
        <p>The second prompt gives AI context, tone, length, audience, and focus. The result? Dramatically better content.</p>
        
        <p>Think of AI as an incredibly capable assistant who needs clear instructions. If you walked into an office and said "do the thing," nobody would know what you mean. But if you said "draft a professional email declining this meeting while offering alternative times," suddenly it's actionable.</p>
        
        <p>The best prompts include:</p>
        
        <p><strong>Role:</strong> "You are an expert career coach..."<br/>
        <strong>Context:</strong> "I'm applying for a marketing role at a tech startup..."<br/>
        <strong>Task:</strong> "Review my CV and suggest improvements..."<br/>
        <strong>Format:</strong> "Provide 5 bullet points..."<br/>
        <strong>Tone:</strong> "Keep it professional but friendly..."</p>
        
        <p>You don't need all five every time, but more specificity usually helps.</p>
        
        <p>One powerful technique: <strong>ask the AI to think step-by-step.</strong> Instead of "solve this problem," try "explain your reasoning step-by-step, then give the answer." This often produces more accurate, thoughtful responses.</p>
        
        <p>Another trick: <strong>examples.</strong> Show the AI what you want. "Write three product descriptions like these examples: [paste examples]." The AI learns your style instantly.</p>
        
        <p>Prompt engineering isn't about memorising templates. It's about being specific, providing context, and treating the AI as a collaborator rather than a vending machine.</p>
        
        <p>The difference between someone who gets average results from AI and someone who gets incredible results? Better prompts. That's it.</p>
        
        <p>And here's the secret: you're already learning prompt engineering just by using AI regularly. Every time you rephrase a question to get a better answer, you're practicing this skill. It's intuitive once you realise AI responds to clarity.</p>
      `,
      handsOn: {
        title: "The Prompt Transformation Game",
        description: "Watch how different prompts create completely different results.",
        affiliateLinks: [
          {
            text: "Try ChatGPT →",
            url: "https://chat.openai.com"
          }
        ],
        exercise: `Copy these three prompts into ChatGPT and compare the outputs:

Prompt 1 (weak):
"Explain climate change"

Prompt 2 (better):
"Explain climate change in simple terms suitable for a 12-year-old, using everyday examples and focusing on what individuals can do to help."

Prompt 3 (advanced):
"You are a science communicator. Explain climate change using a storytelling approach — start with a relatable scenario, explain the science simply, address one common misconception, and end with three practical actions anyone can take. Keep it under 300 words and make it engaging."

Notice how Prompt 3 produces dramatically better, more useful content?

Try These Variations:
• Ask AI to write a recipe as if it's a detective solving a mystery
• Request business advice in the style of a friendly mentor
• Have it explain coding concepts using cooking analogies
• Ask it to turn boring facts into an engaging story`
      }
    };
  }
  
  if (day === 5) {
    return {
      day: 5,
      title: "Generative AI for Images",
      subtitle: "Creating Visuals From Text",
      content: `
        <p>Generative AI is the branch that creates new content — text, images, music, video — rather than just analysing existing data. And nowhere is this more immediately impressive than in image generation.</p>
        
        <p>Type "a cozy coffee shop on a rainy evening, warm lighting, watercolour style" into an AI image generator, and within seconds, you get exactly that. A completely original image that never existed before.</p>
        
        <p>How does this work? These models — like DALL-E, Midjourney, Stable Diffusion — were trained on millions of images paired with text descriptions. They learned the visual patterns associated with words. What does "cozy" look like? Soft lighting, warm colours, intimate spaces. What about "watercolour"? Soft edges, translucent layers, gentle blending.</p>
        
        <p>The AI doesn't copy existing images. It understands concepts well enough to generate new combinations. Ask for "a cat wearing a top hat riding a unicycle" and it'll create that absurd scene because it knows what cats, top hats, and unicycles look like separately.</p>
        
        <p>This technology is transforming creative work. Designers use it for rapid prototyping. Content creators generate custom visuals without stock photo subscriptions. Authors visualise their characters. Marketers create unique campaign assets.</p>
        
        <p>But there are considerations. These models were trained on images scraped from the internet, raising questions about artist rights and consent. Some argue it's democratising creativity; others see it as appropriation. The debate continues.</p>
        
        <p>For beginners, the practical takeaway is simple: you can now create professional-looking visuals with just words. No Photoshop skills needed. No graphic design degree required. Just clear descriptions.</p>
        
        <p>The better your prompts, the better the images. Specific details matter: "soft morning light," "cinematic composition," "wide angle lens," "highly detailed." These descriptors guide the AI toward your vision.</p>
        
        <p>One fascinating aspect: these models reveal biases in their training data. Ask for "a CEO" and you'll likely get an image of a middle-aged white man in a suit. Ask for "a nurse" and it defaults to a woman. This isn't the AI being sexist — it's reflecting patterns in the data it learned from, which reflects real-world biases.</p>
        
        <p>Image generation AI isn't replacing photographers or illustrators. It's becoming another tool in the creative toolkit. Like how cameras didn't kill painting — they created a new medium with its own aesthetics and uses.</p>
      `,
      handsOn: {
        title: "Generate Your First AI Image",
        description: "Create custom images just by describing them.",
        affiliateLinks: [
          {
            text: "Try Bing Image Creator (Free) →",
            url: "https://www.bing.com/images/create"
          }
        ],
        exercise: `1. Go to Bing Image Creator (uses DALL-E)
2. Sign in with Microsoft account (free)
3. Try this prompt:

"A serene mountain lake at sunrise, mist over the water, snow-capped peaks in the background, vibrant orange and pink sky, photorealistic"

4. Watch it generate 4 unique images in seconds
5. Now try this creative prompt:

"A steampunk library floating in clouds, brass bookshelves, clockwork mechanisms, warm Edison bulb lighting, fantasy art style"

Notice how specific descriptors (photorealistic, fantasy art style, warm lighting) dramatically affect the output?

Try These Variations:
• "Your hometown as an anime scene"
• "A modern coffee shop interior, Scandinavian design"
• "Your pet as a medieval knight, oil painting"
• "An album cover for [your favourite music genre]"`
      }
    };
  }

  if (day === 6) {
    return {
      day: 6,
      title: "AI Writing Assistants",
      subtitle: "From Blank Page to Polished Draft",
      content: `
        <p>Writer's block, awkward phrasing, unclear structure — these frustrations vanish when you have an AI writing partner who never judges your rough drafts.</p>
        
        <p>AI writing tools don't replace your thinking. They accelerate your writing process and help you express ideas more clearly. Think of them as having an editor, brainstorming partner, and research assistant combined.</p>
        
        <p>Here's where they genuinely help:</p>
        
        <p><strong>Getting started.</strong> The blank page is terrifying. Ask AI to generate three opening paragraphs for your topic. You probably won't use them directly, but they break the mental block. Suddenly you're editing rather than creating from nothing, which feels much easier.</p>
        
        <p><strong>Rewriting for clarity.</strong> Paste your confusing sentence and ask "make this clearer and more concise." The AI shows you tighter phrasing. Over time, you internalise these patterns and become a better writer yourself.</p>
        
        <p><strong>Tone adjustments.</strong> Need to make an email more professional? A report more casual? A message more empathetic? AI can rewrite text in different tones instantly. This is particularly valuable for non-native English speakers who understand the content but struggle with tone nuances.</p>
        
        <p><strong>Structure and organisation.</strong> Give AI your messy brain-dump of ideas and ask it to organise them into a logical outline. It spots connections you missed and suggests better flow.</p>
        
        <p><strong>Editing and proofreading.</strong> Grammar, spelling, punctuation — AI catches errors you gloss over after staring at the same text for hours.</p>
        
        <p>But here's what AI writing tools can't do: they can't think for you. They don't know what you actually believe, what specific experiences shaped your perspective, or what nuanced point you're trying to make. The ideas must come from you.</p>
        
        <p>The writers who get incredible results from AI use it strategically. They generate multiple drafts, pick the best elements from each, and rewrite in their own voice. They use AI for research and outlining, then write the actual content themselves. They treat AI-generated text as a starting point, never the final product.</p>
        
        <p>One important ethical note: if you're submitting work for education or publication, be transparent about AI use. Many institutions have policies. And regardless of rules, claiming AI-written work as entirely your own is intellectually dishonest.</p>
        
        <p>The real power of AI writing tools? They make writing less intimidating. They remove friction from the creative process. And they help you improve by showing you better ways to express your existing ideas.</p>
      `,
      handsOn: {
        title: "The Writing Enhancement Challenge",
        description: "Transform rough drafts into polished prose.",
        affiliateLinks: [
          {
            text: "Try ChatGPT →",
            url: "https://chat.openai.com"
          }
        ],
        exercise: `Copy this rough paragraph into ChatGPT:

"So basically what I'm trying to say is that remote work has some good things and bad things you know like you can work from anywhere which is cool but also you might feel lonely sometimes and it's hard to like stop working when your laptop is right there and also some people miss the office environment."

Now try these three prompts:

1. "Rewrite this in a professional tone for a business article, 100 words"
2. "Rewrite this as a friendly social media post, casual and engaging"
3. "Turn this into a clear, structured paragraph with specific examples"

Compare the outputs. Notice how each serves a different purpose?

Try These Variations:
• Paste an old email and ask "make this more concise"
• Draft a rough job application, then ask AI to improve it
• Write bullet points for a presentation, ask AI to create smooth transitions
• Take a formal announcement and request a warmer, friendlier version`
      }
    };
  }

  if (day === 7) {
    return {
      day: 7,
      title: "Computer Vision",
      subtitle: "How AI Sees the World",
      content: `
        <p>Your smartphone recognises your face to unlock. Google Photos automatically tags your friends. Self-driving cars detect pedestrians. Medical AI spots tumours in X-rays. All of this relies on computer vision — teaching machines to understand visual information.</p>
        
        <p>Humans take vision for granted. You instantly recognise a cat whether it's sitting, jumping, in shadows, or partially hidden behind furniture. You know a stop sign is a stop sign regardless of angle, lighting, or dirt covering parts of it.</p>
        
        <p>For computers, this is extraordinarily difficult. An image is just a grid of coloured pixels. Making sense of those pixels — understanding that certain patterns form objects, that objects exist in three-dimensional space, that some objects are partially hidden behind others — requires sophisticated AI.</p>
        
        <p>Computer vision systems learn through examples. Show the AI 10,000 images of cats with the label "cat," and it begins recognising patterns: pointy ears, whiskers, certain body proportions, fur textures. Show it 10,000 images of dogs labelled "dog," and it learns to distinguish the two.</p>
        
        <p>Early computer vision was primitive. Systems could recognise objects in controlled environments — perfect lighting, plain backgrounds, specific angles. But show them a cat in unusual poses or lighting, and they'd fail.</p>
        
        <p>Modern deep learning changed everything. Today's computer vision AI handles complex, real-world scenarios:</p>
        
        <ul>
          <li><strong>Object detection</strong> — identifying and locating multiple objects in images</li>
          <li><strong>Image segmentation</strong> — understanding which pixels belong to which objects</li>
          <li><strong>Facial recognition</strong> — identifying specific individuals</li>
          <li><strong>Pose estimation</strong> — understanding body positions and movements</li>
          <li><strong>Scene understanding</strong> — comprehending entire environments</li>
        </ul>
        
        <p>The applications are transformative. Medical computer vision detects diseases earlier than human doctors in some cases. Agricultural AI identifies crop diseases before they spread. Retail systems track inventory automatically. Quality control AI spots manufacturing defects humans miss.</p>
        
        <p>But computer vision also raises privacy concerns. Facial recognition in public spaces enables surveillance. Deepfakes use computer vision to manipulate video. These technologies need ethical guidelines and regulations.</p>
        
        <p>For everyday users, computer vision already enhances life in subtle ways: automatically organising photos, providing visual search, enabling augmented reality filters, improving accessibility for visually impaired users through image description AI.</p>
        
        <p>The technology isn't perfect. It can be fooled by adversarial examples — images designed to confuse AI. It inherits biases from training data, sometimes failing to recognise faces of certain ethnicities. Researchers continuously work on these challenges.</p>
        
        <p>Computer vision represents something profound: machines understanding the visual world in ways that approach human-level comprehension. Not identical to human vision, but remarkably capable.</p>
      `,
      handsOn: {
        title: "Test AI Visual Recognition",
        description: "See how AI interprets and understands images.",
        affiliateLinks: [
          {
            text: "Try Google Lens →",
            url: "https://lens.google.com"
          }
        ],
        exercise: `1. Go to Google Lens on your phone or at lens.google.com
2. Point it at objects around you or upload photos
3. Try these experiments:

• Point at a plant — it identifies the species
• Scan text in any language — it translates instantly
• Photograph a product — it finds where to buy it
• Capture your homework — it explains the solution
• Point at a landmark — it tells you about it

The AI isn't just recognising objects. It's understanding context, reading text, translating languages, and connecting to knowledge databases.

Try These Variations:
• Upload photos of multiple objects — see if it identifies all of them
• Try with animals, food, clothing, artwork
• Point at mathematical equations — watch it solve them
• Scan QR codes, barcodes, posters
• See how it handles partially obscured objects`
      }
    };
  }

  // Remaining days still need content
  return {
    day,
    title: `Day ${day}: Advanced AI Concepts`,
    subtitle: `Learning module for day ${day}`,
    content: `
      <h2>📚 Learning Content</h2>
      <p>
        This is placeholder content for Day ${day}. The actual course content will be added soon.
      </p>
      <h3>Topics Covered:</h3>
      <ul>
        <li>AI concept ${day}.1</li>
        <li>AI concept ${day}.2</li>
        <li>Practical application</li>
      </ul>
      <p>
        <em>Content coming soon! The instructor is preparing detailed materials for this lesson.</em>
      </p>
    `,
    handsOn: {
      title: "🛠️ Hands-On Practice",
      description: `Practical exercises for Day ${day} will be added soon.`,
      exercise: `Complete the exercises for Day ${day}`
    }
  };
});
