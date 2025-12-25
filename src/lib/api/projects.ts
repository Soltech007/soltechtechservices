import { supabase } from '@/lib/supabase'

export interface Project {
    project_id: number
    project_name: string
    project_slug: string
    thumbnail_image: string | null
    banner_image: string | null
    tagline: string | null
    category_id: number
    project_status: 'ongoing' | 'completed' | 'upcoming'
    location: string | null
    section1_heading: string | null
    section1_paragraphs: string[] | null
    section2_heading: string | null
    section2_paragraphs: string[] | null
    section2_image: string | null
    section2_image_alt: string | null
    section3_heading: string | null
    section3_paragraphs: string[] | null
    section3_image: string | null
    section3_image_alt: string | null
    section4_heading: string | null
    section4_paragraphs: string[] | null
    section5_image: string | null
    section5_image_alt: string | null
    section5_heading: string | null
    section5_paragraph: string | null
    related_projects: number[] | null
    meta_title: string | null
    meta_description: string | null
    meta_keywords: string | null
    og_title: string | null
    og_description: string | null
    og_image: string | null
    is_featured: boolean
    is_active: boolean
    view_count: number
    created_at: string
    updated_at: string
}

// All projects with category info
export async function getProjectsWithCategory(): Promise<any[]> {
    const { data, error } = await supabase
        .from('projects')
        .select(`
      *,
      categories (
        category_name,
        category_slug
      )
    `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error:', error)
        return []
    }

    // Flatten the data structure
    return data?.map(project => ({
        ...project,
        category_name: project.categories?.category_name,
        category_slug: project.categories?.category_slug,
    })) || []
}

// ⭐ YE FUNCTION ADD KARO - Category wise projects
export async function getProjectsByCategory(categoryId: number): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects by category:', error)
        return []
    }

    return data || []
}

// Featured projects
export async function getFeaturedProjects(limit = 10): Promise<any[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .eq('is_active', true)
        .limit(limit)
        .order('created_at', { ascending: false })
    console.log("Fetched projects:", data?.length);
    if (error) {
        console.error('Error:', error)
        return []
    }

    return data || []
}

// Single project by slug
export async function getProjectBySlug(slug: string): Promise<any | null> {
    const { data, error } = await supabase
        .from('project_details') // Using view for related projects
        .select('*')
        .eq('project_slug', slug)
        .eq('is_active', true)
        .single()

    if (error) {
        console.error('Error fetching project:', error)
        return null
    }

    return data
}

// Get all project slugs (for static generation)
export async function getProjectSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('project_slug')
        .eq('is_active', true)

    if (error) {
        console.error('Error fetching project slugs:', error)
        return []
    }

    return data?.map(item => item.project_slug) || []
}

// Get projects by status
export async function getProjectsByStatus(status: 'ongoing' | 'completed' | 'upcoming'): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('project_status', status)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects by status:', error)
        return []
    }

    return data || []
}

// Get projects by location/region
export async function getProjectsByLocation(location: string): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .ilike('location', `%${location}%`)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects by location:', error)
        return []
    }

    return data || []
}

// Search projects
export async function searchProjects(query: string): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .or(`project_name.ilike.%${query}%,tagline.ilike.%${query}%,location.ilike.%${query}%`)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error searching projects:', error)
        return []
    }

    return data || []
}

// Increment view count
export async function incrementProjectViews(projectId: number): Promise<void> {
    const { error } = await supabase
        .from('projects')
        .update({ view_count: supabase.raw('view_count + 1') })
        .eq('project_id', projectId)

    if (error) {
        console.error('Error incrementing views:', error)
    }
}
// Get related projects for a project
export async function getRelatedProjects(projectIds: number[]): Promise<any[]> {
    if (!projectIds || projectIds.length === 0) return [];

    const { data, error } = await supabase
        .from('projects')
        .select('project_id, project_name, project_slug, thumbnail_image, tagline, location, project_status')
        .in('project_id', projectIds)
        .eq('is_active', true)
        .limit(3);

    if (error) {
        console.error('Error fetching related projects:', error);
        return [];
    }

    return data || [];
}