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
    title: "The Death of Search",
    subtitle: "Why Clicking Blue Links Is Becoming Obsolete",
    content: `
      <p>Stop what you're doing and think back to the last time you Googled something.</p>

      <p>Chances are, you didn't find what you needed on the first try. You clicked a link. Skimmed. Hit back. Tried different keywords. Clicked another link. Scrolled past three ads. Found two Reddit threads with conflicting advice. Pieced together an answer from five different tabs.</p>

      <p>Then tomorrow, you forgot where you even found the information.</p>

      <p>This is the reality of search in 2025. And it's <strong>broken</strong>.</p>

      <p>Welcome to Day 2. Today isn't about learning a new tool. It's about understanding why the way you've found information for the past 25 years is dying—and what's replacing it.</p>

      <h3>The Problem Nobody Talks About</h3>

      <p>Google Search was a miracle in 1998. Type a question, get a list of websites ranked by relevance. The best rise to the top. Simple. Revolutionary.</p>

      <p>But here's what we accepted without realizing it: <strong>Google doesn't answer questions. It points at where answers might live.</strong></p>

      <p>It's a librarian saying "Try aisle 7" instead of a researcher handing you a report. And for two decades, that was fine. We had time. We could read five articles, compare sources, and become mini-experts on whatever we Googled.</p>

      <p>But in 2025? We don't have that time. We don't want to <em>research</em> how to fix a leaky faucet. We just want the answer.</p>

      <p>And that's the shift happening right now: the internet is moving from <strong>links to answers</strong>.</p>

      <h3>What's Actually Broken About Search</h3>

      <p>Let's break down what you're really doing when you "search":</p>

      <p><strong>Step 1: Query Translation</strong><br>You can't just ask "Why does my back hurt?" You have to learn "search language": "lower back pain causes sitting." You drop articles. You use technical keywords. You become a search engineer just to ask a question.</p>

      <p><strong>Step 2: Link Roulette</strong><br>Click the first blue link. Is it useful? Maybe. Is it trying to sell you something? Probably. Is the answer buried under 500 words of SEO filler? Definitely. Hit back. Try again.</p>

      <p><strong>Step 3: Source Synthesis</strong><br>You find three articles. They say different things. One's from 2019. One's selling a course. One's a Reddit comment. Now it's your job to figure out which is credible, cross-reference them, and synthesize an answer yourself.</p>

      <p><strong>Step 4: Information Loss</strong><br>Tomorrow, you need the same information. Where did you find it? You can't remember. Search again. Repeat the process.</p>

      <p>This isn't "searching." It's <strong>unpaid research labor</strong>. And AI just made it obsolete.</p>

      <h3>The Answer Engine Revolution</h3>

      <p>Imagine this instead:</p>

      <p>You ask a question in plain English. The AI reads 10+ sources in real-time—news articles, academic papers, forums—and synthesizes a direct answer. It shows you exactly where each claim came from with clickable citations. You get the answer in 10 seconds, not 10 minutes.</p>

      <p>This is what's called an <strong>Answer Engine</strong>, and it's fundamentally different from a search engine.</p>

      <p><strong>Search Engine (Google):</strong><br>"Here are 10 links. Good luck."</p>

      <p><strong>Answer Engine (AI-powered):</strong><br>"I just read those 10 links for you. Here's the synthesized answer with citations."</p>

      <p>The difference? One treats you like a librarian. The other treats you like a researcher with a <em>really good</em> assistant.</p>

      <h3>Why This Matters More Than You Think</h3>

      <p>This isn't just about convenience. It's about <strong>democratizing expertise</strong>.</p>

      <p>Right now, if you want a good answer to a complex question, you need to:</p>
      <ul>
        <li>Know which sources are credible</li>
        <li>Understand how to evaluate conflicting information</li>
        <li>Have time to read 5-10 articles</li>
        <li>Synthesize it all yourself</li>
      </ul>

      <p>That's a skill. It takes practice. And most people don't have it—or the time to develop it.</p>

      <p>Answer engines collapse that process. They do the reading. They do the synthesis. They show their work with citations. Suddenly, getting a research-grade answer doesn't require becoming a researcher.</p>

      <p>This levels the playing field. The person who has 2 minutes gets the same quality answer as the person who has 2 hours.</p>

      <h3>The Trade-Off: Trust vs. Verification</h3>

      <p>Here's the catch: when Google gave you links, you didn't have to trust Google. You trusted the <em>sources</em> you clicked on. You saw the article. You judged it yourself.</p>

      <p>With answer engines, you're trusting the AI to read accurately and synthesize fairly. That's a leap.</p>

      <p>But here's why it works: <strong>citations</strong>.</p>

      <p>Good answer engines don't ask for blind trust. Every claim is linked back to its source. You can verify. You can click through. The AI isn't replacing your judgment—it's doing the grunt work of reading and synthesis, then showing you its sources so you can audit it.</p>

      <p>Think of it like this: Google makes you the detective. Answer engines make you the judge. One requires you to gather evidence. The other presents the evidence and lets you decide.</p>

      <h3>The Paradigm Shift: From Keywords to Conversation</h3>

      <p>The deeper change happening is this: <strong>we're learning to talk to computers like humans again</strong>.</p>

      <p>For 25 years, we learned "search language." We typed broken keywords: "best laptop 2025 under 1000." We dropped grammar because that's what worked.</p>

      <p>With answer engines, you just ask: "What's the best laptop I can buy in 2025 for under $1,000 if I'm doing video editing?"</p>

      <p>The AI understands context. It knows "best" is subjective. It knows "video editing" means you need RAM and GPU power. It tailors the answer to your <em>intent</em>, not just your keywords.</p>

      <p>We spent two decades learning to speak like machines. Now machines learned to speak like us.</p>

      <h3>What This Means for You</h3>

      <p>If you're still "Googling" the way you did in 2005—typing keywords, clicking links, piecing together answers—you're working 10x harder than you need to.</p>

      <p>The people saving hours every week in 2025 aren't smarter. They just shifted from <strong>search engines to answer engines</strong>. They stopped hunting for information and started asking for it.</p>

      <p>Tomorrow, we'll dive into <strong>how to ask better questions</strong> (prompt engineering). But today, just internalize this:</p>

      <p><strong>The way you find information is changing. Adapt early, save hundreds of hours.</strong></p>

      <p>Let's try it.</p>
    `,
    handsOn: {
      title: "Links vs. Answers: The Experiment",
      description: "Experience the shift from search engine to answer engine firsthand.",
      affiliateLinks: [
        {
          text: "Try Perplexity (Free) →",
          url: "https://www.perplexity.ai"
        }
      ],
      exercise: `Today's exercise uses **Perplexity**—one of the leading answer engines. It's free, no signup required.

1. **Pick a Real Question You Have**
   Choose something you'd normally Google. Examples:
   - "How do I negotiate a higher salary?"
   - "What's causing inflation in 2025?"
   - "Best way to learn Spanish as an adult?"

2. **Round 1: The Old Way (Google)**
   - Go to Google and search your question
   - Count how many links you click
   - Time yourself: How long until you have a clear answer?
   - Notice: How much SEO garbage did you scroll past?

3. **Round 2: The New Way (Perplexity)**
   - Go to https://www.perplexity.ai
   - Ask the EXACT same question in plain English
   - Read the synthesized answer
   - Click on at least 2 citations [1][2] to see the sources

4. **Compare:**
   - Which was faster?
   - Which felt more trustworthy?
   - Which answer was more useful?

5. **Bonus: Ask a Follow-Up**
   - In Perplexity, ask a follow-up without retyping context
   - Example: "What about remote workers?"
   - Notice how it remembers the conversation

**Reflection:** How much time per day do you spend Googling things? If answer engines save you 50% of that time, what's that worth over a year?`
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
  },

  // DAY 4: Gemini 3 Pro - PLACEHOLDER
  {
    day: 4,
    title: "The Multimodal Mind",
    subtitle: "Google's Frontier Model & Adaptive Reasoning",
    content: `<p><strong>🚧 Content Coming Soon</strong></p><p>This lesson will be written by Claude Opus 4.5 and will cover Google's Gemini 3 Pro, thinking levels, and when to use Google vs OpenAI models.</p>`,
    handsOn: {
      title: "Hands-On Exercise",
      description: "Practical exercise with Gemini 3 Pro",
      affiliateLinks: [{ text: "Try Gemini 3 Pro →", url: "https://gemini.google.com" }],
      exercise: "Exercise content coming soon."
    }
  },

  // DAY 5-30: Additional Placeholders
  ...Array.from({ length: 27 }, (_, i) => {
    const day = i + 5;
    const titles: { [key: number]: string } = {
      5: "Your Second Brain",
      6: "The Artist Within",
      7: "Google's Image Revolution",
      8: "Words That Look Perfect",
      9: "Open-Source Power",
      10: "The Asset Factory",
      11: "Video Awakening",
      12: "Cinematic AI",
      13: "Viral Motion",
      14: "Image to Motion",
      15: "The Voice Clone",
      16: "The Song Factory",
      17: "Audiophile's Choice",
      18: "Edit Video Like Text",
      19: "The Avatar Speaks",
      20: "The Presentation Shortcut",
      21: "Design for Non-Designers",
      22: "The Meeting Scribe",
      23: "The Workspace Brain",
      24: "The Brand Voice",
      25: "The Automation Canvas",
      26: "Advanced Automation",
      27: "Code Without Coding",
      28: "The AI Code Editor",
      29: "The AI Employee",
      30: "Your Next 30 Days",
      31: "BONUS: The Google Trilogy Challenge"
    };

    const tools: { [key: number]: string } = {
      5: "NotebookLM",
      6: "Midjourney v7",
      7: "Nano Banana",
      8: "Ideogram 3.0",
      9: "Flux 1.1",
      10: "Leonardo.ai",
      11: "Runway Gen-4",
      12: "Veo 3.1",
      13: "Kling 2.1",
      14: "Luma Dream Machine",
      15: "ElevenLabs",
      16: "Suno",
      17: "Udio",
      18: "Descript",
      19: "Synthesia",
      20: "Gamma",
      21: "Canva Magic Studio",
      22: "Otter.ai",
      23: "Notion AI",
      24: "Jasper",
      25: "Make (Integromat)",
      26: "n8n",
      27: "Replit Agent",
      28: "Cursor",
      29: "Lindy",
      30: "Capstone Project",
      31: "Gemini + Nano Banana + Veo 3.1"
    };

    return {
      day,
      title: titles[day] || `Placeholder Day ${day}`,
      subtitle: `Featuring ${tools[day] || 'TBD'}`,
      content: `<p><strong>🚧 Content Coming Soon</strong></p><p>This lesson will be written by Claude Opus 4.5 and will cover ${tools[day]}.</p>`,
      handsOn: {
        title: "Hands-On Exercise",
        description: `Practical exercise with ${tools[day]}`,
        affiliateLinks: day === 31
          ? [
            { text: "Gemini 3 Pro →", url: "https://gemini.google.com" },
            { text: "Nano Banana →", url: "https://gemini.google.com" },
            { text: "Veo 3.1 →", url: "https://gemini.google.com" }
          ]
          : [{ text: `Try ${tools[day]} →`, url: "#" }],
        exercise: "Exercise content coming soon."
      }
    };
  })
];
