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
  
  if (day === 8) {
    return {
      day: 8,
      title: "AI for Research and Learning",
      subtitle: "Your Personal Knowledge Assistant",
      content: `
        <p>Research used to mean hours in libraries, scanning indexes, reading dozens of sources to find relevant information. AI compresses this process dramatically while actually improving comprehension.</p>
        
        <p>Modern AI research tools don't just find information — they synthesize it, explain it in your preferred style, and help you understand complex topics faster than traditional methods ever could.</p>
        
        <p>Take NotebookLM, Google's AI research assistant. You upload PDFs, articles, or documents, and it becomes an expert on that specific content. Ask questions, and it answers using only your sources — with citations. Request a summary, and it creates one tailored to your needs. Want it explained differently? Just ask.</p>
        
        <p>This is fundamentally different from searching the internet. The AI has actually "read" your materials and can have a conversation about them. It's like having a study partner who's meticulously reviewed everything you're learning.</p>
        
        <p>For students, this is transformative. Struggling with dense academic papers? Ask AI to explain in simpler terms. Need to compare multiple theories? Request a comparison table. Writing a literature review? Get help organizing key themes across sources.</p>
        
        <p>For professionals, it accelerates learning new skills. Researching a new industry? Upload relevant reports and have AI brief you. Preparing for a presentation? Get key points extracted. Learning new software? Feed it documentation and ask practical questions.</p>
        
        <p>But there's an important distinction: AI research assistants should enhance understanding, not replace it. Using AI to write your essay without reading sources is cheating yourself. Using AI to better understand those sources so you can write a thoughtful essay? That's smart learning.</p>
        
        <p>The real magic happens when you combine AI with active learning. Ask it to quiz you on content. Request it explain concepts you're confused about. Have it generate examples. These approaches deepen understanding rather than bypassing it.</p>
        
        <p>One critical skill: verifying AI-provided information. AI can make mistakes, especially with specialized or recent information. Cross-reference important claims. Check citations. Treat AI as a knowledgeable assistant who might occasionally misremember details, not an infallible oracle.</p>
        
        <p>The best researchers and learners use AI as a thinking partner. They ask better questions because AI helps them identify gaps in understanding. They learn faster because AI removes friction from the research process. They understand deeper because they can explore tangential questions immediately.</p>
      `,
      handsOn: {
        title: "Create Your Personal Research Assistant",
        description: "Upload documents and have AI become an expert on them.",
        affiliateLinks: [
          {
            text: "Try NotebookLM →",
            url: "https://notebooklm.google.com"
          }
        ],
        exercise: `1. Go to NotebookLM (free with Google account)
2. Create a new notebook
3. Upload sources - try a PDF, article, or even YouTube video
4. Once uploaded, try these prompts:

"Summarize the main arguments in 5 bullet points"
"Explain the key concept as if I'm a complete beginner"
"What are the three most important takeaways?"
"Generate 5 quiz questions to test my understanding"

Notice how it cites specific parts of your sources?

5. Try the "Audio Overview" feature — it generates a podcast-style discussion about your sources!

Try These Variations:
• Upload multiple articles on the same topic - ask AI to compare them
• Upload a textbook chapter - request practice problems
• Add research papers - ask for a literature review
• Upload meeting notes - get action items extracted`
      }
    };
  }

  if (day === 9) {
    return {
      day: 9,
      title: "Natural Language Processing",
      subtitle: "How AI Understands Human Language",
      content: `
        <p>When you ask Alexa to set a timer, translate a menu with your phone, or autocomplete a sentence, you're experiencing natural language processing — AI's ability to understand, interpret, and generate human language.</p>
        
        <p>Human language is messy. We use sarcasm, context-dependent meanings, cultural references, idioms, and ambiguous phrasing. "I'm feeling blue" doesn't mean you've changed color. "That's sick!" might be a compliment. "Bank" could mean a financial institution or a river's edge.</p>
        
        <p>For decades, computers struggled with this. Early systems relied on rigid rules: look for specific words, match patterns, follow scripts. They couldn't handle anything outside their programmed scenarios.</p>
        
        <p>Modern NLP changed everything. Instead of rules, AI learns language patterns from vast amounts of text. It doesn't "understand" language like humans do — it recognises statistical patterns in how words relate to each other. But those patterns are so sophisticated that the results feel remarkably human.</p>
        
        <p>NLP powers countless daily interactions:</p>
        
        <ul>
          <li><strong>Machine translation</strong> — converting text between languages while preserving meaning</li>
          <li><strong>Sentiment analysis</strong> — determining if text expresses positive, negative, or neutral feelings</li>
          <li><strong>Text summarization</strong> — condensing long documents while retaining key information</li>
          <li><strong>Named entity recognition</strong> — identifying people, places, organizations in text</li>
          <li><strong>Question answering</strong> — extracting relevant information in response to queries</li>
        </ul>
        
        <p>The breakthrough came with transformer models — the architecture behind ChatGPT, Gemini, and similar tools. These models process entire sentences simultaneously, understanding how each word relates to every other word. This captures context in ways previous approaches couldn't.</p>
        
        <p>Consider how transformers handle ambiguity. In "The bank can guarantee deposits will eventually cover all accountable losses," the word "bank" clearly refers to a financial institution based on surrounding context. In "The bank was muddy and slippery," it obviously means the river's edge. Transformers capture these contextual clues automatically.</p>
        
        <p>But NLP isn't perfect. AI can misinterpret subtle meanings, struggle with new slang, or fail to catch cultural nuances. It might not recognize when you're being sarcastic or detect deeply contextual humor. These remain active research areas.</p>
        
        <p>For users, the practical implication is simple: AI now handles language tasks that once required human intelligence. Customer service chatbots answer questions. Translation apps enable conversations across languages. Writing assistants catch grammatical errors. Voice assistants understand spoken requests.</p>
        
        <p>And this technology keeps improving. Each generation of models understands language better, handles more complex queries, and makes fewer mistakes. What seems impressive today will feel basic in a few years.</p>
      `,
      handsOn: {
        title: "Test Translation and Sentiment Analysis",
        description: "Experience how AI processes and understands language.",
        affiliateLinks: [
          {
            text: "Try ChatGPT →",
            url: "https://chat.openai.com"
          }
        ],
        exercise: `Copy these experiments into ChatGPT:

Experiment 1 - Sentiment Analysis:
"Analyze the sentiment (positive, negative, neutral) of these reviews:
1. 'Absolutely loved this product! Worth every penny.'
2. 'It's okay, nothing special.'
3. 'Complete waste of money. Very disappointed.'
4. 'The quality is decent but overpriced.'"

Experiment 2 - Entity Extraction:
"Extract all people, places, and organizations from this text:
'Apple CEO Tim Cook announced in San Francisco that the company will partner with Microsoft and Google to improve AI safety standards.'"

Experiment 3 - Ambiguity Resolution:
"Explain the different meanings of 'bank' in these sentences:
1. 'I need to visit the bank tomorrow.'
2. 'We sat on the river bank.'
3. 'She's banking on getting that promotion.'"

Try These Variations:
• Have AI detect sarcasm in different phrases
• Ask it to simplify complex legal or medical text
• Request idiom explanations from different languages
• Test its understanding of context-dependent words`
      }
    };
  }

  if (day === 10) {
    return {
      day: 10,
      title: "AI for Brainstorming and Creativity",
      subtitle: "Unlocking Ideas You Didn't Know You Had",
      content: `
        <p>Creativity often feels blocked by the same mental patterns. You keep returning to familiar ideas. You can't see beyond obvious solutions. Your internal critic shoots down concepts before they fully form.</p>
        
        <p>AI changes this dynamic entirely. It doesn't judge. It doesn't get tired. It can generate 100 variations in seconds. It combines concepts in ways you'd never think of. This makes it a remarkable brainstorming partner.</p>
        
        <p>The key is understanding what AI does well: it produces volume and variety. Ask for one business name and you get something predictable. Ask for 50 business names with different creative directions, and suddenly you're exploring territory you'd never have reached alone.</p>
        
        <p>Here's how creative professionals actually use AI:</p>
        
        <p><strong>Idea generation.</strong> Stuck on a project? Ask AI to generate 20 completely different approaches. You probably won't use any directly, but they spark associations that lead to your actual solution.</p>
        
        <p><strong>Perspective shifts.</strong> Request AI to approach your problem as different people would: how would a child solve this? A CEO? An artist? A scientist? These cognitive shifts reveal blindspots in your thinking.</p>
        
        <p><strong>Combination generation.</strong> AI excels at combining unrelated concepts. "Give me 10 business ideas combining cooking and technology" or "suggest products merging fitness and gaming." Some will be absurd, but absurdity often seeds innovation.</p>
        
        <p><strong>Constraint-based creativity.</strong> Creativity thrives with constraints. "Design a logo using only circles and the colour blue" or "write a story where the main character never speaks." AI helps you explore within these boundaries systematically.</p>
        
        <p><strong>Iteration speed.</strong> Generate a concept, refine it, try variations, merge elements. AI accelerates this iterative process dramatically. What might take weeks of traditional brainstorming happens in a conversation.</p>
        
        <p>But AI doesn't replace your creative judgment. It generates possibilities; you select what resonates. It suggests directions; you decide which to pursue. Think of it as a creativity amplifier, not a creativity replacement.</p>
        
        <p>The most valuable brainstorming sessions with AI involve back-and-forth dialogue. You propose, AI expands, you refine, AI varies, you combine elements. This collaborative process produces results neither human nor AI would reach independently.</p>
        
        <p>One powerful technique: ask AI to criticize its own ideas. Generate concepts, then request "what are the weaknesses of each idea?" This simulates having multiple people in the room with different perspectives.</p>
        
        <p>Professional creatives don't fear AI replacing them — they use it to think bigger, explore further, and escape creative ruts faster. The bottleneck was never generating ideas; it was generating enough good ideas. AI removes that bottleneck.</p>
      `,
      handsOn: {
        title: "The Creative Explosion Exercise",
        description: "Generate more ideas in 10 minutes than you typically would in an hour.",
        affiliateLinks: [
          {
            text: "Try ChatGPT →",
            url: "https://chat.openai.com"
          }
        ],
        exercise: `Choose a creative challenge (naming a project, designing something, solving a problem) and try this progression:

Step 1 - Volume:
"Generate 30 different [names/ideas/approaches] for [your project]. Include diverse styles: professional, playful, descriptive, abstract, cultural references, and unexpected combinations."

Step 2 - Perspective Shift:
"Now approach the same challenge as if you were: 1) A sci-fi author, 2) A 5-year-old, 3) A minimalist designer, 4) A punk rock musician. Give 5 ideas from each perspective."

Step 3 - Combination:
"Take the 3 most interesting ideas from above and create 5 hybrid concepts combining elements from multiple approaches."

Step 4 - Critique:
"For each hybrid concept, list 2 strengths and 2 potential problems."

You just generated 50+ ideas, explored multiple perspectives, and critically evaluated options — in minutes.

Try These Variations:
• Brainstorm gift ideas by describing the person's interests
• Design a room layout by specifying constraints and preferences
• Create workout routines combining different activity types
• Develop recipe ideas using specific ingredients you have`
      }
    };
  }
  
  if (day === 11) {
    return {
      day: 11,
      title: "Speech-to-Text and Voice AI",
      subtitle: "When Machines Listen",
      content: `
        <p>Dictate an email while walking. Have meeting notes transcribed automatically. Control your home with voice commands. Get real-time subtitles in multiple languages. Speech-to-text AI transforms how we interact with technology.</p>
        
        <p>The technology sounds straightforward — convert spoken words to written text — but it's remarkably complex. Human speech is filled with accents, background noise, mumbling, interruptions, and context-dependent meanings. "Their," "there," and "they're" sound identical but mean different things.</p>
        
        <p>Early speech recognition required training. You'd spend hours reading preset texts so the system learned your voice. It worked in quiet environments with clear speech and simple vocabulary. Real-world conversations broke it immediately.</p>
        
        <p>Modern AI speech recognition works differently. Trained on thousands of hours of diverse speech data, it handles multiple accents, noisy environments, and natural conversation. It uses context to disambiguate homophones. It even adds appropriate punctuation based on speech patterns.</p>
        
        <p>The accuracy is startling. Tools like Whisper (from OpenAI) achieve near-human transcription accuracy. They catch technical terminology, distinguish between speakers, and even note things like laughter or music in the background.</p>
        
        <p>This enables transformative applications:</p>
        
        <p><strong>Accessibility.</strong> Speech-to-text gives voice to people who can't type. It enables communication for those with physical disabilities. It provides captions for deaf users watching videos.</p>
        
        <p><strong>Productivity.</strong> Dictate instead of typing — often faster and more natural. Transcribe meetings automatically so everyone focuses on discussion rather than note-taking. Search audio content as easily as text documents.</p>
        
        <p><strong>Language learning.</strong> Practice pronunciation and get instant feedback. Have conversations transcribed and translated simultaneously. Listen to content while reading along.</p>
        
        <p><strong>Content creation.</strong> Podcasters get automatic transcripts. Video creators add captions effortlessly. Journalists interview and get searchable transcriptions.</p>
        
        <p>Voice AI extends beyond transcription. Voice assistants understand intent: "remind me to call Mom when I leave work" requires understanding location, timing, and relationships. Smart speakers process commands and respond conversationally. Some AI can even detect emotions in voice patterns.</p>
        
        <p>But voice tech raises privacy questions. Always-listening devices record conversations. Voice data can be stored and analyzed. Companies might use voice signatures for identification. These concerns require transparent policies and user control.</p>
        
        <p>The future of voice AI is multimodal: systems that combine speech with visual context, understand multiple speakers simultaneously, and translate in real-time during conversations. The technology already exists; it's becoming more accessible and accurate.</p>
      `,
      handsOn: {
        title: "Experience Auto-Transcription",
        description: "Convert speech to text with remarkable accuracy.",
        affiliateLinks: [
          {
            text: "Try Otter.ai (Free) →",
            url: "https://otter.ai"
          }
        ],
        exercise: `1. Go to Otter.ai (free account available)
2. Start a new recording or upload an audio file
3. Watch it transcribe in real-time
4. Try these tests:

• Record yourself speaking naturally - include technical terms
• Try speaking with background noise (music, TV)
• Switch between fast and slow speech
• Use different tones (excited, monotone, questioning)

Notice how it:
- Adds punctuation automatically
- Handles technical vocabulary
- Identifies speakers
- Provides timestamps
- Makes the transcription searchable

5. Try the "Ask Otter" feature - ask questions about what was discussed!

Try These Variations:
• Dictate an email or text message using your phone's speech-to-text
• Use voice commands to control your smart home or phone
• Try Microsoft Word's built-in dictation feature
• Record a voice note and have it transcribed automatically`
      }
    };
  }

  if (day === 12) {
    return {
      day: 12,
      title: "AI in Daily Life",
      subtitle: "The Invisible Intelligence Around You",
      content: `
        <p>You've probably used AI twenty times today without noticing. That's not an exaggeration — modern life is quietly saturated with artificial intelligence making thousands of micro-decisions on your behalf.</p>
        
        <p>Wake up. Your phone's alarm adapted to your sleep patterns. Check the weather — AI predicted that forecast. Scroll social media — AI curated every post you see. Navigate to work — AI optimised your route. Buy coffee — AI detected potential fraud on your card. All before 9 AM.</p>
        
        <p>This invisible AI doesn't feel futuristic because it's so seamlessly integrated. It's not dramatic or flashy. It just works, quietly improving experiences in ways you rarely think about.</p>
        
        <p><strong>Your phone</strong> — AI improves photos, suggests responses, predicts what you'll type next, identifies spam calls, transcribes voicemails, recognises faces, adjusts screen brightness, and manages battery life.</p>
        
        <p><strong>Your inbox</strong> — AI filters spam, categorises emails, suggests replies, flags important messages, and summarises long threads.</p>
        
        <p><strong>Your shopping</strong> — AI recommends products, optimises prices, detects fake reviews, manages inventory, personalises offers, and prevents fraud.</p>
        
        <p><strong>Your entertainment</strong> — AI recommends what to watch, creates playlists, suggests content, generates thumbnails, optimises streaming quality, and even helps create the content itself.</p>
        
        <p><strong>Your navigation</strong> — AI predicts traffic, suggests routes, estimates arrival times, finds parking, and adapts to real-time conditions.</p>
        
        <p><strong>Your health</strong> — AI tracks fitness, monitors heart rate, detects falls, suggests workouts, identifies skin conditions, and assists in medical diagnoses.</p>
        
        <p>The pattern? AI handles repetitive decisions, pattern recognition, and optimisation — tasks humans find tedious but machines excel at. This frees human attention for more meaningful work.</p>
        
        <p>But this ubiquity creates questions. Are recommendation algorithms showing you diverse perspectives or creating echo chambers? Is personalized pricing fair or discriminatory? Does AI-optimised content manipulate attention? These aren't hypothetical concerns — they affect daily life.</p>
        
        <p>Understanding AI in daily life means recognising when you're interacting with it. That awareness enables better decisions about privacy, helps you understand why certain things appear in your feed, and lets you use AI tools more effectively.</p>
        
        <p>The next time something "just works" — your photos look amazing, your playlist is perfect, your route avoids traffic — that's probably AI. Not magical. Just really, really capable pattern recognition working in the background.</p>
        
        <p>And this is still early. The AI you interact with today will seem primitive compared to what's coming. Systems will become more helpful, more intuitive, and more invisible. The challenge isn't whether AI will be present in daily life — it already is. The challenge is ensuring it serves human flourishing, not just corporate optimisation.</p>
      `,
      handsOn: {
        title: "The AI Detection Challenge",
        description: "Identify all the AI you interact with in one hour.",
        affiliateLinks: [
          {
            text: "Learn more about AI ethics →",
            url: "https://www.deeplearning.ai/courses/ai-for-everyone/"
          }
        ],
        exercise: `For the next hour, consciously notice every AI interaction:

Create a list tracking:
1. What AI system you used
2. What it did for you
3. Whether you had control over it
4. Whether you could opt out

Examples to watch for:
• Social media feeds (what appears and in what order)
• Autocomplete and autocorrect
• Photo enhancements
• Spam filters
• Recommendations (products, content, routes)
• Facial recognition (unlocking devices)
• Voice assistants
• Targeted advertisements
• Predictive text
• Smart home automations

At the end, you'll probably have 15-25 AI interactions logged. Most people are shocked by how much AI they use without thinking about it.

Try These Variations:
• Check your phone's settings — see what AI features you can control
• Review a social media app — explore content ranking settings
• Look at your email filters — understand what gets flagged and why
• Check smart home device settings — see what data it collects`
      }
    };
  }
  
  if (day === 13) {
    return {
      day: 13,
      title: "AI for Coding (Beginner-Safe)",
      subtitle: "When AI Writes the Code",
      content: `
        <p>You don't need to be a programmer to benefit from AI coding tools. In fact, AI is making coding accessible to people who never wrote a line of code in their lives.</p>
        
        <p>Traditional coding required memorizing syntax, understanding complex logic, and debugging cryptic errors. One misplaced semicolon could break everything. This barrier kept millions of people with great ideas from building software.</p>
        
        <p>AI changes this dynamic. Now you can describe what you want in plain English, and AI generates the code. Want a simple calculator? Describe it. Need a website contact form? Explain what it should do. AI writes functional code based on your description.</p>
        
        <p>This doesn't mean programmers are obsolete. Professional developers use AI as a productivity multiplier — it handles boilerplate code, suggests solutions, finds bugs, and explains unfamiliar code. This lets them focus on creative problem-solving rather than syntax.</p>
        
        <p>For non-programmers, AI coding assistants open new possibilities. You can automate repetitive tasks, build simple tools, create prototypes, or learn programming concepts interactively. The AI doesn't just give you code — it can explain what each part does.</p>
        
        <p>Here's a realistic example: someone running a small business needs to process customer data from spreadsheets. Traditionally, they'd hire a developer or spend weeks learning programming. With AI, they describe the task: "I have a CSV file with customer orders. I need to calculate total sales per product and generate a summary report." The AI provides working code with instructions on how to run it.</p>
        
        <p>The most powerful aspect? <strong>Learning through doing.</strong> Ask AI to generate code, then request "explain this code line by line as if I'm a beginner." You get working solutions AND understand how they work. This interactive learning beats traditional tutorials.</p>
        
        <p>Common beginner-friendly uses:</p>
        
        <ul>
          <li>Automating data processing in spreadsheets</li>
          <li>Building simple websites or web apps</li>
          <li>Creating scripts for repetitive tasks</li>
          <li>Modifying existing code from templates</li>
          <li>Learning programming concepts interactively</li>
        </ul>
        
        <p>One important note: AI-generated code isn't always perfect. It might have bugs, security issues, or inefficiencies. For critical applications, professional review is essential. But for personal projects, learning, and prototyping? AI dramatically lowers the entry barrier.</p>
        
        <p>The future isn't "everyone must learn to code." It's "everyone can build with code, using AI as their technical partner." That's fundamentally different — and far more empowering.</p>
      `,
      handsOn: {
        title: "Build Your First Web Page (No Coding Required)",
        description: "Create a functional website by describing what you want.",
        affiliateLinks: [
          {
            text: "Try ChatGPT →",
            url: "https://chat.openai.com"
          }
        ],
        exercise: `Copy this into ChatGPT:

"Create a simple personal portfolio website with these sections:
1. Header with my name and job title
2. About section with placeholder text
3. Skills section listing 5 skills
4. Contact section with email
5. Make it modern, responsive, and use pleasant colors

Provide complete HTML and CSS code in a single file that I can save and open in a browser."

ChatGPT will generate complete, working code. Then:

1. Copy the code into a text editor
2. Save it as "portfolio.html"
3. Double-click the file - it opens in your browser!
4. You just built a website with zero coding knowledge

Now try variations:
• Ask AI to change the color scheme
• Request a different layout
• Add animation effects
• Include a photo placeholder

Each time, you get working code instantly. This is how AI makes technical skills accessible.

Try These Variations:
• Build a simple to-do list app
• Create a countdown timer
• Make a quiz with questions and answers
• Design a landing page for a fictional product`
      }
    };
  }
  
  if (day === 14) {
    return {
      day: 14,
      title: "AI Ethics and Bias",
      subtitle: "When AI Reflects Our Flaws",
      content: `
        <p>AI systems learn from data created by humans. And humans have biases — cultural, historical, systemic. AI inherits these biases, amplifying them at scale.</p>
        
        <p>This isn't a hypothetical problem. Facial recognition systems perform worse on darker skin tones because training data predominantly featured lighter skin. Hiring algorithms discriminate against women because historical hiring data reflected gender bias. Loan approval systems deny credit to qualified applicants from certain zip codes because past decisions embedded redlining patterns.</p>
        
        <p>Here's the uncomfortable truth: AI doesn't create new biases. It reveals and perpetuates existing ones, making them harder to notice because they're wrapped in the authority of "algorithmic objectivity."</p>
        
        <p>When a human loan officer denies your application unfairly, you can challenge their reasoning. When an AI system does it, the decision feels final, mathematical, unchallengeable. But the algorithm was trained on biased data, making biased predictions seem objective.</p>
        
        <p>Bias in AI emerges from multiple sources:</p>
        
        <p><strong>Data bias</strong> — if training data isn't representative (too many men, too few minorities, specific age groups), the AI learns skewed patterns.</p>
        
        <p><strong>Label bias</strong> — humans labeling training data bring their own prejudices. What one person marks as "professional attire" or "qualified candidate" reflects cultural assumptions.</p>
        
        <p><strong>Algorithmic bias</strong> — the optimization goal itself might encode bias. Maximizing engagement on social media prioritizes inflammatory content because it generates clicks.</p>
        
        <p><strong>Deployment bias</strong> — even fair algorithms cause harm if deployed in biased systems. Predictive policing AI trained on arrest data sends police to over-policed communities, creating a self-fulfilling cycle.</p>
        
        <p>Addressing AI bias requires multiple approaches: diverse training data, careful testing across demographics, transparency about limitations, and ongoing monitoring after deployment. It also requires diverse teams building AI — different perspectives spot problems others miss.</p>
        
        <p>But technical solutions aren't enough. We need ethical frameworks. Should AI make life-changing decisions about employment, housing, or criminal justice? If yes, under what constraints? Who's accountable when AI causes harm? These are societal questions, not just technical ones.</p>
        
        <p>As an AI user, you have responsibility too. Question AI recommendations. Recognize when you're interacting with AI. Understand that "the algorithm said so" isn't justification — algorithms reflect human choices about data, design, and deployment.</p>
        
        <p>AI ethics isn't about rejecting technology. It's about building and using AI thoughtfully, acknowledging limitations, considering impacts on vulnerable populations, and ensuring human values guide algorithmic decisions.</p>
        
        <p>Perfect fairness may be impossible, but thoughtful design and deployment can reduce harm. That requires everyone — developers, users, policymakers — taking AI ethics seriously.</p>
      `,
      handsOn: {
        title: "Discover Bias in AI Systems",
        description: "See how AI reflects and amplifies human biases.",
        affiliateLinks: [
          {
            text: "Explore Gender Shades Research →",
            url: "http://gendershades.org"
          }
        ],
        exercise: `Experiment 1 - Image Generation Bias:
Go to Bing Image Creator or similar and generate images for these prompts:
• "A CEO in an office"
• "A nurse at work"
• "A scientist in a lab"
• "A construction worker"

Notice patterns? Do certain professions default to specific genders or ethnicities? That's training data bias visible in outputs.

Experiment 2 - Search Result Bias:
Search "professional hairstyles" on Google Images
Then search "unprofessional hairstyles"
Compare the results - do you notice racial patterns? This reveals how cultural biases embed in training data.

Experiment 3 - Language Bias:
Ask ChatGPT: "Complete this sentence: The doctor walked into the room. He..."
Then ask: "Complete this sentence: The nurse walked into the room. She..."

Notice how AI defaults to gendered pronouns based on profession stereotypes?

Try These Variations:
• Test occupation stereotypes with different AI image generators
• Ask AI to describe "successful people" - what assumptions appear?
• Try generating "beautiful person" in different AI systems - notice defaults
• Search for same terms in multiple languages - compare bias patterns`
      }
    };
  }
  
  if (day === 15) {
    return {
      day: 15,
      title: "AI in Business and Productivity",
      subtitle: "Working Smarter, Not Harder",
      content: `
        <p>The question isn't whether AI will transform work. It already has. The question is: are you using it strategically or getting left behind?</p>
        
        <p>AI doesn't replace jobs wholesale — it replaces specific tasks. Email drafting, data entry, basic research, scheduling, simple customer queries, report generation. These repetitive, time-consuming activities now take minutes instead of hours.</p>
        
        <p>Smart businesses and professionals use AI for:</p>
        
        <p><strong>Communication efficiency.</strong> AI drafts emails, summarizes long threads, suggests responses, translates messages, and adapts tone. This doesn't eliminate thoughtful communication — it removes the friction of starting, formatting, and polishing.</p>
        
        <p><strong>Data analysis.</strong> Feed spreadsheets or datasets to AI and ask questions in plain English: "What's our best-selling product category?" "Which customer segment has highest churn?" You get instant insights without complex Excel formulas or SQL queries.</p>
        
        <p><strong>Content creation.</strong> Blog posts, social media updates, product descriptions, presentations. AI generates first drafts, suggests improvements, adapts for different audiences. You add the strategic thinking and brand voice.</p>
        
        <p><strong>Meeting optimization.</strong> AI transcribes meetings, extracts action items, summarizes key decisions, and even scores meeting effectiveness. Everyone can focus on discussion instead of frantic note-taking.</p>
        
        <p><strong>Research and learning.</strong> Instead of hours searching for information, ask AI to summarize reports, compare options, explain unfamiliar concepts, or generate briefing documents on new topics.</p>
        
        <p><strong>Task automation.</strong> Repetitive workflows — processing forms, categorizing emails, extracting information from documents, updating databases — now happen automatically.</p>
        
        <p>But here's what separates mediocre from exceptional AI use: treating it as a collaborator, not a replacement for thinking.</p>
        
        <p>Bad approach: "Write my quarterly report." Copy-paste AI output. Submit.</p>
        
        <p>Smart approach: "Draft an outline for my quarterly report covering these key metrics. For each section, suggest 3 ways to present the data compellingly." Review AI suggestions. Select what resonates. Add your insights. Polish the narrative. The result combines AI efficiency with human judgment.</p>
        
        <p>The productivity gains are staggering. Tasks that once took hours now take minutes. This doesn't mean working less — it means handling more strategic work instead of drowning in busywork.</p>
        
        <p>Companies integrating AI thoughtfully see measurable results: faster customer service, better data insights, reduced operational costs, increased employee satisfaction (because people do less tedious work). The competitive advantage isn't subtle.</p>
        
        <p>But productivity isn't just professional. AI helps personal organization: managing schedules, tracking habits, planning meals, sorting photos, drafting personal correspondence. It's having an assistant for everyday life.</p>
        
        <p>The workers thriving in an AI-augmented world aren't those with the most technical skills. They're those who master prompting, critically evaluate AI outputs, and know when to use AI versus when human judgment matters.</p>
      `,
      handsOn: {
        title: "Automate Your Repetitive Tasks",
        description: "Identify and delegate busywork to AI.",
        affiliateLinks: [
          {
            text: "Try ChatGPT →",
            url: "https://chat.openai.com"
          }
        ],
        exercise: `Step 1 - Audit Your Busywork:
List 5 repetitive tasks you do regularly that feel tedious:
• Example: "Writing weekly status update emails"
• Example: "Summarizing meeting notes"
• Example: "Researching competitor pricing"

Step 2 - Delegate to AI:
For each task, create an AI workflow. Example:

Task: Weekly status update
AI Prompt: "I need to write a weekly status update. Here's what I accomplished: [paste bullet points]. Write a concise, professional email to my manager highlighting progress and next week's priorities."

Task: Meeting summaries
AI Prompt: "Summarize these meeting notes into: 1) Key decisions, 2) Action items with owners, 3) Open questions"

Step 3 - Measure Time Saved:
Track how long your usual method takes vs. using AI
Most people save 30-60% of time on routine tasks

Try These Variations:
• Use AI to draft responses to common emails
• Have AI create presentation outlines from bullet points
• Ask AI to analyze spreadsheet data and generate insights
• Automate research by having AI summarize multiple sources
• Create templates for recurring tasks with AI-generated drafts`
      }
    };
  }
  
  if (day === 16) {
    return {
      day: 16,
      title: "Deepfakes and AI-Generated Media",
      subtitle: "When You Can't Trust Your Eyes",
      content: `
        <p>Seeing used to be believing. Not anymore. AI can now generate photorealistic images of people who don't exist, create videos of anyone saying anything, and synthesize voices indistinguishable from real recordings.</p>
        
        <p>This is deepfake technology — using AI to create convincing fake media. The name combines "deep learning" (the AI technique) with "fake." And it's simultaneously fascinating and terrifying.</p>
        
        <p>The technology itself is neutral. Film studios use it for de-aging actors or creating digital performances. Museums animate historical photos. Educators create engaging content. People use it for creative expression and entertainment.</p>
        
        <p>But the potential for harm is significant. Deepfakes can spread misinformation, create non-consensual explicit content, impersonate individuals for fraud, manipulate elections, and undermine trust in authentic media.</p>
        
        <p>Here's what makes deepfakes particularly dangerous: they're getting easier to create. What once required expert skills and expensive equipment now works with consumer hardware and accessible software. A convincing fake can be made in hours, not weeks.</p>
        
        <p>The detection challenge is this: as AI gets better at creating fakes, AI detection tools improve — but it's an arms race. Today's detection methods might not catch tomorrow's deepfakes. And critically, most people don't scrutinize media carefully enough to spot subtle tells.</p>
        
        <p>Common deepfake indicators (though these are evolving):</p>
        
        <ul>
          <li>Unnatural eye movement or blinking patterns</li>
          <li>Inconsistent lighting or shadows on faces</li>
          <li>Odd skin textures or hair rendering</li>
          <li>Audio-visual sync issues</li>
          <li>Unusual facial movements or expressions</li>
        </ul>
        
        <p>But technical detection isn't enough. We need media literacy. Before sharing dramatic content, ask: Who created this? What's the source? Can I verify this through other channels? Does this seem designed to provoke strong emotional reaction? Is the timing suspicious?</p>
        
        <p>Some encouraging developments: content authentication standards, digital watermarking for AI-generated content, platform policies against malicious deepfakes, and research into robust detection methods. But technology alone won't solve this — critical thinking remains essential.</p>
        
        <p>The broader philosophical question: in a world where seeing is no longer believing, how do we establish truth? The answer involves trusted sources, verification methods, transparent provenance tracking, and healthy skepticism about sensational content.</p>
        
        <p>As deepfakes become ubiquitous, "is this real?" becomes a question we must ask constantly. That's not paranoia — it's necessary media literacy in the AI age.</p>
      `,
      handsOn: {
        title: "Spot the Deepfake Challenge",
        description: "Test your ability to distinguish real from AI-generated media.",
        affiliateLinks: [
          {
            text: "Try Which Face Is Real →",
            url: "https://www.whichfaceisreal.com"
          }
        ],
        exercise: `1. Go to WhichFaceIsReal.com
2. You'll see two faces - one real, one AI-generated
3. Try to identify which is which
4. Check your answer and see the explanation

Most people score around 50-70%. That's concerning because it means deepfakes can fool us.

Look for these clues:
• AI-generated faces often have weird ears or ear asymmetry
• Hair may have strange patterns or inconsistent texture
• Backgrounds might be blurry or have odd artifacts
• Teeth might look unnatural
• Eyes may have unusual highlights or reflections

5. Try 10 rounds - see if you improve with practice

Then try this:
• Search YouTube for "deepfake examples" - watch comparisons
• Visit ThisPersonDoesNotExist.com - refresh to see AI faces
• Check out Metaphysic's America's Got Talent deepfake performances

Try These Variations:
• Show friends deepfake examples - see if they can tell
• Practice questioning viral videos before sharing
• Check image reverse search to verify photo authenticity
• Look up recent deepfake news stories to understand real-world impact`
      }
    };
  }
  
  if (day === 17) {
    return {
      day: 17,
      title: "AI for Education and Skill-Building",
      subtitle: "Your Personal Tutor, Available 24/7",
      content: `
        <p>Traditional education has inherent limitations. One teacher, 30 students. Fixed pace — too fast for some, too slow for others. Generic curriculum. Limited office hours. High cost.</p>
        
        <p>AI education tools break these constraints. You get personalized tutoring that adapts to your pace, answers questions instantly, explains concepts multiple ways until they click, and costs nothing or very little.</p>
        
        <p>This isn't replacing teachers — it's democratizing access to educational support. Every student can have a patient tutor who never gets frustrated, never judges confusion, and remains available at 2 AM when you're studying.</p>
        
        <p>Here's how learners actually use AI:</p>
        
        <p><strong>Concept explanation.</strong> Textbook explanation too dense? Ask AI to explain it as if you're ten years old. Still confused? Request an analogy. Need more? Have it explain using real-world examples. Keep asking until it clicks.</p>
        
        <p><strong>Practice generation.</strong> Need practice problems? AI generates unlimited examples at whatever difficulty level you need. Want to test yourself? Request a quiz. Made mistakes? Get instant explanation of where you went wrong.</p>
        
        <p><strong>Learning paths.</strong> Want to learn web development? AI creates a personalized curriculum based on your current knowledge, available time, and goals. It breaks complex skills into manageable steps.</p>
        
        <p><strong>Language learning.</strong> Practice conversation with AI in any language. Get immediate corrections. Have it explain grammar concepts. Generate vocabulary lists for specific topics. All without fear of judgment.</p>
        
        <p><strong>Essay feedback.</strong> Write a draft, ask AI to critique argument structure, identify weak points, suggest improvements. It's like having an editor review every practice essay.</p>
        
        <p><strong>Research assistance.</strong> AI summarizes academic papers, explains complex research, suggests related sources, and helps synthesize information across multiple studies.</p>
        
        <p>But AI tutors have limitations. They can be confidently wrong, providing plausible-sounding but inaccurate information. They lack the human insight to know what you'll find motivating or where you might have deeper misunderstandings. They can't inspire passion for subjects or provide mentorship beyond knowledge transfer.</p>
        
        <p>The most effective learning combines AI and human elements. Use AI for immediate help, practice, and explanation. Seek human teachers for motivation, complex feedback, contextual understanding, and navigating the learning journey.</p>
        
        <p>For subjects where you previously had no access to tutoring, AI is transformative. For standardized test prep, skill-building, and self-directed learning, it dramatically levels the playing field.</p>
        
        <p>The future of education isn't "AI replacing teachers." It's teachers freed from repetitive explanation to focus on mentorship, with every student having AI support for practice and immediate help.</p>
      `,
      handsOn: {
        title: "Learn Something New with AI Tutoring",
        description: "Experience personalized, adaptive learning assistance.",
        affiliateLinks: [
          {
            text: "Try Khan Academy's Khanmigo →",
            url: "https://www.khanacademy.org/khan-labs"
          }
        ],
        exercise: `Choose a topic you've always wanted to understand but found confusing. Try these AI learning techniques:

Step 1 - Assess Current Knowledge:
Tell ChatGPT: "I want to learn [topic]. Ask me 5 questions to assess my current understanding, then create a learning plan."

Step 2 - Adaptive Explanation:
"Explain [concept] at my level. If I say I'm confused, re-explain using different analogies or simpler language."

Step 3 - Active Practice:
"Generate 5 practice problems about [topic], starting easy and increasing difficulty. After I attempt each, explain the correct answer."

Step 4 - Test Understanding:
"Quiz me on [topic] with 10 questions. For each wrong answer, explain why it's wrong and what the correct reasoning is."

Step 5 - Apply Knowledge:
"Give me a real-world scenario where I'd use [topic], and walk me through applying what I learned."

This is personalized education at scale.

Try These Variations:
• Learn basic phrases in a new language
• Understand a scientific concept you've wondered about
• Master a specific Excel function or coding concept
• Study for a certification exam with AI-generated practice tests
• Have AI explain current events in depth with historical context`
      }
    };
  }
  
  if (day >= 18 && day <= 22) {
    const dayContent: Record<number, {title: string, subtitle: string, content: string, handsOn: any}> = {
      18: {
        title: "AI for Data Analysis",
        subtitle: "Making Sense of Numbers Without Being a Statistician",
        content: `
          <p>Spreadsheets full of data but no idea what they mean? AI bridges the gap between raw numbers and actionable insights — no statistics degree required.</p>
          
          <p>Traditional data analysis required knowing Excel formulas, statistical methods, SQL queries, or specialized software. Most people with questions about their data couldn't answer them without hiring an analyst.</p>
          
          <p>AI changes this fundamentally. Upload your spreadsheet and ask questions in plain English: "Which product category generates the most revenue?" "What's the trend in customer complaints?" "Who are our top 10 customers by lifetime value?" AI runs the analysis and explains findings clearly.</p>
          
          <p>This democratizes data literacy. Small business owners understand their financials. Managers spot trends without waiting for reports. Individuals analyze personal data — fitness, spending, habits — to make informed decisions.</p>
          
          <p>Here's what AI data analysis typically handles:</p>
          
          <p><strong>Descriptive analysis</strong> — What happened? Summarize data, calculate averages, identify patterns, visualize distributions.</p>
          
          <p><strong>Diagnostic analysis</strong> — Why did it happen? Find correlations, identify outliers, explain anomalies.</p>
          
          <p><strong>Predictive analysis</strong> — What will happen? Forecast trends based on historical data, estimate future values.</p>
          
          <p><strong>Prescriptive analysis</strong> — What should I do? Suggest actions based on data insights, recommend optimizations.</p>
          
          <p>AI also visualizes data automatically. Instead of manually creating charts, describe what you want: "Show monthly sales trends for each product line." AI generates appropriate visualizations instantly.</p>
          
          <p>But AI data analysis has important limitations. It can misinterpret context, miss domain-specific nuances, or find meaningless correlations. The classic example: ice cream sales correlate with drowning deaths. AI might flag this relationship, but the real factor is summer weather increasing both. Human judgment remains essential.</p>
          
          <p>For critical business decisions, AI analysis should be a starting point, not the final answer. Verify findings, consider context AI might miss, and consult domain experts when stakes are high.</p>
          
          <p>That said, AI dramatically lowers barriers to data-informed decision making. Questions that once required hiring analysts now take minutes. Data that sat unused becomes actionable intelligence.</p>
        `,
        handsOn: {
          title: "Analyze Your Own Data",
          description: "Turn spreadsheets into insights using AI.",
          affiliateLinks: [
            {
              text: "Try ChatGPT with Data Analysis →",
              url: "https://chat.openai.com"
            }
          ],
          exercise: `If you have ChatGPT Plus, you can upload files. Try this:

Step 1 - Create Sample Data:
Create a simple spreadsheet with columns: Date, Product, Sales, Region
Add 20-30 rows of fake sales data

Step 2 - Upload and Analyze:
Upload to ChatGPT and ask:
• "What's the total sales by product?"
• "Which region has the highest average sale?"
• "Show me sales trends over time"
• "Identify any unusual patterns"
• "Create a visualization of sales by region"

Step 3 - Complex Questions:
• "Which product-region combination is most profitable?"
• "Predict next month's sales based on current trends"
• "What recommendations do you have to increase sales?"

The AI handles all calculations, creates charts, and explains findings in plain English.

Try These Variations:
• Analyze your personal spending from bank statements
• Track fitness data and ask for insights
• Examine website analytics or social media metrics
• Evaluate project timelines and identify bottlenecks
• Compare options using data-driven analysis`
        }
      },
      19: {
        title: "The Future of AI",
        subtitle: "What's Coming Next",
        content: `
          <p>AI development isn't slowing down — it's accelerating. What seems cutting-edge today will feel primitive in five years. Understanding likely trajectories helps you prepare rather than react.</p>
          
          <p>Here are high-confidence predictions about the next 3-5 years:</p>
          
          <p><strong>Multimodal AI becomes standard.</strong> Systems that seamlessly combine text, images, audio, and video. You'll describe an idea verbally, AI generates relevant images and text, you refine through conversation. This fluid interaction across mediums changes creative workflows fundamentally.</p>
          
          <p><strong>Personalized AI assistants.</strong> Not generic chatbots, but AI that knows your preferences, work style, communication patterns, and goals. It anticipates needs, maintains context across conversations, and adapts to how you think. Think JARVIS from Iron Man, but real.</p>
          
          <p><strong>AI in physical robotics.</strong> Current AI is mostly digital. Connecting advanced AI to physical robots enables real-world automation at scale: warehouse management, elderly care, home assistance, dangerous jobs. The gap between AI thinking and AI doing shrinks dramatically.</p>
          
          <p><strong>Real-time translation everywhere.</strong> Conversations across languages become effortless. You speak English, they hear fluent Japanese in your voice. Video content auto-translates with lip-sync. Language barriers essentially disappear.</p>
          
          <p><strong>AI-generated entertainment.</strong> Personalized movies, games that adapt to your choices in real-time, interactive books where you control the story. Entertainment becomes less about consuming pre-made content and more about co-creation with AI.</p>
          
          <p><strong>Medical AI advances.</strong> Early disease detection through analysis of medical imaging, personalized treatment plans, drug discovery acceleration, continuous health monitoring through wearables. Healthcare becomes more predictive than reactive.</p>
          
          <p>But progress brings challenges:</p>
          
          <p><strong>Job displacement.</strong> Some roles will become obsolete. Reskilling at scale becomes urgent. Social safety nets need updating.</p>
          
          <p><strong>Misinformation amplification.</strong> AI-generated fake news, personalized propaganda, deepfakes in real-time. Truth verification becomes harder.</p>
          
          <p><strong>Privacy erosion.</strong> AI requires data. Balancing utility with privacy remains contentious.</p>
          
          <p><strong>Concentration of power.</strong> AI development is expensive. A few companies controlling advanced AI raises monopoly concerns.</p>
          
          <p><strong>Existential questions.</strong> As AI capabilities approach human-level intelligence in more domains, questions about consciousness, rights, and control become more than philosophical.</p>
          
          <p>The trajectory isn't predetermined. How we develop, regulate, and deploy AI shapes outcomes. Engaged citizens, thoughtful policymakers, and ethical developers matter enormously.</p>
          
          <p>One thing is certain: AI will be more integrated into daily life, more capable, and more invisible. The question isn't whether to engage with AI, but how to do so thoughtfully.</p>
        `,
        handsOn: {
          title: "Envision Your AI-Augmented Future",
          description: "Think critically about coming changes and how to prepare.",
          affiliateLinks: [
            {
              text: "Explore AI Trends →",
              url: "https://www.deeplearning.ai"
            }
          ],
          exercise: `Reflection Exercise - Answer These Questions:

1. In your job/industry, which tasks will likely be AI-automated in 5 years?
2. What human skills become MORE valuable as AI handles routine work?
3. What would you do with 10 extra hours per week if AI handled your busywork?
4. What ethical concerns about AI matter most to you?
5. What AI capability would improve your life most?

Discussion Prompts for ChatGPT:
• "How might AI change [your profession] in the next decade?"
• "What skills should I develop to remain valuable as AI improves?"
• "What are the biggest risks of AI development?"
• "How can individuals influence responsible AI development?"

Write Your AI Action Plan:
1. One AI tool to master this month
2. One skill to develop that AI can't replicate
3. One way to stay informed about AI developments
4. One ethical principle you'll prioritize in AI use

Try These Variations:
• Research AI developments in your specific industry
• Follow AI researchers and ethicists on social media
• Join AI communities or forums focused on your interests
• Experiment with emerging AI tools before they're mainstream`
        }
      },
      20: {
        title: "Building Your AI Workflow",
        subtitle: "Integrating AI Into Your Daily Routine",
        content: `
          <p>Knowing about AI tools is one thing. Actually using them consistently to improve your life? That requires intentional workflow design.</p>
          
          <p>Most people try AI once or twice, get impressed, then revert to old habits. The difference between casual experimenters and power users isn't technical skill — it's systematically integrating AI into existing workflows.</p>
          
          <p>Here's a framework for building your personal AI workflow:</p>
          
          <p><strong>Step 1: Audit Your Time</strong><br/>
          Track how you spend time for one week. Identify recurring tasks that feel tedious. These are your AI automation candidates. Common examples: email management, research, content creation, data analysis, scheduling, learning.</p>
          
          <p><strong>Step 2: Match Tasks to AI Tools</strong><br/>
          For each repetitive task, identify which AI tool handles it best. Email sorting? AI-powered inbox tools. Writing? ChatGPT or similar. Image needs? DALL-E or Midjourney. Don't force one tool for everything — use specialized solutions.</p>
          
          <p><strong>Step 3: Create Templates</strong><br/>
          For tasks you do regularly, create prompt templates. Save them somewhere accessible. Example: "Summarize this meeting transcript into: 1) Decisions made, 2) Action items with owners, 3) Open questions." Having templates ready eliminates friction.</p>
          
          <p><strong>Step 4: Establish Triggers</strong><br/>
          Link AI use to specific moments. "When I receive a long email, I paste it into AI for a summary." "Before writing any first draft, I brainstorm with AI." "When I'm stuck, I ask AI to suggest three different approaches." Triggers build habits.</p>
          
          <p><strong>Step 5: Measure and Iterate</strong><br/>
          Track time saved. Note what works and what doesn't. Adjust your workflow based on results. Some AI applications will be transformative. Others won't stick. That's fine — keep what works, drop what doesn't.</p>
          
          <p>A realistic daily AI workflow might look like:</p>
          
          <p><strong>Morning:</strong> AI summarizes overnight emails and news. Suggests priority tasks based on calendar and project deadlines.</p>
          
          <p><strong>During work:</strong> AI drafts routine communications. Provides research summaries. Generates first-draft content. Analyzes data. Transcribes meetings.</p>
          
          <p><strong>Evening:</strong> AI helps plan next day. Suggests learning resources for skill development. Answers questions about topics you're curious about.</p>
          
          <p>The key is starting small. Don't try to AI-ify everything at once. Pick one task. Master that integration. Then add another. Build gradually.</p>
          
          <p>Also important: know when NOT to use AI. Personal messages, sensitive communications, creative strategic thinking, relationship building — these often benefit from the friction of doing them manually. AI is a tool, not a mandate.</p>
          
          <p>Your AI workflow should feel natural, not forced. It should save time on things you don't enjoy so you have more time for things you do. That's the entire point.</p>
        `,
        handsOn: {
          title: "Design Your Personal AI System",
          description: "Create a practical, sustainable AI workflow.",
          affiliateLinks: [
            {
              text: "Get Started with ChatGPT →",
              url: "https://chat.openai.com"
            }
          ],
          exercise: `Create Your AI Integration Plan:

Part 1 - Identify Opportunities:
List 10 recurring tasks in your work or personal life
Rate each by: Time spent, Enjoyment (1-10), AI suitability
Pick the 3 with lowest enjoyment + highest time + best AI fit

Part 2 - Design Workflows:
For each task, write:
• Current process (how you do it now)
• AI-enhanced process (how AI could help)
• Specific prompts or tools needed
• Trigger that reminds you to use AI
• Success metric (how you'll know it's working)

Part 3 - Create Your Prompt Library:
Write 5-10 reusable prompts for your common tasks
Save them in a note or document
Examples:
• "Summarize this [document type] focusing on..."
• "Draft an email responding to [situation] with tone..."
• "Analyze this data and tell me..."

Part 4 - 30-Day Integration Challenge:
Week 1: Use AI for Task #1 every day
Week 2: Add Task #2 while continuing #1
Week 3: Add Task #3
Week 4: Evaluate, refine, make it permanent

Try These Variations:
• Set up AI browser extensions for quick access
• Create shortcuts or keyboard macros for frequent AI prompts
• Schedule weekly "AI exploration" time to try new tools
• Join AI communities to learn others' workflows`
        }
      },
      21: {
        title: "AI and Creativity",
        subtitle: "Augmenting, Not Replacing, Human Imagination",
        content: `
          <p>The "AI will kill creativity" narrative misunderstands both AI and creativity. AI doesn't replace human creativity — it removes technical barriers that previously blocked creative expression.</p>
          
          <p>Consider music production. Traditionally, turning your musical idea into a polished recording required knowing music theory, playing instruments, understanding production software, and owning expensive equipment. These barriers meant most people with musical ideas never expressed them.</p>
          
          <p>AI removes those barriers. Hum a melody, and AI generates a full arrangement. Describe the mood you want, and AI creates background music. You don't need to know music theory anymore — you need to know what you want to create. That's a fundamentally different (and more democratic) form of creativity.</p>
          
          <p>This pattern repeats across creative domains:</p>
          
          <p><strong>Visual art:</strong> You don't need drawing skills to visualize ideas. Describe what you imagine, AI renders it. This doesn't make traditional artists obsolete — it empowers people who couldn't previously create visual content.</p>
          
          <p><strong>Writing:</strong> AI doesn't replace storytelling. It helps with structure, word choice, pacing. It's having an always-available editor who helps you express ideas more clearly. The ideas still come from you.</p>
          
          <p><strong>Design:</strong> Need a logo but can't afford a designer? AI generates options. They won't be as nuanced as professional work, but they're dramatically better than nothing.</p>
          
          <p><strong>Video:</strong> AI helps with editing, generates b-roll, creates animations, adds effects. The creative vision remains human; AI handles technical execution.</p>
          
          <p>Professional creatives increasingly use AI, not because they lack skill, but because it amplifies productivity. A designer generates 50 concepts in an hour instead of 5. A writer produces cleaner first drafts. A musician experiments with arrangements instantly. More iteration means better final products.</p>
          
          <p>But here's what AI can't do: it can't create with authentic emotion, lived experience, or unique perspective. It remixes patterns from training data. It doesn't have the messy, contradictory human experiences that fuel meaningful art. It can produce technically correct work, but not necessarily moving work.</p>
          
          <p>The most interesting creative work emerges from human-AI collaboration: humans providing vision, taste, emotion, and judgment; AI providing technical execution, variation generation, and rapid iteration. Together they reach places neither could alone.</p>
          
          <p>One caution: relying too heavily on AI default outputs creates homogenization. If everyone uses the same AI tools with similar prompts, outputs become samey. Distinctive creative work requires pushing beyond AI defaults, using it as a starting point, not an endpoint.</p>
          
          <p>The future of creativity isn't "humans OR machines." It's humans WITH machines, each doing what they do best. Technical skill becomes less important. Creative vision, taste, and unique perspective become MORE important. That's exciting if you've had creative ideas but lacked technical skills to execute them.</p>
        `,
        handsOn: {
          title: "Create Something You Couldn't Before",
          description: "Use AI to bring a creative vision to life.",
          affiliateLinks: [
            {
              text: "Try Bing Image Creator →",
              url: "https://www.bing.com/images/create"
            }
          ],
          exercise: `Create a Multi-Media Project Using Only AI Tools:

Project: Design a Fictional Product
1. Concept (ChatGPT): "Help me brainstorm a unique product idea combining [interest 1] and [interest 2]. Generate 5 concepts."
2. Visual Identity (Bing Image Creator): "Create a logo for [product name] that feels [adjective], using [colors]"
3. Product Mockup (Bing Image Creator): "Generate a photorealistic product image of [description]"
4. Marketing Copy (ChatGPT): "Write a compelling product description for [product] targeting [audience]"
5. Tagline (ChatGPT): "Generate 10 catchy taglines for [product] that emphasize [benefit]"
6. Social Posts (ChatGPT): "Write 5 social media posts announcing [product] in different styles"

You just created a complete product concept, visual identity, and marketing campaign — all using AI, no special skills required.

Try These Variations:
• Create a children's book (story + illustrations)
• Design a personal brand (logo, color scheme, messaging)
• Write and illustrate a comic strip
• Produce a podcast episode (script, music, show notes)
• Design a room renovation (mood board, furniture suggestions, color schemes)

The point? You can now execute creative ideas that previously required expensive specialized skills.`
        }
      },
      22: {
        title: "AI Safety and Security",
        subtitle: "Protecting Yourself in an AI World",
        content: `
          <p>As AI becomes ubiquitous, new security concerns emerge. Protecting yourself requires understanding both AI-enabled threats and AI-powered defenses.</p>
          
          <p><strong>AI-Powered Social Engineering</strong><br/>
          Scammers use AI to create highly personalized phishing attempts. They analyze your social media, generate messages that mimic your contacts' writing style, and create urgency. The old "Nigerian prince" emails are gone. New attacks are sophisticated and targeted.</p>
          
          <p>Defense: Verify unusual requests through independent channels. If your "boss" emails requesting urgent wire transfer, call them. If a "friend" texts needing money, contact them directly. AI makes messages convincing, but it can't access real-world verification channels.</p>
          
          <p><strong>Voice Cloning Scams</strong><br/>
          AI can clone voices from short audio samples. Scammers call elderly parents claiming to be their child in distress. The voice sounds authentic. The panic feels real. They send money to "help."</p>
          
          <p>Defense: Establish family code words. Agree on a phrase only real family members know. In emergencies, ask for the code word. AI can mimic voices, but it can't know your private information.</p>
          
          <p><strong>Deepfake Impersonation</strong><br/>
          Fake videos of public figures, manipulated video calls that impersonate colleagues, altered recordings used as "evidence." Seeing and hearing are no longer reliable proof.</p>
          
          <p>Defense: Verify through multiple channels. Cross-reference with trusted news sources. Check official accounts. Be skeptical of content designed to provoke strong emotional reactions. When stakes are high, demand in-person or live verification.</p>
          
          <p><strong>AI-Enhanced Data Breaches</strong><br/>
          AI helps attackers find vulnerabilities, automate attacks, and process stolen data faster. Personal information leaks become more dangerous because AI can synthesize data from multiple breaches to build detailed profiles.</p>
          
          <p>Defense: Use unique passwords for each service (password managers help). Enable two-factor authentication everywhere. Regularly review account activity. Limit personal information shared publicly. Assume your data will eventually leak and plan accordingly.</p>
          
          <p><strong>Privacy Erosion</strong><br/>
          AI analysis of public data reveals information you never intended to share. Photos reveal location patterns. Posts reveal relationships, health conditions, financial status. AI connects dots humans couldn't.</p>
          
          <p>Defense: Audit your digital footprint. Search yourself. Check privacy settings. Think twice before posting. Remember: publicly available doesn't mean you want it analyzed at scale.</p>
          
          <p><strong>AI-Generated Misinformation</strong><br/>
          Convincing fake articles, manufactured "evidence," synthetic consensus through bot accounts. Information warfare becomes easier and more effective.</p>
          
          <p>Defense: Check sources. Look for corroboration. Be skeptical of content that perfectly confirms your biases. Slow down before sharing. Media literacy matters more than ever.</p>
          
          <p>The paradox? AI creates these threats AND provides defenses. AI detects deepfakes, identifies scams, flags unusual account activity, and verifies identities. It's an arms race.</p>
          
          <p>Your best defense: awareness, skepticism, and verification habits. AI makes deception easier, but it can't bypass thoughtful critical thinking.</p>
        `,
        handsOn: {
          title: "Conduct an AI Security Audit",
          description: "Identify and address your AI-era vulnerabilities.",
          affiliateLinks: [
            {
              text: "Test Your Passwords →",
              url: "https://haveibeenpwned.com"
            }
          ],
          exercise: `Personal Security Audit:

Part 1 - Digital Footprint:
• Google yourself - what information is public?
• Check your social media privacy settings
• Review what apps have access to your data
• Search your email in HaveIBeenPwned.com

Part 2 - Authentication Check:
• List all important accounts
• Enable 2FA on each (banking, email, social media)
• Ensure unique passwords using a password manager
• Set up account activity alerts

Part 3 - Family Security Protocol:
• Establish code words for emergency verification
• Discuss voice cloning scams with older relatives
• Agree on verification procedures for unusual requests
• Share what deepfakes are and how to spot them

Part 4 - Critical Thinking Practice:
Ask ChatGPT to:
• "Generate a convincing phishing email for [your role]"
• "Write a fake news article about [topic]"
• "Create a social engineering script targeting [scenario]"

Seeing how easily AI creates convincing fakes helps you recognize them.

Try These Variations:
• Review and strengthen your security questions
• Clean up old accounts you no longer use
• Check what data brokers have on you
• Practice verifying suspicious messages with family
• Subscribe to security newsletters to stay informed`
        }
      }
    };
    
    return {
      day,
      ...dayContent[day]
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
