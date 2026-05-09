import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="mb-8 border-b border-gray-100 pb-8">
          <Link href="/" className="text-brand-pink hover:text-brand-navy font-bold mb-6 inline-flex items-center gap-2 transition-colors">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-brand-navy mb-4 tracking-tight" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Introduction</h2>
            <p>
              Welcome to Kidoden. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at kidoden.shop@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, or when you contact us via WhatsApp or email.
            </p>
            <p className="mt-4">
              The personal information that we collect depends on the context of your interactions with us and may include the following:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>
              <li>Shipping/Billing addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our website for a variety of business purposes described below:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>To fulfill and manage your orders.</li>
              <li>To deliver and facilitate delivery of services/products to the user.</li>
              <li>To respond to user inquiries and offer support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations (e.g., sharing your address with our delivery partners).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Contact Us</h2>
            <p>
              If you have questions or comments about this notice, you may email us at <strong>kidoden.shop@gmail.com</strong> or by post to our registered location in India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
