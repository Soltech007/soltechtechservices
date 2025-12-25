// src/app/(admin)/admin/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  Building2,
  Users,
  Mail,
  FileText,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Image as ImageIcon,
  BarChart3,
  MessageSquare,
  Shield
} from "lucide-react";

// Backend ke hisab se navigation items
const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Overview & Stats"
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
    description: "Manage Projects",
    badge: "" // Dynamic count add kar sakte ho
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Building2,
    description: "Project Categories"
  },
  {
    name: "Clients",
    href: "/admin/clients",
    icon: Users,
    description: "Client Management"
  },
  {
    name: "Contact Forms",
    href: "/admin/contacts",
    icon: Mail,
    description: "Inquiries & Leads",
    badge: "" // New contacts count
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
    description: "Blog Posts"
  },
  {
    name: "Careers",
    href: "/admin/careers",
    icon: MessageSquare,
    description: "Job Openings"
  },
  // {
  //   name: "Analytics",
  //   href: "/admin/analytics",
  //   icon: BarChart3,
  //   description: "Site Analytics"
  // },
  // {
  //   name: "Settings",
  //   href: "/admin/settings",
  //   icon: Settings,
  //   description: "System Settings"
  // },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  user,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
  user: any;
}) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile and set default state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Mobile par default close rakhna hai
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300
          ${sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-50 bg-slate-900 border-r border-slate-800
        flex flex-col shadow-2xl transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${sidebarOpen ? "w-64" : "lg:w-20 w-64"}
      `}
      >
        {/* Desktop Collapse Button */}
        <button
          className={`
            hidden lg:flex absolute -right-4 top-11 z-50 h-8 w-8 rounded-full 
            border-2 bg-white shadow-lg transition-all duration-200 items-center justify-center
            hover:shadow-xl hover:scale-110 hover:rotate-180 active:scale-95
            border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300
          `}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <div className="transition-transform duration-300">
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Logo Section */}
        <div
          className={`
          border-b border-slate-800 transition-all duration-300
          ${sidebarOpen ? "p-6" : "lg:p-4 p-6"}
        `}
        >
          <div className="flex items-center justify-between">
            <div
              className={`
              flex items-center transition-all duration-300
              ${sidebarOpen ? "space-x-3" : "lg:justify-center"}
            `}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    A&T Admin
                  </h1>
                  <p className="text-xs text-slate-400">Infrastructure Panel</p>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button
              className="lg:hidden hover:rotate-90 transition-transform duration-200 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={`
          flex-1 py-6 space-y-1 overflow-y-auto
          ${sidebarOpen ? "px-4" : "lg:px-3 px-4"}
        `}
        >
          {navItems.map((item, index) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  onClick={() => {
                    if (isMobile) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`
                    flex items-center rounded-xl text-sm font-medium transition-all duration-200 
                    relative group w-full
                    ${sidebarOpen
                      ? "space-x-3 px-4 py-3"
                      : "lg:justify-center lg:p-3 space-x-3 px-4 py-3"
                    }
                    ${isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-[1.02] border border-indigo-400/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-[1.02]"
                    }
                    ${hoveredItem === item.name &&
                    !isActive &&
                    "bg-slate-800/30"
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}

                  <Icon
                    className={`
                    w-5 h-5 flex-shrink-0 transition-transform duration-200
                    ${hoveredItem === item.name && "rotate-6 scale-110"}
                    ${isActive && "drop-shadow-sm"}
                  `}
                  />

                  {sidebarOpen && (
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium">
                        {item.name}
                      </span>
                      {/* Badge for notifications */}
                      {/* {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )} */}
                    </div>
                  )}

                  {/* Hover effect dot */}
                  {!isActive && hoveredItem === item.name && sidebarOpen && (
                    <div className="absolute right-3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  )}
                </Link>

                {/* Tooltip for collapsed sidebar */}
                {!sidebarOpen && hoveredItem === item.name && (
                  <div className="fixed left-20 z-[60] px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-xl whitespace-nowrap border border-slate-700 pointer-events-none hidden lg:block">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 border-l border-b border-slate-700 rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className={`border-t border-slate-800 ${sidebarOpen ? "p-4" : "lg:p-3 p-4"}`}>
          {/* User Info */}
          <div className={`flex items-center mb-3 ${sidebarOpen ? "space-x-3" : "lg:justify-center"}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className={`space-y-1 ${sidebarOpen ? "" : "lg:space-y-2"}`}>
            <Link
              href="/admin/profile"
              className={`
                flex items-center text-slate-300 hover:text-white hover:bg-slate-800/50 
                rounded-lg transition-colors text-sm
                ${sidebarOpen ? "space-x-2 px-3 py-2" : "lg:justify-center lg:p-2 space-x-2 px-3 py-2"}
              `}
            >
              <User className="w-4 h-4" />
              {sidebarOpen && <span>Profile</span>}
            </Link>

            <button
              onClick={onLogout}
              className={`
                w-full flex items-center text-slate-300 hover:text-red-400 hover:bg-red-500/10 
                rounded-lg transition-colors text-sm
                ${sidebarOpen ? "space-x-2 px-3 py-2" : "lg:justify-center lg:p-2 space-x-2 px-3 py-2"}
              `}
            >
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}