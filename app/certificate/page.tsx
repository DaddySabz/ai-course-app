// app/certificate/page.tsx

const userData = { name: "Alex Doe" };
const certificateData = { id: "C-AI30-8D3F-9A7B-1C6E", date: "August 28, 2024" };

export default function CertificatePage() {
  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-accent-teal to-primary">
          {userData.name}
        </h1>
        <p className="text-text-secondary mt-4">For successfully completing the 'Introduction to AI' course</p>
        <div className="mt-8">
          <a href="/dashboard" className="text-primary hover:underline font-medium">&larr; Back to Dashboard</a>
        </div>
      </div>
    </div>
  );
}
