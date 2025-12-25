// src/app/(admin)/admin/projects/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectsWithCategory, deleteProject } from '@/lib/api/admin'
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react'

export default function AdminProjects() {
    const [projects, setProjects] = useState<any[]>([])
    const [filteredProjects, setFilteredProjects] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null)

    useEffect(() => {
        loadProjects()
    }, [])

    useEffect(() => {
        filterProjects()
    }, [searchTerm, statusFilter, projects])

    const loadProjects = async () => {
        try {
            const data = await getProjectsWithCategory()
            setProjects(data)
            setFilteredProjects(data)
        } finally {
            setLoading(false)
        }
    }

    const filterProjects = () => {
        let filtered = [...projects]

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(project => project.project_status === statusFilter)
        }

        setFilteredProjects(filtered)
    }

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return
        }

        setDeleteLoading(id)
        try {
            const { error } = await deleteProject(id)
            if (!error) {
                await loadProjects()
            } else {
                alert('Failed to delete project')
            }
        } finally {
            setDeleteLoading(null)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-4 h-4" />
            case 'ongoing':
                return <Clock className="w-4 h-4" />
            default:
                return <AlertCircle className="w-4 h-4" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700'
            case 'ongoing':
                return 'bg-blue-100 text-blue-700'
            default:
                return 'bg-yellow-100 text-yellow-700'
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
                    <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-600 mt-2">Manage all your projects</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add New Project
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Status</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mt-4 text-sm text-gray-600">
                    Showing {filteredProjects.length} of {projects.length} projects
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Project
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
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
                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No projects found
                                    </td>
                                </tr>
                            ) : (
                                filteredProjects.map((project) => (
                                    <tr key={project.project_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {project.thumbnail_image && (
                                                    <div className="relative w-12 h-12 mr-3 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={project.thumbnail_image}
                                                            alt={project.project_name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {project.project_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {project.project_id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900">
                                                {project.category_name || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900">
                                                {project.location || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.project_status)}`}>
                                                {getStatusIcon(project.project_status)}
                                                {project.project_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${project.is_featured
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {project.is_featured ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* View in Admin Panel - NEW */}
                                                <Link
                                                    href={`/admin/projects/${project.project_id}/view`}
                                                    className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>

                                                {/* Edit */}
                                                <Link
                                                    href={`/admin/projects/${project.project_id}/edit`}
                                                    className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(project.project_id, project.project_name)}
                                                    disabled={deleteLoading === project.project_id}
                                                    className="p-1.5 text-gray-600 hover:text-blue-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    {deleteLoading === project.project_id ? (
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