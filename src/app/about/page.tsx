import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fffbf9] overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-5%] left-[-10%] w-96 h-96 bg-brand-mint/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[30%] right-[-10%] w-96 h-96 bg-brand-pink/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-brand-yellow/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Link href="/" className="text-brand-pink hover:text-brand-navy font-bold mb-8 inline-flex items-center gap-2 transition-colors">
            &larr; Back to Home
          </Link>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-brand-navy mb-6 tracking-tight" style={{ fontFamily: 'var(--font-quicksand), sans-serif' }}>
            About Kidoden
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            Made with love, for little ones.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="relative">
            {/* Image Container with Glassmorphism Border */}
            <div className="relative rounded-[3rem] bg-white/40 backdrop-blur-sm p-4 shadow-xl border border-white/50 transform transition-transform hover:-translate-y-2 duration-500">
              <div className="relative h-96 sm:h-[500px] w-full rounded-[2.5rem] overflow-hidden">
                {/* Use the hero image as a placeholder for the About page */}
                <Image 
                  src="/hero-image.png" 
                  alt="Happy Kids with Kidoden" 
                  fill 
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl shadow-brand-navy/5 border border-brand-mint/20 animate-float hidden sm:block">
              <p className="text-4xl">👶✨</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-white/50">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Welcome to Kidoden, India's premium destination for beautifully curated children's essentials. We started with a simple belief: that finding high-quality, stylish, and comfortable products for your little ones shouldn't be a challenge. 
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-white/50">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">What We Do</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We thoughtfully curate a wide range of premium kids clothing, delicate jewellery, adorable nail accessories, and complete newborn gift sets. Every piece in our collection is selected with love, ensuring it meets our high standards for comfort, safety, and style.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-brand-mint/20 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-brand-mint/20 text-brand-mint rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">Made with Love</h3>
            <p className="text-gray-600">Every item is thoughtfully selected with the same care we would give our own children.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-brand-yellow/20 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-brand-yellow/20 text-brand-yellow rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">Premium Quality</h3>
            <p className="text-gray-600">We never compromise on quality. Only the softest, safest materials make the cut.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-brand-pink/20 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto bg-brand-pink/20 text-brand-pink rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">Customer First</h3>
            <p className="text-gray-600">Your satisfaction is our priority. That's why we're always just a WhatsApp message away.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
