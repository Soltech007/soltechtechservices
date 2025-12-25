
"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./globals.css";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Projects", href: "/admin/projects" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Clients", href: "/admin/clients" },
  { name: "Contacts", href: "/admin/contacts" },
  { name: "Blogs", href: "/admin/blogs" },
  { name: "Careers", href: "/admin/careers" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ⭐ IMPORTANT: Define public routes that don't need auth
  const PUBLIC_ROUTES = ['/admin/login', '/admin/signup'];
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user);
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Check if user is admin
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', session.user.email)
          .single();

        if (adminUser) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          // User exists but not admin
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          if (!isPublicRoute) {
            router.push('/admin/login');
          }
        }
      } else {
        // No session
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          router.push('/admin/login');
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setIsAuthenticated(false);
      if (!isPublicRoute) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  const getCurrentTitle = () => {
    const currentNav = navItems.find((item) => pathname.startsWith(item.href));
    if (pathname.includes("/new")) return "Create New";
    if (pathname.includes("/edit")) return "Edit";
    return currentNav?.name || "Admin";
  };

  // ⭐ CRUCIAL: Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // ⭐ CRUCIAL: For public routes (login/signup), show ONLY the page content
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // ⭐ CRUCIAL: For protected routes, check authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // ⭐ Show full admin layout ONLY for authenticated users on protected routes
  return (
    <div id="admin-layout" className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
        user={user}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={getCurrentTitle()}
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}