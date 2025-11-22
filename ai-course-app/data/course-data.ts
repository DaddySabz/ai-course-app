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

export const courseData: CourseModule[] = [
  // DAY 1: The AI Revolution
  {
    day: 1,
    title: "The AI Revolution",
    subtitle: "ChatGPT and the Dawn of Conversational Intelligence",
    content: `
      <p>November 30th, 2022. That's the day everything changed.</p>

      <p>OpenAI released ChatGPT to the public, and within five days, over one million people had signed up to talk to a machine. Not to use a tool. Not to run a program. To <em>talk</em>. About philosophy, code, recipes, heartbreak—anything. For the first time in history, AI didn't feel like science fiction. It felt like magic.</p>

      <p>Fast forward to November 2025, and we're living in a completely different world. The technology that seemed miraculous three years ago now feels like a basic utility, as fundamental as electricity or Wi-Fi. But here's the paradox: while millions use AI daily, most people are still only scratching the surface of what's possible.</p>

      <p>Welcome to Day 1 of your 30-day journey into the AI ecosystem. This isn't a technical course about how neural networks function or the mathematics of transformer architecture. This is a practical, hands-on exploration of how AI can fundamentally transform your work, creativity, and daily life—starting today.</p>

      <h3>Why This Moment Matters: The Shift from Tools to Agents</h3>

      <p>To understand where we are in November 2025, we need to understand what changed. For decades, computers did exactly what we told them to do. You clicked a button, ran a script, executed a command. The relationship was simple: <strong>Human gives order → Machine obeys.</strong></p>

      <p>Then came the "Chatbot Era" (2022-2024). AI could <em>respond</em> to us in natural language, answer questions, generate text. It was reactive, helpful, but still fundamentally passive. You had to prompt it, guide it, tell it every step.</p>

      <p>But in late 2025, we've entered something profoundly different: the <strong>"Agentic Era."</strong> AI doesn't just respond anymore—it <em>plans, executes, and verifies</em>. It can break down complex tasks into subtasks, decide which tools to use, course-correct when it hits obstacles, and deliver finished work without constant supervision. This is the difference between a calculator and a colleague.</p>

      <p>And ChatGPT—specifically the newly released <strong>GPT-5.1</strong>—sits at the heart of this revolution.</p>

      <h3>ChatGPT in November 2025: What You Need to Know</h3>

      <p>If you tried ChatGPT back in 2023 and haven't touched it since, you're in for a shock. The platform has evolved dramatically. Here's the current landscape:</p>

      <p><strong>GPT-5.1: Three Brains for Different Jobs</strong></p>

      <p>OpenAI released GPT-5.1 on November 12, 2025, and it fundamentally changes how the AI "thinks." Unlike previous versions where you had one model for everything (or had to manually switch between "fast" and "smart" modes), GPT-5.1 introduces three distinct variants:</p>

      <ul>
        <li><strong>GPT-5.1 Instant:</strong> This is your default conversational partner. It's fast, warm, and natural—designed for everyday questions, brainstorming, writing assistance, and quick tasks. But here's the clever part: when Instant encounters a genuinely hard question (complex math, multi-step logic, nuanced analysis), it automatically engages "<strong>adaptive reasoning</strong>," where it slows down and thinks more carefully before answering.</li>
        
        <li><strong>GPT-5.1 Thinking:</strong> This is the "deep work" model. When you need planning, complex analysis, code debugging, or multi-step problem solving, Thinking mode takes over. It's slower but dramatically more accurate. It explains its reasoning process, uses less jargon, and shows you its thought process step-by-step.</li>
        
        <li><strong>GPT-5.1 Auto:</strong> This is the magic of 2025. You don't have to choose between Instant and Thinking. Auto mode intelligently routes your question to the right brain automatically. Ask "What's a good recipe for salmon?" and Instant answers in 2 seconds. Ask "Design a three-month marketing strategy for a SaaS startup" and Thinking kicks in, shows its reasoning, and delivers a comprehensive plan.</li>
      </ul>

      <p>This adaptive intelligence means you're not thinking about <em>which AI to use</em>—you're just asking questions and getting appropriate answers.</p>

      <h3>Beyond Chat: The Features That Change Everything</h3>

      <p>ChatGPT in 2025 isn't just a text box anymore. It's evolved into a complete productivity ecosystem:</p>

      <p><strong>1. Deep Research Mode</strong></p>
      <p>This is where ChatGPT stops being a chatbot and becomes a research assistant. Deep Research uses a specialized version of the o3 reasoning model to conduct multi-hour investigations across the public web, uploaded files, and connected databases. You give it a question like "What are the most promising renewable energy technologies for tropical climates?" and it returns a <em>cited, comprehensive report</em> with sources, data, and analysis—the kind of work that would take a human researcher days.</p>

      <p><strong>2. Group Chat (Launched November 13, 2025)</strong></p>
      <p>This is genuinely revolutionary for teams. ChatGPT can now join group conversations with up to 20 people. Imagine planning a team offsite: everyone throws ideas into the group chat, and ChatGPT searches for venues, compares options, summarizes decisions, and even generates a draft agenda—all in real-time collaboration. The AI becomes a participant, not just a tool you query alone.</p>

      <p><strong>3. Personalization That Actually Works</strong></p>
      <p>You can now set ChatGPT's tone and personality globally. Want it to be concise and professional for work? Set it to "Efficient." Need a friendlier vibe for creative projects? Switch to "Quirky" or "Candid." These aren't superficial tweaks—they fundamentally change how the AI structures responses, uses humor, and balances formality. And importantly, these settings persist across all your conversations.</p>

      <p><strong>4. Inline Images from the Web</strong></p>
      <p>When you ask about a person, place, or product, ChatGPT now pulls relevant images directly into the conversation, positioned next to the text for context. This might sound like a small feature, but it transforms how you learn—especially for visual topics like architecture, biology, or historical events.</p>

      <p><strong>5. Instant Checkout for Products</strong></p>
      <p>If you're in the US, you can now discover and <em>purchase</em> products from Shopify merchants directly within ChatGPT. "Find me a minimalist leather wallet under $50" → ChatGPT shows options → you buy it without ever opening a browser. Commerce and conversation have merged.</p>

      <h3>The Honest Limitations (Because We Don't Hype Here)</h3>

      <p>ChatGPT is powerful, but it's not magic, and it's not perfect. Here's what you need to know:</p>

      <ul>
        <li><strong>Hallucinations Still Happen:</strong> ChatGPT sometimes confidently states things that are factually wrong. It's better than it was in 2023, but you still need to verify critical facts—especially for medical, legal, or financial advice.</li>
        
        <li><strong>Knowledge Cutoff:</strong> The free version's training data has a cutoff date. For current events, you need the paid "Plus" or "Pro" version with web browsing enabled, or use Deep Research.</li>
        
        <li><strong>Creativity Has Patterns:</strong> If you ask ChatGPT to write five blog headlines, you'll notice certain phrasing patterns repeating. It's creative within its training data, but it's not human-level originality. Think of it as a brilliant collaborator, not a replacement creative director.</li>
        
        <li><strong>No True Understanding:</strong> ChatGPT doesn't "understand" in the way humans do. It predicts likely word sequences based on patterns. This means it can write beautiful explanations of concepts it doesn't actually comprehend. Always apply critical thinking.</li>
      </ul>

      <h3>Who Should Pay? (And Who Shouldn't)</h3>

      <p>The free tier of ChatGPT is genuinely useful and will serve most casual users well. But here's when you should consider upgrading to <strong>ChatGPT Plus ($20/month)</strong> or <strong>Pro ($200/month)</strong>:</p>

      <p><strong>Upgrade to Plus if:</strong></p>
      <ul>
        <li>You need web browsing and current information</li>
        <li>You want image generation (DALL-E 3 integration)</li>
        <li>You use ChatGPT more than 10 hours/week</li>
        <li>You want priority access during peak times (no rate limits)</li>
        <li>You're building Custom GPTs for your business</li>
      </ul>

      <p><strong>Upgrade to Pro if:</strong></p>
      <ul>
        <li>You rely on Deep Research for complex analysis</li>
        <li>You need unlimited access to GPT-5.1 Thinking mode</li>
        <li>You're a consultant, analyst, or researcher where AI <em>is</em> your productivity stack</li>
        <li>Time saved justifies $200/month (roughly 3-4 hours of your billable rate)</li>
      </ul>

      <p><strong>Stay free if:</strong></p>
      <ul>
        <li>You're experimenting and learning (like today!)</li>
        <li>You only need occasional assistance</li>
        <li>You don't need real-time web data</li>
      </ul>

      <h3>The Real Power: How to Think Differently</h3>

      <p>Here's the truth most courses won't tell you: the technology doesn't matter if you don't change how you think. The biggest barrier to AI adoption isn't the tech—it's mental.</p>

      <p>Most people treat ChatGPT like Google: they ask a question, get an answer, and leave. But ChatGPT is conversational. You can push back. You can say "That's too formal, make it casual." You can say "Give me three more options." You can say "Now turn this into a haiku."</p>

      <p>The magic happens in the <strong>iteration</strong>. The first answer is rarely the best answer. The people getting extraordinary results from AI aren't using secret prompts—they're simply willing to have back-and-forth conversations, refining and steering until the output is exactly right.</p>

      <p>Over the next 30 days, we'll train this muscle. You'll learn to treat AI like a colleague: someone you brainstorm with, push back against, and collaborate with until you get something neither of you could have created alone.</p>

      <h3>What We're Building Toward</h3>

      <p>By the end of this course, you won't just know <em>how</em> to use AI tools. You'll have fundamentally changed your workflow. You'll think in terms of automation, delegation, and augmentation. Tasks that used to take hours will take minutes. Projects that felt overwhelming will feel manageable.</p>

      <p>But we start here, on Day 1, with the simplest possible action: having your first <em>real</em> conversation with ChatGPT.</p>

      <p>Let's begin.</p>
    `,
    handsOn: {
      title: "Your First Real Conversation",
      description: "Move beyond search-engine thinking and actually talk to AI.",
      affiliateLinks: [
        {
          text: "Sign up for ChatGPT (Free) →",
          url: "https://chat.openai.com"
        }
      ],
      exercise: `1. Go to https://chat.openai.com and create a free account.
2. **Don't** just ask a random question. Instead, start a conversation about something you're genuinely working on or curious about.
3. Ask your first question.
4. When you get an answer, **don't stop there**. Reply with:
   - "Can you explain that differently?"
   - "Give me three specific examples."
   - "Now make it more conversational."
5. Continue the conversation for at least 5 exchanges, treating ChatGPT like a brainstorming partner.
6. Notice: How does the quality of answers change when you iterate? Did you get to a better place than your first answer?

**Bonus Challenge:** Ask ChatGPT to critique its own answer. Type: "What are the weaknesses in the response you just gave me?" Watch it analyze itself. This is the meta-level thinking that separates power users from casual users.`
    }
  }
];
