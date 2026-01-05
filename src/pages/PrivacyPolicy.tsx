import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | IntegroAI Consulting</title>
        <meta 
          name="description" 
          content="Privacy Policy for IntegroAI Consulting. Learn how we collect, use, and protect your personal data in compliance with GDPR." 
        />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main id="main-content" className="pt-24 lg:pt-32 pb-16 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">Privacy Policy</h1>
            
            <p className="text-muted-foreground mb-8">
              <strong>Last updated:</strong> January 2025
            </p>

            <div className="prose prose-lg max-w-none text-foreground">
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  IntegroAI Consulting (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website integroai.tech or use our services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">2. Data Controller</h2>
                <p className="text-muted-foreground leading-relaxed">
                  IntegroAI Consulting is the data controller responsible for your personal data. For any privacy-related inquiries, please contact us at{" "}
                  <a href="mailto:info@integroai.tech" className="text-primary hover:underline">
                    info@integroai.tech
                  </a>.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">3. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Information You Provide</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you use our contact form, we collect:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Telephone number</li>
                  <li>Company name</li>
                  <li>Message content (your inquiry)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you visit our website, we may automatically collect certain information including your IP address, browser type, device information, and pages visited. This data is collected to improve our website performance and user experience.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">4. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Responding to inquiries:</strong> To reply to your contact form submissions and provide the information or services you requested</li>
                  <li><strong>Service delivery:</strong> To provide AI consulting services if you become a client</li>
                  <li><strong>Communication:</strong> To send you relevant updates about our services (only with your consent)</li>
                  <li><strong>Website improvement:</strong> To analyse usage patterns and improve our website</li>
                  <li><strong>Legal compliance:</strong> To comply with applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">5. Legal Basis for Processing (GDPR)</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Under GDPR, we process your personal data based on:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Consent:</strong> When you submit our contact form, you consent to us processing your data to respond to your inquiry</li>
                  <li><strong>Legitimate interests:</strong> To improve our services and website functionality</li>
                  <li><strong>Contractual necessity:</strong> To fulfil our obligations when you engage our consulting services</li>
                  <li><strong>Legal obligations:</strong> To comply with applicable laws</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the following third-party services:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Formspree:</strong> Our contact form submissions are processed through Formspree. Please review their privacy policy at{" "}
                    <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      formspree.io/legal/privacy-policy
                    </a>
                  </li>
                  <li><strong>Calendly:</strong> For booking consultation calls. Their privacy policy is available at{" "}
                    <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      calendly.com/privacy
                    </a>
                  </li>
                  <li><strong>Tally:</strong> For our AI Readiness Audit form. Their privacy policy is available at{" "}
                    <a href="https://tally.so/help/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      tally.so/help/privacy-policy
                    </a>
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, typically no longer than 24 months after your last interaction with us. Contact form data is retained for the duration needed to respond to your inquiry and for a reasonable period thereafter for record-keeping purposes.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">8. Your Rights Under GDPR</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Right of access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Right to erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                  <li><strong>Right to restrict processing:</strong> Request limitation of how we use your data</li>
                  <li><strong>Right to data portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Right to object:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:info@integroai.tech" className="text-primary hover:underline">
                    info@integroai.tech
                  </a>.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">9. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Our website uses HTTPS encryption to secure data transmission.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">10. International Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data may be processed by third-party services located outside the European Economic Area (EEA). We ensure that any such transfers comply with GDPR requirements through appropriate safeguards such as Standard Contractual Clauses.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated revision date.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or wish to exercise your data protection rights, please contact us at:
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong>IntegroAI Consulting</strong><br />
                  Email:{" "}
                  <a href="mailto:info@integroai.tech" className="text-primary hover:underline">
                    info@integroai.tech
                  </a>
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You also have the right to lodge a complaint with a supervisory authority if you believe your data protection rights have been violated.
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default PrivacyPolicy;
