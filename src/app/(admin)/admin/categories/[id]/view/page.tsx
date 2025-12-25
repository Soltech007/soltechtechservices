// src/app/(admin)/admin/categories/[id]/view/page.tsx
'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoryById } from '@/lib/api/admin'
import {
    ChevronLeft,
    Edit,
    ExternalLink,
    CheckCircle,
    XCircle,
    Calendar
} from 'lucide-react'

export default function ViewCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const categoryId = parseInt(id)
    const [category, setCategory] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = async () => {
        try {
            const data = await getCategoryById(categoryId)
            setCategory(data)
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

    if (!category) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Category not found</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href="/admin/categories"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Categories
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">{category.category_name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${category.is_active
                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                    : 'bg-red-100 text-red-700 border border-red-200'
                                }`}>
                                {category.is_active ? (
                                    <CheckCircle className="w-4 h-4" />
                                ) : (
                                    <XCircle className="w-4 h-4" />
                                )}
                                {category.is_active ? 'Active' : 'Inactive'}
                            </span>
                            {category.show_on_homepage && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                    ⭐ Homepage Featured
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={`/markets/${category.category_slug}`}
                            target="_blank"
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View on Site
                        </Link>
                        <Link
                            href={`/admin/categories/${categoryId}/edit`}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Category
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Banner Image */}
                    {category.banner_image && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="relative h-96">
                                <Image
                                    src={category.banner_image}
                                    alt={category.category_name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Tagline */}
                    {category.tagline && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold mb-2">Tagline</h2>
                            <p className="text-gray-700">{category.tagline}</p>
                        </div>
                    )}

                    {/* Hero Section */}
                    {(category.hero_heading || category.hero_paragraphs?.length > 0) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold mb-4">{category.hero_heading || 'Hero Section'}</h2>
                            <div className="space-y-3">
                                {category.hero_paragraphs?.map((para: string, idx: number) => (
                                    <p key={idx} className="text-gray-700 leading-relaxed">{para}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hero Images */}
                    {(category.hero_image_1 || category.hero_image_2 || category.hero_image_3) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold mb-4">Hero Images</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {category.hero_image_1 && (
                                    <div className="relative h-64 rounded-lg overflow-hidden">
                                        <Image
                                            src={category.hero_image_1}
                                            alt={category.hero_image_1_alt || 'Hero Image 1'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                {category.hero_image_2 && (
                                    <div className="relative h-64 rounded-lg overflow-hidden">
                                        <Image
                                            src={category.hero_image_2}
                                            alt={category.hero_image_2_alt || 'Hero Image 2'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                {category.hero_image_3 && (
                                    <div className="relative h-64 rounded-lg overflow-hidden md:col-span-2">
                                        <Image
                                            src={category.hero_image_3}
                                            alt={category.hero_image_3_alt || 'Hero Image 3'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Sidebar Info */}
                <div className="space-y-6">
                    {/* Category Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Category Details</h3>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm text-gray-500">ID</dt>
                                <dd className="text-sm font-medium">#{category.category_id}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Slug</dt>
                                <dd className="text-sm font-medium">{category.category_slug}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Created</dt>
                                <dd className="text-sm font-medium flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(category.created_at).toLocaleDateString()}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Updated</dt>
                                <dd className="text-sm font-medium flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(category.updated_at).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Regions */}
                    {category.regions && category.regions.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">Operating Regions</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.regions.map((region: string, idx: number) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        📍 {region}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Thumbnail */}
                    {category.thumbnail_image && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">Thumbnail</h3>
                            <div className="relative h-48 rounded-lg overflow-hidden">
                                <Image
                                    src={category.thumbnail_image}
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
                            {category.meta_title && (
                                <div>
                                    <dt className="text-gray-500">Meta Title</dt>
                                    <dd className="font-medium">{category.meta_title}</dd>
                                </div>
                            )}
                            {category.meta_description && (
                                <div>
                                    <dt className="text-gray-500">Meta Description</dt>
                                    <dd className="text-gray-700">{category.meta_description}</dd>
                                </div>
                            )}
                            {category.meta_keywords && (
                                <div>
                                    <dt className="text-gray-500">Keywords</dt>
                                    <dd className="text-gray-700">{category.meta_keywords}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}