// src/app/(site)/about/page.tsx
import { About } from '@/components/sections/about';
import { Metadata } from 'next';
import Script from 'next/script';

// SEO Metadata
export const metadata: Metadata = {
  title: 'About Us - 35+ Years of Excellence in Civil Engineering',
  description: 'SoltechTechServices Pvt. Ltd. - Leading Civil Engineering Contractor since 1989. 200+ skilled professionals, 100+ projects.',
  keywords: [
    'about SoltechTechServices',
    'civil engineering company ahmedabad',
    'infrastructure contractor since 1989',
    'road construction company gujarat',
    'border infrastructure specialist',
    'CPWD approved contractor',
    'NBCC contractor ahmedabad',
    'government contractor profile',
    'construction equipment fleet',
    'experienced civil contractor',
    'BSF infrastructure contractor',
    'ITBP road contractor',
    'desert construction expert',
    'high altitude construction'
  ],
  openGraph: {
    title: 'About SoltechTechServices - Engineering Infrastructure Since 1989',
    description: '35+ years of excellence | 200+ professionals | ₹161+ Cr turnover | Specialists in challenging terrains from deserts to high-altitude borders',
    url: 'https://ant-silk.vercel.app/about-us',
    siteName: 'SoltechTechServices Pvt. Ltd.',
    images: [
      {
        url: '/images/construction1.webp',
        width: 1200,
        height: 630,
        alt: 'SoltechTechServices - About Our Company',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SoltechTechServices - 35+ Years of Infrastructure Excellence',
    description: 'Leading Civil Engineering Contractor | CPWD, NBCC, BSF, ITBP Projects | Gujarat, Rajasthan, J&K, Ladakh',
    images: ['/images/construction1.webp'],
  },
  alternates: {
    canonical: 'https://ant-silk.vercel.app/about-us',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// About Page Schema
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About SoltechTechServices Pvt. Ltd.",
  "description": "Learn about SoltechTechServices's 35+ years journey in infrastructure development across Western India",
  "url": "https://ant-silk.vercel.app/about-us",
  "mainEntity": {
    "@type": "Organization",
    "name": "SoltechTechServices Pvt. Ltd.",
    "alternateName": "SoltechTechServices",
    "url": "https://ant-silk.vercel.app",
    "logo": "https://ant-silk.vercel.app/icon1.png",
    "foundingDate": "1989",
    "slogan": "Engineering Infrastructure. Building the Future.",
    "description": "Civil Engineering Contractor for Road and Building Works since 35 years. Executing large development works in Western India particularly in Gujarat, Rajasthan, Jammu & Kashmir and Leh Ladakh.",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 200,
      "maxValue": 500
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "506, 5th floor, Aagam Avenue, Acher, Sabarmati",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380005",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-79357-03085",
      "contactType": "customer service",
      "email": "atinfracon@gmail.com",
      "areaServed": ["IN"],
      "availableLanguage": ["en", "hi", "gu"]
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Gujarat"
      },
      {
        "@type": "State",
        "name": "Rajasthan"
      },
      {
        "@type": "State",
        "name": "Jammu and Kashmir"
      },
      {
        "@type": "State",
        "name": "Ladakh"
      }
    ],
    "knowsAbout": [
      "Road Construction",
      "Highway Construction",
      "Border Infrastructure",
      "Border Fencing",
      "CPWD Projects",
      "NBCC Projects",
      "PMGSY Roads",
      "CRF Works",
      "Building Construction",
      "Bridge Construction",
      "Wind Power Infrastructure",
      "Solar Power Infrastructure",
      "High Altitude Construction",
      "Desert Construction"
    ]
  }
};

// Organization with Financial Data
const organizationFinancialSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SoltechTechServices Pvt. Ltd.",
  "legalName": "SoltechTechServices Private Limited",
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "CIN",
    "value": "U45201GJ2011PTC065598"
  },
  "taxID": "24AAJCA5903A1Z9",
  "award": [
    "High Altitude Road Construction - Rs. 112.37 Crore Project Completion",
    "Border Infrastructure - Rs. 101.78 Crore Project in Jammu Sector",
    "35+ Years of Excellence in Civil Engineering",
    "200+ Skilled Workforce",
    "Modern Equipment Fleet Worth Crores"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Road Construction Services",
        "description": "Hill Roads, CRF, PMGSY, Strategic Border Roads"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Border Infrastructure",
        "description": "BOPs, Fencing, Bunkers, Security Infrastructure"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Civil Engineering Contracts",
        "description": "Buildings, Bridges, Institutional Infrastructure"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Renewable Energy Infrastructure",
        "description": "Wind & Solar Power Civil Works"
      }
    }
  ]
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ant-silk.vercel.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About Us",
      "item": "https://ant-silk.vercel.app/about-us"
    }
  ]
};

