export default function TermsPage() {
  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        <div className="glass-blue rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-black text-text-primary mb-6">Terms of Service</h1>
          <p className="text-sm text-text-secondary mb-8">Last updated: November 20, 2025</p>

          <div className="space-y-8 text-text-primary">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                By accessing and using the Introduction to AI course ("Service") provided by Wacky Works Digital ("we," "us," or "our"), 
                you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Course Access and Content</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The Service provides a 30-day educational course on artificial intelligence. Access to the course is granted upon successful 
                registration and payment (where applicable).
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li>Course content is for personal, non-commercial use only</li>
                <li>You may not share, distribute, or reproduce course materials without written permission</li>
                <li>We reserve the right to modify or update course content at any time</li>
                <li>Partner and enterprise access terms may vary based on specific agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                To access the Service, you may need to create an account using:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li>Google OAuth authentication</li>
                <li>Email and password credentials</li>
                <li>Partner access codes (for eligible users)</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Affiliate Links and Third-Party Services</h2>
              <p className="text-text-secondary leading-relaxed">
                The course includes affiliate links and references to third-party AI tools and services. We may earn commissions 
                from qualifying purchases or sign-ups. We are not responsible for the content, products, or services provided by 
                third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Payment and Refunds</h2>
              <p className="text-text-secondary leading-relaxed">
                Pricing varies based on access type (general access, partner benefits, enterprise access). Payment terms and 
                refund policies will be clearly communicated at the time of purchase. Beta testing period may include promotional 
                pricing or free access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-text-secondary leading-relaxed">
                All course content, including but not limited to text, images, videos, and course structure, is the intellectual 
                property of Wacky Works Digital and is protected by copyright laws. Unauthorized use, reproduction, or distribution 
                is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Certificates</h2>
              <p className="text-text-secondary leading-relaxed">
                Upon successful completion of all 30 lessons, users may receive a digital certificate of completion. Certificates 
                are for personal achievement recognition and do not constitute professional accreditation or certification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Prohibited Conduct</h2>
              <p className="text-text-secondary leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Share your account credentials with others</li>
                <li>Scrape, copy, or redistribute course content</li>
                <li>Interfere with or disrupt the Service or servers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-text-secondary leading-relaxed">
                To the maximum extent permitted by law, Wacky Works Digital shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or 
                indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon 
                posting to the website. Your continued use of the Service after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard 
                to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-text-secondary leading-relaxed mt-4">
                <strong>Email:</strong> hello@wearewacky.com<br/>
                <strong>Website:</strong> wearewacky.com
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-text-tertiary/20">
            <a 
              href="/login" 
              className="btn-neumorphic inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-bold text-text-primary"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

