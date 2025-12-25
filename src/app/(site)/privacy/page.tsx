// src/app/(site)/privacy/page.tsx
import PrivacyPolicyPage from "@/components/sections/privacyPolicy";
import { Metadata } from 'next';
import Script from 'next/script';
export const metadata: Metadata = {
    title: 'Privacy Policy - Data Protection & User Privacy',
    description: 'SoltechTechServices Privacy Policy - How we collect, use, and protect your personal information. Read our commitment to data security and privacy compliance.',
    keywords: 'privacy policy, data protection, GDPR compliance, personal information, data security, privacy statement',
    openGraph: {
        title: 'Privacy Policy - SoltechTechServices',
        description: 'Our commitment to protecting your privacy and personal data',
        url: 'https://ant-silk.vercel.app/privacy',
    },
    alternates: { canonical: 'https://ant-silk.vercel.app/privacy' },
    robots: {
        index: true,
        follow: true,
    },
};

// Schema 1: WebPage
const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Privacy policy and data protection information",
    "url": "https://ant-silk.vercel.app/privacy",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "publisher": {
        "@type": "Organization",
        "name": "SoltechTechServices Pvt. Ltd.",
        "logo": {
            "@type": "ImageObject",
            "url": "https://ant-silk.vercel.app/icon1.png"
        }
    }
};

// Schema 2: Breadcrumb
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
            "name": "Privacy Policy",
            "item": "https://ant-silk.vercel.app/privacy"
        }
    ]
};

export default function PrivacyPolicyPageWrapper() {
    return (
        <>
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

            <PrivacyPolicyPage />
        </>
    );
}