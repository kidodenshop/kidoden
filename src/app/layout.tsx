import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kidoden | Made with love, for little ones",
    template: "%s | Kidoden",
  },
  description:
    "Kidoden is a premium store for kids clothing, jewellery, and nail accessories. Made with love, for little ones.",
  openGraph: {
    type: "website",
    siteName: "Kidoden",
    title: "Kidoden | Made with love, for little ones",
    description:
      "Kidoden is a premium store for kids clothing, jewellery, and nail accessories. Made with love, for little ones.",
    images: [{ url: "/brand_logo-new.png", width: 800, height: 400, alt: "Kidoden" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kidoden | Made with love, for little ones",
    description:
      "Kidoden is a premium store for kids clothing, jewellery, and nail accessories.",
    images: ["/brand_logo-new.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-brand-yellow selection:text-brand-navy">
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
