// src/app/(admin)/admin/projects/[id]/view/page.tsx
'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectById } from '@/lib/api/admin'
import { incrementProjectViews } from '@/lib/api/projects'
import {
    ChevronLeft,
    Edit,
    ExternalLink,
    MapPin,
    Calendar,
    Eye,
    Tag,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react'

export default function ViewProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const projectId = parseInt(id)
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadProject()
    }, [])

    const loadProject = async () => {
        try {
            const data = await getProjectById(projectId)
            setProject(data)

            // Increment view count
            await incrementProjectViews(projectId)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Project not found</p>
            </div>
        )
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5" />
            case 'ongoing':
                return <Clock className="w-5 h-5" />
            default:
                return <AlertCircle className="w-5 h-5" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700 border-green-200'
            case 'ongoing':
                return 'bg-blue-100 text-blue-700 border-blue-200'
            default:
                return 'bg-yellow-100 text-yellow-700 border-yellow-200'
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Projects
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">{project.project_name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            {project.location && (
                                <span className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {project.location}
                                </span>
                            )}
                            <span className="flex items-center text-gray-600">
                                <Eye className="w-4 h-4 mr-1" />
                                {project.view_count || 0} views
                            </span>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.project_status)}`}>
                                {getStatusIcon(project.project_status)}
                                {project.project_status}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={`/projects/${project.project_slug}`}
                            target="_blank"
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View on Site
                        </Link>
                        <Link
                            href={`/admin/projects/${projectId}/edit`}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Project
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Banner Image */}
                    {project.banner_image && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="relative h-96">
                                <Image
                                    src={project.banner_image}
                                    alt={project.project_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Tagline */}
                    {project.tagline && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold mb-2">Tagline</h2>
                            <p className="text-gray-700">{project.tagline}</p>
                        </div>
                    )}

                    {/* Section 1 */}
                    {(project.section1_heading || project.section1_paragraphs?.length > 0) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold mb-4">{project.section1_heading || 'Section 1'}</h2>
                            <div className="space-y-3">
                                {project.section1_paragraphs?.map((para: string, idx: number) => (
                                    <p key={idx} className="text-gray-700 leading-relaxed">{para}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Section 2 */}
                    {(project.section2_heading || project.section2_paragraphs?.length > 0) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold mb-4">{project.section2_heading || 'Section 2'}</h2>
                            {project.section2_image && (
                                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                                    <Image
                                        src={project.section2_image}
                                        alt={project.section2_image_alt || ''}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="space-y-3">
                                {project.section2_paragraphs?.map((para: string, idx: number) => (
                                    <p key={idx} className="text-gray-700 leading-relaxed">{para}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Similarly add other sections */}
                </div>

                {/* Right Column - Sidebar Info */}
                <div className="space-y-6">
                    {/* Project Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm text-gray-500">ID</dt>
                                <dd className="text-sm font-medium">#{project.project_id}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Slug</dt>
                                <dd className="text-sm font-medium">{project.project_slug}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Category</dt>
                                <dd className="text-sm font-medium">{project.category_name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Created</dt>
                                <dd className="text-sm font-medium">
                                    {new Date(project.created_at).toLocaleDateString()}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Updated</dt>
                                <dd className="text-sm font-medium">
                                    {new Date(project.updated_at).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Settings */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Settings</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Featured</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${project.is_featured
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {project.is_featured ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Active</span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${project.is_active
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {project.is_active ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    {project.thumbnail_image && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">Thumbnail</h3>
                            <div className="relative h-48 rounded-lg overflow-hidden">
                                <Image
                                    src={project.thumbnail_image}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* SEO Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">SEO Information</h3>
                        <dl className="space-y-3 text-sm">
                            {project.meta_title && (
                                <div>
                                    <dt className="text-gray-500">Meta Title</dt>
                                    <dd className="font-medium">{project.meta_title}</dd>
                                </div>
                            )}
                            {project.meta_description && (
                                <div>
                                    <dt className="text-gray-500">Meta Description</dt>
                                    <dd className="text-gray-700">{project.meta_description}</dd>
                                </div>
                            )}
                            {project.meta_keywords && (
                                <div>
                                    <dt className="text-gray-500">Keywords</dt>
                                    <dd className="text-gray-700">{project.meta_keywords}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}