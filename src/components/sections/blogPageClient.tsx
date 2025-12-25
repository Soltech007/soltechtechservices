'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronsRight, Clock, Loader2 } from "lucide-react"

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    featured_image?: string;
    created_at: string;
    reading_time?: number;
}

interface Props {
    initialBlogs?: Blog[]; // ✅ Optional prop
}

export default function BlogPageClient({ initialBlogs = [] }: Props) { // ✅ Default empty array
    const [displayedCount, setDisplayedCount] = useState(9);
    const [loadingMore, setLoadingMore] = useState(false);

    // ✅ Safe access with default values
    const blogs = initialBlogs || [];

    const featuredBlog = blogs.length > 0 ? blogs[0] : null;
    const sideBlogs = blogs.length > 1 ? blogs.slice(1, 5) : [];
    const remainingBlogs = blogs.length > 5 ? blogs.slice(5) : [];

    const visibleRemainingBlogs = remainingBlogs.slice(0, displayedCount);
    const hasMoreBlogs = remainingBlogs.length > displayedCount;

    const handleLoadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setDisplayedCount(prev => prev + 6);
            setLoadingMore(false);
        }, 500);
    };

    const lastRowItemsCount = visibleRemainingBlogs.length % 3;
    const fullRows = Math.floor(visibleRemainingBlogs.length / 3);
    const fullRowsBlogs = visibleRemainingBlogs.slice(0, fullRows * 3);
    const lastRowBlogs = visibleRemainingBlogs.slice(fullRows * 3);

    return (
        <>
            {/* ---------- HERO SECTION ---------- */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] py-12 flex items-center">
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80"
                        alt="SoltechTechServices Blog"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/80 sm:bg-black/75 md:bg-black/70" />
                </div>

                {/* Foreground content */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mt-10">
                    <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl text-white">
                        <p
                            className="font-neuhas text-yellow-400 font-thin tracking-widest mb-2 
             text-sm sm:text-base md:text-[16px] uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}   // 🌟 pehla thoda delay
                        >
                            BLOG
                        </p>

                        {/* ✅ H1 Tag - SEO ke liye */}
                        <h1
                            className="text-white font-normal font-apfel2 mb-4 md:mb-6
                   text-[clamp(2.4rem,6.3vw,6.3rem)] leading-[1.05]
                   [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}
                        >
                            Insights &amp; Updates
                        </h1>

                        <p
                            className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px]
                   leading-[1.6] md:leading-[36px] font-medium
                   text-white/85 sm:text-white/90 md:max-w-4xl"
                        >
                            Your source for the latest in construction technology, infrastructure
                            trends, and A&amp;T Infracon news.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- BREADCRUMB BAR ---------- */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-3 sm:py-4">
                    <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
                        <Link href="/" className="hover:text-blue-800 transition-colors">HOME</Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <span className="text-blue-800 font-semibold uppercase">BLOG</span>
                    </nav>
                </div>
            </div>

            {/* ---------- MAIN BLOG CONTENT ---------- */}
            <section className="bg-[#f8f9fa] py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                    {blogs.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-gray-700">
                                No blog posts found
                            </h2>
                            <p className="text-[14px] sm:text-[16px] md:text-[22px] leading-[30px] font-neuhas text-gray-500 mt-4">
                                Please check back later for updates and insights from our team.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* ✅ H2 Tag - Featured Posts */}
                            <div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-gray-900 mb-2">
                                    Featured Posts
                                </h2>
                            </div>

                            {/* ---------- FEATURED + SIDE BLOGS SECTION ---------- */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                                {/* LEFT SIDE - FEATURED BLOG */}
                                {featuredBlog && (
                                    <div className="lg:col-span-2">
                                        <article className="bg-white rounded-xl overflow-hidden h-full">
                                            <div className="relative h-72 sm:h-96 lg:h-[420px] w-full">
                                                <Image
                                                    src={featuredBlog.featured_image || 'https://via.placeholder.com/800x600'}
                                                    alt={featuredBlog.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                                />
                                                <div className="absolute top-4 left-4 bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold font-neuhas">
                                                    LATEST
                                                </div>
                                            </div>

                                            <div className="p-6 lg:p-8">
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-neuhas">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(featuredBlog.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric', month: 'long', day: 'numeric'
                                                        })}
                                                    </span>
                                                    {featuredBlog.reading_time && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {featuredBlog.reading_time} min read
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal leading-tight text-gray-900 mb-4 hover:text-blue-800 transition-colors">
                                                    <Link href={`/blog/${featuredBlog.slug}`}>
                                                        {featuredBlog.title}
                                                    </Link>
                                                </h3>

                                                {featuredBlog.excerpt && (
                                                    <p className="text-[14px] sm:text-[16px] md:text-[22px] leading-[30px] font-neuhas text-gray-600 mb-6 line-clamp-3">
                                                        {featuredBlog.excerpt}
                                                    </p>
                                                )}

                                                <Link
                                                    href={`/blog/${featuredBlog.slug}`}
                                                    className="inline-flex items-center gap-2 text-blue-800 font-bold hover:gap-3 transition-all font-neuhas"
                                                >
                                                    READ FULL ARTICLE
                                                    <ChevronsRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </article>
                                    </div>
                                )}

                                {/* RIGHT SIDE - 4 SMALL BLOGS */}
                                {sideBlogs.length > 0 && (
                                    <div className="lg:col-span-1">
                                        <div className="flex flex-col gap-4 h-full">
                                            {sideBlogs.map((blog) => (
                                                <article
                                                    key={blog.id}
                                                    className="bg-white rounded-lg overflow-hidden duration-300 flex-1"
                                                >
                                                    <div className="flex h-full">
                                                        <div className="relative w-36 lg:w-40 flex-shrink-0">
                                                            <Image
                                                                src={blog.featured_image || 'https://via.placeholder.com/400x300'}
                                                                alt={blog.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="200px"
                                                            />
                                                        </div>

                                                        <div className="flex-1 p-4 lg:p-5 flex flex-col justify-between">
                                                            <div>
                                                                <p className="text-xs text-gray-500 mb-2 space-y-2 font-neuhas">
                                                                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                                    })}
                                                                    <br />
                                                                    {blog.reading_time && (
                                                                        <span className="flex items-center gap-1">
                                                                            <Clock className="w-4 h-4" />
                                                                            <span>{blog.reading_time} min read</span>
                                                                        </span>
                                                                    )}
                                                                </p>

                                                                <h4 className="text-sm lg:text-base font-apfel2 font-normal text-gray-900 line-clamp-3 hover:text-blue-800 transition-colors">
                                                                    <Link href={`/blog/${blog.slug}`}>
                                                                        {blog.title}
                                                                    </Link>
                                                                </h4>
                                                            </div>

                                                            <Link
                                                                href={`/blog/${blog.slug}`}
                                                                className="text-blue-800 text-xs font-semibold hover:underline mt-3 inline-block font-neuhas"
                                                            >
                                                                READ MORE →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ---------- MORE ARTICLES SECTION ---------- */}
                            {remainingBlogs.length > 0 && (
                                <div className="border-t border-gray-300 pt-12">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal leading-tight text-gray-900">
                                            More Articles
                                        </h2>
                                        <p className="text-sm text-gray-500 font-neuhas">
                                            Showing {visibleRemainingBlogs.length} of {remainingBlogs.length} articles
                                        </p>
                                    </div>

                                    {/* Full rows */}
                                    {fullRowsBlogs.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                            {fullRowsBlogs.map((blog) => (
                                                <article
                                                    key={blog.id}
                                                    className="bg-white rounded-lg overflow-hidden transition-all duration-300 group"
                                                >
                                                    <div className="relative h-48 w-full overflow-hidden">
                                                        <Image
                                                            src={blog.featured_image || 'https://via.placeholder.com/400x300'}
                                                            alt={blog.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        />
                                                    </div>

                                                    <div className="p-5">
                                                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1 font-neuhas">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                                month: 'short', day: 'numeric', year: 'numeric'
                                                            })}
                                                        </p>

                                                        <h3 className="text-base sm:text-lg md:text-xl font-apfel2 font-normal leading-tight text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors">
                                                            <Link href={`/blog/${blog.slug}`}>
                                                                {blog.title}
                                                            </Link>
                                                        </h3>

                                                        {blog.excerpt && (
                                                            <p className="text-[14px] sm:text-[16px] leading-[24px] font-neuhas text-gray-600 line-clamp-2 mb-4">
                                                                {blog.excerpt}
                                                            </p>
                                                        )}

                                                        <Link
                                                            href={`/blog/${blog.slug}`}
                                                            className="text-blue-800 text-sm font-bold hover:underline inline-flex items-center gap-1 group font-neuhas"
                                                        >
                                                            READ MORE
                                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                        </Link>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}

                                    {/* Last row */}
                                    {lastRowBlogs.length > 0 && (
                                        <div className={`flex flex-wrap gap-6 mb-12 ${lastRowItemsCount === 1 || lastRowItemsCount === 2 ? 'justify-center' : ''}`}>
                                            {lastRowBlogs.map((blog) => (
                                                <article
                                                    key={blog.id}
                                                    className="bg-white rounded-lg overflow-hidden transition-all duration-300 group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] lg:max-w-sm"
                                                >
                                                    <div className="relative h-48 w-full overflow-hidden">
                                                        <Image
                                                            src={blog.featured_image || 'https://via.placeholder.com/400x300'}
                                                            alt={blog.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        />
                                                    </div>

                                                    <div className="p-5">
                                                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1 font-neuhas">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                                month: 'short', day: 'numeric', year: 'numeric'
                                                            })}
                                                        </p>

                                                        <h3 className="text-base sm:text-lg md:text-xl font-apfel2 font-normal leading-tight text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors">
                                                            <Link href={`/blog/${blog.slug}`}>
                                                                {blog.title}
                                                            </Link>
                                                        </h3>

                                                        {blog.excerpt && (
                                                            <p className="text-[14px] sm:text-[16px] leading-[24px] font-neuhas text-gray-600 line-clamp-2 mb-4">
                                                                {blog.excerpt}
                                                            </p>
                                                        )}

                                                        <Link
                                                            href={`/blog/${blog.slug}`}
                                                            className="text-blue-800 text-sm font-bold hover:underline inline-flex items-center gap-1 group font-neuhas"
                                                        >
                                                            READ MORE
                                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                        </Link>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}

                                    {/* Load More Button */}
                                    {hasMoreBlogs && (
                                        <div className="text-center">
                                            <button
                                                onClick={handleLoadMore}
                                                disabled={loadingMore}
                                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-800 text-white font-bold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-neuhas"
                                            >
                                                {loadingMore ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Loading...
                                                    </>
                                                ) : (
                                                    <>
                                                        Load More Articles
                                                        <span className="text-sm">({remainingBlogs.length - displayedCount} remaining)</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}