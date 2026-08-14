import type { NextConfig } from "next";

const noIndexHeader = { key: "X-Robots-Tag", value: "noindex, follow" };

const wordpressMediaHost = (() => {
  try {
    return process.env.WORDPRESS_GRAPHQL_ENDPOINT ? new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).hostname : "cms.tecmambo.com";
  } catch {
    return "cms.tecmambo.com";
  }
})();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd().replace(/\/apps\/web$/, "")
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "fdn2.gsmarena.com"
      },
      {
        protocol: "https",
        hostname: wordpressMediaHost
      }
    ],
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }
        ]
      },
      {
        source: "/:path*.md",
        headers: [noIndexHeader]
      },
      {
        source: "/:path*/feed.xml",
        headers: [noIndexHeader]
      },
      {
        source: "/:path*/feed.json",
        headers: [noIndexHeader]
      },
      {
        source: "/feed.xml",
        headers: [noIndexHeader]
      },
      {
        source: "/feed.json",
        headers: [noIndexHeader]
      },
      {
        source: "/llms.txt",
        headers: [noIndexHeader]
      },
      {
        source: "/glossary/llms.txt",
        headers: [noIndexHeader]
      },
      {
        source: "/glossary/sitemap.xml",
        headers: [noIndexHeader]
      },
      {
        source: "/api/markdown/:path*",
        headers: [noIndexHeader]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/reviews/samsung-galaxy-a37-5g-review",
        destination: "/explainers/samsung-galaxy-a37-5g-review",
        permanent: true
      }
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/about.md",
          destination: "/api/markdown/about"
        },
        {
          source: "/terms.md",
          destination: "/api/markdown/legal/terms"
        },
        {
          source: "/privacy.md",
          destination: "/api/markdown/legal/privacy"
        },
        {
          source: "/cookies.md",
          destination: "/api/markdown/legal/cookies"
        },
        {
          source: "/editorial-standards.md",
          destination: "/api/markdown/legal/editorial-standards"
        },
        {
          source: "/africa.md",
          destination: "/api/markdown/africa"
        },
        {
          source: "/africa/:country.md",
          destination: "/api/markdown/africa/:country"
        },
        {
          source: "/glossary/:slug.md",
          destination: "/api/markdown/glossary?slug=:slug"
        },
        {
          source: "/:section/:slug.md",
          destination: "/api/markdown/article?section=:section&slug=:slug"
        }
      ]
    };
  },
  devIndicators: false
};

export default nextConfig;
