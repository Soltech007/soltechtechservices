import { supabase } from '@/lib/supabase'

export interface Category {
    category_id: number
    category_name: string
    category_slug: string
    thumbnail_image: string | null
    tagline: string | null
    hero_image_1: string | null
    hero_image_1_alt: string | null
    hero_image_2: string | null
    hero_image_2_alt: string | null
    hero_image_3: string | null
    hero_image_3_alt: string | null
    hero_heading: string | null
    hero_paragraphs: string[] | null
    regions: string[] | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    og_title: string | null
    og_description: string | null
    og_image: string | null
    is_active: boolean
    show_on_homepage: boolean
    banner_image: string | null
    created_at: string
    updated_at: string
}

// ⚠️ TRANSFORM HATA DO - Direct data return karo kyunki database mein already full URLs hain
export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    // ⭐ Direct return - NO transformation
    return data || []
}

export async function getHomepageCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .eq('show_on_homepage', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error:', error)
        return []
    }

    return data || []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('category_slug', slug)
        .eq('is_active', true)
        .single()

    if (error) {
        console.error('Error:', error)
        return null
    }

    return data
}

export async function getCategorySlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('category_slug')
        .eq('is_active', true)

    if (error) {
        console.error('Error:', error)
        return []
    }

    return data?.map(item => item.category_slug) || []
}