import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex h-full min-h-screen grow">
        <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
          {/* Left Side - Hero Section with Warm Background */}
          <div className="relative flex flex-col items-start justify-between p-8 md:p-12 lg:p-16">
            
            <header className="z-10 w-full">
              <div className="flex items-center gap-3">
                <div className="text-3xl">📚</div>
              </div>
            </header>
            
            <main className="z-10 flex flex-col items-start justify-center text-left">
              <h1 className="text-text-primary tracking-tight text-5xl font-black leading-tight pb-4">
                Introduction to AI
              </h1>
              <p className="text-text-secondary text-xl font-medium leading-relaxed max-w-md">
                Sign in to begin your 30-day journey.
              </p>
            </main>
            
            <footer className="z-10 w-full text-left text-sm text-text-tertiary">
              <p>© 2026 Wacky Works Digital. All rights reserved.</p>
            </footer>
          </div>

          {/* Right Side - Login Forms with Glass Cards */}
          <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 overflow-y-auto">
            <div className="flex w-full max-w-md flex-col items-center gap-6">
              
              {/* General Access Card - Frosted Glass */}
              <div className="w-full card-neumorphic rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-text-primary">General Access</h2>
                </div>
                
                <form
                  action={async () => {
                    "use server"
                    await signIn("google", { redirectTo: "/dashboard" })
                  }}
                  className="w-full mb-4"
                >
                  <button
                    type="submit"
                    className="glass-mint flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold text-text-primary"
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

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-text-tertiary/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-surface px-3 text-text-secondary font-medium">or</span>
                  </div>
                </div>

                <button
                  disabled
                  className="glass-inset flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-semibold text-text-tertiary cursor-not-allowed"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"></path>
                  </svg>
                  <span>Email (Coming Soon)</span>
                </button>
              </div>

              {/* John Lewis & Waitrose Partners - Sage Green Glass */}
              <div className="w-full glass-sage rounded-3xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-text-primary">Partner Benefits</h2>
                  <span className="badge-glass text-sage-green">
                    Exclusive Discount
                  </span>
                </div>
                <button className="btn-neumorphic flex w-full items-center justify-center rounded-2xl px-6 py-4 text-base font-bold text-text-primary mb-3">
                  John Lewis & Waitrose Partners
                </button>
                <p className="text-xs text-text-secondary text-center font-medium">
                  Special pricing for our retail partners
                </p>
              </div>

              {/* Partner Organizations - Lavender/Blue Glass */}
              <div className="w-full glass-lavender rounded-3xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-text-primary">Sponsor Access</h2>
                  <span className="badge-glass text-lavender">
                    Full Access
                  </span>
                </div>
                <button className="btn-neumorphic flex w-full items-center justify-center rounded-2xl px-6 py-4 text-base font-bold text-text-primary mb-3">
                  Partner Organizations
                </button>
                <p className="text-xs text-text-secondary text-center font-medium">
                  Access with your organization&apos;s sponsor code
                </p>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-text-secondary mt-4">
                <p className="mb-2">By continuing, you agree to our</p>
                <div className="flex items-center justify-center gap-3">
                  <a className="font-semibold text-text-primary hover:text-sage-green transition-colors" href="#">Terms of Service</a>
                  <span className="text-text-tertiary">·</span>
                  <a className="font-semibold text-text-primary hover:text-sage-green transition-colors" href="#">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
