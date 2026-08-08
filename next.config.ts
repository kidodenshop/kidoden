import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com https://*.razorpay.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "connect-src 'self' https://api.razorpay.com https://*.razorpay.com https://vitals.vercel-insights.com;",
              "img-src 'self' data: blob: https://images.unsplash.com https://*.razorpay.com https://checkout.razorpay.com;",
              "font-src 'self' https://fonts.gstatic.com;",
              "frame-src 'self' https://checkout.razorpay.com https://*.razorpay.com;",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "manifest-src 'self';"
            ].join(" ")
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  }
};

export default nextConfig;

