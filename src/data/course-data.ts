// src/data/course-data.ts

interface CourseModule {
  day: number;
  title: string;
  subtitle: string;
  content: string; // HTML content
}

export const courseData: CourseModule[] = [
  {
    day: 1,
    title: 'What is AI?',
    subtitle: 'An introduction to the fundamentals of Artificial Intelligence.',
    content: `
      <p>Artificial Intelligence (AI) is a transformative field of computer science focused on creating systems that can perform tasks that typically require human intelligence. This includes learning from experience, understanding natural language, recognizing patterns, and making decisions.</p>
      <p class="mt-4"><strong>Your Task:</strong> Your first step is to get hands-on. Sign up for a free account with a popular AI tool like ChatGPT or Google Gemini.</p>
      <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer" class="mt-4 inline-block bg-accent-teal text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">Try ChatGPT</a>
    `,
  },
  {
    day: 2,
    title: 'Large Language Models (LLMs)',
    subtitle: 'Understanding the power behind modern conversational AI.',
    content: `
      <p>Large Language Models (LLMs) are the engines driving tools like ChatGPT. They are massive neural networks trained on vast amounts of text from the internet, which allows them to understand context, generate human-like text, translate languages, and answer questions with remarkable accuracy.</p>
      <p class="mt-4"><strong>Your Task:</strong> Ask an LLM to explain a complex topic to you as if you were ten years old. For example: "Explain quantum computing to me like I'm ten."</p>
    `,
  },
  // Add more days here...
  {
    day: 3,
    title: 'Prompt Engineering',
    subtitle: 'The art and science of crafting effective AI prompts.',
    content: `
      <p>The quality of the output you get from an AI is directly related to the quality of the input you provide. Prompt Engineering is the skill of designing clear, specific, and contextual instructions to guide the AI toward the desired result.</p>
      <p class="mt-4"><strong>Your Task:</strong> Try giving the same prompt two different ways. First, a simple one: "Write about dogs." Then, a more detailed one: "Write a short, cheerful blog post about the benefits of adopting a rescue dog, focusing on companionship and the joy they bring to a home." Compare the results.</p>
    `,
  },
];
