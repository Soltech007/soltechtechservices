// src/lib/seo-utils.ts
import { Metadata } from 'next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string | string[];
    ogImage?: string;
    noIndex?: boolean;
    canonical?: string;
}

export function generateSEO({
    title,
    description,
    keywords,
    ogImage,
    noIndex = false,
    canonical,
}: SEOProps): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ant-silk.vercel.app';
    const defaultOgImage = '/images/og-image.png';

    return {
        title,
        description,
        keywords: Array.isArray(keywords) ? keywords : keywords?.split(','),
        openGraph: {
            title: title || 'SoltechTechServices Pvt. Ltd.',
            description: description || 'Leading Infrastructure Contractor in India',
            images: [ogImage || defaultOgImage],
            url: canonical || baseUrl,
        },
        twitter: {
            card: 'summary_large_image',
            title: title || 'SoltechTechServices Pvt. Ltd.',
            description: description || 'Leading Infrastructure Contractor in India',
            images: [ogImage || defaultOgImage],
        },
        robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
        alternates: canonical ? { canonical } : undefined,
    };
}