"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Icons } from "./Icons";

export default function Header({ title, user, sidebarOpen, setSidebarOpen }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setShowDropdown(false);
    const toastId = toast.loading("Logging out...");

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast.success("Logged out successfully!", { id: toastId });

      // Use window.location.href for a clean redirect
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 500);
    } catch (error) {
      toast.error("Logout failed. Please try again.", { id: toastId });
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 h-[70px] flex items-center px-6 sticky top-0 z-20">
      <div className="flex items-center justify-between w-full">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
          >
            <Icons.Menu size={20} />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative">
            <div className="relative">
              <Icons.Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 w-80 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all"
              />
            </div>
          </div>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors md:hidden"
          >
            <Icons.Search size={20} />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/admin/blogs/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-admin-primary text-white rounded-xl hover:bg-admin-primary-dark transition-colors text-sm font-medium"
            >
              <Icons.Plus size={16} />
              <span>New Post</span>
            </Link>
          </div>

          <div className="relative">
            <button className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <Icons.Bell size={20} />
              {/* <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                3
              </span> */}
            </button>
          </div>

          <div className="relative">
            <button
              className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-admin-primary to-admin-primary-dark flex items-center justify-center text-white font-semibold">
                {user?.email?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-900">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 truncate max-w-[120px]">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
              <Icons.ChevronDown
                size={16}
                className={`text-slate-400 transition-transform hidden md:block ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-2">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">
                      Admin User
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email || "admin@example.com"}
                    </p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/admin/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Icons.Profile size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Icons.Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-slate-100" />
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-blue-800 hover:bg-red-50 transition-colors text-left"
                      onClick={handleLogout}
                    >
                      <Icons.Logout size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 md:hidden">
          <div className="relative">
            <Icons.Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
