"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  ExternalLink,
  MoreVertical,
  Grid3x3,
  List,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // list or grid
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [sortOrder]);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: sortOrder === "asc" });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = async (id, title) => {
    const toastId = toast.loading(`Deleting "${title}"...`);
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) throw error;

      toast.success(`Blog deleted!`, {
        id: toastId,
        icon: "🗑️",
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setShowDeleteModal(null);
    } catch (error) {
      toast.error("Failed to delete blog", { id: toastId });
      console.error(error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedBlogs.length === 0) {
      toast.error("No blogs selected.");
      return;
    }

    const toastId = toast.loading(
      `Deleting ${selectedBlogs.length} blog(s)...`
    );
    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .in("id", selectedBlogs);
      if (error) throw error;

      toast.success("Selected blogs deleted!", {
        id: toastId,
        icon: "🗑️",
      });
      setBlogs(blogs.filter((blog) => !selectedBlogs.includes(blog.id)));
      setSelectedBlogs([]);
    } catch (error) {
      toast.error("Failed to delete selected blogs", { id: toastId });
    }
  };

  const togglePublish = async (blog) => {
    const newStatus = !blog.is_published;
    const toastId = toast.loading(
      newStatus ? "Publishing..." : "Unpublishing..."
    );

    try {
      const { data, error } = await supabase
        .from("blogs")
        .update({ is_published: newStatus })
        .eq("id", blog.id)
        .select()
        .single();

      if (error) throw error;

      toast.success(newStatus ? "Blog published! 🎉" : "Blog unpublished!", {
        id: toastId,
      });
      setBlogs(blogs.map((b) => (b.id === blog.id ? data : b)));
    } catch (error) {
      toast.error("Failed to update status", { id: toastId });
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBlogs(filteredBlogs.map((blog) => blog.id));
    } else {
      setSelectedBlogs([]);
    }
  };
  // change
  const handleSelectOne = (id) => {
    setSelectedBlogs((prev) =>
      prev.includes(id) ? prev.filter((blogId) => blogId !== id) : [...prev, id]
    );
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt &&
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

      if (filterStatus === "published")
        return matchesSearch && blog.is_published;
      if (filterStatus === "draft") return matchesSearch && !blog.is_published;
      return matchesSearch;
    });
  }, [blogs, searchQuery, filterStatus]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px]">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
            Content Hub
          </h1>
          <p className="text-slate-600 mt-1 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Manage all your articles from one place
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="
            inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
            text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 
            transition-all duration-200 font-medium shadow-lg shadow-indigo-500/25
            hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95
          "
        >
          <Plus className="w-5 h-5" />
          Create New Article
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Posts</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {blogs.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Published</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {blogs.filter((b) => b.is_published).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Drafts</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {blogs.filter((b) => !b.is_published).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="
                  w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                  transition-all duration-200 text-sm
                "
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus("all")}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  filterStatus === "all"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              All <span className="opacity-75">({blogs.length})</span>
            </button>
            <button
              onClick={() => setFilterStatus("published")}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  filterStatus === "published"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              Published{" "}
              <span className="opacity-75">
                ({blogs.filter((b) => b.is_published).length})
              </span>
            </button>
            <button
              onClick={() => setFilterStatus("draft")}
              className={`
                px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  filterStatus === "draft"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-600 text-white shadow-lg shadow-orange-500/25"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }
              `}
            >
              Drafts{" "}
              <span className="opacity-75">
                ({blogs.filter((b) => !b.is_published).length})
              </span>
            </button>
          </div>

          {/* Sort & View Toggle */}
          <div className="flex items-center gap-2">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="
                px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
                transition-all
              "
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`
                  p-2 rounded-lg transition-all
                  ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-slate-600 hover:text-slate-900"
                  }
                `}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`
                  p-2 rounded-lg transition-all
                  ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-slate-600 hover:text-slate-900"
                  }
                `}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedBlogs.length > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-900">
                  {selectedBlogs.length} article
                  {selectedBlogs.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-xs text-indigo-600">
                  Ready for bulk actions
                </p>
              </div>
            </div>
            <button
              onClick={handleBulkDelete}
              className="
                px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-800 
                transition-all font-medium text-sm flex items-center gap-2
                hover:scale-105 active:scale-95
              "
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {searchQuery ? "No Results Found" : "Your content library is empty"}
          </h3>
          <p className="text-slate-600 mb-6">
            {searchQuery
              ? "Try a different search term or clear your filters."
              : "Start by creating your first article to see it here."}
          </p>
          {!searchQuery && (
            <Link
              href="/admin/blogs/new"
              className="
                inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 
                transition-all duration-200 font-medium shadow-lg shadow-indigo-500/25
                hover:shadow-xl hover:shadow-indigo-500/30
              "
            >
              <Plus className="w-5 h-5" />
              Create Your First Article
            </Link>
          )}
        </div>
      ) : viewMode === "grid" ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {blog.featured_image ? (
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                {/* Checkbox */}
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.includes(blog.id)}
                    onChange={() => handleSelectOne(blog.id)}
                    className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                  />
                </div>
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => togglePublish(blog)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md
                      ${
                        blog.is_published
                          ? "bg-green-500/90 text-white"
                          : "bg-orange-500/90 text-white"
                      }
                    `}
                  >
                    {blog.is_published ? "Published" : "Draft"}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <Link href={`/admin/blogs/${blog.id}/edit`}>
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                    {blog.title}
                  </h3>
                </Link>
                {blog.excerpt && (
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatRelativeDate(blog.updated_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </a>
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(blog)}
                    className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-12 px-6 py-4">
                    <input
                      type="checkbox"
                      checked={
                        selectedBlogs.length === filteredBlogs.length &&
                        filteredBlogs.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedBlogs.includes(blog.id)}
                        onChange={() => handleSelectOne(blog.id)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden">
                          {blog.featured_image ? (
                            <img
                              src={blog.featured_image}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-md">
                          <Link
                            href={`/admin/blogs/${blog.id}/edit`}
                            className="font-semibold text-slate-900 hover:text-indigo-600 line-clamp-2 transition-colors"
                          >
                            {blog.title}
                          </Link>
                          {blog.excerpt && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                              {blog.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublish(blog)}
                        className={`
                          inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                          transition-all hover:scale-105
                          ${
                            blog.is_published
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                          }
                        `}
                      >
                        {blog.is_published ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Published
                          </>
                        ) : (
                          <>
                            <Edit className="w-3.5 h-3.5" />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        {formatRelativeDate(blog.updated_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Post"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Edit Post"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => setShowDeleteModal(blog)}
                          className="p-2 text-slate-500 hover:text-blue-800 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Post"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-blue-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
              Delete Article?
            </h3>
            <p className="text-slate-600 text-center mb-6">
              Are you sure you want to delete "
              <span className="font-semibold">{showDeleteModal.title}</span>"?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleDelete(showDeleteModal.id, showDeleteModal.title)
                }
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-blue-800 text-white rounded-xl font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {filteredBlogs.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 bg-white rounded-xl p-4 border border-slate-200">
          <p className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredBlogs.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">{blogs.length}</span>{" "}
            articles
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              disabled
            >
              Previous
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
