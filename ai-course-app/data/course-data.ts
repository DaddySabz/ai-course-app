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

export const courseData: CourseModule[] = [
  // DAY 1: ChatGPT
  {
    day: 1,
    title: "The AI Revolution",
    subtitle: "Why This Time Is Different",
    content: `
      <p>For most people, "Artificial Intelligence" sounds like a futuristic invention—something from sci-fi movies, robot uprisings, or sleek machines talking in perfect monotone. But the truth is far more interesting: <strong>AI has quietly been woven into your everyday life for years.</strong></p>

      <p>Think about your last 24 hours.</p>

      <ul>
        <li>Did you open Netflix and instantly find something you actually wanted to watch?</li>
        <li>Did Google Maps alert you about traffic before you saw a single brake light?</li>
        <li>Did your phone magically brighten your photos, blur the background, or remove noise?</li>
        <li>Did your bank automatically flag a suspicious transaction?</li>
      </ul>

      <p>None of that was luck. That was <strong>Narrow AI</strong>—systems designed to do <em>one specific thing</em> incredibly well. They are specialists. A chess AI can beat the world champion at chess, but it can't drive a car or write a poem.</p>

      <p>But what we are talking about today—and what you will master over the next 30 days—is different. It’s the shift from <strong>Narrow AI</strong> (tools that <em>do</em> things for you) to <strong>Generative AI</strong> (tools that <em>create</em> things with you).</p>

      <h3>The "iPhone Moment" for Intelligence</h3>

      <p>When ChatGPT launched in late 2022, it wasn't just another tech update. It was a platform shift. For the first time in history, we taught computers to speak <em>our</em> language, rather than forcing humans to learn <em>their</em> language (code).</p>

      <p>This is why this course exists. You don't need a Computer Science degree to use these tools. You just need to know how to ask.</p>

      <h3>The 3 Stages of AI Adoption</h3>

      <p>As you start this journey, you will likely go through three emotional stages. I want to warn you about them now so you don't get stuck.</p>

      <ol>
        <li><strong>The Magic Trick (Days 1-3):</strong> You'll be blown away. "It wrote a poem! It planned my trip!" You'll feel like a wizard.</li>
        <li><strong>The Trough of Disillusionment (Days 4-10):</strong> You'll hit a wall. It will give you a wrong answer. It will hallucinate. You'll think, "This thing is stupid, I could do it faster myself." <em>Most people quit here.</em></li>
        <li><strong>The Fluency (Days 11+):</strong> You learn <em>when</em> to use it and <em>how</em> to fix it. You stop treating it like a magic wand and start treating it like a junior intern. This is where the real productivity happens.</li>
      </ol>


      <h3>A Brief History of "Thinking Machines"</h3>

      <p>To understand where we are, we have to look back. This isn't the first time we've been promised thinking machines.</p>

      <ul>
        <li><strong>1950: The Turing Test.</strong> Alan Turing asks, "Can machines think?" and proposes a test: if a human can't tell they are talking to a machine, the machine is intelligent.</li>
        <li><strong>1997: Deep Blue.</strong> IBM's supercomputer beats Garry Kasparov at chess. It was "smart," but it was brute force. It calculated millions of moves per second. It didn't "know" chess; it just did math.</li>
        <li><strong>2016: AlphaGo.</strong> Google's AI beat the world champion at Go, a game with more possible moves than atoms in the universe. This was different. It showed "intuition."</li>
        <li><strong>2017: The Transformer.</strong> Google researchers published a paper called "Attention Is All You Need." This invented the architecture that runs ChatGPT (the "T" in GPT stands for Transformer).</li>
      </ul>

      <p>We are now in the age of <strong>Generative Pre-trained Transformers (GPT)</strong>. They have read the entire internet, and they are learning to speak.</p>

      <h3>The Elephant in the Room: Will I Be Replaced?</h3>

      <p>Let's address the fear. You see headlines about AI taking jobs. You see writers striking. You worry about your own career.</p>

      <p>Here is the reality: <strong>AI will not replace you. A person using AI will replace you.</strong></p>

      <p>The lawyers who refused to use email in the 90s didn't lose their jobs to email; they lost their jobs to lawyers who could communicate faster. The designers who refused to use Photoshop didn't lose their jobs to software; they lost them to designers who could iterate 10x faster.</p>

      <p>You are here to be that person. You are here to be the pilot, not the passenger.</p>

      <h3>The Golden Rule: The "Intern" Mindset</h3>

      <p>Here is the single most important mental model for this entire course:</p>

      <p><strong>Treat AI like a smart, eager, but inexperienced intern.</strong></p>

      <p>If you had an intern on their first day, would you say: "Write a report"?</p>
      <p>No. They would panic. They would write a terrible report. They don't know the format, the tone, or the data.</p>

      <p>Instead, you would say:</p>
      <blockquote>"Act as a marketing analyst. I need a 1-page summary of these 3 PDF documents. Focus on the financial risks. Use bullet points. Don't use jargon."</blockquote>

      <p>See the difference? You gave them a <strong>Role</strong>, a <strong>Task</strong>, and a <strong>Format</strong>. This is the secret to Prompt Engineering.</p>

      <h3>Your First Framework: R-T-F</h3>

      <p>Whenever you talk to ChatGPT (or any AI), use the <strong>R-T-F Framework</strong>:</p>

      <ul>
        <li><strong>R - Role:</strong> Who should the AI be? (e.g., "Expert Copywriter", "Python Tutor", "Travel Agent")</li>
        <li><strong>T - Task:</strong> What exactly do you want it to do? (Use an active verb: "Draft", "Summarize", "Debug")</li>
        <li><strong>F - Format:</strong> How do you want the output? (e.g., "Table", "Bullet points", "Code block", "Email")</li>
      </ul>

      <p>If you skip one of these, you get average results. If you nail all three, you get magic.</p>
    `,
    handsOn: {
      title: "The 'Pep Talk' Prompt",
      description: "Your first lesson in Prompt Engineering.",
      affiliateLinks: [
        {
          text: "Try ChatGPT →",
          url: "https://chat.openai.com"
        }
      ],
      exercise: `1. Go to ChatGPT and sign up.
2. Type this exact prompt (don't just say "hi"):

"I am starting a 30-day challenge to master AI. Act as my high-energy coach. Give me a 3-sentence pep talk about why this skill will change my career, and then give me a fun, random nickname to use for this journey."

3. Hit Enter.

<strong>Why this prompt?</strong>
You didn't just ask for information. You used the <strong>R-T-F Framework</strong>:
- <strong>Role:</strong> "High-energy coach" (Sets the tone)
- <strong>Task:</strong> "Give me a pep talk" (The action)
- <strong>Format:</strong> "3 sentences + nickname" (The constraint)

Notice how the tone changes? That is your first lesson in Prompt Engineering.`
    }
  },

  // DAY 2: Claude
  {
    day: 2,
    title: "The Writer's Room",
    subtitle: "Meeting Claude, The Hemingway of AI",
    content: `
      <p>Yesterday, you met ChatGPT. It’s fast, it’s smart, and it’s enthusiastic. But if you’ve used it for writing, you’ve probably noticed something annoying.</p>

      <p>It sounds like... a robot.</p>

      <p>It loves words like "delve," "tapestry," "landscape," and "testament." It uses exclamation marks like a caffeinated cheerleader. If you ask it to write an email, it sounds like a corporate press release from 1995.</p>

      <p>Today, I want to introduce you to the specialist: <strong>Claude</strong>.</p>

      <h3>The "Golden Retriever" vs. "The Professor"</h3>

      <p>If ChatGPT is a Golden Retriever (eager to please, runs fast, sometimes knocks over a lamp), <strong>Claude is a Professor of Literature</strong>.</p>

      <p>Built by a company called Anthropic (founded by former OpenAI safety researchers), Claude is designed with a different philosophy: <strong>Constitutional AI</strong>. It prioritizes nuance, safety, and—most importantly for us—<strong>natural, human-sounding writing</strong>.</p>

      <p>Here is the difference:</p>

      <ul>
        <li><strong>ChatGPT:</strong> "I am thrilled to announce that we are embarking on a journey to revolutionize the digital landscape!" (Hype)</li>
        <li><strong>Claude:</strong> "We're starting a new project to change how we work online." (Clarity)</li>
      </ul>

      <p>For the next 30 days, this is your new rule: <strong>Use ChatGPT for logic and code. Use Claude for writing and reading.</strong></p>


      <h3>When NOT to Use Claude</h3>

      <p>I love Claude, but I don't use it for everything. It has weaknesses.</p>

      <ul>
        <li><strong>Math:</strong> If you ask it to calculate a mortgage payment, it might get it right, or it might be off by $50. Use ChatGPT (with Python) or a calculator for hard math.</li>
        <li><strong>Live Data:</strong> As of this writing, Claude doesn't browse the live web as well as Google Gemini or Perplexity. If you need today's stock price, don't ask Claude.</li>
        <li><strong>Strict Logic:</strong> For complex coding logic where one wrong character breaks the app, ChatGPT (GPT-4) or DeepSeek are often slightly sharper.</li>
      </ul>

      <p>Claude is for <strong>Words, Ideas, and Synthesis</strong>.</p>

      <h3>The "Tone Slider" Technique</h3>

      <p>One of the best ways to control Claude is to give it a "slider." Instead of just saying "write a blog post," try this:</p>

      <blockquote>"Write a blog post about remote work.
      Tone settings:
      - Professionalism: 7/10
      - Humor: 4/10
      - Empathy: 9/10"</blockquote>

      <p>This gives the model exact coordinates for the style you want. If it comes back too stiff, you just say: "Lower Professionalism to 4/10 and raise Humor to 8/10."</p>

      <p>It’s like mixing audio. You are the DJ, and Claude is the sound system.</p>

      <h3>Superpower #1: The Massive Context Window</h3>

      <p>The biggest reason to use Claude isn't just the style—it's the <strong>Memory</strong>.</p>

      <p>In AI terms, "Context Window" is how much information the model can hold in its head at one time.</p>
      <br />
      <ul>
        <li><strong>ChatGPT (Free):</strong> Gets overwhelmed after a long conversation. It forgets what you said 10 minutes ago. It has a "backpack" of memory.</li>
        <li><strong>Claude:</strong> Has a "moving truck" of memory. You can upload an entire book, a 50-page legal contract, or a transcript of a 2-hour meeting.</li>
      </ul>

      <p><strong>Try this mental shift:</strong> Don't just ask Claude questions. <em>Give it homework.</em> Upload a PDF and say, "Read this and tell me the 3 biggest risks." It actually reads the whole thing.</p>

      <h3>Superpower #2: "Artifacts"</h3>

      <p>Claude has a feature called <strong>Artifacts</strong> that changes the UI entirely. When you ask it to "Write code for a website" or "Create a dashboard," it doesn't just give you text.</p>

      <p>It opens a side window and <strong>renders the code live</strong>. You can see the website, the chart, or the diagram right there. You don't need to be a coder to see the result. It’s like having a developer sitting next to you, sketching on a whiteboard.</p>

      <h3>The "Vibe Check"</h3>

      <p>You'll notice immediately that Claude "feels" calmer. It doesn't lecture you. It doesn't moralize as much. It just... writes.</p>

      <p>For writers, marketers, and anyone communicating professionally, this is gold. You spend less time editing out the "AI flavor" because Claude writes with a more natural cadence from the start.</p>

      <h3>The "Editor" Workflow</h3>

      <p>Don't just treat Claude as a writer. Treat it as an <strong>Editor</strong>. Here is a workflow used by professional copywriters:</p>

      <ol>
        <li><strong>Brainstorm:</strong> Ask ChatGPT for 10 ideas (it's better at volume).</li>
        <li><strong>Draft:</strong> Write a messy first draft yourself (or have ChatGPT do it).</li>
        <li><strong>Refine:</strong> Paste that draft into Claude and say: "Act as a senior editor. Critique this piece for clarity and tone. Then, rewrite it to be punchier."</li>
      </ol>

      <p>This "Sandwich Method" (AI -> Human -> AI) usually produces the best results.</p>

      <blockquote>
        <strong>Pro Tip:</strong> If you want Claude to sound exactly like you, upload 3 examples of your previous emails and say: "Analyze my writing style (tone, sentence length, vocabulary). Then, write this new email using that exact style."
      </blockquote>

      <p>It is frighteningly good at mimicry. Use it wisely.</p>
    `,
    handsOn: {
      title: "The Tone Transformation",
      description: "See the difference between a robot and a writer.",
      affiliateLinks: [
        {
          text: "Try Claude (Anthropic) →",
          url: "https://claude.ai"
        }
      ],
      exercise: `1. Find a "Corporate Speak" paragraph. Maybe a mission statement or a boring email.
2. Open ChatGPT and ask: "Rewrite this to be punchy." (Notice it probably adds buzzwords).
3. Open Claude and ask: "Rewrite this to be punchy, conversational, and human. Remove all jargon."

Compare the two. Which one would you actually send to a human?`
    }
  },

  // DAY 3: Gemini
  {
    day: 3,
    title: "The Researcher",
    subtitle: "Gemini and the Live Web",
    content: `
      <p>The biggest limitation of early AI models was that they were "frozen in time." They only knew what they learned during training. Ask them about today's weather, and they'd hallucinate or apologize.</p>

      <p>Enter <strong>Google Gemini</strong>.</p>

      <p>Gemini is Google's answer to AI. Its superpower? It is plugged directly into the Google Search engine. It doesn't just "remember" facts; it can go look them up right now.</p>

      <h3>The Multimodal Mind</h3>

      <p>Gemini is also "Multimodal." That’s a fancy word meaning it understands more than just text. It can see images, watch videos, and listen to audio natively.</p>

      <p>Imagine you are shopping for a new chair.</p>
      <br />
      <p><strong>Old way:</strong> Search "mid-century modern chair," scroll through 50 links, compare prices in tabs.</p>
      <p><strong>Gemini way:</strong> Upload a photo of your living room and ask, "Find me a chair that matches this rug, costs under $200, and is available near me."</p>

      <p>This is the shift from <strong>Searching</strong> to <strong>Finding</strong>.</p>
    `,
    handsOn: {
      title: "The Live Planner",
      description: "Plan a trip using real-time data.",
      affiliateLinks: [
        {
          text: "Try Google Gemini →",
          url: "https://gemini.google.com"
        }
      ],
      exercise: `1. Go to Gemini.
2. Give it a prompt that requires live data:

"I want to fly from [Your City] to [Dream Destination] next month for a 3-day weekend. Find me the cheapest flights, a highly-rated hotel under $150/night, and list 3 events happening in that city during those dates."

3. Watch it pull real flight prices and real events. Try doing that with a standard chatbot!`
    }
  },

  // DAY 4: Perplexity
  {
    day: 4,
    title: "The Truth Engine",
    subtitle: "Perplexity and the End of Googling",
    content: `
      <p>We've all heard the horror stories: AI making up court cases, inventing historical facts, or lying about medical advice. These are called "Hallucinations."</p>

      <p>If you need <strong>facts</strong>, you need <strong>Perplexity</strong>.</p>

      <p>Perplexity isn't just a chatbot; it's an "Answer Engine." When you ask it a question, it doesn't just guess the next word. It:</p>
      <ol>
        <li>Reads your question.</li>
        <li>Searches the web for dozens of credible sources.</li>
        <li>Reads those sources.</li>
        <li>Synthesizes an answer for you.</li>
        <li><strong>Cites its sources</strong> with little footnotes.</li>
      </ol>

      <h3>Trust, but Verify</h3>

      <p>The citation is key. In the professional world, you can't just say "AI told me." You need to say "According to the New York Times..." Perplexity gives you that trail of evidence instantly.</p>

      <p>It is the ultimate tool for students, researchers, and anyone who needs to be <em>right</em>.</p>
    `,
    handsOn: {
      title: "The Fact Checker",
      description: "Debunk a myth or find a specific obscure fact.",
      affiliateLinks: [
        {
          text: "Try Perplexity →",
          url: "https://www.perplexity.ai"
        }
      ],
      exercise: `1. Think of a topic you are curious about but don't know the details of (e.g., "What is the actual health impact of blue light glasses?").
2. Ask Perplexity.
3. Look at the answer. Click the little numbers [1][2] to see the actual articles it read.
4. Ask a follow-up: "Are there any studies that disagree?"`
    }
  },

  // DAY 5: DeepSeek
  {
    day: 5,
    title: "The Logic Engine",
    subtitle: "DeepSeek and the Power of Reasoning",
    content: `
      <p>So far, we've looked at generalists. Now let's look at a specialist in <strong>Logic</strong>.</p>

      <p><strong>DeepSeek</strong> (specifically their "Coder" and "Math" models) represents a new wave of open-weight models that punch way above their weight class in technical tasks. While ChatGPT is great at chatting, DeepSeek is trained heavily on code and mathematics.</p>

      <h3>Why Logic Matters for Non-Coders</h3>

      <p>"But I'm not a coder!" you say.</p>

      <p>Logic isn't just for code. It's for <strong>Structure</strong>.</p>
      <br />
      <ul>
        <li>Creating a complex Excel formula.</li>
        <li>Structuring a legal argument.</li>
        <li>Breaking down a project into dependencies.</li>
        <li>Solving a scheduling conflict.</li>
      </ul>

      <p>These are "reasoning" tasks. Models like DeepSeek excel here because they are less likely to get "distracted" by creative writing fluff and more likely to follow a strict set of rules.</p>
    `,
    handsOn: {
      title: "The Logic Puzzle",
      description: "Test AI's reasoning capabilities.",
      affiliateLinks: [
        {
          text: "Try DeepSeek →",
          url: "https://chat.deepseek.com"
        }
      ],
      exercise: `1. Give DeepSeek a classic logic puzzle:

"I have a 3-gallon jug and a 5-gallon jug. I need exactly 4 gallons of water. How do I do it? Explain step-by-step."

2. Then, try a work task: "I have 5 employees with different shift preferences [list them]. Create a schedule for next week that keeps everyone happy."`
    }
  },

  // DAY 6: Pi
  {
    day: 6,
    title: "The Companion",
    subtitle: "Pi and Emotional Intelligence",
    content: `
      <p>We've talked about IQ (Intelligence Quotient). Today is about EQ (Emotional Quotient).</p>

      <p>Meet <strong>Pi</strong> (from Inflection AI). Pi is designed to be... nice. Supportive. Empathetic. It’s not trying to write your code or plan your trip. It’s trying to have a conversation.</p>

      <h3>The "Venting" Machine</h3>

      <p>Why would you want an AI that just talks?</p>
      <br />
      <p>Because sometimes you need to "rubber duck" a problem. You need to talk through a difficult conversation you're about to have with your boss. You need to brainstorm without feeling judged. You need to vent about a stressful day.</p>

      <p>Pi asks questions. It remembers details about your life ("How did that meeting go yesterday?"). It feels less like a tool and more like a sounding board.</p>
    `,
    handsOn: {
      title: "The Roleplay",
      description: "Practice a difficult conversation.",
      affiliateLinks: [
        {
          text: "Talk to Pi →",
          url: "https://pi.ai"
        }
      ],
      exercise: `1. Open Pi.
2. Tell it: "I need to ask my boss for a raise, but I'm nervous. Can we roleplay? You be the boss. Be skeptical but fair."
3. Have the conversation. See how it pushes back. Ask it for feedback on your answers.`
    }
  },

  // DAY 7: PDF.ai
  {
    day: 7,
    title: "The Analyst",
    subtitle: "Chatting with Your Data",
    content: `
      <p>We have reached the end of the "Chatbots." Now we enter the world of <strong>Tools</strong>.</p>

      <p>One of the most powerful use cases for AI is "Summarization." But pasting text into ChatGPT is annoying, especially if you have a 50-page PDF contract, a research paper, or a user manual.</p>

      <p><strong>PDF.ai</strong> solves this. You upload a document, and it turns that document into a chatbot.</p>

      <h3>The "Ctrl+F" of the Future</h3>

      <p>Instead of searching for keywords, you ask questions:</p>
      <br />
      <ul>
        <li>"Does this lease allow pets?"</li>
        <li>"What are the limitations of this study?"</li>
        <li>"Summarize the 3 main arguments in bullet points."</li>
      </ul>

      <p>It answers based <em>only</em> on that document. This eliminates hallucinations because it's grounded in your data.</p>
    `,
    handsOn: {
      title: "The Document Interrogation",
      description: "Save hours of reading time.",
      affiliateLinks: [
        {
          text: "Try PDF.ai (Free Trial) →",
          url: "https://pdf.ai"
        }
      ],
      exercise: `1. Find a long PDF (a user manual, a contract, a report).
2. Upload it to PDF.ai.
3. Ask: "What is the single most important thing I need to know from this document?"
4. Ask: "Are there any risks or warnings mentioned?"`
    }
  },

  // DAY 8: Jasper
  {
    day: 8,
    title: "The Marketer",
    subtitle: "Jasper and Brand Voice",
    content: `
      <p>If you run a business or work in marketing, generic AI writing is your enemy. "Delve," "landscape," "tapestry"—these are the hallmarks of lazy AI writing.</p>

      <p><strong>Jasper</strong> is built for marketers. It doesn't just write; it writes <em>on brand</em>.</p>

      <h3>The Brand Voice Engine</h3>

      <p>Jasper allows you to upload your "Brand Voice." You feed it your website, your past emails, and your style guide. It analyzes <em>how</em> you sound—witty, professional, sarcastic, bold—and then writes new content in that exact style.</p>

      <p>It also has templates for everything: Facebook Ads, Amazon Product Descriptions, SEO Blog Posts. It’s not a chat; it’s a production studio.</p>
    `,
    handsOn: {
      title: "The Copy Generator",
      description: "Write a landing page in 2 minutes.",
      affiliateLinks: [
        {
          text: "Try Jasper →",
          url: "https://www.jasper.ai"
        }
      ],
      exercise: `1. Go to Jasper (or use their free trial).
2. Select the "Landing Page" template.
3. Enter a made-up product name (e.g., "Coffee for Cats").
4. Watch it generate a headline, subheadline, benefits, and call-to-action that actually sounds persuasive, not robotic.`
    }
  },

  // DAY 9: Meta AI
  {
    day: 9,
    title: "The Socialite",
    subtitle: "Meta AI in Your Pocket",
    content: `
      <p>The best AI is the one you actually use. And where do you spend most of your time? Probably WhatsApp, Instagram, or Messenger.</p>

      <p><strong>Meta AI</strong> is Mark Zuckerberg's play to put AI into the apps you already have. You don't need to download anything new. It's just... there.</p>

      <h3>Frictionless Creativity</h3>

      <p>The magic of Meta AI is "Imagine." You can be in a group chat with friends, type <code>@Meta AI imagine a cat playing basketball</code>, and boom—it generates the image right there in the chat.</p>

      <p>It’s also great for settling debates. "Who won the 1994 World Cup?" You don't need to leave the chat to Google it. You just ask Meta AI.</p>
    `,
    handsOn: {
      title: "The Group Chat Flex",
      description: "Use AI where you already hang out.",
      affiliateLinks: [
        {
          text: "Learn about Meta AI →",
          url: "https://www.meta.ai"
        }
      ],
      exercise: `1. Open WhatsApp or Instagram.
2. Find the Meta AI circle (usually at the top or bottom).
3. Ask it to generate an image: "Imagine a futuristic version of my city."
4. Forward that image to a friend.`
    }
  },

  // DAY 10: Notion
  {
    day: 10,
    title: "The Second Brain",
    subtitle: "Organizing Your AI Life with Notion",
    content: `
      <p>We are 10 days in. You have learned about 9 different tools. You have written prompts, generated ideas, and solved puzzles.</p>

      <p>But where are you keeping all this?</p>

      <p>If you are just typing prompts and losing them, you are not building a skill—you are just playing. To master AI, you need a <strong>Prompt Library</strong>.</p>

      <h3>Enter Notion</h3>

      <p><strong>Notion</strong> is the ultimate workspace. With Notion AI, it becomes a "Second Brain." You can store your best prompts, your notes, and your projects. And you can have AI summarize, rewrite, or expand on them right inside your notes.</p>

      <p><strong>The System:</strong> Every time you write a prompt that works perfectly, <strong>save it</strong>. Give it a name. Tag it (e.g., #writing, #coding). Next time, you don't start from scratch; you start from your library.</p>
    `,
    handsOn: {
      title: "Build Your Prompt Library",
      description: "Create the asset that will save you hours.",
      affiliateLinks: [
        {
          text: "Get Notion →",
          url: "https://www.notion.so"
        }
      ],
      exercise: `1. Create a new Page in Notion called "My AI Brain".
2. Create a simple Table with columns: "Prompt Name", "The Prompt", "Tool Used", "Rating".
3. Add your best prompt from the last 10 days into this table.
4. Congratulations. You just started your professional AI asset library.`
    }
  },

  // PLACEHOLDERS FOR PHASE 2 & 3 (To be updated)
  ...Array.from({ length: 20 }, (_, i) => ({
    day: i + 11,
    title: `Day ${i + 11}: Coming Soon`,
    subtitle: "Phase 2 & 3 Content Loading...",
    content: "<p>The next phases of the course (Visuals, Audio, Automation) are being crafted. Stay tuned!</p>"
  }))
];
