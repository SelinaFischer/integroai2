import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | IntegroAI Consulting</title>
        <meta 
          name="description" 
          content="Terms of Service for IntegroAI Consulting. Read our terms and conditions for using our AI consulting services and website." 
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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">Terms of Service</h1>
            
            <p className="text-muted-foreground mb-8">
              <strong>Last updated:</strong> January 2025
            </p>

            <div className="prose prose-lg max-w-none text-foreground">
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to IntegroAI Consulting. These Terms of Service (&quot;Terms&quot;) govern your use of our website at integroai.tech and any consulting services we provide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  IntegroAI Consulting provides AI strategy and consulting services for businesses, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>AI readiness assessments</li>
                  <li>AI strategy and roadmapping</li>
                  <li>Training and capability building</li>
                  <li>Implementation support</li>
                  <li>Ongoing advisory services</li>
                  <li>AI governance and ethics consulting</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Specific service terms, deliverables, and fees are agreed upon separately in individual service agreements.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">3. Use of Website</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Use the website in any way that violates applicable laws or regulations</li>
                  <li>Attempt to gain unauthorised access to any part of the website</li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Transmit any malicious code or harmful content</li>
                  <li>Collect or harvest user information without consent</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All content on this website, including text, graphics, logos, images, and software, is the property of IntegroAI Consulting or its content suppliers and is protected by intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent. Limited use for personal, non-commercial purposes is permitted with appropriate attribution.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">5. Consulting Services</h2>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Nature of Advice</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our consulting services provide strategic guidance and recommendations based on our professional expertise. The advice we provide is tailored to your specific situation based on information you provide to us.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Client Responsibilities</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information relevant to our engagement</li>
                  <li>Make timely decisions and provide feedback as requested</li>
                  <li>Designate appropriate personnel to work with our consultants</li>
                  <li>Pay fees as agreed in the service agreement</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Vendor-Agnostic Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  IntegroAI Consulting maintains a vendor-agnostic approach. We do not receive commissions or incentives from technology vendors, ensuring our recommendations are based solely on your best interests.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website and services are provided &quot;as is&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate and valuable advice, we do not guarantee specific business outcomes, ROI figures, or results from implementing our recommendations. Success depends on many factors beyond our control, including your implementation, market conditions, and organisational readiness.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To the maximum extent permitted by law, IntegroAI Consulting shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our total liability for any claims arising from our services shall not exceed the fees paid by you for the specific service giving rise to the claim.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">8. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We treat all client information as confidential. We will not disclose your business information, strategies, or data to third parties without your consent, except as required by law. Specific confidentiality terms may be outlined in individual service agreements.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless IntegroAI Consulting, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our website, breach of these Terms, or violation of any rights of a third party.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">10. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party websites is at your own risk.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">11. Modifications to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of Germany. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Germany.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">13. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  <strong>IntegroAI Consulting</strong><br />
                  Email:{" "}
                  <a href="mailto:info@integroai.tech" className="text-primary hover:underline">
                    info@integroai.tech
                  </a>
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

export default TermsOfService;
