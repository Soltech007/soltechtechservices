// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ant-silk.vercel.app';

    try {
        // Fetch dynamic data from Supabase
        const [projects, categories, blogs, jobs] = await Promise.all([
            supabase.from('projects').select('project_slug, updated_at').eq('is_active', true),
            supabase.from('categories').select('category_slug, updated_at').eq('is_active', true),
            supabase.from('blogs').select('slug, updated_at').eq('is_published', true),
            supabase.from('jobs').select('id, created_at, slug').eq('is_active', true),
        ]);

        // Static pages - MATCH YOUR ACTUAL ROUTES
        const staticPages = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 1,
            },
            {
                url: `${baseUrl}/about-us`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services/road-construction`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services/border-security-infrastructure`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services/building-institutional-structures`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services/bridges-culverts`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services/wind-solar-power-infrastructure`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services/civil-projects-for-psus-private-sector`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/projects`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/careers`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            },
            {
                url: `${baseUrl}/strength`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            },
            {
                url: `${baseUrl}/team`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            },
            {
                url: `${baseUrl}/blog`,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.7,
            },
            {
                url: `${baseUrl}/approach`,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.6,
            },
            {
                url: `${baseUrl}/vision-values`,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.6,
            },
            {
                url: `${baseUrl}/leadership`,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.5,
            },
            {
                url: `${baseUrl}/privacy`,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.4,
            },
            {
                url: `${baseUrl}/terms-of-use`,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.4,
            },
            {
                url: `${baseUrl}/slavery-statement`,
                lastModified: new Date(),
                changeFrequency: 'yearly' as const,
                priority: 0.4,
            },
        ];

        // Dynamic project pages
        const projectPages = projects.data?.map((project) => ({
            url: `${baseUrl}/projects/${project.project_slug}`,
            lastModified: new Date(project.updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })) || [];

        // Dynamic service/category pages
        const categoryPages = categories.data?.map((category) => ({
            url: `${baseUrl}/services/${category.category_slug}`,
            lastModified: new Date(category.updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })) || [];

        // Dynamic blog pages
        const blogPages = blogs.data?.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: new Date(blog.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        })) || [];

        // Dynamic job pages
        const jobPages = jobs.data?.map((job) => ({
            url: `${baseUrl}/careers/job/${job.slug}`,
            lastModified: new Date(job.created_at),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        })) || [];

        return [
            ...staticPages,
            ...projectPages,
            ...categoryPages,
            ...blogPages,
            ...jobPages,
        ];

    } catch (error) {
        console.error('Sitemap generation error:', error);

        // Fallback: Return at least static pages
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 1,
            },
            {
                url: `${baseUrl}/about-us`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/services`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/projects`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            },
        ];
    }
}