import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex h-full min-h-screen grow flex-col">
        <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
          {/* Left Side - Hero Section */}
          <div className="relative flex flex-col items-center justify-between bg-background-light p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04]" style={{
              backgroundImage: 'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(15,23,42,0.03) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.1),_transparent_40%)]"></div>
            
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
                <h2 className="text-text-primary text-lg font-bold leading-tight tracking-[-0.015em]">AI Course 30</h2>
              </div>
            </header>
            
            <main className="z-10 flex flex-col items-start justify-center text-left">
              <h1 className="text-text-primary tracking-tight text-4xl font-bold leading-tight pb-3 pt-6 lg:text-5xl">
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

          {/* Right Side - Login Form */}
          <div className="flex flex-col items-center justify-center bg-white p-8 md:p-12 lg:p-16 overflow-y-auto">
            <div className="flex w-full max-w-md flex-col items-center text-center gap-8">
              
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Welcome to AI Onboarding
                </h1>
                <p className="text-text-secondary text-base font-normal leading-relaxed">
                  Sign in to begin your 30-day journey.
                </p>
              </div>
              
              {/* Standard Login Section */}
              <div className="w-full flex flex-col gap-4 p-6 rounded-xl border-2 border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-text-primary">Standard Access</h2>
                
                <form
                  action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/dashboard" })
                  }}
                  className="w-full"
                >
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-accent-teal px-5 py-3 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-accent-teal/50"
                  >
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.4H18.37C18.16 15.82 17.38 16.99 16.29 17.75V20.27H19.95C21.69 18.67 22.56 15.85 22.56 12.25Z"></path>
                      <path d="M12 23C14.97 23 17.47 22.02 19.29 20.47L15.65 17.75C14.65 18.44 13.43 18.83 12 18.83C9.31 18.83 7.02 17.05 6.13 14.71H2.38V17.52C4.1 20.83 7.79 23 12 23Z"></path>
                      <path d="M6.13 14.71C5.88 13.98 5.75 13.24 5.75 12.47C5.75 11.7 5.88 10.95 6.13 10.22V7.41H2.38C1.53 9.07 1 10.72 1 12.47C1 14.22 1.53 15.87 2.38 17.52L6.13 14.71Z"></path>
                      <path d="M12 5.17C13.56 5.17 14.91 5.72 15.99 6.74L19.36 3.37C17.47 1.68 14.97 1 12 1C7.79 1 4.1 3.17 2.38 6.48L6.13 9.29C7.02 6.95 9.31 5.17 12 5.17Z"></path>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-50 px-2 text-gray-500">or</span>
                  </div>
                </div>

                <button
                  disabled
                  className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-5 py-3 text-base font-medium text-gray-400 cursor-not-allowed"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"></path>
                  </svg>
                  <span>Email (Coming Soon)</span>
                </button>
              </div>

              {/* John Lewis & Waitrose Partners */}
              <div className="w-full flex flex-col gap-3 p-6 rounded-xl border-2 border-green-600 bg-green-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-green-900">Partner Benefits</h2>
                  <span className="inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    Exclusive Discount
                  </span>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                  <span>🏪</span>
                  <span>John Lewis & Waitrose Partners</span>
                </button>
                <p className="text-xs text-green-800 text-center">
                  Special pricing for our retail partners
                </p>
              </div>

              {/* Partner Organizations */}
              <div className="w-full flex flex-col gap-3 p-6 rounded-xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-amber-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-blue-900">Sponsored Access</h2>
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-amber-600 px-3 py-1 text-xs font-semibold text-white">
                    Full Access
                  </span>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <span>🤝</span>
                  <span>Partner Organizations</span>
                </button>
                <p className="text-xs text-blue-800 text-center">
                  Access with your organization&apos;s sponsor code
                </p>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-text-secondary">
                <p>By continuing, you agree to our</p>
                <div className="mt-1 flex items-center justify-center gap-4">
                  <a className="font-medium text-accent-teal hover:text-teal-500" href="#">Terms of Service</a>
                  <span className="text-text-tertiary">·</span>
                  <a className="font-medium text-accent-teal hover:text-teal-500" href="#">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
