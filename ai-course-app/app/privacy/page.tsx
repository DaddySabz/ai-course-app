export default function PrivacyPage() {
  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        <div className="glass-sage rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl font-black text-text-primary mb-6">Privacy Policy</h1>
          <p className="text-sm text-text-secondary mb-8">Last updated: November 20, 2025</p>

          <div className="space-y-8 text-text-primary">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-text-secondary leading-relaxed">
                Wacky Works Digital ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you use our Introduction to AI course ("Service").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-4">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li><strong>Account Information:</strong> Name, email address, profile picture (when using Google OAuth)</li>
                <li><strong>Password:</strong> Encrypted password (when using email/password login)</li>
                <li><strong>Partner Information:</strong> Organization name, partner code, contact details (for partner access)</li>
                <li><strong>Profile Updates:</strong> Custom profile picture, display name changes</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li><strong>Course Progress:</strong> Lessons completed, completion dates, certificate generation</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the platform</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Affiliate Link Clicks:</strong> Tracking of external link interactions for progress monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-text-secondary leading-relaxed mb-4">We use collected information for:</p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li>Providing and maintaining the Service</li>
                <li>Managing your account and authentication</li>
                <li>Tracking course progress and unlocking lessons</li>
                <li>Generating completion certificates</li>
                <li>Communicating with you about the course</li>
                <li>Processing partner and enterprise access</li>
                <li>Improving our Service and user experience</li>
                <li>Affiliate program tracking and commission attribution</li>
                <li>Detecting and preventing fraud or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-4">4.1 Authentication</h3>
              <p className="text-text-secondary leading-relaxed">
                We use <strong>Google OAuth</strong> for authentication. When you sign in with Google, we receive basic profile 
                information (name, email, profile picture) as authorized by you. Please review{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline hover:text-sage-green transition-colors">Google's Privacy Policy</a>.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">4.2 Database and Storage</h3>
              <p className="text-text-secondary leading-relaxed">
                We use <strong>Supabase</strong> for data storage and management. Your data is stored securely with encryption. 
                Please review{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline hover:text-sage-green transition-colors">Supabase's Privacy Policy</a>.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">4.3 Hosting</h3>
              <p className="text-text-secondary leading-relaxed">
                Our Service is hosted on <strong>Vercel</strong>. Please review{' '}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline hover:text-sage-green transition-colors">Vercel's Privacy Policy</a>.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">4.4 Affiliate Links</h3>
              <p className="text-text-secondary leading-relaxed">
                The course includes affiliate links to third-party AI tools and services. When you click these links, the third 
                party may collect information according to their own privacy policies. We are not responsible for third-party 
                privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-text-secondary leading-relaxed mb-4">We do not sell your personal information. We may share your information:</p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
                <li><strong>Partner Organizations:</strong> When accessing through partner codes, we may share contact information with the partner organization</li>
                <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our Service (Google, Supabase, Vercel)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <p className="text-text-secondary leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4 mt-4">
                <li>Password encryption using bcrypt</li>
                <li>Secure HTTPS connections</li>
                <li>Regular security updates and monitoring</li>
                <li>Access controls and authentication</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Your Rights and Choices</h2>
              <p className="text-text-secondary leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update your profile information at any time</li>
                <li><strong>Deletion:</strong> Request deletion of your account and personal data</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:hello@wearewacky.com" className="text-text-primary font-bold underline hover:text-sage-green transition-colors">hello@wearewacky.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
              <p className="text-text-secondary leading-relaxed">
                We use cookies and similar technologies for authentication, session management, and tracking course progress. 
                We use NextAuth for session management. You can control cookies through your browser settings, but disabling 
                them may affect functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-text-secondary leading-relaxed">
                Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information 
                from children under 13. If you believe we have collected information from a child under 13, please contact us 
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. International Data Transfers</h2>
              <p className="text-text-secondary leading-relaxed">
                Your information may be transferred to and maintained on servers located outside of your country. By using our 
                Service, you consent to the transfer of information to countries that may have different data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Data Retention</h2>
              <p className="text-text-secondary leading-relaxed">
                We retain your personal information for as long as necessary to provide the Service and fulfill the purposes 
                outlined in this Privacy Policy. You may request deletion at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated 
                "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <p className="text-text-secondary leading-relaxed mt-4">
                <strong>Email:</strong>{' '}
                <a href="mailto:hello@wearewacky.com" className="text-text-primary font-bold underline hover:text-sage-green transition-colors">hello@wearewacky.com</a><br/>
                <strong>WhatsApp:</strong>{' '}
                <a href="https://wa.me/447460460318" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline hover:text-sage-green transition-colors">+44 7460 460318</a><br/>
                <strong>Website:</strong>{' '}
                <a href="https://wearewacky.com" target="_blank" rel="noopener noreferrer" className="text-text-primary font-bold underline hover:text-sage-green transition-colors">wearewacky.com</a>
              </p>
            </section>

            <section className="mt-8 p-6 glass-blue rounded-2xl">
              <h3 className="text-lg font-bold mb-2">GDPR Compliance</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). 
                You have additional rights including the right to lodge a complaint with a supervisory authority.
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

