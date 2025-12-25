// src/app/(admin)/admin/categories/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCategories, deleteCategory } from '@/lib/api/admin'
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    FileText,
    CheckCircle,
    XCircle
} from 'lucide-react'

export default function AdminCategories() {
    const [categories, setCategories] = useState<any[]>([])
    const [filteredCategories, setFilteredCategories] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null)

    useEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        filterCategories()
    }, [searchTerm, categories])

    const loadCategories = async () => {
        try {
            const data = await getAllCategories()
            setCategories(data)
            setFilteredCategories(data)
        } finally {
            setLoading(false)
        }
    }

    const filterCategories = () => {
        let filtered = [...categories]

        if (searchTerm) {
            filtered = filtered.filter(category =>
                category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFilteredCategories(filtered)
    }

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?\n\nNote: You cannot delete categories with existing projects.`)) {
            return
        }

        setDeleteLoading(id)
        try {
            const { error } = await deleteCategory(id)
            if (error) {
                if (error.message?.includes('existing projects')) {
                    alert('Cannot delete category with existing projects. Please move or delete the projects first.')
                } else {
                    alert('Failed to delete category: ' + error.message)
                }
            } else {
                await loadCategories()
            }
        } finally {
            setDeleteLoading(null)
        }
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
                    <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-600 mt-2">Manage project categories</p>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add New Category
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredCategories.length} of {categories.length} categories
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Regions
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Homepage
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No categories found
                                    </td>
                                </tr>
                            ) : (
                                filteredCategories.map((category) => (
                                    <tr key={category.category_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {category.thumbnail_image && (
                                                    <div className="relative w-12 h-12 mr-3 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={category.thumbnail_image}
                                                            alt={category.category_name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {category.category_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {category.category_id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900">
                                                {category.category_slug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {category.regions && category.regions.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {category.regions.slice(0, 2).map((region: string, idx: number) => (
                                                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                            {region}
                                                        </span>
                                                    ))}
                                                    {category.regions.length > 2 && (
                                                        <span className="text-xs text-gray-500">
                                                            +{category.regions.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${category.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {category.is_active ? (
                                                    <CheckCircle className="w-3 h-3" />
                                                ) : (
                                                    <XCircle className="w-3 h-3" />
                                                )}
                                                {category.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${category.show_on_homepage
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {category.show_on_homepage ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/markets/${category.category_slug}`}
                                                    target="_blank"
                                                    className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View on Site"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>

                                                <Link
                                                    href={`/admin/categories/${category.category_id}/view`}
                                                    className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </Link>

                                                <Link
                                                    href={`/admin/categories/${category.category_id}/edit`}
                                                    className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(category.category_id, category.category_name)}
                                                    disabled={deleteLoading === category.category_id}
                                                    className="p-1.5 text-gray-600 hover:text-blue-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    {deleteLoading === category.category_id ? (
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