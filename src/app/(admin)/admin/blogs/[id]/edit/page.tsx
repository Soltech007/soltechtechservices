"use client";

import { useState, useEffect, useRef, ChangeEvent, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  FileText,
  Search,
  Upload,
  X,
  Code,
  Eye,
  Hash,
  Type,
  AlignLeft,
  Image as ImageIcon,
  CheckCircle,
  Sparkles,
  Globe,
  TrendingUp,
  Trash2,
  Edit3,
  Clock,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { uploadImage } from "@/lib/api/admin";

// ✅ Use the same Jodit editor used on Create page
const JoditEditorComponent = dynamic(() => import("@/components/JoditEditor"), {
  ssr: false,
});

// ⭐ MOVE calculateReadingTime OUTSIDE component
const calculateReadingTime = (content: string): number => {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return readingTime || 1;
};

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const { id: blogId } = use(params);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [editorMode, setEditorMode] = useState<"visual" | "source">("visual");
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_published: false,
    reading_time: 1, // ⭐ Change default to 1
    created_at: "",
    updated_at: "",
  });

  // ⭐ UPDATED Fetch blog data with auto-calculate
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", blogId)
          .single();

        if (error) throw error;

        // ⭐ Auto-calculate reading_time if missing or 0
        const processedData = {
          ...data,
          reading_time: data.reading_time || calculateReadingTime(data.content || '')
        };

        setFormData(processedData);
      } catch (err) {
        toast.error("Failed to fetch blog data");
        router.push("/admin/blogs");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchData();
  }, [blogId, router]);

  // Generate slug
  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  // Title / text fields
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "title") {
      setFormData({
        ...formData,
        title: value,
        slug: generateSlug(value),
        meta_title: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
    setHasChanges(true);
  };

  // Update handleEditorChange
  const handleEditorChange = (content: string) => {
    const readingTime = calculateReadingTime(content);
    setFormData({ ...formData, content, reading_time: readingTime });
    setHasChanges(true);
  };

  // Upload featured image
  const uploadFeaturedImage = async (file: File) => {
    setUploadingImage(true);
    try {
      if (!file.type.startsWith("image/"))
        throw new Error("Please select an image file");
      if (file.size > 5 * 1024 * 1024)
        throw new Error("Image should be < 5MB");

      const { data: url, error } = await uploadImage(file, "blogs");
      if (error) throw error;

      setFormData({ ...formData, featured_image: url });
      setHasChanges(true);
      toast.success("Image uploaded! 🎉");
    } catch (err: any) {
      toast.error(err.message || "Upload failed!");
    } finally {
      setUploadingImage(false);
    }
  };

  // Update existing blog
  const updateBlog = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content required!");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("blogs")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", blogId);

      if (error) throw error;

      toast.success("Blog updated successfully ✨", {
        style: { borderRadius: "12px", background: "#10b981", color: "#fff" },
      });
      setHasChanges(false);
      setTimeout(() => router.push("/admin/blogs"), 1000);
    } catch (err) {
      toast.error("Failed to update blog!");
    } finally {
      setSaving(false);
    }
  };

  // Delete current blog
  const deleteBlog = async () => {
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", blogId);
      if (error) throw error;
      toast.success("Blog deleted 🗑️", {
        style: { borderRadius: "12px", background: "#ef4444", color: "#fff" },
      });
      router.push("/admin/blogs");
    } catch (err) {
      toast.error("Failed to delete blog!");
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: FileText },
    { id: "content", label: "Content", icon: AlignLeft },
    { id: "seo", label: "SEO", icon: Search },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading blog data…</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />

      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blogs"
              className="p-2.5 hover:bg-slate-100 rounded-xl transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-all" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text">
                  Edit Blog
                </h1>
                {hasChanges && (
                  <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Unsaved
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Editing: {formData.title || "…"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Delete */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-5 py-2.5 text-blue-800 bg-red-50 hover:bg-red-100 
              rounded-xl font-medium transition-all flex items-center gap-2
              hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>

            {/* Save */}
            <button
              onClick={updateBlog}
              disabled={saving || !hasChanges}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl
              hover:from-indigo-600 hover:to-purple-700 font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 shadow-lg shadow-indigo-500/25
              hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95
              flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving…</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex gap-8 border-t border-slate-100">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-3.5 px-1 border-b-2 font-medium text-sm flex items-center gap-2 
              ${activeTab === id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Last updated:{" "}
              {formData.updated_at
                ? new Date(formData.updated_at).toLocaleString()
                : "—"}
            </p>
            <p className="text-xs text-blue-700">
              Created:{" "}
              {formData.created_at
                ? new Date(formData.created_at).toLocaleString()
                : "—"}
            </p>
          </div>
        </div>

        {/* GENERAL */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Type className="w-4 h-4 inline mr-1" /> Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white"
                placeholder="Enter blog title…"
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Hash className="w-4 h-4 inline mr-1" /> URL Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                readOnly
                className="w-full px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl text-slate-600 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-2">
                <Globe className="w-3 h-3 inline mr-1" /> yoursite.com/blog/
                {formData.slug}
              </p>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <AlignLeft className="w-4 h-4 inline mr-1" /> Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white resize-none"
                placeholder="Summary of your blog…"
              />
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <ImageIcon className="w-4 h-4 inline mr-1" /> Featured Image
              </label>
              {formData.featured_image ? (
                <div className="relative group rounded-xl overflow-hidden">
                  <img
                    src={formData.featured_image}
                    alt="Featured"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all transform hover:scale-110"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, featured_image: "" });
                        setHasChanges(true);
                      }}
                      className="p-3 bg-red-500 text-white rounded-xl hover:bg-blue-800 transition-all transform hover:scale-110"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      Click to upload image
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PNG, JPG, GIF & ≤ 5 MB
                    </p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  e.target.files?.[0] && uploadFeaturedImage(e.target.files[0])
                }
                className="hidden"
                disabled={uploadingImage}
              />
              {uploadingImage && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-indigo-600">Uploading image…</p>
                </div>
              )}
            </div>

            {/* ⭐ Reading Time - UPDATED with real-time word count */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Reading Time (minutes)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  name="reading_time"
                  value={formData.reading_time}
                  onChange={handleInputChange}
                  min="1"
                  max="60"
                  className="
                    w-32 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                    transition-all text-slate-900
                  "
                />
                <div className="text-sm text-slate-500">
                  {/* ⭐ Real-time word count */}
                  <p>Actual words: ~{formData.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(w => w.length > 0).length}</p>
                  <p className="text-xs mt-1">≈ {formData.reading_time} minute{formData.reading_time !== 1 ? 's' : ''} read</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  💡 Tip: This value auto-adjusts based on your content length (200 words/min), but you can manually override it if needed.
                </p>
              </div>
            </div>

            {/* Publish */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500/20"
                />
                <span className="text-sm font-semibold text-slate-700">
                  {formData.is_published
                    ? "Published ✅"
                    : "Save as Draft 📝"}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* CONTENT tab */}
        {activeTab === "content" && (
          <div className="animate-fade-in">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <p className="text-sm text-slate-600 font-medium">
                  Blog Content
                </p>
                <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                  <button
                    onClick={() => setEditorMode("visual")}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${editorMode === "visual"
                      ? "bg-indigo-500 text-white"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    <Eye className="w-4 h-4 inline mr-1" /> Visual
                  </button>
                  <button
                    onClick={() => setEditorMode("source")}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${editorMode === "source"
                      ? "bg-indigo-500 text-white"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    <Code className="w-4 h-4 inline mr-1" /> HTML
                  </button>
                </div>
              </div>

              <div className="p-4">
                {editorMode === "visual" ? (
                  <JoditEditorComponent
                    value={formData.content}
                    onChange={handleEditorChange}
                  />
                ) : (
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleEditorChange(e.target.value)}
                    className="w-full h-[500px] px-4 py-3 bg-slate-900 text-green-400 rounded-lg font-mono text-sm focus:outline-none resize-none"
                    placeholder="Enter HTML content..."
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEO tab */}
        {/* SEO tab */}
        {activeTab === "seo" && (
          <div className="space-y-6 animate-fade-in">
            {/* SEO Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    SEO Optimization
                  </p>
                  <p className="text-xs text-indigo-700">
                    Optimize these fields to improve search ranking.
                  </p>
                </div>
              </div>
            </div>

            {/* Meta Title */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Meta Title
              </label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
        focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
        transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="SEO optimized title for search engines..."
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-500">
                  Ideal: 50-60 characters
                </p>
                <p
                  className={`
            text-xs font-semibold
            ${formData.meta_title.length > 60
                      ? "text-blue-800"
                      : formData.meta_title.length > 50
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
          `}
                >
                  {formData.meta_title.length}/60
                </p>
              </div>
            </div>

            {/* Meta Description */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                className="
          w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
          transition-all text-slate-900 placeholder:text-slate-400 resize-none
        "
                rows={3}
                placeholder="Compelling description for search results..."
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-500">
                  Ideal: 150-160 characters
                </p>
                <p
                  className={`
            text-xs font-semibold
            ${formData.meta_description.length > 160
                      ? "text-blue-800"
                      : formData.meta_description.length > 150
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
          `}
                >
                  {formData.meta_description.length}/160
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Focus Keywords
              </label>
              <input
                type="text"
                name="meta_keywords"
                value={formData.meta_keywords}
                onChange={handleInputChange}
                className="
          w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
          transition-all text-slate-900 placeholder:text-slate-400
        "
                placeholder="keyword1, keyword2, keyword3..."
              />
              <p className="text-xs text-slate-500 mt-2">
                Separate keywords with commas for better SEO targeting
              </p>
            </div>

            {/* SEO Preview */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Google Search Preview
              </h3>
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <h4 className="text-blue-700 text-lg font-medium hover:underline cursor-pointer">
                  {formData.meta_title ||
                    formData.title ||
                    "Your Blog Title Here"}
                </h4>
                <p className="text-green-700 text-sm mt-1 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  yoursite.com › blog › {formData.slug || "your-blog-slug"}
                </p>
                <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                  {formData.meta_description ||
                    formData.excerpt ||
                    "Your blog description will appear here in search results..."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-blue-800" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">
              Delete Blog?
            </h3>
            <p className="text-slate-600 text-center mb-6">
              Are you sure you want to delete "{formData.title}"? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={deleteBlog}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-blue-800 text-white rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}