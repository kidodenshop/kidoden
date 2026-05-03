import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

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
    <html lang="en" className={`${nunito.variable} ${quicksand.variable} h-full antialiased`}>
      <body className={`${nunito.className} min-h-full flex flex-col font-sans`}>
        {/* Coming Soon Mode — Header & Footer hidden until launch */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
