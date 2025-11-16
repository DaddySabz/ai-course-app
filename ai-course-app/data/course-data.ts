export type CourseModule = {
  day: number;
  title: string;
  subtitle: string;
  content: string; // HTML string rendered with dangerouslySetInnerHTML
};

export const courseData: CourseModule[] = [
  {
    day: 1,
    title: "Getting Started with AI",
    subtitle: "Core concepts and what AI can (and can’t) do today",
    content: `
      <h2>Welcome to Day 1</h2>
      <p>
        In this module you will build an intuition for what modern AI systems are good
        at, where they typically fail, and how they are built at a high level.
      </p>
      <ul>
        <li>What is machine learning?</li>
        <li>Training data, models, and evaluation</li>
        <li>Real-world examples you interact with every day</li>
      </ul>
      <p>
        Your goal today is to identify 3 AI-powered products you already use and
        think about what problem they are actually solving.
      </p>
    `,
  },
  {
    day: 2,
    title: "Working with Language Models",
    subtitle: "Prompting patterns and practical usage",
    content: `
      <h2>Language Models 101</h2>
      <p>
        Today we focus on large language models (LLMs). You will learn the basics of
        prompting, and how to structure instructions so that models are more likely
        to give you useful results.
      </p>
      <ol>
        <li>Clarify the goal and constraints</li>
        <li>Provide examples of the desired output</li>
        <li>Iterate based on the model's responses</li>
      </ol>
      <p>
        Try designing a short prompt that turns a messy note into a clear email.
      </p>
    `,
  },
  {
    day: 3,
    title: "Evaluating AI Use Cases",
    subtitle: "When to automate, augment, or avoid AI",
    content: `
      <h2>Choosing the Right Use Cases</h2>
      <p>
        Not every task is a good fit for AI. In this module we explore how to spot
        low-risk, high-leverage opportunities where AI can help.
      </p>
      <p>
        Consider your own work and list 2–3 workflows where AI could remove
        repetitive manual steps without compromising quality or safety.
      </p>
    `,
  },
];
