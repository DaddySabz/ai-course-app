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

  // DAY 2: Claude AI - The Writer's Room
  {
    day: 2,
    title: "The Writer's Room",
    subtitle: "Claude AI and the Art of Long-Form Thinking",
    content: `
      <p>If ChatGPT is the Swiss Army knife of AI—fast, versatile, always ready—then Claude is the precision instrument. The scalpel. The craftsman's tool.</p>

      <p>Built by Anthropic (a company founded by former OpenAI researchers), Claude has carved out a distinct identity in the AI landscape. While ChatGPT chases speed and ubiquity, Claude obsesses over something more subtle: <strong>nuance</strong>. Thoughtfulness. The ability to hold complex, multi-layered conversations without losing the thread.</p>

      <p>In November 2025, Claude isn't just an alternative to ChatGPT—it's the <em>preferred</em> tool for anyone working with long-form content, deep analysis, or code that needs to be not just functional, but elegant.</p>

      <p>Welcome to Day 2. Today, we meet the writer's AI.</p>

      <h3>The Claude Philosophy: Safety Meets Capability</h3>

      <p>Anthropic's founding principle is "AI safety." But that doesn't mean Claude is timid or restricted—it means it's <em>thoughtful</em>. Claude is trained using a method called <strong>Constitutional AI</strong>, where the model isn't just optimized for helpfulness, but for harmlessness and honesty.</p>

      <p>What does this mean in practice? Claude is less likely to hallucinate than other models. It's more willing to say "I don't know" instead of confidently making something up. It tends to provide more balanced perspectives on controversial topics. And crucially for professionals, it's <strong>more reliable</strong> when accuracy matters.</p>

      <p>This makes Claude the tool of choice for lawyers reviewing contracts, researchers analyzing data, and writers crafting long-form articles where every fact needs to be defensible.</p>

      <h3>The Model Lineup: Sonnet vs. Opus (November 2025)</h3>

      <p>Claude doesn't have a single "default" model. Instead, you choose based on your needs:</p>

      <p><strong>Claude Sonnet 4.5 (Released September 29, 2025)</strong></p>

      <p>This is Claude's <em>coding powerhouse</em>. Anthropic boldly calls it "the best coding model in the world," and the benchmarks back it up. Sonnet 4.5 achieved a <strong>0% error rate</strong> on internal code editing benchmarks—a first in the industry.</p>

      <ul>
        <li><strong>Context Window:</strong> 200,000 tokens (with 1 million tokens in public beta). That's enough to process entire codebases, lengthy legal documents, or a stack of research papers in a single conversation.</li>
        
        <li><strong>Computer Use:</strong> Sonnet 4.5 can interact with computer interfaces like a human—clicking buttons, navigating apps, filling forms. This makes it Anthropic's most advanced model for agentic workflows.</li>
        
        <li><strong>Coding Prowess:</strong> Supports multi-file code refactoring, precise debugging, and multi-hour autonomous software engineering tasks. It scored 74.5% on SWE-bench Verified, the toughest coding benchmark.</li>
        
        <li><strong>Speed & Cost Balance:</strong> Faster and cheaper than Opus while maintaining high-quality outputs. Ideal for high-volume use cases.</li>
      </ul>

      <p><strong>Claude Opus 4.1 (Released August 5, 2025)</strong></p>

      <p>This is the "deep thinker." If Sonnet is the engineer, Opus is the philosopher. Opus 4.1 is Anthropic's most capable reasoning system, optimized for complex enterprise workflows where accuracy and nuance are paramount.</p>

      <ul>
        <li><strong>Advanced Reasoning:</strong> Provides more consistent long-form reasoning with better factual grounding. It's slower than Sonnet, but the depth is unmatched.</li>
        
        <li><strong>Context Window:</strong> 200,000 tokens (same as Sonnet).</li>
        
        <li><strong>Enterprise Focus:</strong> Designed for legal analysis, strategic planning, complex research synthesis—tasks where getting it right matters more than getting it fast.</li>
      </ul>

      <p><strong>Which Should You Use?</strong></p>

      <ul>
        <li><strong>Sonnet 4.5:</strong> For coding, automation, agentic tasks, and situations where you need speed + quality.</li>
        <li><strong>Opus 4.1:</strong> For deep analysis, high-stakes writing, legal/medical work, and when you need the absolute best reasoning.</li>
      </ul>

      <p>Most users default to Sonnet and only switch to Opus when they need the extra horsepower.</p>

      <h3>The Killer Feature: Artifacts</h3>

      <p>This is where Claude becomes genuinely <em>different</em> from ChatGPT. Claude introduced a feature called <strong>Artifacts</strong>, and it fundamentally changes how you work with AI.</p>

      <p>Here's the problem Artifacts solve: When you ask ChatGPT to generate code, a table, or a document, the output appears inline in the conversation. If you want to iterate, you have to copy-paste it somewhere else, edit it, and bring it back. It's clunky.</p>

      <p>With Artifacts, Claude generates content in a <strong>dedicated side panel</strong> that lives alongside the conversation. You can see the artifact, edit it directly, and ask Claude to modify it—all in real-time.</p>

      <p><strong>What Can Artifacts Generate?</strong></p>

      <ul>
        <li><strong>Code snippets</strong> (HTML, JavaScript, Python, etc.) with syntax highlighting</li>
        <li><strong>Interactive diagrams</strong> and flowcharts</li>
        <li><strong>Structured documents</strong> (reports, tables, Markdown files)</li>
        <li><strong>UI prototypes</strong> that you can actually interact with</li>
        <li><strong>Data visualizations</strong> from CSV uploads</li>
      </ul>

      <p><strong>Real-World Example:</strong> You're building a landing page. You ask Claude: "Create an HTML landing page for a meditation app with a hero section, features list, and CTA button." Claude generates the code in the Artifacts panel. You see it rendered. You say: "Make the CTA button green and add a testimonial section." Claude updates it instantly, and you see the changes live.</p>

      <p>This turns Claude into a <strong>collaborative workspace</strong>, not just a chatbot. You're building <em>with</em> Claude, not just asking it questions.</p>

      <h3>The Extended Context Window: Why It Matters</h3>

      <p>Both Sonnet and Opus support 200,000 tokens (with 1 million in beta). To put that in perspective:</p>

      <ul>
        <li>200,000 tokens ≈ 150,000 words ≈ a 500-page book</li>
        <li>1,000,000 tokens ≈ 750,000 words ≈ War and Peace + The Great Gatsby + Moby Dick combined</li>
      </ul>

      <p>This means you can upload your entire company's documentation, paste in a full codebase, or feed Claude a semester's worth of research papers—and it will remember <em>all of it</em> throughout the conversation.</p>

      <p><strong>Use Cases:</strong></p>

      <ul>
        <li><strong>Legal:</strong> Upload a 200-page contract and ask: "Summarize the liability clauses and flag any unfavorable terms."</li>
        <li><strong>Research:</strong> Feed Claude 20 academic papers and ask: "What are the competing theories on this topic? Where do they disagree?"</li>
        <li><strong>Coding:</strong> Paste an entire GitHub repo and ask: "Where is the bug in the authentication flow?"</li>
      </ul>

      <p>The extended context window turns Claude into a thought partner that can hold <em>massive</em> amounts of information in its "working memory."</p>

      <h3>Computer Use: The Agentic Breakthrough</h3>

      <p>In late 2025, Claude Sonnet 4.5 became capable of <strong>Computer Use</strong>—the ability to control a computer like a human. This isn't science fiction; it's live functionality.</p>

      <p>Claude can:</p>

      <ul>
        <li>Move the mouse and click buttons</li>
        <li>Type into forms and text fields</li>
        <li>Navigate between applications</li>
        <li>Take screenshots to verify actions</li>
      </ul>

      <p>This enables truly autonomous workflows. For example: "Go to this website, fill out the contact form with this information, submit it, and send me a screenshot of the confirmation." Claude does it all.</p>

      <p>While still in beta, Computer Use represents the future of AI: not just generating text, but <em>taking action</em> in the real world.</p>

      <h3>When Claude Shines (And When It Doesn't)</h3>

      <p><strong>Claude is exceptional for:</strong></p>

      <ul>
        <li><strong>Long-form writing:</strong> Essays, reports, documentation where maintaining coherence across thousands of words is critical</li>
        <li><strong>Code generation:</strong> Especially complex, multi-file projects with nuanced requirements</li>
        <li><strong>Deep analysis:</strong> Research synthesis, comparative analysis, strategic thinking</li>
        <li><strong>Sensitive content:</strong> Medical, legal, or ethical questions where accuracy and safety matter</li>
      </ul>

      <p><strong>Claude struggles with:</strong></p>

      <ul>
        <li><strong>Real-time web data:</strong> Claude doesn't browse the web in real-time (unlike ChatGPT Plus or Gemini). Its knowledge has a cutoff date.</li>
        <li><strong>Image generation:</strong> Claude doesn't create images. For visuals, you still need DALL-E, Midjourney, or other tools.</li>
        <li><strong>Speed for simple tasks:</strong> If you just need a quick answer, ChatGPT's Instant mode is faster.</li>
      </ul>

      <h3>Pricing: Free vs. Pro</h3>

      <p>Claude offers a generous free tier, but with usage limits. Here's when you should upgrade to <strong>Claude Pro ($20/month)</strong>:</p>

      <ul>
        <li>You hit rate limits on the free tier (typically 40-50 messages per day)</li>
        <li>You need priority access to Sonnet 4.5 and Opus 4.1</li>
        <li>You're using Claude for professional work (writing, coding, analysis)</li>
        <li>You want early access to new features like Computer Use</li>
      </ul>

      <p>For most learners and experimenters, the free tier is sufficient. But if Claude becomes part of your daily workflow, Pro pays for itself quickly.</p>

      <h3>The Philosophy of Iteration</h3>

      <p>Here's what most people don't realize about Claude: its real power isn't in the first response—it's in the <strong>tenth response</strong>.</p>

      <p>Claude is designed for refinement. You start with a rough draft. You push back: "This is too formal." Claude adjusts. "Now add more examples." It complies. "Actually, rewrite the introduction to be more provocative." It iterates.</p>

      <p>This back-and-forth collaboration is where Claude excels. It doesn't get frustrated. It doesn't lose context. It just keeps refining until you're happy.</p>

      <p>This makes Claude feel less like a tool and more like a <strong>writing partner</strong>. You're co-authoring, not just prompting.</p>

      <h3>The Bottom Line</h3>

      <p>Claude isn't trying to beat ChatGPT at everything. It's playing a different game. Where ChatGPT prioritizes breadth, speed, and integration with other tools, Claude prioritizes <strong>depth, thoughtfulness, and precision</strong>.</p>

      <p>If you're building something that matters—a business plan, a codebase, a research report—Claude is the AI you want in your corner. It's the tool for when "good enough" isn't good enough.</p>

      <p>Tomorrow, we'll learn how to get <em>both</em> AIs to do exactly what you want through the art of prompting. But today, let's just meet Claude properly.</p>
    `,
    handsOn: {
      title: "The Long-Form Document Test",
      description: "See Claude's extended context and refinement capabilities in action.",
      affiliateLinks: [
        {
          text: "Try Claude (Free) →",
          url: "https://claude.ai"
        }
      ],
      exercise: `1. Go to https://claude.ai and create a free account.
2. Start a conversation: "I need to write a detailed business plan for a [choose any business idea]. Let's start with the executive summary."
3. Claude will generate a draft. Now iterate at least 5 times with specific refinements:
   - "Make it more data-driven"
   - "Add a competitive analysis section"
   - "Rewrite the market opportunity paragraph to be more compelling"
   - "Add specific financial projections"
   - "Now restructure this to emphasize the unique value proposition first"
4. Notice: How does Claude maintain context across all your requests? Does the quality improve with iteration?

**Bonus Challenge:** Upload a document (PDF or text file) and ask Claude to analyze it. Try: "What are the three main arguments in this document? Are any of them weak?" Watch Claude process the entire document and provide nuanced analysis.`
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
