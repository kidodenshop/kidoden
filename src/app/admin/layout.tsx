"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

interface AdminLayoutProps {
  children: React.ReactNode;
}

import { AdminLoaderProvider, useAdminLoader } from "@/context/AdminLoaderContext";

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminLoaderProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminLoaderProvider>
  );
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { setIsPending, setPendingMessage } = useAdminLoader();

  // Reset loader on route changes
  useEffect(() => {
    setIsPending(false);
  }, [pathname, setIsPending]);

  // If we are on the login page, don't show the dashboard layout
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      ),
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      ),
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375m3 2.25H6.75A2.25 2.25 0 0 1 4.5 15V6A2.25 2.25 0 0 1 6.75 3.75h9.75A2.25 2.25 0 0 1 18.75 6v11.25a2.25 2.25 0 0 1-2.25 2.25Z" />
        </svg>
      ),
    },
    {
      name: "Customers",
      href: "/admin/customers",
      badge: "Soon",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 10.052 20.25a11.38 11.38 0 0 1-4.954-1.013v-.109A4.125 4.125 0 0 1 12.63 16.63a9.06 9.06 0 0 0 1.584.22c.264.015.528.022.787.022Zm0-12.878a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM2.25 18a2.25 2.25 0 0 1 2.25-2.25c.89 0 1.738.261 2.457.712M9 7.875a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />
        </svg>
      ),
    },
  ];

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out of the control panel?")) {
      setLoggingOut(true);
      setPendingMessage("Signing you out of Kidoden Control Panel...");
      setIsPending(true);
      try {
        const res = await fetch("/api/admin/logout", { method: "POST" });
        if (res.ok) {
          router.push("/admin");
          router.refresh();
        }
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        setIsPending(false);
        setLoggingOut(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-brand-mint/20 z-20">
        <Link href="/admin/dashboard" className="flex items-center">
          <div className="relative w-28 h-10">
            <Image src="/brand_logo-new.png" alt="Kidoden Logo" fill className="object-contain" />
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-brand-navy p-2 hover:bg-brand-pink/10 rounded-xl transition-all"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 bg-white border-r border-brand-mint/25 flex flex-col justify-between py-8 px-6 shadow-xl shadow-brand-navy/2`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="hidden md:flex flex-col items-center pb-4 border-b border-brand-mint/15">
            <Link href="/admin/dashboard" className="relative w-40 h-16 transform hover:scale-105 transition-transform">
              <Image src="/brand_logo-new.png" alt="Kidoden Logo" fill className="object-contain" priority />
            </Link>
            <span className="text-[10px] font-black tracking-widest text-brand-navy/50 uppercase mt-2">
              Control Panel
            </span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const isComingSoon = item.badge === "Soon";
              return (
                <Link
                  key={item.name}
                  href={isComingSoon ? "#" : item.href}
                  onClick={(e) => {
                    if (isComingSoon) {
                      e.preventDefault();
                      alert(`${item.name} module is coming soon!`);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${
                    isActive
                      ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/15 scale-[1.02]"
                      : "text-brand-navy/70 hover:text-brand-navy hover:bg-brand-mint/10"
                  } ${isComingSoon ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={isActive ? "text-brand-yellow" : "text-brand-navy/50 group-hover:text-brand-navy/80"}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-black tracking-widest uppercase bg-brand-pink/10 text-brand-pink px-2.5 py-1 rounded-lg">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Operations */}
        <div className="space-y-4 pt-6 border-t border-brand-mint/15">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-xs text-brand-navy/60 hover:text-brand-navy transition-all"
          >
            <svg className="w-5 h-5 text-brand-navy/40" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a1.125 1.125 0 0 1-1.645 1.537L12.75 6.8v11.666c0 .334-.148.65-.405.864l-4.03 3.359a1.125 1.125 0 0 1-1.645-1.537l2.78-2.529V6.8L6.67 9.328a1.125 1.125 0 0 1-1.645-1.537l4.03-3.359a1.125 1.125 0 0 1 .405-.864v-.568A11.963 11.963 0 0 0 12 3c.254 0 .506.01.75.03ZM21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z" />
            </svg>
            View Live Site
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-xs text-brand-red bg-brand-red/5 hover:bg-brand-red/10 transition-all border border-brand-red/15 active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-5 h-5 text-brand-red/70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 px-6 py-8 md:p-10 lg:p-12 overflow-y-auto max-w-7xl mx-auto w-full relative z-10">
        {children}
      </main>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-brand-navy/20 backdrop-blur-xs z-10 md:hidden animate-fade-in"
        />
      )}
    </div>
  );
}
