// lib/api/blogs.ts
import { supabase } from '@/lib/supabase'

export interface Blog {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string | null
    featured_image: string | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    is_published: boolean
    reading_time: number | null
    created_at: string
    updated_at: string
}

export type BlogListItem = Pick<Blog, 'id' | 'title' | 'slug' | 'excerpt' | 'featured_image' | 'created_at' | 'reading_time'>

// Get all published blogs
export async function getAllBlogs(): Promise<BlogListItem[]> {
    const { data, error } = await supabase
        .from('blogs')
        .select('id, title, slug, excerpt, featured_image, created_at, reading_time')  // ⭐ ADD reading_time
        .eq('is_published', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching blogs:', error)
        return []
    }
    return data || []
}

// Get single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

    if (error) {
        console.error('Error fetching blog:', error)
        return null
    }
    return data
}

// Get all blog slugs for static generation
export async function getBlogSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('blogs')
        .select('slug')
        .eq('is_published', true)

    if (error) {
        console.error('Error fetching blog slugs:', error)
        return []
    }
    return data?.map(item => item.slug) || []
}