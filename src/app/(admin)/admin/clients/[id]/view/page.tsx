// src/app/(admin)/admin/clients/[id]/view/page.tsx
'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getClientById } from '@/lib/api/admin'
import {
    ChevronLeft,
    Edit,
    ExternalLink,
    Calendar,
    Star,
    Globe,
    Hash
} from 'lucide-react'

export default function ViewClientPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const clientId = parseInt(id)
    const [client, setClient] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadClient()
    }, [])

    const loadClient = async () => {
        try {
            const data = await getClientById(clientId)
            setClient(data)
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

    if (!client) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Client not found</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href="/admin/clients"
                            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Clients
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">{client.client_name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            {client.is_featured && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                    <Star className="w-4 h-4" />
                                    Featured Client
                                </span>
                            )}
                            <span className="text-gray-600 text-sm">
                                Display Order: {client.display_order}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {client.website_url && (
                            <a
                                href={client.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Visit Website
                            </a>
                        )}
                        <Link
                            href={`/admin/clients/${clientId}/edit`}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Client
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Logo Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Client Logo</h3>
                        {client.logo_url ? (
                            <div className="relative bg-gray-50 rounded-lg p-8 border border-gray-100">
                                <div className="relative h-32">
                                    <Image
                                        src={client.logo_url}
                                        alt={client.client_name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-lg p-8 text-center">
                                <p className="text-gray-500">No logo uploaded</p>
                            </div>
                        )}
                    </div>

                    {/* Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                        <h3 className="text-lg font-semibold mb-4">Details</h3>
                        <dl className="space-y-3">
                            <div>
                                <dt className="text-sm text-gray-500 flex items-center gap-1">
                                    <Hash className="w-3 h-3" />
                                    Client ID
                                </dt>
                                <dd className="text-sm font-medium">#{client.client_id}</dd>
                            </div>

                            {client.website_url && (
                                <div>
                                    <dt className="text-sm text-gray-500 flex items-center gap-1">
                                        <Globe className="w-3 h-3" />
                                        Website
                                    </dt>
                                    <dd className="text-sm">
                                        <a
                                            href={client.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-700"
                                        >
                                            {new URL(client.website_url).hostname}
                                        </a>
                                    </dd>
                                </div>
                            )}

                            <div>
                                <dt className="text-sm text-gray-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Added On
                                </dt>
                                <dd className="text-sm font-medium">
                                    {new Date(client.created_at).toLocaleDateString()}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm text-gray-500">Last Updated</dt>
                                <dd className="text-sm font-medium">
                                    {new Date(client.updated_at).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    {client.description && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{client.description}</p>
                        </div>
                    )}

                    {/* Settings */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Settings</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-3 border-b">
                                <span className="text-sm text-gray-600">Featured Status</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${client.is_featured
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {client.is_featured ? 'Featured' : 'Not Featured'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-sm text-gray-600">Display Order</span>
                                <span className="text-sm font-medium">
                                    Position #{client.display_order}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}