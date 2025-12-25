// src/app/(site)/services/page.tsx
import { Metadata } from 'next';
import Script from 'next/script';
import ServicesPage from '@/components/sections/services';
import { serviceDetailsData } from '@/lib/data'; // ✅ IMPORT STATIC DATA

export const metadata: Metadata = {
    title: 'Infrastructure Services - Road & Civil Works',
    description: 'Civil engineering services: Road construction, border infrastructure, building contracts & renewable energy. 35+ years expertise in challenging terrains.',
    keywords: 'civil engineering services, road construction company, border infrastructure contractor, building construction, renewable energy infrastructure, SoltechTechServices services',
    openGraph: {
        title: 'Our Infrastructure Services - SoltechTechServices',
        description: 'Expertise in Road Construction, Border Infrastructure, and large-scale Civil Projects.',
        url: 'https://ant-silk.vercel.app/services',
    },
    alternates: { canonical: 'https://ant-silk.vercel.app/services' },
    robots: {
        index: true,
        follow: true,
    },
};

// ✅ Create OfferCatalog Schema from static data
const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "SoltechTechServices Services",
    "itemListElement": Object.values(serviceDetailsData).map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "url": `https://ant-silk.vercel.app/services/${service.id}`
        }
    }))
};

// Breadcrumb Schema
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ant-silk.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://ant-silk.vercel.app/services" }
    ]
};

export default function ServicesWrapper() { // ✅ RENAMED to avoid conflict
    return (
        <>
            <Script
                id="services-catalog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ServicesPage />
        </>
    );
}