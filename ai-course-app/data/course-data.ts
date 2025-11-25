// Day 1 ONLY - Testing structure before building all 30 days

export interface HandsOn {
  title: string;
  description: string;
  affiliateLinks: { text: string; url: string }[];
  exercise: string;
}

export interface CourseModule {
  day: number;
  title: string;
  subtitle: string;
  content: string;
  handsOn: HandsOn;
}

export const courseModules: CourseModule[] = [
  // DAY 1: The AI Revolution
  {
    day: 1,
    title: "The AI Revolution",
    subtitle: "Understanding the Moment We're Living In",
    content: `
      <p>November 30th, 2022. That's the day everything changed.</p>

      <p>OpenAI released ChatGPT to the public, and within five days, over one million people had signed up. Within two months, 100 million. It became the fastest-growing consumer application in history—not because it was the first AI, but because it was the first AI that felt <em>human</em>.</p>

      <p>But here's what most people miss: ChatGPT isn't the revolution. It's the <strong>announcement</strong> of a revolution that's been building for decades. To understand where we're going, we need to understand what AI actually <em>is</em>—and what it isn't.</p>

      <p>Welcome to Day 1. Today, we're not learning to use a tool. We're learning to recognize the single biggest transformation in human capability since the internet.</p>

      <h3>What is Artificial Intelligence? (The Real Answer)</h3>

      <p>Strip away the hype, the fear, the sci-fi fantasies. At its core, Artificial Intelligence is simple:</p>

      <p><strong>AI is software that can perform tasks that normally require human intelligence.</strong></p>

      <p>That's it. No consciousness. No sentience. Just software that can recognize patterns, make predictions, generate text, identify images—tasks that, until recently, only humans could do.</p>

      <p>But there's a critical distinction most people don't understand: not all AI is created equal. There are two fundamentally different types.</p>

      <h3>Narrow AI vs. General AI: The Line That Defines Our Reality</h3>

      <p><strong>Narrow AI (Weak AI):</strong></p>

      <p>This is <em>every AI system that exists today</em>. Yes,even ChatGPT. Even the most advanced models. Narrow AI is designed to excel at <strong>one specific task</strong> (or a narrow set of related tasks). It's brilliant within its domain but utterly helpless outside it.</p>

      <p><strong>Examples you use every day:</strong></p>

      <ul>
        <li><strong>Siri/Alexa:</strong> Voice recognition and command execution. Can't drive a car or diagnose diseases.</li>
        <li><strong>Netflix recommendations:</strong> Analyzes your viewing history to suggest shows. Can't write a screenplay.</li>
        <li><strong>Spam filters:</strong> Identifies spam emails with 99% accuracy. Can't compose a reply.</li>
        <li><strong>Self-driving cars:</strong> Navigate roads and avoid obstacles. Can't make you dinner.</li>
        <li><strong>ChatGPT:</strong> Generates human-like text. Can't truly <em>understand</em> what it's saying or adapt to tasks it wasn't trained for.</li>
      </ul>

      <p>Narrow AI is powerful but <strong>specialized</strong>. Think of it as an Olympic athlete: world-class at their sport, average at everything else.</p>

      <p><strong>General AI (Strong AI/AGI):</strong></p>

      <p>This is the Holy Grail. The sci-fi dream. Artificial General Intelligence would be an AI that can <strong>think, learn, and adapt like a human</strong> across <em>any</em> domain. It could write a novel, then immediately pivot to solving quantum physics problems, then learn to cook, then master chess—all without being explicitly programmed for each task.</p>

      <p><strong>The reality check:</strong> AGI doesn't exist. Not even close. Every AI system you interact with today—ChatGPT, Claude, Gemini, all of them—is Narrow AI pretending to be versatile. They're brilliant at <em>simulating</em> general capability, but they're still fundamentally limited to their training data and design.</p>

      <p>Most AI researchers believe true AGI is still decades away. Some think it may never be possible. But the race is on.</p>

      <h3>The 2025 Breakthrough: From Analytical to Generative</h3>

      <p>Now, here's why the last three years felt so explosive. For decades, AI was primarily <strong>Analytical AI</strong>—software that could <em>analyze</em> existing data and make predictions or classifications:</p>

      <ul>
        <li>Is this email spam or not?</li>
        <li>What product should we recommend to this customer?</li>
        <li>Is there a tumor in this X-ray?</li>
        <li>Will this customer churn next month?</li>
      </ul>

      <p>Analytical AI is incredibly useful. It powers your Google search rankings, credit fraud detection, medical diagnostics. But it doesn't <em>create</em> anything new. It just sorts, predicts, and classifies.</p>

      <p>Then came <strong>Generative AI</strong>.</p>

      <p>Generative AI doesn't just analyze—it <strong>creates</strong>. It generates new content that didn't exist before:</p>

      <ul>
        <li>Write a poem in the style of Shakespeare.</li>
        <li>Generate a photorealistic image of a "sunset over a futuristic city."</li>
        <li>Compose a song in the style of jazz.</li>
        <li>Draft a complete software application from a description.</li>
      </ul>

      <p>This is the shift that made AI feel <em>magical</em>. For the first time, machines weren't just processing our world—they were <strong>adding to it</strong>. Creating art. Writing stories. Designing products. And doing it at a scale and speed humans can't match.</p>

      <p><strong>ChatGPT is Generative AI</strong>. It doesn't analyze your question and retrieve a stored answer (like Google Search). It <em>generates</em> a new response, word by word, based on patterns it learned from billions of text examples.</p>

      <h3>Why November 30, 2022 Mattered</h3>

      <p>Generative AI wasn't invented in 2022. The technology (transformer models, deep learning) had been developing since 2017. Google, OpenAI, and others had been working on it for years.</p>

      <p>But ChatGPT did three things no previous AI had done:</p>

      <ol>
        <li><strong>It was accessible.</strong> No technical knowledge required. Just type and talk.</li>
        <li><strong>It was conversational.</strong> It remembered context. It felt like talking to a smart colleague, not querying a database.</li>
        <li><strong>It was free.</strong> Anyone, anywhere, could try it instantly.</li>
      </ol>

      <p>Within weeks, people were using ChatGPT to write resumes, debug code, plan vacations, draft emails, explain complex topics, and generate creative ideas. It wasn't perfect—it made mistakes, it "hallucinated" facts—but it was <em>useful</em>. And that changed everything.</p>

      <p>Suddenly, AI wasn't a research project or a niche tool. It was a part of daily life.</p>

      <h3>The World Before and After ChatGPT</h3>

      <p><strong>Before (Pre-2022):</strong></p>
      <ul>
        <li>AI was mostly invisible (recommendation engines, spam filters, autocomplete).</li>
        <li>Creative work (writing, art, music) was considered uniquely human.</li>
        <li>AI was something "tech people" worried about.</li>
      </ul>

      <p><strong>After (2023-2025):</strong></p>
      <ul>
        <li>AI is a daily co-worker for millions.</li>
        <li>Creative AI (ChatGPT, Midjourney, Runway) generates content at industrial scale.</li>
        <li>Every profession is rethinking workflows: lawyers, doctors, teachers, marketers, developers.</li>
        <li>The question shifted from "Can AI do this?" to "How do I use AI to do this better/faster?"</li>
      </ul>

      <h3>What This Course Is (And Isn't)</h3>

      <p>This isn't a technical course. You won't learn calculus or neural network architecture. This is a <strong>practical guide</strong> to understanding and using the AI tools reshaping the world right now.</p>

      <p>Over 30 days, you'll learn:</p>

      <ul>
        <li>How AI actually works (in plain English)</li>
        <li>Which tools to use for which tasks</li>
        <li>How to communicate with AI effectively (prompt engineering)</li>
        <li>How to automate work, create content, and solve problems faster</li>
        <li>The limitations and ethical considerations</li>
      </ul>

      <p>By Day 30, you won't just <em>use</em> AI—you'll understand it. You'll recognize when AI is the right tool and when it's not. You'll integrate it into your work without fear or hype.</p>

      <h3>The Only Question That Matters</h3>

      <p>Three years ago, the question was: "Will AI replace my job?"</p>

      <p>Today, the smarter question is: "How can I use AI to become irreplaceable?"</p>

      <p>Because here's the reality: AI won't replace you. But <strong>someone using AI will</strong>.</p>

      <p>The people thriving in 2025 aren't the ones resisting AI or fearing it. They're the ones who learned to wield it like a superpower. They're using ChatGPT to write in an hour what used to take a day. They're using AI image generators to prototype designs in minutes. They're automating the boring parts of their job and focusing on the creative, strategic work that actually matters.</p>

      <p>That's what we're building over the next 30 days. Not hype. Not fear. Just capability.</p>

      <p>Let's start.</p>
    `,
    handsOn: {
      title: "Your First AI Conversation",
      description: "Experience the difference between search and generation.",
      affiliateLinks: [
        {
          text: "Try ChatGPT (Free) →",
          url: "https://chat.openai.com"
        }
      ],
      exercise: `1. Go to https://chat.openai.com and create a free account.
2. Try this experiment to understand Generative AI:
   
   **First, ask:** "What is photosynthesis?"
   - Notice: ChatGPT generates an explanation, word by word.
   
   **Then ask:** "Explain photosynthesis to me like I'm 5 years old."
   - Notice: It regenerates the ENTIRE explanation in simpler language.
   
   **Finally ask:** "Now explain it like I'm a college biology professor."
   - Notice: Again, a completely new explanation, highly technical.

3. **The key insight:** ChatGPT isn't retrieving stored answers. It's *generating* new text each time based on your request. This is why it's called Generative AI.

4. Try one more: "Write a haiku about photosynthesis." Watch it create poetry on demand.

**Reflection Question:** Could you do this with Google Search? Why or why not? That's the difference between Analytical (search/classify) and Generative (create) AI.`
    }
  },

  // DAY 2: The Answer Engine
  {
    day: 2,
    title: "The Answer Engine",
    subtitle: "Why Google Search Is Dying (And What's Replacing It)",
    content: `
      <p>Here's a question: When was the last time you found what you needed on the <em>first</em> Google search?</p>

      <p>Most of us don't search anymore—we <strong>hunt</strong>. We click the first blue link. Skim. Backtrack. Try again with different keywords. Click another link. Scroll past ads. Read conflicting answers on Reddit. Piece together the truth from five different sources. Then we forget where we actually found the answer.</p>

      <p>It's exhausting. And it's broken.</p>

      <p>Google wasn't built for answers. It was built for <strong>links</strong>. It's a librarian pointing at shelves, not a researcher handing you a report. For 25 years, that was good enough. But in 2025, we don't have time to become experts on a topic just to get one question answered.</p>

      <p>Welcome to Day 2. Today, you're meeting <strong>Perplexity</strong>—the tool that's quietly killing search engines. And by the end of this lesson, you'll understand why the future of research isn't about finding information. It's about <em>synthesizing</em> it.</p>

      <h3>The Problem with Search (That We All Just Accepted)</h3>

      <p>Google Search was revolutionary in 1998. Type a query, get a ranked list of websites. The best pages rise to the top. Simple. Effective.</p>

      <p>But here's what Google doesn't do: <strong>It doesn't answer your question</strong>. It shows you where answers <em>might</em> live. Then it's your job to:</p>

      <ul>
        <li>Click through 5-10 websites</li>
        <li>Read past the ads and SEO garbage</li>
        <li>Cross-reference contradictory claims</li>
        <li>Figure out which sources are credible</li>
        <li>Synthesize your own answer</li>
      </ul>

      <p>That's not search. That's <strong>outsourced research</strong>. And it works great if you have 30 minutes to spare. But what if you just need a straight answer?</p>

      <p>Enter <strong>Perplexity</strong>. It doesn't give you links. It gives you the <em>answer</em>—synthesized from multiple sources, with citations, in real-time.</p>

      <h3>What Makes Perplexity Different</h3>

      <p>Think of it this way:</p>

      <ul>
        <li><strong>Google:</strong> "Here are 10 articles about your question. Good luck."</li>
        <li><strong>ChatGPT:</strong> "Here's what I remember from my training data (which ended months ago)."</li>
        <li><strong>Perplexity:</strong> "I just read the top 10 sources in real-time, cross-referenced them, and here's the answer with citations."</li>
      </ul>

      <p>Perplexity combines the best of both worlds: the <strong>reasoning power</strong> of AI with the <strong>live data</strong> of the internet. It doesn't just regurgitate old training data. It actively searches, reads, and synthesizes—right now, in 2025.</p>

      <p>This is called an <strong>Answer Engine</strong>, and it's fundamentally different from a search engine.</p>

      <h3>How Perplexity Actually Works</h3>

      <p>When you ask Perplexity a question, here's what happens behind the scenes:</p>

      <p><strong>Step 1: Query Understanding</strong><br>Perplexity doesn't just match keywords. It understands <em>intent</em>. If you ask "Why is the sky blue?", it knows you want a scientific explanation, not a list of websites about sky colors.</p>

      <p><strong>Step 2: Real-Time Web Search</strong><br>It searches the live web—news sites, academic papers, Reddit threads, company blogs—and identifies the most relevant, credible sources.</p>

      <p><strong>Step 3: Source Analysis</strong><br>It reads those sources (not just the headlines, but the actual content) and evaluates which information is consistent, credible, and recent.</p>

      <p><strong>Step 4: Synthesis</strong><br>It generates a coherent answer in plain English, combining insights from multiple sources. This isn't copy-paste. It's reasoning.</p>

      <p><strong>Step 5: Citations</strong><br>Every claim is linked back to its source. You can verify the information yourself with one click. No trust required—just transparency.</p>

      <p>The result? You get an answer that's accurate, current, and traceable. In seconds.</p>

      <h3>When to Use Perplexity vs. ChatGPT</h3>

      <p>Here's the decision tree you need to internalize:</p>

      <p><strong>Use Perplexity when:</strong></p>
      <ul>
        <li>You need <strong>current information</strong> (news, stock prices, recent events)</li>
        <li>You want <strong>citations</strong> (research, fact-checking, credibility matters)</li>
        <li>The answer requires <strong>multiple perspectives</strong> (comparing products, evaluating options)</li>
        <li>You're researching a <strong>specific topic</strong> you know nothing about</li>
      </ul>

      <p><strong>Use ChatGPT when:</strong></p>
      <ul>
        <li>You need <strong>creative output</strong> (writing, brainstorming, rewriting)</li>
        <li>You want to <strong>iterate</strong> on something (edit this email, make it funnier, shorten it)</li>
        <li>The task is <strong>timeless</strong> (explain a concept, draft a template)</li>
        <li>You need <strong>speed over accuracy</strong> (quick ideas, rough drafts)</li>
      </ul>

      <p>Think of it this way: <strong>ChatGPT is your writer. Perplexity is your researcher.</strong></p>

      <h3>The "Cited Sources" Superpower</h3>

      <p>This is where Perplexity becomes indispensable. Every answer includes clickable citations—numbered references like [1], [2], [3]—that link directly to the original sources.</p>

      <p>Why does this matter?</p>

      <p>Because AI can hallucinate. It can sound confident while being completely wrong. But with citations, you can verify. You're not trusting the AI—you're trusting the <em>sources</em> the AI found for you.</p>

      <p><strong>Example:</strong></p>

      <p>Ask ChatGPT: "What's the current market cap of Tesla?"<br>Answer: "As of my last update in 2023, Tesla's market cap was around $600 billion." (Outdated, possibly wrong.)</p>

      <p>Ask Perplexity: "What's the current market cap of Tesla?"<br>Answer: "As of November 25, 2025, Tesla's market cap is approximately $1.2 trillion [1][2]."<br>Citations: [1] Yahoo Finance, [2] CNBC.</p>

      <p>See the difference? You're not just getting an answer. You're getting <strong>proof</strong>.</p>

      <h3>Perplexity Pro: Worth It or Hype?</h3>

      <p>Perplexity offers a free tier, which is excellent for casual users. But if you're using it daily, the <strong>Pro version ($20/month)</strong> unlocks:</p>

      <ul>
        <li><strong>Unlimited searches</strong> (free tier limits you to ~5 Pro searches/day)</li>
        <li><strong>Advanced AI models</strong> (GPT-5.1, Claude 3, Gemini 3 Pro—you pick)</li>
        <li><strong>File uploads</strong> (analyze PDFs, ask questions about documents)</li>
        <li><strong>Perplexity Pages</strong> (turn your research into shareable reports)</li>
      </ul>

      <p>If you're a student, researcher, or knowledge worker who Googles 20+ times a day, Pro pays for itself in saved time. But the free tier is powerful enough for most people starting out.</p>

      <h3>The Paradigm Shift: From "Searching" to "Asking"</h3>

      <p>Here's the profound change happening right now: we're moving from <strong>keyword-based retrieval</strong> to <strong>conversational knowledge</strong>.</p>

      <p>With Google, you learn to "speak search." You type fragmented keywords: "best laptop 2025 under $1000." You drop the grammar because that's what works.</p>

      <p>With Perplexity, you just ask like a human: "What's the best laptop I can buy in 2025 for under $1,000 for video editing?"</p>

      <p>The AI understands context. It knows "best" is subjective. It knows "video editing" means you need a good GPU and RAM. It tailors the answer to your <em>intent</em>, not just your keywords.</p>

      <p>This shift is bigger than it sounds. It means we no longer have to translate our thoughts into machine language. The machine learned to speak ours.</p>

      <h3>The Bottom Line</h3>

      <p>Google Search isn't going anywhere overnight. But its dominance is cracking. People are tired of wading through SEO spam, ads disguised as articles, and conflicting Reddit threads.</p>

      <p>Perplexity represents the future: <strong>answers, not links</strong>. Research that's synthesized, cited, and instant.</p>

      <p>Tomorrow, we're diving into <strong>Claude</strong>—the AI built for deep thinking and long-form work. But today, just understand this: the way you find information is changing. And the people who adapt first will save hundreds of hours this year alone.</p>

      <p>Let's practice asking better questions.</p>
    `,
    handsOn: {
      title: "The Search vs. Answer Experiment",
      description: "Experience the difference between searching for links and getting synthesized answers.",
      affiliateLinks: [
        {
          text: "Try Perplexity (Free) →",
          url: "https://www.perplexity.ai"
        }
      ],
      exercise: `1. Go to https://www.perplexity.ai (no signup required for free tier).

2. **Round 1: Pick a Current Event**
   Choose something happening NOW (e.g., "What are the major AI announcements from Google in November 2025?")
   
   - Ask Perplexity this question.
   - Read the answer. Notice the citations [1][2][3].
   - Click on at least 2 citations to verify the sources.

3. **Round 2: Compare to Google**
   - Open Google and search the exact same question.
   - Notice: Did Google give you an answer, or just links?
   - How many articles did you have to read to get the same information?

4. **Round 3: Ask a Follow-Up**
   Back in Perplexity, ask a follow-up question without retyping context:
   - "Which of these announcements will impact businesses the most?"
   
   - Notice how Perplexity remembers the conversation and builds on it.

5. **Bonus Challenge:**
   Ask Perplexity something you've been curious about that requires recent data:
   - "What's the status of [recent tech trend]?"
   - "Who won [recent event]?"
   - "What are the best [product category] released in 2025?"


**Reflection Question:** How much time would you have saved this week if you'd used Perplexity instead of Google for research? Think about the last 3 things you searched for.`
    }
  },

  // DAY 3: The Art of the Prompt
  {
    day: 3,
    title: "The Art of the Prompt",
    subtitle: "How to Get AI to Actually Do What You Want",
    content: `
      <p>Here's the uncomfortable truth about AI: most people are using it wrong.</p>

      <p>They type "write me a blog post about marketing" and get back 500 words of bland, generic fluff that sounds like it was written by a committee of robots. Then they conclude: "AI isn't that useful."</p>

      <p>But the problem isn't the AI. It's the prompt. It's like walking into a Michelin-star restaurant and saying "make me food." You'll get <em>something</em>, but it won't be what you actually wanted. The chef needs context. Preferences. Constraints. <strong>Specificity.</strong></p>

      <p>Welcome to Day 3. Today, you're learning the single most valuable skill in AI: <strong>Prompt Engineering</strong>. And by the end of this lesson, you'll understand why the people getting extraordinary results from ChatGPT aren't lucky—they're just speaking its language.</p>

      <h3>Why Prompts Matter (More Than You Think)</h3>

      <p>Let's start with a fundamental truth: AI has no idea what you actually want. It's not reading your mind. It's reading your <strong>prompt</strong>.</p>

      <p>ChatGPT is a prediction machine. It predicts the most likely next word based on the words you've given it. If you give it vague input, it generates vague output. If you give it precise input—with context, structure, and constraints—it produces something remarkable.</p>

      <p>Think of it this way: the difference between a bad prompt and a good prompt is the difference between asking a stranger for "some music recommendations" versus asking a knowledgeable friend who knows your taste. One gives you a random Top 40 list. The other gives you a curated playlist that changes your week.</p>

      <p>The framework that separates amateurs from experts is deceptively simple. It's called <strong>CTC</strong>: Context, Task, Constraint.</p>

      <h3>The CTC Framework: Your Prompt Template</h3>

      <p>Every effective prompt—whether you realize it or not—contains three elements:</p>

      <p><strong>1. Context (Who, What, Where)</strong></p>

      <p>This is the background information that shapes how the AI interprets your request. Context answers:</p>

      <ul>
        <li><strong>Who is the audience?</strong> (Executives? College students? Complete beginners?)</li>
        <li><strong>What is the situation?</strong> (A sales pitch? A friendly explanation? A technical document?)</li>
        <li><strong>What role should the AI play?</strong> (An expert consultant? A creative writer? A skeptical critic?)</li>
      </ul>

      <p>Without context, ChatGPT defaults to "generic internet text." With context, it tailors every word.</p>

      <p><strong>Example:</strong></p>
      <ul>
        <li><strong>Bad:</strong> "Explain blockchain."</li>
        <li><strong>Good:</strong> "You are a patient teacher. I'm a 40-year-old small business owner with no tech background. Explain blockchain to me."</li>
      </ul>

      <p>Notice the difference? The second prompt gives the AI a <em>persona</em> (patient teacher) and an <em>audience</em> (non-technical adult). The output will be completely different.</p>

      <p><strong>2. Task (The Actual Request)</strong></p>

      <p>This is the action you want the AI to perform. Be explicit. Use verbs like:</p>

      <ul>
        <li><strong>Write</strong> (a blog post, an email, a script)</li>
        <li><strong>Summarize</strong> (a document, a conversation, a concept)</li>
        <li><strong>Generate</strong> (ideas, headlines, questions)</li>
        <li><strong>Analyze</strong> (data, arguments, tone)</li>
        <li><strong>Rewrite</strong> (for clarity, tone, or style)</li>
      </ul>

      <p>The task should be <strong>one clear action</strong>. If you're asking ChatGPT to do three different things in one prompt, split it into three prompts. Complexity kills quality.</p>

      <p><strong>Example:</strong></p>
      <ul>
        <li><strong>Vague:</strong> "Help me with my email."</li>
        <li><strong>Clear:</strong> "Write a professional follow-up email to a client who hasn't responded in two weeks."</li>
      </ul>

      <p><strong>3. Constraint (The Boundaries)</strong></p>

      <p>This is where most people fail. Constraints are the rules that shape the output. They answer:</p>

      <ul>
        <li><strong>How long?</strong> (50 words? 500 words? 3 bullet points?)</li>
        <li><strong>What tone?</strong> (Formal? Casual? Funny? Persuasive?)</li>
        <li><strong>What format?</strong> (Email? List? Table? Paragraph?)</li>
        <li><strong>What to avoid?</strong> (Jargon? Clichés? Negative language?)</li>
      </ul>

      <p>Constraints force the AI to make decisions. Without them, it defaults to safe, boring, middle-of-the-road writing.</p>

      <p><strong>Example:</strong></p>
      <ul>
        <li><strong>No constraints:</strong> "Write a social media post about our product launch."</li>
        <li><strong>With constraints:</strong> "Write a LinkedIn post (150 words max) announcing our product launch. Tone: excited but professional. Include a call-to-action to visit our website. Avoid buzzwords like 'revolutionary' or 'game-changing.'"</li>
      </ul>

      <p>See the difference? The second prompt leaves no room for interpretation. It <em>directs</em> the AI.</p>

      <h3>Putting It All Together: The CTC Formula</h3>

      <p>Let's take a real-world scenario and apply CTC step by step.</p>

      <p><strong>Scenario:</strong> You need to write a cold email to a potential client.</p>

      <p><strong>Bad Prompt:</strong><br>"Write a cold email."</p>

      <p>What happens? ChatGPT will generate something generic, vague, and forgettable. It has no idea who you are, who the client is, or what you're selling.</p>

      <p><strong>Good Prompt (CTC Applied):</strong></p>

      <p><strong>Context:</strong> "You are a B2B sales expert. I run a small marketing agency, and I'm reaching out to a mid-sized e-commerce brand that recently launched."</p>

      <p><strong>Task:</strong> "Write a personalized cold email introducing my agency's services."</p>

      <p><strong>Constraint:</strong> "Keep it under 100 words. Tone: friendly and consultative, not salesy. Focus on their recent launch as an icebreaker. End with a low-pressure call-to-action (e.g., 'Would you be open to a 15-minute call?')."</p>

      <p>Full prompt:</p>

      <p><em>"You are a B2B sales expert. I run a small marketing agency, and I'm reaching out to a mid-sized e-commerce brand that recently launched. Write a personalized cold email introducing my agency's services. Keep it under 100 words. Tone: friendly and consultative, not salesy. Focus on their recent launch as an icebreaker. End with a low-pressure call-to-action (e.g., 'Would you be open to a 15-minute call?')."</em></p>

      <p>Now ChatGPT knows <em>exactly</em> what you need. The output will be specific, on-brand, and actionable.</p>

      <h3>The "Act As" Technique: Giving AI a Persona</h3>

      <p>One of the most powerful tools in prompt engineering is the <strong>"Act as..."</strong> framework. By assigning the AI a role, you activate different "modes" of writing and reasoning.</p>

      <p><strong>Examples:</strong></p>

      <ul>
        <li>"Act as a <strong>skeptical journalist</strong>. Review this press release and point out any weak claims."</li>
        <li>"Act as a <strong>5-year-old</strong>. Explain quantum entanglement."</li>
        <li>"Act as a <strong>career coach</strong>. Give me feedback on this resume."</li>
        <li>"Act as a <strong>copywriter</strong>. Rewrite this paragraph to be more persuasive."</li>
      </ul>

      <p>The persona changes everything. A "career coach" will focus on clarity and impact. A "skeptical journalist" will challenge assumptions. A "5-year-old" will strip away jargon.</p>

      <p>This trick works because large language models are trained on billions of examples of <em>how different types of people write</em>. When you tell it to "act as" a doctor, lawyer, artist, or comedian, it accesses patterns associated with that role.</p>

      <h3>Common Prompt Mistakes (And How to Fix Them)</h3>

      <p><strong>Mistake #1: Being Too Vague</strong></p>

      <p><strong>Bad:</strong> "Tell me about AI."<br><strong>Fix:</strong> "Explain how AI is being used in healthcare to improve diagnostic accuracy. Focus on real-world examples from 2024-2025."</p>

      <p><strong>Mistake #2: Asking for Too Much at Once</strong></p>

      <p><strong>Bad:</strong> "Write a blog post, create 10 headlines, and suggest social media captions."<br><strong>Fix:</strong> Break it into three separate prompts. AI performs better with focused tasks.</p>

      <p><strong>Mistake #3: No Format Specified</strong></p>

      <p><strong>Bad:</strong> "Give me ideas for a marketing campaign."<br><strong>Fix:</strong> "Give me 5 marketing campaign ideas in a numbered list. For each idea, include: 1) Campaign name, 2) Target audience, 3) Core message."</p>

      <p><strong>Mistake #4: Not Iterating</strong></p>

      <p>The best AI users don't get it right on the first try. They <strong>iterate</strong>. After the first response, they say: "Make it shorter," "Use simpler language," "Add more examples," or "Rewrite the opening to be more dramatic."</p>

      <p>Prompting is a conversation, not a one-shot command.</p>

      <h3>The Bottom Line</h3>

      <p>Mastering prompts isn't about memorizing formulas. It's about understanding that AI responds to <strong>clarity</strong>. The more specific your instructions, the better the output.</p>

      <p>CTC is your starting point:</p>
      <ul>
        <li><strong>Context:</strong> Set the scene.</li>
        <li><strong>Task:</strong> Define the action.</li>
        <li><strong>Constraint:</strong> Add the rules.</li>
      </ul>

      <p>Tomorrow, we'll take it further. You'll learn how to use <strong>context windows</strong> to feed AI massive amounts of information—turning it from a generic assistant into a personalized expert who knows <em>your</em> business, <em>your</em> style, and <em>your</em> goals.</p>

      <p>But first, let's practice prompting. Because the difference between "AI is useless" and "AI is a superpower" is literally just a few well-chosen words.</p>
    `,
    handsOn: {
      title: "The Before & After Prompt Challenge",
      description: "Experience the power of structured prompts by transforming generic output into precision work.",
      affiliateLinks: [
        {
          text: "Try ChatGPT (Free) →",
          url: "https://chat.openai.com"
        }
      ],
      exercise: `1. Go to https://chat.openai.com and start a new conversation.

2. **Round 1: The Vague Prompt**
   Type exactly this: "Write an email to my team."
   
   - Read the output. Notice how generic and bland it is.
   - It has no personality, no specific purpose, and nothing actionable.

3. **Round 2: Apply CTC**
   Now try this structured prompt:
   
   "You are a team leader at a growing startup. Write an email to my 10-person marketing team announcing that we've hit our Q4 revenue goal two weeks early. Tone: celebratory but grounded—acknowledge the hard work without being cheesy. Length: 150 words max. End with a concrete next step (planning our 2025 strategy)."
   
   - Compare this output to Round 1. Notice the difference in tone, specificity, and usefulness.

4. **Round 3: Iterate**
   Reply to ChatGPT with: "Rewrite this email to be more concise. Cut it to 75 words."
   
   - Watch how ChatGPT tightens the message without losing the core meaning.

5. **Bonus Challenge:**
   Pick a real task from your life (a difficult email, a social media post, a presentation outline) and apply CTC. See how much better the output gets.

**Reflection Question:** What was the single biggest difference between the vague prompt and the CTC prompt? Write it down. That insight will change how you use AI forever.`
    }
  }
];