// FAQ Schema based on your testimonials and common queries
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long has SoltechTechServices been in business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SoltechTechServices Pvt. Ltd. has been a Civil Engineering Contractor for Road and Building Works for over 35 years, since 1989. We have successfully completed 100+ projects worth over ₹500 crores across Gujarat, Rajasthan, Jammu & Kashmir, and Ladakh."
      }
    },
    {
      "@type": "Question",
      "name": "What areas does SoltechTechServices serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve across Western India, particularly in Gujarat, Rajasthan, Jammu & Kashmir, and Ladakh. Our registered office is in Ahmedabad, Gujarat, and branch office in Barmer, Rajasthan. We specialize in executing projects in challenging terrains including deserts, high-altitude regions, and border areas."
      }
    },
    {
      "@type": "Question",
      "name": "What is SoltechTechServices's core competency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our core competency includes Construction of Roads, Earthen Embankments, Border Fencing, Cross Drainage, Building Works, and specialized infrastructure in difficult terrains. We have extensive experience in high-altitude road construction, border security infrastructure, and government projects for CPWD, NBCC, BSF, and ITBP."
      }
    },
    {
      "@type": "Question",
      "name": "What is SoltechTechServices's annual turnover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For the fiscal year 2023-2024, SoltechTechServices recorded an annual turnover of Rs. 161.49 Crores. We have shown consistent growth with turnovers of Rs. 169.07 Cr (2022-23), Rs. 111.70 Cr (2021-22), Rs. 91.93 Cr (2020-21), and Rs. 51.09 Cr (2019-20)."
      }
    },
    {
      "@type": "Question",
      "name": "What equipment does SoltechTechServices have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We maintain a modern equipment fleet including 4 Crushers (150-240 TPH), 4 Drum Mix Plants, 4 Concrete Batching Plants, 22 Excavators, 8 Loaders, 55 Tippers, 12 Transit Mixers, and various other construction machinery worth crores, ensuring timely and quality project execution."
      }
    },
    {
      "@type": "Question",
      "name": "Which organizations does SoltechTechServices work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work with prestigious organizations including CPWD, NBCC, BSF, ITBP, BRO, various State PWD departments, PSUs like IOCL, ONGC, GAIL, Ircon International, and corporates like Suzlon, Cairn Energy, and Gujarat Fluorochemicals. Our client portfolio includes 20+ government organizations and 15+ PSUs & corporates."
      }
    },
    {
      "@type": "Question",
      "name": "What makes SoltechTechServices different from other contractors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our unique strengths include 35+ years of experience in challenging terrains (deserts, high-altitude, borders), a robust workforce of 200+ skilled professionals, modern equipment fleet, proven track record with defense and government organizations, 90% repeat client rate, and strategic offices in Ahmedabad and Barmer for better resource mobilization."
      }
    }
  ]
};

// Equipment ItemList Schema
const equipmentSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Construction Equipment Fleet",
  "description": "Modern machinery and equipment owned by SoltechTechServices",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Crushers - 240 TPH & 150 TPH",
      "description": "4 units across Banaskantha and Kutch"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Excavators",
      "description": "22 units - 0.8 to 2.5 cum capacity"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Heavy Duty Tippers",
      "description": "55 units - 20-25 ton capacity"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Concrete Batching Plants",
      "description": "4 units for on-demand deployment"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Transit Mixers",
      "description": "12 units - 7-10 cum capacity"
    }
  ]
};

export default function AboutPage() {
  return (
    <>
      {/* Structured Data Scripts */}
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      <Script
        id="organization-financial-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationFinancialSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="equipment-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(equipmentSchema),
        }}
      />
      {/* Page Content - Your existing About component */}
      <About />
    </>
  );
}