// src/app/(admin)/admin/projects/[id]/edit/page.tsx
'use client'
import { useState, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectById, updateProject, uploadImage } from '@/lib/api/admin'
import { getCategories } from '@/lib/api/categories'
import { getProjectsWithCategory } from '@/lib/api/admin'
import {
    Save,
    X,
    Upload,
    Plus,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Info,
    Image as ImageIcon,
    FileText,
    Settings,
    Search,
    AlertCircle,
    CheckCircle,
    Loader2,
    Check
} from 'lucide-react'

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const projectId = parseInt(id)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    const [uploading, setUploading] = useState<string | null>(null)
    const [categories, setCategories] = useState<any[]>([])
    const [allProjects, setAllProjects] = useState<any[]>([])
    const [currentStep, setCurrentStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 5])
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // File input refs
    const thumbnailRef = useRef<HTMLInputElement>(null)
    const bannerRef = useRef<HTMLInputElement>(null)
    const section2ImageRef = useRef<HTMLInputElement>(null)
    const section3ImageRef = useRef<HTMLInputElement>(null)
    const section5ImageRef = useRef<HTMLInputElement>(null)

    // Form State
    const [formData, setFormData] = useState({
        project_name: '',
        project_slug: '',
        category_id: '',
        project_status: 'ongoing',
        location: '',
        tagline: '',
        thumbnail_image: '',
        banner_image: '',
        section1_heading: '',
        section1_paragraphs: [''],
        section2_heading: '',
        section2_paragraphs: [''],
        section2_image: '',
        section2_image_alt: '',
        section3_heading: '',
        section3_paragraphs: [''],
        section3_image: '',
        section3_image_alt: '',
        section4_heading: '',
        section4_paragraphs: [''],
        section5_heading: '',
        section5_paragraph: '',
        section5_image: '',
        section5_image_alt: '',
        related_projects: [] as number[],
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        og_title: '',
        og_description: '',
        og_image: '',
        is_featured: false,
        is_active: true
    })

    const steps = [
        { id: 1, name: 'Basic Info', icon: Info, description: 'Project details' },
        { id: 2, name: 'Content', icon: FileText, description: 'Section content' },
        { id: 3, name: 'Images', icon: ImageIcon, description: 'Upload images' },
        { id: 4, name: 'SEO', icon: Search, description: 'Search optimization' },
        { id: 5, name: 'Settings', icon: Settings, description: 'Final settings' }
    ]

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const [projectData, categoriesData, projectsData] = await Promise.all([
                getProjectById(projectId),
                getCategories(),
                getProjectsWithCategory()
            ])

            if (projectData) {
                setFormData({
                    project_name: projectData.project_name || '',
                    project_slug: projectData.project_slug || '',
                    category_id: projectData.category_id?.toString() || '',
                    project_status: projectData.project_status || 'ongoing',
                    location: projectData.location || '',
                    tagline: projectData.tagline || '',
                    thumbnail_image: projectData.thumbnail_image || '',
                    banner_image: projectData.banner_image || '',
                    section1_heading: projectData.section1_heading || '',
                    section1_paragraphs: projectData.section1_paragraphs?.length > 0 ? projectData.section1_paragraphs : [''],
                    section2_heading: projectData.section2_heading || '',
                    section2_paragraphs: projectData.section2_paragraphs?.length > 0 ? projectData.section2_paragraphs : [''],
                    section2_image: projectData.section2_image || '',
                    section2_image_alt: projectData.section2_image_alt || '',
                    section3_heading: projectData.section3_heading || '',
                    section3_paragraphs: projectData.section3_paragraphs?.length > 0 ? projectData.section3_paragraphs : [''],
                    section3_image: projectData.section3_image || '',
                    section3_image_alt: projectData.section3_image_alt || '',
                    section4_heading: projectData.section4_heading || '',
                    section4_paragraphs: projectData.section4_paragraphs?.length > 0 ? projectData.section4_paragraphs : [''],
                    section5_heading: projectData.section5_heading || '',
                    section5_paragraph: projectData.section5_paragraph || '',
                    section5_image: projectData.section5_image || '',
                    section5_image_alt: projectData.section5_image_alt || '',
                    related_projects: projectData.related_projects || [],
                    meta_title: projectData.meta_title || '',
                    meta_description: projectData.meta_description || '',
                    meta_keywords: projectData.meta_keywords || '',
                    og_title: projectData.og_title || '',
                    og_description: projectData.og_description || '',
                    og_image: projectData.og_image || '',
                    is_featured: projectData.is_featured || false,
                    is_active: projectData.is_active !== false
                })
            } else {
                setError('Project not found')
            }

            setCategories(categoriesData)
            setAllProjects(projectsData.filter((p: any) => p.project_id !== projectId))
        } catch (err) {
            console.error('Error loading data:', err)
            setError('Failed to load project data')
        } finally {
            setInitialLoading(false)
        }
    }

    // Handle Image Upload
    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            setTimeout(() => setError(''), 3000)
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB')
            setTimeout(() => setError(''), 3000)
            return
        }

        setUploading(field)
        setError('')

        try {
            const { data: url, error } = await uploadImage(file)

            if (error) {
                setError('Failed to upload image. Please check your permissions.')
            } else if (url) {
                setFormData({ ...formData, [field]: url })
                setSuccess('Image uploaded successfully!')
                setTimeout(() => setSuccess(''), 3000)
            }
        } catch (err) {
            console.error('Upload error:', err)
            setError('Failed to upload image')
        } finally {
            setUploading(null)
        }
    }

    // Validation
    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                if (!formData.project_name || !formData.category_id) {
                    setError('Please fill all required fields')
                    setTimeout(() => setError(''), 3000)
                    return false
                }
                break
        }
        return true
    }

    // Navigation
    const goToNextStep = () => {
        if (validateStep(currentStep)) {
            if (!completedSteps.includes(currentStep)) {
                setCompletedSteps([...completedSteps, currentStep])
            }
            setCurrentStep(currentStep + 1)
            window.scrollTo(0, 0)
        }
    }

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1)
        window.scrollTo(0, 0)
    }

    const goToStep = (step: number) => {
        setCurrentStep(step)
        window.scrollTo(0, 0)
    }

    // Auto-generate slug
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    // Handle array fields
    const handleArrayField = (field: string, index: number, value: string) => {
        const newArray = [...(formData[field as keyof typeof formData] as string[])]
        newArray[index] = value
        setFormData({ ...formData, [field]: newArray })
    }

    const addArrayField = (field: string) => {
        setFormData({
            ...formData,
            [field]: [...(formData[field as keyof typeof formData] as string[]), '']
        })
    }

    const removeArrayField = (field: string, index: number) => {
        const newArray = [...(formData[field as keyof typeof formData] as string[])]
        if (newArray.length > 1) {
            newArray.splice(index, 1)
            setFormData({ ...formData, [field]: newArray })
        }
    }

    // Handle Related Projects
    const handleRelatedProjects = (projectIdToToggle: number) => {
        const currentRelated = [...formData.related_projects]
        const index = currentRelated.indexOf(projectIdToToggle)

        if (index > -1) {
            currentRelated.splice(index, 1)
        } else {
            if (currentRelated.length < 3) {
                currentRelated.push(projectIdToToggle)
            } else {
                setError('Maximum 3 related projects allowed')
                setTimeout(() => setError(''), 3000)
                return
            }
        }

        setFormData({ ...formData, related_projects: currentRelated })
    }

    // Final Submit
    const handleSubmit = async () => {
        setError('')
        setLoading(true)

        try {
            const cleanedData = {
                ...formData,
                category_id: parseInt(formData.category_id),
                section1_paragraphs: formData.section1_paragraphs.filter(p => p.trim()),
                section2_paragraphs: formData.section2_paragraphs.filter(p => p.trim()),
                section3_paragraphs: formData.section3_paragraphs.filter(p => p.trim()),
                section4_paragraphs: formData.section4_paragraphs.filter(p => p.trim()),
                og_image: formData.og_image || formData.thumbnail_image
            }

            const { error } = await updateProject(projectId, cleanedData)

            if (error) {
                setError('Error updating project: ' + error.message)
            } else {
                setSuccess('Project updated successfully! Redirecting...')
                setTimeout(() => {
                    router.push('/admin/projects')
                }, 1500)
            }
        } catch (err) {
            console.error('Error:', err)
            setError('Failed to update project')
        } finally {
            setLoading(false)
        }
    }

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading project data...</p>
                </div>
            </div>
        )
    }

    if (error && !formData.project_name) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-blue-800 mr-2" />
                        <p className="text-blue-800">{error}</p>
                    </div>
                    <Link
                        href="/admin/projects"
                        className="inline-block mt-4 text-indigo-600 hover:text-indigo-700"
                    >
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Projects
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
                <p className="text-gray-600 mt-2">Update project: {formData.project_name}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isActive = currentStep === step.id
                        const isCompleted = completedSteps.includes(step.id)

                        return (
                            <div key={step.id} className="flex-1 relative">
                                {index < steps.length - 1 && (
                                    <div className={`absolute top-6 left-12 right-0 h-0.5 
                    ${isCompleted ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                    />
                                )}

                                <button
                                    type="button"
                                    onClick={() => goToStep(step.id)}
                                    className="relative flex flex-col items-center cursor-pointer"
                                >
                                    <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all
                    ${isActive ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' :
                                            isCompleted ? 'bg-indigo-600 text-white' :
                                                'bg-gray-200 text-gray-500'}
                  `}>
                                        {isCompleted && !isActive ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <Icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p className={`text-sm font-medium ${isActive ? 'text-indigo-600' :
                                            isCompleted ? 'text-gray-900' :
                                                'text-gray-500'
                                            }`}>
                                            {step.name}
                                        </p>
                                        <p className="text-xs text-gray-500 hidden sm:block">
                                            {step.description}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Alerts */}
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-800 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-800">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-green-600">{success}</p>
                </div>
            )}

            {/* Form Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.project_name}
                                    onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL Slug <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={formData.project_slug}
                                        onChange={(e) => setFormData({ ...formData, project_slug: e.target.value })}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="project-url-slug"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, project_slug: generateSlug(formData.project_name) })}
                                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm whitespace-nowrap"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.category_id} value={cat.category_id}>
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.project_status}
                                    onChange={(e) => setFormData({ ...formData, project_status: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="ongoing">🔵 Ongoing</option>
                                    <option value="completed">✅ Completed</option>
                                    <option value="upcoming">⏳ Upcoming</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., Mumbai, Maharashtra"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    value={formData.tagline}
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Short project description"
                                />
                            </div>
                        </div>

                        {/* Related Projects */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Related Projects
                                <span className="ml-2 text-xs text-gray-500">
                                    (Max 3, Selected: {formData.related_projects.length})
                                </span>
                            </label>
                            <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto bg-gray-50">
                                {allProjects.length > 0 ? (
                                    <div className="space-y-2">
                                        {allProjects.map(project => (
                                            <label
                                                key={project.project_id}
                                                className="flex items-center p-2 hover:bg-white rounded cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.related_projects.includes(project.project_id)}
                                                    onChange={() => handleRelatedProjects(project.project_id)}
                                                    className="mr-3 h-4 w-4 text-indigo-600 rounded"
                                                />
                                                <span className="text-sm">{project.project_name}</span>
                                                {project.category_name && (
                                                    <span className="ml-auto text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                                        {project.category_name}
                                                    </span>
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">No other projects available</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Content Sections - ALL 5 SECTIONS */}
                {currentStep === 2 && (
                    <div className="space-y-10">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Content Sections</h2>

                        {/* Section 1 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                    1
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Section 1</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.section1_heading}
                                        onChange={(e) => setFormData({ ...formData, section1_heading: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="Enter section heading"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Paragraphs
                                    </label>
                                    {formData.section1_paragraphs.map((para, index) => (
                                        <div key={index} className="flex gap-2 mb-3">
                                            <textarea
                                                value={para}
                                                onChange={(e) => handleArrayField('section1_paragraphs', index, e.target.value)}
                                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                                rows={3}
                                                placeholder={`Enter paragraph ${index + 1}...`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('section1_paragraphs', index)}
                                                className="p-2.5 text-blue-800 hover:bg-red-50 rounded-lg transition-colors"
                                                disabled={formData.section1_paragraphs.length === 1}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayField('section1_paragraphs')}
                                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center hover:underline"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Paragraph
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                    2
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Section 2</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.section2_heading}
                                        onChange={(e) => setFormData({ ...formData, section2_heading: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="Enter section heading"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Section Image
                                        </label>
                                        <div className="space-y-2">
                                            <input
                                                ref={section2ImageRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'section2_image')}
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => section2ImageRef.current?.click()}
                                                disabled={uploading === 'section2_image'}
                                                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors flex items-center justify-center gap-2 bg-white"
                                            >
                                                {uploading === 'section2_image' ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                                                        <span className="text-sm">Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="w-5 h-5 text-gray-400" />
                                                        <span className="text-sm">Upload Image</span>
                                                    </>
                                                )}
                                            </button>
                                            {formData.section2_image && (
                                                <div className="relative h-32 rounded-lg overflow-hidden border-2 border-green-300">
                                                    <Image
                                                        src={formData.section2_image}
                                                        alt="Section 2"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, section2_image: '' })}
                                                        className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-lg hover:bg-blue-800"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image Alt Text
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.section2_image_alt}
                                            onChange={(e) => setFormData({ ...formData, section2_image_alt: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                            placeholder="Describe the image"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Paragraphs
                                    </label>
                                    {formData.section2_paragraphs.map((para, index) => (
                                        <div key={index} className="flex gap-2 mb-3">
                                            <textarea
                                                value={para}
                                                onChange={(e) => handleArrayField('section2_paragraphs', index, e.target.value)}
                                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                                rows={3}
                                                placeholder={`Enter paragraph ${index + 1}...`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('section2_paragraphs', index)}
                                                className="p-2.5 text-blue-800 hover:bg-red-50 rounded-lg transition-colors"
                                                disabled={formData.section2_paragraphs.length === 1}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayField('section2_paragraphs')}
                                        className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center hover:underline"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Paragraph
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                    3
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Section 3</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.section3_heading}
                                        onChange={(e) => setFormData({ ...formData, section3_heading: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="Enter section heading"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Section Image
                                        </label>
                                        <div className="space-y-2">
                                            <input
                                                ref={section3ImageRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'section3_image')}
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => section3ImageRef.current?.click()}
                                                disabled={uploading === 'section3_image'}
                                                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors flex items-center justify-center gap-2 bg-white"
                                            >
                                                {uploading === 'section3_image' ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                                                        <span className="text-sm">Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="w-5 h-5 text-gray-400" />
                                                        <span className="text-sm">Upload Image</span>
                                                    </>
                                                )}
                                            </button>
                                            {formData.section3_image && (
                                                <div className="relative h-32 rounded-lg overflow-hidden border-2 border-purple-300">
                                                    <Image
                                                        src={formData.section3_image}
                                                        alt="Section 3"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, section3_image: '' })}
                                                        className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-lg hover:bg-blue-800"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image Alt Text
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.section3_image_alt}
                                            onChange={(e) => setFormData({ ...formData, section3_image_alt: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                            placeholder="Describe the image"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Paragraphs
                                    </label>
                                    {formData.section3_paragraphs.map((para, index) => (
                                        <div key={index} className="flex gap-2 mb-3">
                                            <textarea
                                                value={para}
                                                onChange={(e) => handleArrayField('section3_paragraphs', index, e.target.value)}
                                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                                rows={3}
                                                placeholder={`Enter paragraph ${index + 1}...`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('section3_paragraphs', index)}
                                                className="p-2.5 text-blue-800 hover:bg-red-50 rounded-lg transition-colors"
                                                disabled={formData.section3_paragraphs.length === 1}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayField('section3_paragraphs')}
                                        className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center hover:underline"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Paragraph
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                    4
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Section 4</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.section4_heading}
                                        onChange={(e) => setFormData({ ...formData, section4_heading: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="Enter section heading"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Paragraphs
                                    </label>
                                    {formData.section4_paragraphs.map((para, index) => (
                                        <div key={index} className="flex gap-2 mb-3">
                                            <textarea
                                                value={para}
                                                onChange={(e) => handleArrayField('section4_paragraphs', index, e.target.value)}
                                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                                rows={3}
                                                placeholder={`Enter paragraph ${index + 1}...`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeArrayField('section4_paragraphs', index)}
                                                className="p-2.5 text-blue-800 hover:bg-red-50 rounded-lg transition-colors"
                                                disabled={formData.section4_paragraphs.length === 1}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayField('section4_paragraphs')}
                                        className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center hover:underline"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Paragraph
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Section 5 */}
                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                                    5
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Section 5</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.section5_heading}
                                        onChange={(e) => setFormData({ ...formData, section5_heading: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="Enter section heading"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Paragraph
                                    </label>
                                    <textarea
                                        value={formData.section5_paragraph}
                                        onChange={(e) => setFormData({ ...formData, section5_paragraph: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        rows={4}
                                        placeholder="Enter paragraph text..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Section Image
                                        </label>
                                        <div className="space-y-2">
                                            <input
                                                ref={section5ImageRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'section5_image')}
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => section5ImageRef.current?.click()}
                                                disabled={uploading === 'section5_image'}
                                                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 transition-colors flex items-center justify-center gap-2 bg-white"
                                            >
                                                {uploading === 'section5_image' ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
                                                        <span className="text-sm">Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="w-5 h-5 text-gray-400" />
                                                        <span className="text-sm">Upload Image</span>
                                                    </>
                                                )}
                                            </button>
                                            {formData.section5_image && (
                                                <div className="relative h-32 rounded-lg overflow-hidden border-2 border-teal-300">
                                                    <Image
                                                        src={formData.section5_image}
                                                        alt="Section 5"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, section5_image: '' })}
                                                        className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-lg hover:bg-blue-800"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image Alt Text
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.section5_image_alt}
                                            onChange={(e) => setFormData({ ...formData, section5_image_alt: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                            placeholder="Describe the image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Images */}
                {currentStep === 3 && (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Images</h2>

                        {/* Thumbnail */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Thumbnail Image</h3>
                            <p className="text-sm text-gray-600 mb-4">This image will be shown in project listings</p>

                            <div className="space-y-4">
                                <input
                                    ref={thumbnailRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'thumbnail_image')}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => thumbnailRef.current?.click()}
                                    disabled={uploading === 'thumbnail_image'}
                                    className="w-full max-w-md px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 flex flex-col items-center justify-center gap-2 bg-white"
                                >
                                    {uploading === 'thumbnail_image' ? (
                                        <>
                                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                            <span className="text-sm text-gray-600">Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700">Click to upload thumbnail</span>
                                            <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                        </>
                                    )}
                                </button>

                                {formData.thumbnail_image && (
                                    <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border border-gray-200">
                                        <Image
                                            src={formData.thumbnail_image}
                                            alt="Thumbnail preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, thumbnail_image: '' })}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-blue-800"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Banner Image</h3>
                            <p className="text-sm text-gray-600 mb-4">This image will be shown at the top of project page</p>

                            <div className="space-y-4">
                                <input
                                    ref={bannerRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'banner_image')}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => bannerRef.current?.click()}
                                    disabled={uploading === 'banner_image'}
                                    className="w-full max-w-md px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 flex flex-col items-center justify-center gap-2 bg-white"
                                >
                                    {uploading === 'banner_image' ? (
                                        <>
                                            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                            <span className="text-sm text-gray-600">Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-700">Click to upload banner</span>
                                            <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                                        </>
                                    )}
                                </button>

                                {formData.banner_image && (
                                    <div className="relative w-full max-w-2xl h-80 rounded-lg overflow-hidden border border-gray-200">
                                        <Image
                                            src={formData.banner_image}
                                            alt="Banner preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, banner_image: '' })}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-blue-800"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: SEO */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">SEO Settings</h2>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Search Engine Optimization</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.meta_title}
                                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="Page title for search engines"
                                        maxLength={200}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formData.meta_title.length}/200 characters
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Description
                                    </label>
                                    <textarea
                                        value={formData.meta_description}
                                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        rows={3}
                                        placeholder="Page description for search engines"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Keywords
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.meta_keywords}
                                        onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Social Media (Open Graph)</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        OG Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.og_title}
                                        onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        placeholder="Title for social media sharing"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        OG Description
                                    </label>
                                    <textarea
                                        value={formData.og_description}
                                        onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                        rows={3}
                                        placeholder="Description for social media sharing"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Settings */}
                {currentStep === 5 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Final Settings</h2>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Project Settings</h3>

                            <div className="space-y-4">
                                <label className="flex items-start p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-indigo-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_featured}
                                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="mt-1 mr-4 h-4 w-4 text-indigo-600 rounded"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Featured Project</span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            This project will appear in the featured section on homepage
                                        </p>
                                    </div>
                                </label>

                                <label className="flex items-start p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-indigo-300">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="mt-1 mr-4 h-4 w-4 text-indigo-600 rounded"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Active Status</span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Project will be visible on the website when active
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Review Summary */}
                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900">Review Summary</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Project Name:</span> {formData.project_name || 'Not set'}</p>
                                <p><span className="font-medium">Status:</span> {formData.project_status}</p>
                                <p><span className="font-medium">Location:</span> {formData.location || 'Not set'}</p>
                                <p><span className="font-medium">Featured:</span> {formData.is_featured ? 'Yes' : 'No'}</p>
                                <p><span className="font-medium">Active:</span> {formData.is_active ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                    <div>
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={goToPreviousStep}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Previous
                            </button>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href="/admin/projects"
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </Link>

                        {currentStep < 5 ? (
                            <button
                                type="button"
                                onClick={goToNextStep}
                                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center"
                            >
                                Next
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Update Project
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}