// src/app/(site)/terms-of-use/page.tsx
import TermsOfUsePage from "@/components/sections/TermsOfUsePage";
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Terms of Use - Website Terms & Conditions',
    description: 'Terms and conditions for using SoltechTechServices website. Legal terms, user responsibilities, and website usage policies.',
    keywords: 'terms of use, terms and conditions, website terms, legal terms, user agreement, usage policy',
    openGraph: {
        title: 'Terms of Use - SoltechTechServices',
        description: 'Website terms and conditions',
        url: 'https://ant-silk.vercel.app/terms-of-use',
    },
    alternates: { canonical: 'https://ant-silk.vercel.app/terms-of-use' },
    robots: {
        index: true,
        follow: true,
    },
};

// Schema 1: WebPage
const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Use",
    "description": "Website terms and conditions",
    "url": "https://ant-silk.vercel.app/terms-of-use",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "publisher": {
        "@type": "Organization",
        "name": "SoltechTechServices Pvt. Ltd.",
        "logo": {
            "@type": "ImageObject",
            "url": "https://ant-silk.vercel.app/icon1.png"
        }
    },
    "inLanguage": "en-IN"
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
            "name": "Terms of Use",
            "item": "https://ant-silk.vercel.app/terms-of-use"
        }
    ]
};

export default function TermsOfUse() {
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

            <TermsOfUsePage />
        </>
    );
}