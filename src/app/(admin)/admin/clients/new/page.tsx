// src/app/(admin)/admin/clients/new/page.tsx
'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient, uploadImage } from '@/lib/api/admin'
import {
    Save,
    X,
    Upload,
    ChevronLeft,
    AlertCircle,
    CheckCircle,
    Loader2,
    Globe,
    Building
} from 'lucide-react'

export default function NewClientPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const logoRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        client_name: '',
        logo_url: '',
        website_url: '',
        description: '',
        is_featured: false,
        display_order: 999
    })

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file')
            setTimeout(() => setError(''), 3000)
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setError('Logo size should be less than 2MB')
            setTimeout(() => setError(''), 3000)
            return
        }

        setUploading(true)
        setError('')

        try {
            const { data: url, error } = await uploadImage(file, 'clients')

            if (error) {
                setError('Failed to upload logo')
            } else if (url) {
                setFormData({ ...formData, logo_url: url })
                setSuccess('Logo uploaded successfully!')
                setTimeout(() => setSuccess(''), 3000)
            }
        } catch (err) {
            console.error('Upload error:', err)
            setError('Failed to upload logo')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!formData.client_name || !formData.logo_url) {
            setError('Please fill all required fields')
            return
        }

        setLoading(true)

        try {
            const { error } = await createClient(formData)

            if (error) {
                setError('Error creating client: ' + error.message)
            } else {
                setSuccess('Client added successfully! Redirecting...')
                setTimeout(() => {
                    router.push('/admin/clients')
                }, 1500)
            }
        } catch (err) {
            console.error('Error:', err)
            setError('Failed to create client')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/admin/clients"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Clients
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Add New Client</h1>
                <p className="text-gray-600 mt-2">Add a new client logo and information</p>
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
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <Building className="w-5 h-5 mr-2 text-gray-600" />
                        Client Information
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Client Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.client_name}
                                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="e.g., ABC Corporation"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website URL
                            </label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="url"
                                    value={formData.website_url}
                                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                rows={3}
                                placeholder="Brief description about the client..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Display Order
                            </label>
                            <input
                                type="number"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 999 })}
                                className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                min="1"
                            />
                            <p className="text-xs text-gray-500 mt-1">Lower number appears first</p>
                        </div>
                    </div>
                </div>

                {/* Logo Upload */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">Client Logo</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo Image <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-4">
                            Recommended: PNG with transparent background, max 2MB
                        </p>

                        <input
                            ref={logoRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        {!formData.logo_url ? (
                            <button
                                type="button"
                                onClick={() => logoRef.current?.click()}
                                disabled={uploading}
                                className="w-full max-w-md px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 flex flex-col items-center justify-center gap-3 transition-colors"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                                        <span className="text-sm text-gray-600">Uploading logo...</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-10 h-10 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700">Click to upload logo</span>
                                        <span className="text-xs text-gray-500">PNG, JPG up to 2MB</span>
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="max-w-md">
                                <div className="relative bg-gray-50 rounded-lg p-8 border border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, logo_url: '' })}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-blue-800"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="relative h-32">
                                        <Image
                                            src={formData.logo_url}
                                            alt="Logo preview"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => logoRef.current?.click()}
                                    disabled={uploading}
                                    className="mt-3 text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                    Change logo
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold mb-6">Settings</h2>

                    <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <input
                            type="checkbox"
                            checked={formData.is_featured}
                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                            className="mr-4 h-4 w-4 text-indigo-600 rounded"
                        />
                        <div>
                            <span className="text-sm font-medium text-gray-900">Featured Client</span>
                            <p className="text-xs text-gray-500 mt-1">Show this client prominently on the website</p>
                        </div>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 bg-gray-50 px-6 py-4 rounded-lg border border-gray-200">
                    <Link
                        href="/admin/clients"
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
                                Add Client
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}