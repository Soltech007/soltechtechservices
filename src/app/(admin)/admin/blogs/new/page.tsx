"use client";

import { useState, useRef, ChangeEvent } from "react";
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
  LucideIcon,
  Clock,
} from "lucide-react";
import { uploadImage } from "@/lib/api/admin";

// Add Jodit dynamic import
const JoditEditorComponent = dynamic(() => import("@/components/JoditEditor"), {
  ssr: false,
});

// Type definitions
interface FormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  is_published: boolean;
  reading_time: number;
}

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

// ⭐ MOVE calculateReadingTime OUTSIDE component
const calculateReadingTime = (content: string): number => {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);
  return readingTime || 1;
};

export default function CreateBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [editorMode, setEditorMode] = useState<"visual" | "source">("visual");

  // Form Data - ⭐ Changed reading_time default to 1
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_published: false,
    reading_time: 1, // ⭐ Changed from 5 to 1
  });

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  // Handle input changes
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
  };

  // Update handleEditorChange
  const handleEditorChange = (content: string) => {
    const readingTime = calculateReadingTime(content);
    setFormData({ ...formData, content, reading_time: readingTime });
  };

  // Image upload handler
  const uploadFeaturedImage = async (file: File) => {
    setUploadingImage(true);
    try {
      if (!file.type.startsWith("image/"))
        throw new Error("Please select an image file");
      if (file.size > 5 * 1024 * 1024)
        throw new Error("Image size should be less than 5MB");

      const { data: url, error } = await uploadImage(file, "blogs");
      if (error) throw error;

      setFormData({ ...formData, featured_image: url });
      toast.success("Image uploaded successfully! 🎉");
    } catch (error: any) {
      toast.error(error.message || "Upload failed!");
      console.error("Upload Error:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  // Create blog
  const createBlog = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required!");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("blogs").insert([
        {
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success("Blog created successfully! 🚀", {
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1000);
    } catch (error) {
      toast.error("Failed to create blog");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const tabs: Tab[] = [
    { id: "general", label: "General", icon: FileText },
    { id: "content", label: "Content", icon: AlignLeft },
    { id: "seo", label: "SEO", icon: Search },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/blogs"
                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all group"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-900 group-hover:-translate-x-0.5 transition-all" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Create New Blog
                </h1>
                <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Fill in the details to create a new blog post
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/admin/blogs")}
                className="px-5 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={createBlog}
                disabled={saving}
                className="
                  px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl
                  hover:from-indigo-600 hover:to-purple-700 font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 shadow-lg shadow-indigo-500/25
                  hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95
                  flex items-center gap-2
                "
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Blog</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex gap-8 border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-3.5 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all
                  ${activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto p-6">
        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Title Field */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="
                  w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                  transition-all text-slate-900 placeholder:text-slate-400
                "
                placeholder="Enter an engaging blog title..."
              />
              {formData.title && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Great title!
                </p>
              )}
            </div>

            {/* Slug Field */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                URL Slug (Auto-generated)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  readOnly
                  className="
                    flex-1 px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl
                    text-slate-600 cursor-not-allowed
                  "
                  placeholder="Auto-generated from title"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                <Globe className="w-3 h-3 inline mr-1" />
                Preview: yoursite.com/blog/{formData.slug || "your-blog-slug"}
              </p>
            </div>

            {/* Excerpt Field */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <AlignLeft className="w-4 h-4" />
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="
                  w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                  transition-all text-slate-900 placeholder:text-slate-400 resize-none
                "
                rows={3}
                placeholder="Write a compelling summary of your blog post..."
              />
              <p className="text-xs text-slate-500 mt-2">
                This will appear in blog listings and search results
              </p>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Featured Image
              </label>

              {formData.featured_image ? (
                <div className="relative group rounded-xl overflow-hidden">
                  <img
                    src={formData.featured_image}
                    alt="Featured"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() =>
                        setFormData({ ...formData, featured_image: "" })
                      }
                      className="p-3 bg-red-500 text-white rounded-xl hover:bg-blue-800 transition-all transform hover:scale-110"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="
                    border-2 border-dashed border-slate-300 rounded-xl p-8
                    hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group
                  "
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      Click to upload image
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PNG, JPG, GIF up to 5MB
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
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-indigo-600">Uploading image...</p>
                </div>
              )}
            </div>

            {/* ⭐ Reading Time - UPDATED */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
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

            {/* Publish Status */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                />
                <div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                    Publish immediately
                  </span>
                  <p className="text-xs text-slate-500">
                    If unchecked, blog will be saved as draft
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Content Tab with Jodit Editor */}
        {activeTab === "content" && (
          <div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <p className="text-sm text-slate-600 font-medium">
                  Write your blog content below
                </p>
                <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                  <button
                    onClick={() => setEditorMode("visual")}
                    className={`
                      px-3 py-1.5 rounded text-sm font-medium transition-all
                      ${editorMode === "visual"
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                      }
                    `}
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    Visual
                  </button>
                  <button
                    onClick={() => setEditorMode("source")}
                    className={`
                      px-3 py-1.5 rounded text-sm font-medium transition-all
                      ${editorMode === "source"
                        ? "bg-indigo-500 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                      }
                    `}
                  >
                    <Code className="w-4 h-4 inline mr-1" />
                    HTML
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
                    className="
                      w-full h-[500px] px-4 py-3 bg-slate-900 text-green-400 
                      rounded-lg font-mono text-sm focus:outline-none resize-none
                    "
                    placeholder="Enter HTML content..."
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            {/* SEO Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    SEO Optimization Tips
                  </p>
                  <p className="text-xs text-indigo-700 mt-1">
                    Optimize these fields to improve your blog&apos;s search
                    engine ranking
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
                className="
                  w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                  transition-all text-slate-900 placeholder:text-slate-400
                "
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
    </div>
  );
}