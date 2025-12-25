// src/app/(site)/blog/page.tsx
import { Metadata } from 'next';
import { getAllBlogs } from "@/lib/api/blogs";
import BlogPageClient from '@/components/sections/blogPageClient';

export const metadata: Metadata = {
    title: 'Blog - Infrastructure Insights & Construction Updates',
    description: 'Latest insights on infrastructure development, construction technology, project updates, and industry trends from SoltechTechServices.',
    keywords: 'infrastructure blog, construction insights, civil engineering articles, project updates, construction technology, infrastructure development news',
    openGraph: {
        title: 'Blog - SoltechTechServices Insights & Updates',
        description: 'Expert insights on infrastructure development and construction',
        url: 'https://ant-silk.vercel.app/blog',
        images: [{ url: '/icon1.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: 'https://ant-silk.vercel.app/blog' },
    robots: {
        index: true,
        follow: true,
    },
};

// Schema 1: Blog Schema
const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SoltechTechServices Blog",
    "description": "Infrastructure insights, construction updates, and industry trends",
    "url": "https://ant-silk.vercel.app/blog",
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
            "name": "Blog",
            "item": "https://ant-silk.vercel.app/blog"
        }
    ]
};

// ✅ Server component - SEO friendly
interface Blog {
    title: string;
    slug: string;
    id: string;
    created_at: string;
}

export default async function BlogPage() {
    // ✅ Server-side data fetch with error handling
    let blogs: Blog[] = [];
    try {
        const data = await getAllBlogs();
        blogs = data || []; // ✅ Fallback to empty array
    } catch (error) {
        console.error("Error fetching blogs:", error);
        blogs = []; // ✅ Fallback on error
    }

    return (
        <>
            {/* Schema scripts - SEO ke liye */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* ✅ Client component for interactivity - blogs guaranteed to be array */}
            {/* <BlogPageClient initialBlogs={blogs} /> */}
        </>
    );
}