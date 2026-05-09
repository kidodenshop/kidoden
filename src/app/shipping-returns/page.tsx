import Link from "next/link";

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="mb-8 border-b border-gray-100 pb-8">
          <Link href="/" className="text-brand-pink hover:text-brand-navy font-bold mb-6 inline-flex items-center gap-2 transition-colors">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-brand-navy mb-4 tracking-tight" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
            Shipping, Returns & Refunds
          </h1>
          <p className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">1. Shipping Policy</h2>
            <p>
              We know you can't wait to receive your Kidoden goodies! We strive to process and dispatch all orders within 1-3 business days. 
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li><strong>Standard Shipping:</strong> Usually takes 2-3 business days to arrive after dispatch.</li>
            </ul>
            <p className="mt-4">
              Once your order has shipped, you will receive order updates over WhatsApp so you can follow its journey.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">2. Returns Policy</h2>
            <p>
              We want you and your little ones to absolutely love your purchase. If for any reason you are not completely satisfied, we gladly accept returns of unworn, unwashed, and undamaged items with their original tags intact within 7 days of delivery.
            </p>
            <p className="mt-4">
              <strong>Items that cannot be returned:</strong>
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Sale or clearance items</li>
              <li>Undergarments or swimwear for hygiene reasons</li>
              <li>Customized or personalized products</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">3. Refunds</h2>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed and automatically applied to your original method of payment within 5-10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">4. Exchanges</h2>
            <p>
              If you need to exchange an item for a different size or color, the fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item. 
            </p>
            <p className="mt-4">
              For any questions or assistance with exchanges, all communication can easily be done over WhatsApp!
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">5. Damaged or Incorrect Items</h2>
            <p>
              If you receive a defective, damaged, or incorrect item, please contact us immediately at <strong>kidoden.shop@gmail.com</strong> with your order number and a photo of the item so we can make it right.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
