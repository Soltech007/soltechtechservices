// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./nprogress.css";
import { Toaster } from "@/components/ui/toaster";
import { ProgressBar } from "@/components/ProgressBar";

const siteConfig = {
  name: "SoltechTechServices Pvt. Ltd.",
  description: "Leading Civil Engineering Contractor for Road and Building Works since 35+ years. Specializing in Border Infrastructure, CPWD Projects across Gujarat, Rajasthan, J&K and Ladakh.",
  url: "https://ant-silk.vercel.app",
  keywords: [
    "road construction company ahmedabad",
    "civil contractor gujarat",
    "border infrastructure contractor india",
    "CPWD contractor",
    "road contractor rajasthan",
    "government contractor",
    "infrastructure company gujarat",
    "NBCC contractor",
    "highway construction company"
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1D4ED8" },
    { media: "(prefers-color-scheme: dark)", color: "#1D4ED8" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "",
    template: "%s  SoltechTechServices",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "SoltechTechServices Pvt. Ltd." }],
  creator: "SoltechTechServices",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "SoltechTechServices - Infrastructure Company",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/.ico", type: "image/x-icon" },
      { url: "/icon1.png", type: "image/png", sizes: "32x32" },
      { url: "/icon1.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/icon1.png"],
    apple: [
      { url: "/icon1.png", sizes: "64x64", type: "image/png" },
    ],
  },
};

// Schema objects
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "SoltechTechServices Pvt. Ltd.",
  alternateName: "SoltechTechServices",
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon1.png`,
  description: siteConfig.description,
  foundingDate: "1989",
  address: {
    "@type": "PostalAddress",
    streetAddress: "506, 5th floor, Aagam Avenue, Acher, Sabarmati",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380005",
    addressCountry: "IN"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-79357-03085",
    contactType: "customer service",
    email: "atinfracon@gmail.com",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "gu"]
  },
  sameAs: [
    "https://www.linkedin.com/company/atinfracon"
  ],
  areaServed: ["Gujarat", "Rajasthan", "Jammu & Kashmir", "Ladakh"]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteConfig.url,
  name: "SoltechTechServices",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* ❌ REMOVE <head> tag completely */}
      <body className="font-body bg-background text-foreground antialiased">
        
        {/* ✅ Google Tag Manager (Main Script) */}
        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T7CKJM9S');`,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}

        {/* Schema Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
          suppressHydrationWarning
        />
        
        <ProgressBar />
        {children}
        <Toaster />

        {/* ✅ Google Tag Manager (noscript fallback) */}
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7CKJM9S"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

      </body>
    </html>               
  );
}
