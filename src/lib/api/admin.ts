// lib/api/admin.ts
import { supabase } from '@/lib/supabase'

// ============= AUTH FUNCTIONS =============
export async function signInAdmin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) return { error: error.message }

    // Check if user is admin
    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single()

    if (!adminUser) {
        await supabase.auth.signOut()
        return { error: 'Not authorized as admin' }
    }

    return { data }
}

export async function signOutAdmin() {
    const { error } = await supabase.auth.signOut()
    return { error }
}

// ============= DASHBOARD STATS =============
export async function getDashboardStats() {
    const [projects, categories, clients, contacts] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('clients').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    ])

    return {
        totalProjects: projects.count || 0,
        totalCategories: categories.count || 0,
        totalClients: clients.count || 0,
        totalContacts: contacts.count || 0,
    }
}

// ============= PROJECTS CRUD =============

// ⭐ YE FUNCTION ADD KARO - Get all projects with category info
export async function getProjectsWithCategory() {
    const { data, error } = await supabase
        .from('projects')
        .select(`
      *,
      categories (
        category_name,
        category_slug
      )
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects:', error)
        return []
    }

    // Flatten the data structure
    return data?.map(project => ({
        ...project,
        category_name: project.categories?.category_name,
        category_slug: project.categories?.category_slug,
    })) || []
}

// ⭐ YE FUNCTION ADD KARO - Get single project by ID
export async function getProjectById(id: number) {
    const { data, error } = await supabase
        .from('projects')
        .select(`
      *,
      categories (
        category_name,
        category_slug
      )
    `)
        .eq('project_id', id)
        .single()

    if (error) {
        console.error('Error fetching project:', error)
        return null
    }

    return data
}

// ⭐ YE FUNCTION ADD KARO - Get project by slug (agar edit page mein slug use karo)
export async function getProjectBySlug(slug: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('project_slug', slug)
        .single()

    if (error) {
        console.error('Error fetching project:', error)
        return null
    }

    return data
}

export async function createProject(data: any) {
    // Generate slug if not provided
    if (!data.project_slug && data.project_name) {
        data.project_slug = data.project_name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const { data: project, error } = await supabase
        .from('projects')
        .insert([data])
        .select()
        .single()

    return { data: project, error }
}

export async function updateProject(id: number, data: any) {
    const { data: project, error } = await supabase
        .from('projects')
        .update(data)
        .eq('project_id', id)
        .select()
        .single()

    return { data: project, error }
}

export async function deleteProject(id: number) {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('project_id', id)

    return { error }
}

// ============= CATEGORIES CRUD =============

// Get all categories for admin
export async function getAllCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data || []
}

// Get single category
export async function getCategoryById(id: number) {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('category_id', id)
        .single()

    if (error) {
        console.error('Error fetching category:', error)
        return null
    }

    return data
}

export async function createCategory(data: any) {
    // Generate slug if not provided
    if (!data.category_slug && data.category_name) {
        data.category_slug = data.category_name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const { data: category, error } = await supabase
        .from('categories')
        .insert([data])
        .select()
        .single()

    return { data: category, error }
}

export async function updateCategory(id: number, data: any) {
    const { data: category, error } = await supabase
        .from('categories')
        .update(data)
        .eq('category_id', id)
        .select()
        .single()

    return { data: category, error }
}

export async function deleteCategory(id: number) {
    // First check if category has projects
    const { data: projects } = await supabase
        .from('projects')
        .select('project_id')
        .eq('category_id', id)
        .limit(1)

    if (projects && projects.length > 0) {
        return { error: { message: 'Cannot delete category with existing projects' } }
    }

    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('category_id', id)

    return { error }
}

// ============= CLIENTS CRUD =============

// Get all clients
export async function getAllClients() {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching clients:', error)
        return []
    }

    return data || []
}

// Get single client
export async function getClientById(id: number) {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('client_id', id)
        .single()

    if (error) {
        console.error('Error fetching client:', error)
        return null
    }

    return data
}

export async function createClient(data: any) {
    const { data: client, error } = await supabase
        .from('clients')
        .insert([data])
        .select()
        .single()

    return { data: client, error }
}

export async function updateClient(id: number, data: any) {
    const { data: client, error } = await supabase
        .from('clients')
        .update(data)
        .eq('client_id', id)
        .select()
        .single()

    return { data: client, error }
}

export async function deleteClient(id: number) {
    const { error } = await supabase
        .from('clients')
        .delete()
        .eq('client_id', id)

    return { error }
}

// ============= CONTACT SUBMISSIONS =============

// Get all contact submissions
export async function getAllContactSubmissions() {
    const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching contacts:', error)
        return []
    }

    return data || []
}

// Get single contact submission
export async function getContactById(id: number) {
    const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching contact:', error)
        return null
    }

    return data
}

export async function updateContactStatus(id: number, status: string) {
    const { error } = await supabase
        .from('contact_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

    return { error }
}

export async function deleteContact(id: number) {
    const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

    return { error }
}

// ============= BLOGS CRUD =============

// Get all blogs
export async function getAllBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching blogs:', error)
        return []
    }

    return data || []
}

// Get single blog
export async function getBlogById(id: string) {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching blog:', error)
        return null
    }

    return data
}

export async function createBlog(data: any) {
    // Generate slug if not provided
    if (!data.slug && data.title) {
        data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const { data: blog, error } = await supabase
        .from('blogs')
        .insert([data])
        .select()
        .single()

    return { data: blog, error }
}

export async function updateBlog(id: string, data: any) {
    const { data: blog, error } = await supabase
        .from('blogs')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

    return { data: blog, error }
}

export async function deleteBlog(id: string) {
    const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

    return { error }
}

// ============= UTILITY FUNCTIONS =============

// Upload image to Supabase Storage
// lib/api/admin.ts mein ye function update kar:

export async function uploadImage(file: File, folder: string = 'uploads') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}` // ⭐ Folder ke andar save karega

    const { data, error } = await supabase.storage
        .from('project-images') // ⭐ Tera existing bucket use karega
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        console.error('Error uploading image:', error)
        return { error }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('project-images') // ⭐ Same bucket
        .getPublicUrl(filePath)

    return { data: publicUrl, error: null }
}

// Delete image from Supabase Storage
export async function deleteImage(url: string, bucket: string = 'project-images') {
    // Extract file path from URL
    const urlParts = url.split(`/storage/v1/object/public/${bucket}/`)
    if (urlParts.length !== 2) return { error: 'Invalid URL' }

    const filePath = urlParts[1]

    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath])

    return { error }
}

