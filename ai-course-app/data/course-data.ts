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
        <h2>📘 5–7 Minute Reading: "AI Is Already Part of Your Life — You Just Didn't Notice"</h2>
        
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
        title: "COPY/PASTE MIND-BLOWER: \"AI Rewrites Any Mess Into Clarity\"",
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
        <h2>� 5–7 Minute Reading: "The Secret Behind AI's Brainpower"</h2>
        
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
        title: "COPY/PASTE MIND-BLOWER: \"AI Creates a Mini Illustrated Guide From Nothing\"",
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
  
  // Remaining days get placeholder content
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
