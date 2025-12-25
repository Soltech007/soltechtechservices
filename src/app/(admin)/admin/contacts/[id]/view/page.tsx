'use client'
import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import { getContactById, updateContactStatus } from '@/lib/api/admin'
import {
    ChevronLeft,
    Mail,
    Phone,
    Building,
    Calendar,
    Clock,
    MapPin,
    DollarSign,
    FileText,
    User,
    MessageSquare,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react'

export default function ViewContactPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const contactId = parseInt(id)
    const [contact, setContact] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        loadContact()
    }, [])

    const loadContact = async () => {
        try {
            const data = await getContactById(contactId)
            setContact(data)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (newStatus: string) => {
        setUpdating(true)
        const { error } = await updateContactStatus(contactId, newStatus)
        if (!error) {
            await loadContact()
        }
        setUpdating(false)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
                return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'contacted':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            case 'converted':
                return 'bg-green-100 text-green-700 border-green-200'
            case 'rejected':
                return 'bg-red-100 text-red-700 border-red-200'
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new':
                return <AlertCircle className="w-4 h-4" />
            case 'contacted':
                return <Clock className="w-4 h-4" />
            case 'converted':
                return <CheckCircle className="w-4 h-4" />
            case 'rejected':
                return <XCircle className="w-4 h-4" />
            default:
                return null
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (!contact) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Contact submission not found</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/admin/contacts"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Contacts
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{contact.name}</h1>
                        <p className="text-gray-600 mt-1">Contact Form Submission</p>
                    </div>

                    {/* Status Selector */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Status:</span>
                        <select
                            value={contact.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            disabled={updating}
                            className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-colors ${getStatusColor(contact.status)}`}
                        >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Message */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-gray-600" />
                            Message
                        </h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {contact.message}
                        </p>
                    </div>

                    {/* Project Details */}
                    {(contact.project_type || contact.budget || contact.timeline) && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-gray-600" />
                                Project Requirements
                            </h3>
                            <dl className="space-y-4">
                                {contact.project_type && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Project Type</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{contact.project_type}</dd>
                                    </div>
                                )}
                                {contact.budget && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                                            <DollarSign className="w-4 h-4 mr-1" />
                                            Budget
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">{contact.budget}</dd>
                                    </div>
                                )}
                                {contact.timeline && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Timeline
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">{contact.timeline}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    )}

                    {/* Additional Info */}
                    {contact.how_found && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">How they found us</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{contact.how_found}</dd>
                                </div>
                            </dl>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2 text-gray-600" />
                            Contact Information
                        </h3>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">{contact.name}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
                                    Email
                                </dt>
                                <dd className="mt-1">
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-sm text-indigo-600 hover:text-indigo-700"
                                    >
                                        {contact.email}
                                    </a>
                                </dd>
                            </div>

                            {contact.phone && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Phone className="w-4 h-4 mr-1" />
                                        Phone
                                    </dt>
                                    <dd className="mt-1">
                                        <a
                                            href={`tel:${contact.phone}`}
                                            className="text-sm text-indigo-600 hover:text-indigo-700"
                                        >
                                            {contact.phone}
                                        </a>
                                    </dd>
                                </div>
                            )}

                            {contact.company && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Building className="w-4 h-4 mr-1" />
                                        Company
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">{contact.company}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* Submission Details */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Submission Details</h3>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">ID</dt>
                                <dd className="mt-1 text-sm text-gray-900">#{contact.id}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Submitted On
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(contact.created_at).toLocaleDateString()}
                                    <br />
                                    <span className="text-xs text-gray-500">
                                        {new Date(contact.created_at).toLocaleTimeString()}
                                    </span>
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(contact.updated_at).toLocaleDateString()}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Current Status</dt>
                                <dd className="mt-1">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(contact.status)}`}>
                                        {getStatusIcon(contact.status)}
                                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${contact.email}`}
                                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Send Email
                            </a>

                            {contact.phone && (
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call Now
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}