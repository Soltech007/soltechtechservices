// components/admin/AdminLayout.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
    LayoutDashboard,
    FolderOpen,
    Users,
    Mail,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Building2
} from 'lucide-react'

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            setUserEmail(user.email || '')
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    const menuItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
        { href: '/admin/categories', label: 'Categories', icon: Building2 },
        { href: '/admin/clients', label: 'Clients', icon: Users },
        { href: '/admin/contacts', label: 'Contact Forms', icon: Mail },
        { href: '/admin/blogs', label: 'Blogs', icon: FileText },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ]

    return (
        <div className="admin-container">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-gray-900 text-white rounded-lg"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-white">A&T Admin</h2>
                    <p className="text-gray-400 text-sm mt-1">Control Panel</p>
                </div>

                <nav className="mt-6">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${isActive ? 'bg-gray-800 text-white border-l-4 border-indigo-500' : ''
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon size={20} className="mr-3" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 mr-3">
                            <p className="text-sm text-gray-400">Logged in as</p>
                            <p className="text-sm font-medium text-white truncate">{userEmail}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}