// src/app/(admin)/admin/clients/[id]/edit/page.tsx
'use client'
import { use, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getClientById, updateClient, uploadImage } from '@/lib/api/admin'
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

export default function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const clientId = parseInt(id)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
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

    useEffect(() => {
        loadClient()
    }, [])

    const loadClient = async () => {
        try {
            const data = await getClientById(clientId)
            if (data) {
                setFormData({
                    client_name: data.client_name || '',
                    logo_url: data.logo_url || '',
                    website_url: data.website_url || '',
                    description: data.description || '',
                    is_featured: data.is_featured || false,
                    display_order: data.display_order || 999
                })
            } else {
                setError('Client not found')
            }
        } catch (err) {
            console.error('Error loading client:', err)
            setError('Failed to load client data')
        } finally {
            setInitialLoading(false)
        }
    }

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
            const { data: url, error } = await uploadImage(file, 'clients') // ⭐ Use clients folder

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
            const { error } = await updateClient(clientId, formData)

            if (error) {
                setError('Error updating client: ' + error.message)
            } else {
                setSuccess('Client updated successfully! Redirecting...')
                setTimeout(() => {
                    router.push('/admin/clients')
                }, 1500)
            }
        } catch (err) {
            console.error('Error:', err)
            setError('Failed to update client')
        } finally {
            setLoading(false)
        }
    }

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading client data...</p>
                </div>
            </div>
        )
    }

    if (error && !formData.client_name) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-blue-800 mr-2" />
                        <p className="text-blue-800">{error}</p>
                    </div>
                    <Link
                        href="/admin/clients"
                        className="inline-block mt-4 text-indigo-600 hover:text-indigo-700"
                    >
                        ← Back to Clients
                    </Link>
                </div>
            </div>
        )
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
                <h1 className="text-3xl font-bold text-gray-900">Edit Client</h1>
                <p className="text-gray-600 mt-2">Update client: {formData.client_name}</p>
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

            {/* Form - Same as Add but with Update */}
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

                        {formData.logo_url && (
                            <div className="max-w-md mb-4">
                                <div className="relative bg-gray-50 rounded-lg p-8 border border-gray-200">
                                    <div className="relative h-32">
                                        <Image
                                            src={formData.logo_url}
                                            alt="Logo preview"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => logoRef.current?.click()}
                            disabled={uploading}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    {formData.logo_url ? 'Change Logo' : 'Upload Logo'}
                                </>
                            )}
                        </button>
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
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Update Client
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}