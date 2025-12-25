// src/app/(admin)/admin/clients/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllClients, deleteClient, updateDisplayOrder } from '@/lib/api/admin'
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    GripVertical,
    ExternalLink,
    CheckCircle,
    Star
} from 'lucide-react'

export default function AdminClients() {
    const [clients, setClients] = useState<any[]>([])
    const [filteredClients, setFilteredClients] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null)
    const [draggedItem, setDraggedItem] = useState<any>(null)

    useEffect(() => {
        loadClients()
    }, [])

    useEffect(() => {
        filterClients()
    }, [searchTerm, clients])

    const loadClients = async () => {
        try {
            const data = await getAllClients()
            setClients(data)
            setFilteredClients(data)
        } finally {
            setLoading(false)
        }
    }

    const filterClients = () => {
        let filtered = [...clients]

        if (searchTerm) {
            filtered = filtered.filter(client =>
                client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFilteredClients(filtered)
    }

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) {
            return
        }

        setDeleteLoading(id)
        try {
            const { error } = await deleteClient(id)
            if (error) {
                alert('Failed to delete client')
            } else {
                await loadClients()
            }
        } finally {
            setDeleteLoading(null)
        }
    }

    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent, client: any) => {
        setDraggedItem(client)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = async (e: React.DragEvent, targetClient: any) => {
        e.preventDefault()

        if (!draggedItem || draggedItem.client_id === targetClient.client_id) {
            return
        }

        const draggedIndex = clients.findIndex(c => c.client_id === draggedItem.client_id)
        const targetIndex = clients.findIndex(c => c.client_id === targetClient.client_id)

        const newClients = [...clients]
        newClients.splice(draggedIndex, 1)
        newClients.splice(targetIndex, 0, draggedItem)

        // Update display order
        const updatedClients = newClients.map((client, index) => ({
            ...client,
            display_order: index + 1
        }))

        setClients(updatedClients)
        setFilteredClients(updatedClients)

        // Update in database
        const orderUpdates = updatedClients.map(client => ({
            id: client.client_id,
            order: client.display_order
        }))

        await updateDisplayOrder(orderUpdates, 'clients')
        setDraggedItem(null)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                    <p className="text-gray-600 mt-2">Manage client logos and information</p>
                </div>
                <Link
                    href="/admin/clients/new"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add New Client
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search clients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing {filteredClients.length} of {clients.length} clients
                    </p>
                    <p className="text-xs text-gray-500">
                        💡 Drag and drop to reorder
                    </p>
                </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="w-12 px-4 py-3"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Website
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Featured
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No clients found
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map((client) => (
                                    <tr
                                        key={client.client_id}
                                        className="hover:bg-gray-50 cursor-move"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, client)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, client)}
                                    >
                                        <td className="px-4 py-4">
                                            <GripVertical className="w-5 h-5 text-gray-400" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {client.logo_url && (
                                                    <div className="relative w-16 h-12 mr-3 bg-gray-100 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={client.logo_url}
                                                            alt={client.client_name}
                                                            fill
                                                            className="object-contain p-1"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {client.client_name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Order: {client.display_order || 0}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.website_url ? (
                                                <a
                                                    href={client.website_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    {new URL(client.website_url).hostname}
                                                </a>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {client.description || '-'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${client.is_featured
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {client.is_featured && <Star className="w-3 h-3" />}
                                                {client.is_featured ? 'Featured' : 'Normal'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/clients/${client.client_id}/view`}
                                                    className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>

                                                <Link
                                                    href={`/admin/clients/${client.client_id}/edit`}
                                                    className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(client.client_id, client.client_name)}
                                                    disabled={deleteLoading === client.client_id}
                                                    className="p-1.5 text-gray-600 hover:text-blue-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    {deleteLoading === client.client_id ? (
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}