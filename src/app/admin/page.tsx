"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAdminLoader } from "@/context/AdminLoaderContext";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { setIsPending, setPendingMessage } = useAdminLoader();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setPendingMessage("Authenticating admin credentials...");
    setIsPending(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const redirectPath = searchParams.get("redirect") || "/admin/dashboard";
        router.push(redirectPath);
        router.refresh();
      } else {
        setError(data.error || "Invalid username or password");
        setIsPending(false); // only disable if we are staying on this page
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsPending(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[80px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-yellow/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: "-3s" }} />

      <div className="w-full max-w-md z-10 animate-fade-in">
        {/* Logo Container */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-20 mb-2 transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/brand_logo-new.png"
              alt="Kidoden Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xs font-black tracking-widest text-brand-navy/60 uppercase">
            Control Center
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-brand-mint/20 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-brand-navy/5">
          <h2 className="text-2xl font-black text-brand-navy mb-2 tracking-tight">
            Welcome back!
          </h2>
          <p className="text-sm font-semibold text-brand-navy/60 mb-6">
            Sign in to manage the shop catalog and inventory.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 bg-brand-red/10 border border-brand-red/30 rounded-2xl text-xs font-bold text-brand-red animate-scale-up">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-semibold text-brand-navy text-sm placeholder-brand-navy/30"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-black text-brand-navy uppercase tracking-widest mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/50 border border-brand-navy/10 rounded-2xl focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all font-semibold text-brand-navy text-sm placeholder-brand-navy/30"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-navy/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
