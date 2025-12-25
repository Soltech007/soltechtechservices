// src/app/(admin)/admin/dashboard/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getDashboardStats } from '@/lib/api/admin'
import {
  FolderOpen,
  Users,
  Mail,
  Building2,
  TrendingUp,
  Activity,
  ArrowUp,
  ArrowDown,
  Eye,
  Plus
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCategories: 0,
    totalClients: 0,
    totalContacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await getDashboardStats()
      setStats(data)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/admin/projects',
      change: '+12%'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: Building2,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/admin/categories',
      change: '+5%'
    },
    {
      title: 'Clients',
      value: stats.totalClients,
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: '/admin/clients',
      change: '+8%'
    },
    {
      title: 'Contact Forms',
      value: stats.totalContacts,
      icon: Mail,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/admin/contacts',
      change: '+23%'
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to SoltechTechServices Admin Panel</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/projects/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link
              key={index}
              href={stat.link}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <span className="flex items-center text-sm text-green-600 font-medium">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New project added</p>
                <p className="text-xs text-gray-500">Highway Construction Phase 2</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Contact form received</p>
                <p className="text-xs text-gray-500">From ABC Corporation</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Client updated</p>
                <p className="text-xs text-gray-500">XYZ Industries logo changed</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <Link
              href="/admin/projects/new"
              className="block p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-indigo-600">Add New Project</p>
                <Plus className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link
              href="/admin/categories/new"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-green-600">Add New Category</p>
                <Plus className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link
              href="/admin/clients/new"
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-purple-600">Add New Client</p>
                <Plus className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link
              href="/admin/contacts"
              className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-orange-600">View Contact Forms</p>
                <Eye className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Project Stats Chart (Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Statistics</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Chart will be implemented here</p>
        </div>
      </div>
    </div>
  )
}