import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export const metadata: Metadata = {
  title: "Terms of Service | Disability Sports Channel",
  description: "Terms and conditions for using the Disability Sports Channel website and services.",
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <div className="bg-black min-h-screen text-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-white">Terms and Conditions</h1>

          <div className="prose prose-lg max-w-none prose-invert">
            <p className="text-white">
              Welcome to Disability Sports Channel ("we," "our," or "us"). These Terms and Conditions ("Terms") govern
              your access to and use of the Disability Sports Channel website, mobile applications, and any associated
              online services (collectively, "the Website"). By accessing or using the Website, you agree to comply with
              these Terms and to be bound by them. If you do not agree to these Terms, please do not use the Website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Eligibility</h2>
            <p className="text-white">
              <strong className="text-white">Age Requirement:</strong> You must be at least 18 years old or have the
              legal capacity to enter into a contract under the laws of the UK to use this Website. If you are under 18,
              you may use the Website only with the consent of a parent or legal guardian, who agrees to be bound by
              these Terms on your behalf. The parent or guardian must be the sole owner of any Disability Sports Channel
              (DSC) memberships, purchases, or other services related to the Website and assume full responsibility for
              all financial transactions made under their account.
            </p>

            <p className="text-white">
              <strong className="text-white">Jurisdiction:</strong> This Website is intended for users located in the
              UK. If you are accessing the Website from outside the UK, you are responsible for ensuring that your use
              of the Website complies with the laws and regulations of the jurisdiction in which you are located. We
              make no representation that the Website is appropriate or available for use in other locations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. Account Registration</h2>
            <p className="text-white">
              <strong className="text-white">Account Creation:</strong> To access certain features, you may be required
              to create an account by providing accurate and current information. You are responsible for keeping your
              account information secure.
            </p>

            <p className="text-white">
              <strong className="text-white">Account Security:</strong> You are responsible for maintaining the
              confidentiality of your account credentials. Notify us immediately if you believe that your account has
              been compromised.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. Use of the Website</h2>
            <p className="text-white">
              <strong className="text-white">Permitted Use:</strong> You may use the Website for personal,
              non-commercial purposes only. You must not use the Website in any manner that could damage, disable, or
              impair the Website or interfere with the use and enjoyment of the Website by others.
            </p>

            <p className="text-white">
              <strong className="text-white">Prohibited Activities:</strong> You agree not to engage in any activities
              such as hacking, phishing, distributing malware, or any other illegal or harmful actions that could
              compromise the Website's functionality or security.
            </p>

            <p className="text-white">
              <strong className="text-white">Access Restrictions:</strong> We reserve the right to restrict or suspend
              your access to the Website at any time, without notice, if we believe you have violated these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Intellectual Property Rights</h2>
            <p className="text-white">
              <strong className="text-white">Ownership of Content:</strong> All content on the Website, including text,
              images, videos, logos, and trademarks, is protected by copyright and intellectual property laws in the UK
              and internationally. You may not copy, reproduce, or distribute any content from the Website without our
              express written permission.
            </p>

            <p className="text-white">
              <strong className="text-white">User-Generated Content:</strong> If you upload content (e.g., videos,
              photos, comments) to the Website, you retain ownership of your content. However, by submitting content,
              you grant us a non-exclusive, royalty-free license to use, display, and distribute the content within the
              Website and as part of our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Privacy and Data Protection</h2>
            <p className="text-white">
              <strong className="text-white">Privacy Policy:</strong> Your use of the Website is governed by our
              [Privacy Policy], which explains how we collect, store, and protect your personal information. By using
              the Website, you consent to the processing of your personal data in accordance with our Privacy Policy.
            </p>

            <p className="text-white">
              <strong className="text-white">GDPR Compliance:</strong> We comply with the UK General Data Protection
              Regulation (GDPR) and the Data Protection Act 2018. You have rights over your personal data, including the
              right to access, correct, or request the deletion of your personal information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Accessibility</h2>
            <p className="text-white">
              We are committed to making our Website accessible to users with disabilities. If you experience any
              difficulties in using our Website or have suggestions for improving accessibility, please contact us.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Subscription and Payments</h2>
            <p className="text-white">
              <strong className="text-white">Subscription Services:</strong> Some parts of the Website may require a
              paid subscription or payment for access to exclusive content or services. By subscribing, you agree to the
              payment terms presented at the time of purchase.
            </p>

            <p className="text-white">
              <strong className="text-white">Billing:</strong> Payments are processed securely, and you are responsible
              for all fees associated with your subscription.
            </p>

            <p className="text-white">
              <strong className="text-white">Cancellation and Refunds:</strong> You may cancel your subscription at any
              time. If you are a consumer in the UK, you have the right to cancel your subscription within 14 days of
              purchase, provided the service has not been fully performed within that time frame.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. Termination</h2>
            <p className="text-white">
              <strong className="text-white">Termination by Us:</strong> We reserve the right to suspend or terminate
              your access to the Website at our discretion, particularly if we believe you have violated these Terms.
            </p>

            <p className="text-white">
              <strong className="text-white">Termination by You:</strong> You may terminate your account at any time by
              following the account deletion instructions on the Website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. Disclaimers</h2>
            <p className="text-white">
              <strong className="text-white">No Warranty:</strong> The Website is provided "as is" without any
              warranties, express or implied. We do not guarantee the accuracy, reliability, or completeness of the
              content provided, nor that the Website will be uninterrupted or error-free.
            </p>

            <p className="text-white">
              <strong className="text-white">Availability:</strong> We do not guarantee the availability or
              accessibility of the Website at all times, and we reserve the right to modify or discontinue any part of
              the Website without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">10. Limitation of Liability</h2>
            <p className="text-white">
              <strong className="text-white">General Limitation:</strong> To the fullest extent permitted by law, we are
              not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use
              of the Website, including but not limited to loss of data or revenue.
            </p>

            <p className="text-white">
              <strong className="text-white">Maximum Liability:</strong> Our maximum liability to you for any claims
              arising from your use of the Website shall not exceed the amount you have paid for the services or
              products in the 12 months prior to the incident giving rise to the claim.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">11. Indemnification</h2>
            <p className="text-white">
              You agree to indemnify and hold harmless Disability Sports Channel, its affiliates, officers, employees,
              and agents from any claims, damages, or liabilities arising from your use of the Website, your violation
              of these Terms, or your infringement of any third-party rights.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">12. Changes to These Terms</h2>
            <p className="text-white">
              We reserve the right to update or modify these Terms at any time. Any changes will be posted on this page
              with an updated "Effective Date." By continuing to use the Website after any changes, you agree to be
              bound by the updated Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">13. Governing Law</h2>
            <p className="text-white">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales, without
              regard to its conflict of law principles. Any disputes arising out of or in connection with these Terms
              shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">14. Consumer Rights</h2>
            <p className="text-white">
              If you are a consumer in the UK, you have certain statutory rights under UK law, including the right to a
              refund, repair, or replacement for faulty goods or services.
            </p>

            <p className="text-white">
              You also have the right to cancel certain contracts, such as subscriptions, within 14 days from the date
              of purchase, unless the service has already been fully provided with your consent.
            </p>

            <p className="text-white">
              For more information on your consumer rights, you can visit the UK government's Consumer Rights page.
            </p>
          </div>
        </div>
      </div>
      <EnhancedFooter />
    </>
  )
}
