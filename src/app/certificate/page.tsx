// src/app/certificate/page.tsx

// Placeholder Data
const userData = {
  name: "Alex Doe",
};

const certificateData = {
  id: "C-AI30-8D3F-9A7B-1C6E",
  date: "August 28, 2024",
};

export default function CertificatePage() {
  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl">
        <div className="w-full aspect-[11/8.5] bg-surface rounded-xl shadow-lg p-2">
          <div className="w-full h-full p-8 border-2 border-dashed border-gray-200 rounded-lg flex flex-col relative items-center justify-center text-center">
            
            <header className="mb-6">
              <h1 className="tracking-widest text-sm sm:text-base font-bold text-text-secondary">CERTIFICATE OF COMPLETION</h1>
              <p className="text-text-secondary mt-2 text-sm sm:text-base">This certificate is proudly presented to</p>
            </header>
            
            <main>
              <p className="text-4xl sm:text-5xl font-black tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-accent-teal to-primary">
                {userData.name}
              </p>
              <div className="w-24 h-px bg-gray-200 my-4 mx-auto"></div>
              <p className="text-text-secondary max-w-md text-sm sm:text-base">For successfully completing the 'Introduction to AI' course</p>
            </main>

            <footer className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 w-full text-xs sm:text-sm">
              <div>
                <p className="font-bold text-primary">{certificateData.id}</p>
                <p className="text-text-secondary font-bold">Unique Certificate ID</p>
              </div>
              <div>
                <p className="font-medium text-text-primary">{certificateData.date}</p>
                <p className="text-text-secondary font-bold">Date of Completion</p>
              </div>
            </footer>

          </div>
        </div>
        <div className="text-center mt-4">
          <a href="/dashboard" className="text-primary hover:underline font-medium">
            &larr; Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
