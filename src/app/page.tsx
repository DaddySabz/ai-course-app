// src/app/page.tsx
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

export default function LoginPage() {
  return (
    <div className="bg-background-light font-body text-text-primary">
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex h-full min-h-screen grow flex-col">
          <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
            
            {/* Left Side: Brand and Info */}
            <div className="relative flex flex-col items-center justify-between bg-background-light p-8 md:p-12 lg:p-16">
              <header className="z-10 w-full">
                <div className="flex items-center gap-3 text-text-primary">
                  <div className="size-7">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="url(#logo-gradient)"></path>
                      <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="logo-gradient" x1="4" x2="44" y1="44" y2="4">
                          <stop stopColor="#2DD4BF"></stop>
                          <stop offset="1" stopColor="#FBBF24"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="text-text-primary text-lg font-bold leading-tight tracking-[-0.015em] font-display">AI Course 30</h2>
                </div>
              </header>
              <main className="z-10 flex flex-col items-start justify-center text-left">
                <h1 className="text-text-primary tracking-tight text-4xl font-bold leading-tight pb-3 pt-6 lg:text-5xl font-display">
                  Master <span className="text-accent-teal">AI</span> in 30 Days.
                </h1>
                <p className="text-text-secondary text-lg font-normal leading-relaxed pb-3 pt-1 max-w-md">
                  Join our guided journey to unlock the power of Artificial Intelligence.
                </p>
              </main>
              <footer className="z-10 w-full text-center text-sm text-text-secondary">
                <p>© 2024 AI Course 30. All rights reserved.</p>
              </footer>
            </div>

            {/* Right Side: Sign-In */}
            <div className="flex flex-col items-center justify-center bg-surface p-8 md:p-12 lg:p-16">
              <div className="flex w-full max-w-sm flex-col items-center text-center">
                <div className="flex flex-col gap-2">
                  <h1 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] font-display">
                    Welcome to AI Onboarding
                  </h1>
                  <p className="text-text-secondary text-base font-normal leading-relaxed">
                    Sign in to begin your 30-day journey.
                  </p>
                </div>
                <div className="mt-4 flex w-full flex-col items-center gap-4">
                  <GoogleSignInButton />
                </div>
                <div className="mt-8 text-center text-sm text-text-secondary">
                  <p>By continuing, you agree to our</p>
                  <div className="mt-1 flex items-center justify-center gap-4">
                    <a className="font-medium text-accent-teal hover:underline" href="#">Terms of Service</a>
                    <span className="text-text-tertiary">·</span>
                    <a className="font-medium text-accent-teal hover:underline" href="#">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
