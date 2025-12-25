import { supabase } from '@/lib/supabase';

export interface Department {
    id: string;
    slug: string;
    name: string;
    description?: string;
    created_at: string;
}

export interface Job {
    id: string;
    slug: string;
    department_id: string;
    title: string;
    location?: string;
    employment_type?: string;
    posted_on: string;
    experience?: string;
    salary_range?: string;
    openings?: number;
    job_overview?: string;
    key_responsibilities?: string;
    requirements?: string;
    preferred_skills?: string;
    why_join_us?: string;
    is_active: boolean;
    created_at: string;
    departments?: Department;
}

export interface Application {
    id: string;
    job_id: string;
    name: string;
    email?: string;
    phone?: string;
    resume_url?: string;
    message?: string;
    applied_at: string;
}

// Get all departments
export async function getAllDepartments(): Promise<Department[]> {
    const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching departments:', error);
        return [];
    }

    return data || [];
}

// Get all active jobs
export async function getActiveJobs(): Promise<Job[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select(`
      *,
      departments (
        id,
        name,
        description
      )
    `)
        .eq('is_active', true)
        .order('posted_on', { ascending: false });

    if (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }

    return data || [];
}

// Get jobs by department
export async function getJobsByDepartment(departmentId: string): Promise<Job[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select(`
      *,
      departments (
        id,
        name,
        description
      )
    `)
        .eq('department_id', departmentId)
        .eq('is_active', true)
        .order('posted_on', { ascending: false });

    if (error) {
        console.error('Error fetching jobs by department:', error);
        return [];
    }

    return data || [];
}

// Get single job by ID
export async function getJobById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
        .from('jobs')
        .select(`
      *,
      departments (
        id,
        name,
        description
      )
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching job:', error);
        return null;
    }

    return data;
}

// Submit job application
export async function submitJobApplication(applicationData: {
    job_id: string;
    name: string;
    email: string;
    phone: string;
    resume_url?: string;
    message?: string;
}): Promise<{ success: boolean; error?: string }> {
    const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();

    if (error) {
        console.error('Error submitting application:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// Get job count by department
export async function getJobCountByDepartment(): Promise<Record<string, number>> {
    const { data, error } = await supabase
        .from('jobs')
        .select('department_id')
        .eq('is_active', true);

    if (error) {
        console.error('Error fetching job counts:', error);
        return {};
    }

    const counts: Record<string, number> = {};
    data?.forEach(job => {
        counts[job.department_id] = (counts[job.department_id] || 0) + 1;
    });

    return counts;
}
// Get single department by ID
export async function getDepartmentById(id: string): Promise<Department | null> {
    const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching department:', error);
        return null;
    }

    return data;
}

// Upload resume to storage
export async function uploadResume(file: File): Promise<{ data?: string; error?: string }> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `resumes/${fileName}`

    const { data, error } = await supabase.storage
        .from('project-images') // Use your existing bucket
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        console.error('Error uploading resume:', error)
        return { error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath)

    return { data: publicUrl }
}
// src/lib/api/careers.ts (ADD these new functions at the end)

// ✅ Get department by slug
export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
    const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching department by slug:', error);
        return null;
    }

    return data;
}

// ✅ Get job by slug
export async function getJobBySlug(slug: string): Promise<Job | null> {
    const { data, error } = await supabase
        .from('jobs')
        .select(`
            *,
            departments (
                id,
                slug,
                name,
                description
            )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching job by slug:', error);
        return null;
    }

    return data;
}

// ✅ Get jobs by department slug
export async function getJobsByDepartmentSlug(slug: string): Promise<Job[]> {
    // First get department by slug
    const department = await getDepartmentBySlug(slug);
    if (!department) return [];

    return getJobsByDepartment(department.id);
}

// ✅ Get all department slugs (for static generation)
export async function getDepartmentSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('departments')
        .select('slug');

    if (error) {
        console.error('Error fetching department slugs:', error);
        return [];
    }

    return data.map(d => d.slug) || [];
}

// ✅ Get all job slugs (for static generation) 
export async function getJobSlugs(): Promise<string[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select('slug')
        .eq('is_active', true);

    if (error) {
        console.error('Error fetching job slugs:', error);
        return [];
    }

    return data.map(j => j.slug) || [];
}