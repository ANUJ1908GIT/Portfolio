import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/data";
import { TerminalHint } from "@/components/TerminalHint";
import "./globals.css";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allows pinch-zoom for accessibility - don't lock this to 1
  themeColor: "#000000", // matches your dark theme, colors the mobile browser bar
};
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Anuj Agrawal | Developer",
  description: "Full Stack Developer, UI/UX Designer & AI Enthusiast building digital experiences that feel as good as they look.",
  authors: [{ name: "Anuj Agrawal" }],
  openGraph: {
    title: "Anuj Agrawal - Full Stack Developer & UI/UX Designer",
    description: "Full Stack Developer, UI/UX Designer & AI Enthusiast building digital experiences that feel as good as they look.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Agrawal - Full Stack Developer & UI/UX Designer",
    description: "Full Stack Developer, UI/UX Designer & AI Enthusiast building digital experiences that feel as good as they look.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: siteConfig.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
    },
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.twitter],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <TerminalHint />
      </body>
    </html>
  );
}