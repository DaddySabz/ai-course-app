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
  
  // First few days have sample content
  if (day === 1) {
    return {
      day: 1,
      title: "What is AI?",
      subtitle: "Understanding Artificial Intelligence basics",
      content: `
        <h2>📚 Learning Content</h2>
        <p>
          Today you'll learn the fundamentals of Artificial Intelligence and how it's changing the world around us.
        </p>
        <h3>What You'll Learn:</h3>
        <ul>
          <li>What AI really is (and what it isn't)</li>
          <li>How machine learning works at a basic level</li>
          <li>Real-world AI applications you use every day</li>
          <li>The difference between AI, Machine Learning, and Deep Learning</li>
        </ul>
      `,
      handsOn: {
        title: "🛠️ Hands-On Practice",
        description: "Sign up for ChatGPT (if you haven't already) and try asking it to explain a complex topic in simple terms.",
        affiliateLinks: [
          {
            text: "Try ChatGPT Free",
            url: "https://chat.openai.com"
          }
        ],
        exercise: 'Try this prompt: "Explain quantum computing to me like I\'m 10 years old". Then ask ChatGPT to explain 3 different complex topics in simple terms. Notice how it adapts its language.'
      }
    };
  }
  
  if (day === 2) {
    return {
      day: 2,
      title: "Understanding Large Language Models (LLMs)",
      subtitle: "How ChatGPT and similar tools work",
      content: `
        <h2>📚 Learning Content</h2>
        <p>
          Today we dive into Large Language Models (LLMs) - the technology behind ChatGPT, Gemini, and Claude.
        </p>
        <h3>Key Concepts:</h3>
        <ul>
          <li>What makes a language model "large"</li>
          <li>How LLMs are trained on vast amounts of text</li>
          <li>Why they can generate human-like responses</li>
          <li>Their limitations and potential biases</li>
        </ul>
      `,
      handsOn: {
        title: "🛠️ Hands-On Practice",
        description: "Today, try Google Gemini and compare its responses to ChatGPT.",
        affiliateLinks: [
          {
            text: "Try Google Gemini",
            url: "https://gemini.google.com"
          }
        ],
        exercise: "Ask the same question to both ChatGPT and Gemini. Compare their responses and notice the differences in their answers."
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