// Bulk update order
export async function updateDisplayOrder(items: { id: number, order: number }[], table: string) {
    const updates = items.map(item =>
        supabase
            .from(table)
            .update({ display_order: item.order })
            .eq(`${table.slice(0, -1)}_id`, item.id)
    )

    const results = await Promise.all(updates)
    const errors = results.filter(r => r.error)

    if (errors.length > 0) {
        return { error: errors[0].error }
    }

    return { error: null }
}

// Ye function `uploadImage` ke neeche add karo:

export async function uploadBlogImage(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `blogs/${fileName}` // ⭐ Use 'blogs' folder

    const { data, error } = await supabase.storage
        .from('project-images') // ⭐ Use your 'project-images' bucket
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        console.error('Error uploading blog image:', error)
        return { error }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath)

    return { data: publicUrl, error: null }
}

// ============= CAREERS - DEPARTMENTS CRUD =============

export async function getAllDepartments() {
    const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching departments:', error)
        return []
    }

    return data || []
}

export async function getDepartmentById(id: string) {
    const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching department:', error)
        return null
    }

    return data
}

export async function createDepartment(data: any) {
    const { data: department, error } = await supabase
        .from('departments')
        .insert([data])
        .select()
        .single()

    return { data: department, error }
}

export async function updateDepartment(id: string, data: any) {
    const { data: department, error } = await supabase
        .from('departments')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    return { data: department, error }
}

export async function deleteDepartment(id: string) {
    // Check if department has jobs
    const { data: jobs } = await supabase
        .from('jobs')
        .select('id')
        .eq('department_id', id)
        .limit(1)

    if (jobs && jobs.length > 0) {
        return { error: { message: 'Cannot delete department with existing jobs' } }
    }

    const { error } = await supabase
        .from('departments')
        .delete()
        .eq('id', id)

    return { error }
}

// ============= CAREERS - JOBS CRUD =============

export async function getAllJobs() {
    const { data, error } = await supabase
        .from('jobs')
        .select(`
      *,
      departments (
        name,
        description
      )
    `)
        .order('posted_on', { ascending: false })

    if (error) {
        console.error('Error fetching jobs:', error)
        return []
    }

    return data?.map(job => ({
        ...job,
        department_name: job.departments?.name,
    })) || []
}

export async function getJobById(id: string) {
    const { data, error } = await supabase
        .from('jobs')
        .select(`
      *,
      departments (
        name,
        description
      )
    `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching job:', error)
        return null
    }

    return data
}

export async function createJob(data: any) {
    const { data: job, error } = await supabase
        .from('jobs')
        .insert([data])
        .select()
        .single()

    return { data: job, error }
}

export async function updateJob(id: string, data: any) {
    const { data: job, error } = await supabase
        .from('jobs')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    return { data: job, error }
}

// Add this new function for toggling job status
export async function toggleJobStatus(id: string, isActive: boolean) {
    const { data, error } = await supabase
        .from('jobs')
        .update({ is_active: !isActive })
        .eq('id', id)
        .select()
        .single()

    return { data, error }
}

// Update deleteJob function to NOT auto-delete applications
export async function deleteJob(id: string) {
    const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)

    return { error }
}

// Add function to delete applications for a job
export async function deleteJobApplications(jobId: string) {
    const { error } = await supabase
        .from('applications')
        .delete()
        .eq('job_id', jobId)

    return { error }
}

// Add function to count applications for a job
export async function getJobApplicationsCount(jobId: string) {
    const { count, error } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('job_id', jobId)

    return { count: count || 0, error }
}

// ============= CAREERS - APPLICATIONS =============

export async function getAllApplications() {
    const { data, error } = await supabase
        .from('applications')
        .select(`
      *,
      jobs (
        title,
        location,
        department_id,
        departments (
          name
        )
      )
    `)
        .order('applied_at', { ascending: false })

    if (error) {
        console.error('Error fetching applications:', error)
        return []
    }

    return data?.map(app => ({
        ...app,
        job_title: app.jobs?.title,
        job_location: app.jobs?.location,
        department_name: app.jobs?.departments?.name,
    })) || []
}

export async function getApplicationById(id: string) {
    const { data, error } = await supabase
        .from('applications')
        .select(`
      *,
      jobs (
        title,
        location,
        employment_type,
        departments (
          name
        )
      )
    `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching application:', error)
        return null
    }

    return data
}

export async function deleteApplication(id: string) {
    const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)

    return { error }
}

// ⭐ Upload resume to storage
export async function uploadResume(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `resumes/${fileName}`

    const { data, error } = await supabase.storage
        .from('project-images') // Use existing bucket
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        console.error('Error uploading resume:', error)
        return { error }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath)

    return { data: publicUrl, error: null }
}