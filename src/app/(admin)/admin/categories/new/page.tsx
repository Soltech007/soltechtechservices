// src/app/(admin)/admin/categories/new/page.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createCategory, uploadImage } from '@/lib/api/admin'
import {
    Save,
    X,
    Upload,
    Plus,
    Trash2,
    ChevronLeft,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react'

export default function NewCategoryPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState<string | null>(null)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // File refs
    const thumbnailRef = useRef<HTMLInputElement>(null)
    const bannerRef = useRef<HTMLInputElement>(null)
    const hero1Ref = useRef<HTMLInputElement>(null)
    const hero2Ref = useRef<HTMLInputElement>(null)
    const hero3Ref = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        category_name: '',
        category_slug: '',
        thumbnail_image: '',
        tagline: '',
        hero_image_1: '',
        hero_image_1_alt: '',
        hero_image_2: '',
        hero_image_2_alt: '',
        hero_image_3: '',
        hero_image_3_alt: '',
        hero_heading: '',
        hero_paragraphs: [''],
        regions: [''],
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        og_title: '',
        og_description: '',
        og_image: '',
        is_active: true,
        show_on_homepage: true,
        banner_image: ''
    })

    // Auto-generate slug
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            category_name: name,
            category_slug: generateSlug(name),
            meta_title: name,
            og_title: name
        })
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
                setError('Failed to upload image')
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!formData.category_name) {
            setError('Please fill required fields')
            return
        }

        setLoading(true)

        try {
            const cleanedData = {
                ...formData,
                hero_paragraphs: formData.hero_paragraphs.filter(p => p.trim()),
                regions: formData.regions.filter(r => r.trim()),
                og_image: formData.og_image || formData.thumbnail_image
            }

            const { error } = await createCategory(cleanedData)

            if (error) {
                setError('Error creating category: ' + error.message)
            } else {
                setSuccess('Category created successfully! Redirecting...')
                setTimeout(() => {
                    router.push('/admin/categories')
                }, 1500)
            }
        } catch (err) {
            console.error('Error:', err)
            setError('Failed to create category')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/admin/categories"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Categories
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
                <p className="text-gray-600 mt-2">Create a new project category</p>
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.category_name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., Road Construction"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL Slug <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.category_slug}
                                onChange={(e) => setFormData({ ...formData, category_slug: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="road-construction"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Short description"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">Images</h2>

                    <div className="space-y-6">
                        {/* Thumbnail */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Thumbnail Image
                            </label>
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
                                className="w-full max-w-md px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 flex flex-col items-center justify-center gap-2"
                            >
                                {uploading === 'thumbnail_image' ? (
                                    <>
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                        <span className="text-sm">Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <span className="text-sm font-medium">Upload Thumbnail</span>
                                    </>
                                )}
                            </button>
                            {formData.thumbnail_image && (
                                <div className="relative w-full max-w-md h-48 mt-3 rounded-lg overflow-hidden">
                                    <Image
                                        src={formData.thumbnail_image}
                                        alt="Thumbnail"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, thumbnail_image: '' })}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Banner */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Banner Image
                            </label>
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
                                className="w-full max-w-md px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 flex flex-col items-center justify-center gap-2"
                            >
                                {uploading === 'banner_image' ? (
                                    <>
                                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                        <span className="text-sm">Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <span className="text-sm font-medium">Upload Banner</span>
                                    </>
                                )}
                            </button>
                            {formData.banner_image && (
                                <div className="relative w-full max-w-2xl h-64 mt-3 rounded-lg overflow-hidden">
                                    <Image
                                        src={formData.banner_image}
                                        alt="Banner"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, banner_image: '' })}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">Hero Section</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Heading
                            </label>
                            <input
                                type="text"
                                value={formData.hero_heading}
                                onChange={(e) => setFormData({ ...formData, hero_heading: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Hero Paragraphs
                            </label>
                            {formData.hero_paragraphs.map((para, index) => (
                                <div key={index} className="flex gap-2 mb-3">
                                    <textarea
                                        value={para}
                                        onChange={(e) => handleArrayField('hero_paragraphs', index, e.target.value)}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        rows={3}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayField('hero_paragraphs', index)}
                                        className="p-2 text-blue-800 hover:bg-red-50 rounded"
                                        disabled={formData.hero_paragraphs.length === 1}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayField('hero_paragraphs')}
                                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Paragraph
                            </button>
                        </div>
                    </div>
                </div>

                {/* Regions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">Regions</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Operating Regions
                        </label>
                        {formData.regions.map((region, index) => (
                            <div key={index} className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={region}
                                    onChange={(e) => handleArrayField('regions', index, e.target.value)}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g., Gujarat"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayField('regions', index)}
                                    className="p-2 text-blue-800 hover:bg-red-50 rounded"
                                    disabled={formData.regions.length === 1}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayField('regions')}
                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Region
                        </button>
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">SEO Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                value={formData.meta_title}
                                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                maxLength={200}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                value={formData.meta_description}
                                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">Settings</h2>

                    <div className="space-y-4">
                        <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                            <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="mr-4 h-4 w-4 text-indigo-600 rounded"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-900">Active</span>
                                <p className="text-xs text-gray-500 mt-1">Make this category visible</p>
                            </div>
                        </label>

                        <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                            <input
                                type="checkbox"
                                checked={formData.show_on_homepage}
                                onChange={(e) => setFormData({ ...formData, show_on_homepage: e.target.checked })}
                                className="mr-4 h-4 w-4 text-indigo-600 rounded"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-900">Show on Homepage</span>
                                <p className="text-xs text-gray-500 mt-1">Display in homepage category section</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 bg-gray-50 px-6 py-4 rounded-lg border border-gray-200">
                    <Link
                        href="/admin/categories"
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium flex items-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Create Category
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}