import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="mb-8 border-b border-gray-100 pb-8">
          <Link href="/" className="text-brand-pink hover:text-brand-navy font-bold mb-6 inline-flex items-center gap-2 transition-colors">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-brand-navy mb-4 tracking-tight" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
            Terms & Conditions
          </h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Introduction</h2>
            <p>
              Welcome to Kidoden. These terms and conditions outline the rules and regulations for the use of Kidoden's Website, located at kidoden.in.
            </p>
            <p className="mt-4">
              By accessing this website we assume you accept these terms and conditions. Do not continue to use Kidoden if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Products and Orders</h2>
            <p>
              All products listed on the website are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Returns and Refunds</h2>
            <p>
              Please review our separate Returns Policy which governs all return and refund requests. In general, items must be returned in their original condition within the specified timeframe to be eligible for a refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">4. User Comments and Feedback</h2>
            <p>
              Certain parts of this website offer the opportunity for users to post and exchange opinions and information. Kidoden does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Kidoden, its agents and/or affiliates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Contact Us</h2>
            <p>
              If you have any queries regarding any of our terms, please contact us at <strong>kidoden.shop@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
