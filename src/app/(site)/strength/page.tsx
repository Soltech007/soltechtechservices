import { OurStrength } from "@/components/sections/ourStrength";
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Certifications & Strength - Quality Credentials',
    description: 'CPWD approved contractor with government certifications, modern equipment fleet, and 200+ skilled professionals. Quality credentials you can trust.',
    keywords: 'construction certifications, CPWD approval, contractor licenses, quality certifications, infrastructure credentials, government approved contractor',
    openGraph: {
        title: 'Our Strength & Certifications - SoltechTechServices',
        description: 'Quality credentials, certifications, and organizational capabilities',
        url: 'https://ant-silk.vercel.app/strength',
        images: [{ url: '/images/cons3.webp', width: 1200, height: 630 }],
    },
    alternates: { canonical: 'https://ant-silk.vercel.app/strength' },
    robots: {
        index: true,
        follow: true,
    },
};

// Schema 1: Organization Credentials
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SoltechTechServices Pvt. Ltd.",
    "url": "https://ant-silk.vercel.app",
    "identifier": {
        "@type": "PropertyValue",
        "propertyID": "CIN",
        "value": "U45201GJ2011PTC065598"
    },
    "taxID": "24AAJCA5903A1Z9",
    "legalName": "SoltechTechServices Private Limited",
    "hasCredential": [
        {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Government Approval",
            "recognizedBy": {
                "@type": "Organization",
                "name": "Central Public Works Department (CPWD)"
            }
        },
        {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Contractor Registration",
            "recognizedBy": {
                "@type": "Organization",
                "name": "National Building Construction Corporation (NBCC)"
            }
        }
    ],
    "knowsAbout": [
        "Quality Assurance Systems",
        "Safety Management",
        "Modern Equipment Fleet",
        "Skilled Workforce Management"
    ]
};

// Schema 2: WebPage
const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Certifications & Our Strength",
    "description": "Organization credentials, strength, and capabilities",
    "url": "https://ant-silk.vercel.app/strength",
    "mainEntity": {
        "@type": "ItemList",
        "name": "Our Strengths",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Modern Equipment Fleet"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Skilled Workforce (200+ professionals)"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Government Approvals & Registrations"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Financial Stability"
            }
        ]
    }
};

// Schema 3: Breadcrumb
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
            "name": "Certifications",
            "item": "https://ant-silk.vercel.app/strength"
        }
    ]
};

export default function OurStrengthPage() {
    return (
        <>
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Script
                id="webpage-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <OurStrength />
        </>
    );
}