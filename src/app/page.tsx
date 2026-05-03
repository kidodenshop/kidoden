"use client";

import { useState } from "react";
import Image from "next/image";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        .cs-page {
          min-height: 100dvh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fffbf9 0%, #fde8f0 30%, #e8f6f5 60%, #fef6e4 100%);
          font-family: 'Nunito', sans-serif;
          padding: 2rem 1rem;
        }

        .cs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: blobFloat 8s ease-in-out infinite;
        }
        .cs-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #f0959f, #fbcd6a);
          top: -200px; left: -200px;
          animation-delay: 0s;
        }
        .cs-blob-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #8bcbc8, #aea3cc);
          bottom: -150px; right: -150px;
          animation-delay: -4s;
        }
        .cs-blob-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #fbcd6a, #f0959f);
          top: 40%; left: 60%;
          animation-delay: -2s;
        }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        .cs-float {
          position: absolute;
          animation: floatUp 6s ease-in-out infinite;
          pointer-events: none;
          user-select: none;
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }

        .cs-card {
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: 2.5rem;
          padding: 3rem 2.5rem;
          max-width: 680px;
          width: 100%;
          box-shadow:
            0 8px 32px rgba(240,149,159,0.18),
            0 2px 8px rgba(26,66,99,0.08),
            inset 0 1px 0 rgba(255,255,255,0.9);
          text-align: center;
        }

        .cs-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #fde8f0, #fef6e4);
          border: 1px solid rgba(240,149,159,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #f0959f;
          margin-bottom: 1.25rem;
        }

        .cs-heading {
          font-size: clamp(2rem, 6vw, 3.25rem);
          font-weight: 900;
          color: #1a4263;
          line-height: 1.15;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .cs-heading .highlight {
          background: linear-gradient(135deg, #f0959f, #fbcd6a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cs-subheading {
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          color: #5a7a91;
          font-weight: 600;
          margin-bottom: 1.75rem;
          line-height: 1.6;
        }

        .cs-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 auto 1.75rem;
          max-width: 320px;
        }
        .cs-divider-line {
          flex: 1;
          height: 1.5px;
          background: linear-gradient(to right, transparent, rgba(240,149,159,0.4), transparent);
        }

        .cs-countdown {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .cs-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          min-width: 72px;
        }
        .cs-value {
          background: linear-gradient(135deg, #1a4263, #2a5f8f);
          color: #fbcd6a;
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 900;
          border-radius: 1rem;
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(26,66,99,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }
        .cs-label {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8ba3b5;
        }
        .cs-sep {
          font-size: 2rem;
          font-weight: 900;
          color: #f0959f;
          align-self: flex-start;
          margin-top: 14px;
          line-height: 1;
        }

        .cs-form {
          display: flex;
          gap: 0.5rem;
          max-width: 420px;
          margin: 0 auto 1.5rem;
          flex-wrap: wrap;
        }
        .cs-input {
          flex: 1;
          min-width: 200px;
          padding: 0.85rem 1.25rem;
          border-radius: 100px;
          border: 2px solid rgba(240,149,159,0.3);
          background: rgba(255,255,255,0.8);
          font-family: inherit;
          font-size: 0.95rem;
          color: #1a4263;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cs-input:focus {
          border-color: #f0959f;
          box-shadow: 0 0 0 4px rgba(240,149,159,0.15);
        }
        .cs-input::placeholder { color: #b0c4d0; }

        .cs-btn {
          padding: 0.85rem 1.5rem;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, #f0959f, #fbcd6a);
          color: white;
          font-family: inherit;
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
          box-shadow: 0 4px 16px rgba(240,149,159,0.4);
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .cs-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(240,149,159,0.5);
          filter: brightness(1.05);
        }
        .cs-btn:active { transform: translateY(0); }

        .cs-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #e8f6f5, #d4f1ef);
          border: 1.5px solid #8bcbc8;
          border-radius: 100px;
          padding: 0.85rem 1.75rem;
          color: #1a7c78;
          font-weight: 700;
          font-size: 0.95rem;
          max-width: 420px;
          margin: 0 auto 1.5rem;
          animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .cs-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .cs-social-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #8ba3b5;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .cs-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(240,149,159,0.25);
          color: #1a4263;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s, background 0.15s, color 0.15s;
          box-shadow: 0 2px 8px rgba(240,149,159,0.1);
        }
        .cs-social-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(240,149,159,0.3);
          background: linear-gradient(135deg, #f0959f, #fbcd6a);
          border-color: transparent;
          color: white;
        }
        .cs-social-link svg { width: 18px; height: 18px; fill: currentColor; }

        .cs-footer {
          font-size: 0.78rem;
          color: #b0c4d0;
          font-weight: 600;
        }
        .cs-footer a {
          color: #f0959f;
          text-decoration: none;
          font-weight: 700;
        }
        .cs-footer a:hover { text-decoration: underline; }

        .cs-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.65rem;
          margin-bottom: 1.75rem;
        }
        .cs-feature-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(240,149,159,0.2);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1a4263;
          box-shadow: 0 2px 6px rgba(240,149,159,0.1);
        }

        .cs-notify-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #8ba3b5;
          margin-bottom: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @media (max-width: 480px) {
          .cs-card { padding: 2rem 1.25rem; border-radius: 2rem; }
          .cs-unit { min-width: 60px; }
          .cs-value { width: 60px; height: 60px; font-size: 1.5rem; border-radius: 0.75rem; }
          .cs-form { flex-direction: column; align-items: stretch; }
          .cs-btn { width: 100%; }
          .cs-blob-1 { width: 300px; height: 300px; }
          .cs-blob-2 { width: 250px; height: 250px; }
          .cs-blob-3 { display: none; }
          .cs-float { display: none; }
        }
      `}</style>

      <div className="cs-page">
        {/* Background blobs */}
        <div className="cs-blob cs-blob-1" />
        <div className="cs-blob cs-blob-2" />
        <div className="cs-blob cs-blob-3" />

        {/* Floating decorations */}
        <span className="cs-float" style={{ top: "8%", left: "5%", animationDelay: "0s", fontSize: "2rem" }}>⭐</span>
        <span className="cs-float" style={{ top: "15%", right: "8%", animationDelay: "1s", fontSize: "1.5rem" }}>💛</span>
        <span className="cs-float" style={{ bottom: "20%", left: "7%", animationDelay: "2s", fontSize: "1.75rem" }}>✨</span>
        <span className="cs-float" style={{ bottom: "12%", right: "5%", animationDelay: "0.5s", fontSize: "2rem" }}>🌸</span>
        <span className="cs-float" style={{ top: "45%", left: "3%", animationDelay: "3s", fontSize: "1.25rem" }}>💕</span>
        <span className="cs-float" style={{ top: "60%", right: "4%", animationDelay: "1.5s", fontSize: "1.5rem" }}>🧸</span>

        {/* Main Card */}
        <div className="cs-card">
          {/* Logo */}
          <div className="cs-logo">
            <Image
              src="/logo/Brand_logo.png"
              alt="Kidoden"
              width={200}
              height={64}
              style={{ height: 64, width: "auto", objectFit: "contain" }}
              priority
            />
          </div>

          {/* Badge */}
          <div className="cs-badge">
            <span>🌟</span>
            Something magical is coming
          </div>

          {/* Heading */}
          <h1 className="cs-heading">
            We&apos;re getting<br />
            <span className="highlight">ready for you!</span>
          </h1>

          <p className="cs-subheading">
            Soft fabrics, safe accessories &amp; loads of love —<br />
            crafted for your little ones. Launching very soon! 🎀
          </p>

          {/* Category pills */}
          <div className="cs-features">
            <div className="cs-feature-pill"><span>👗</span> Kids Clothing</div>
            <div className="cs-feature-pill"><span>🎒</span> Kids Accessories</div>
            <div className="cs-feature-pill"><span>🍼</span> Newborn Essentials</div>
          </div>



          {/* Email signup */}
          <p className="cs-notify-label">Be the first to know 🎉</p>

          {submitted ? (
            <div className="cs-success">
              <span>🎀</span>
              <span>You&apos;re on the list! We&apos;ll notify you soon.</span>
            </div>
          ) : (
            <form className="cs-form" onSubmit={handleSubmit} id="notify-form">
              <input
                id="notify-email"
                type="email"
                className="cs-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button type="submit" className="cs-btn" id="notify-submit">
                Notify Me ✨
              </button>
            </form>
          )}

          {/* Social links */}
          <div className="cs-social">
            <span className="cs-social-label">Follow us</span>
            <a
              href="https://www.instagram.com/kidoden_"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-social-link"
              aria-label="Kidoden on Instagram"
              id="instagram-link"
            >
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a
              href="https://wa.me/918397970941?text=Hi%20Kidoden!%20I%27d%20love%20to%20know%20when%20you%20launch%20%F0%9F%8E%80"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-social-link"
              aria-label="Kidoden on WhatsApp"
              id="whatsapp-link"
            >
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
          </div>

          {/* Footer note */}
          <p className="cs-footer">
            Made with 💕 for little ones &nbsp;·&nbsp;{" "}
            <a href="mailto:kidoden.shop@gmail.com">kidoden.shop@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
}
