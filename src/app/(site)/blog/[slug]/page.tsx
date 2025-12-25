import Image from "next/image"
import { Metadata } from 'next';
import Script from 'next/script';
import Link from "next/link"
import { getBlogBySlug, getBlogSlugs, getAllBlogs } from "@/lib/api/blogs"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft, Clock, Facebook, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react"
import ShareButtons from "@/components/ShareButtons"
import { cn } from "@/lib/utils";

// Generate static params
export async function generateStaticParams() {
    const slugs = await getBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

// ✅ FIX: params is now a Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params; // ← await params first
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found',
        };
    }

    const title = blog.meta_title || `${blog.title} | SoltechTechServices Blog`;
    const description = blog.meta_description || blog.excerpt || `Read about ${blog.title} on SoltechTechServices blog`;
    const keywords = blog.meta_keywords || `${blog.title}, infrastructure blog, construction insights`;

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url: `https://ant-silk.vercel.app/blog/${blog.slug}`,
            images: [
                {
                    url: blog.featured_image || '/images/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                }
            ],
            type: 'article',
            publishedTime: blog.created_at,
            modifiedTime: blog.updated_at,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [blog.featured_image || '/images/og-image.png'],
        },
        alternates: {
            canonical: `https://ant-silk.vercel.app/blog/${blog.slug}`,
        },
        robots: {
            index: blog.is_published,
            follow: blog.is_published,
        },
    };
}

// ✅ FIX: params is now a Promise
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params; // ← await params first
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const recentBlogs = (await getAllBlogs())
        .filter(b => b.slug !== blog.slug)
        .slice(0, 3);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ant-silk.vercel.app';
    const fullUrl = `${baseUrl}/blog/${slug}`; // ← use slug variable

    // Schema 1: BlogPosting
    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt || blog.title,
        "image": blog.featured_image,
        "datePublished": blog.created_at,
        "dateModified": blog.updated_at || blog.created_at,
        "author": {
            "@type": "Organization",
            "name": "SoltechTechServices Pvt. Ltd.",
            "url": "https://ant-silk.vercel.app"
        },
        "publisher": {
            "@type": "Organization",
            "name": "SoltechTechServices Pvt. Ltd.",
            "logo": {
                "@type": "ImageObject",
                "url": "https://ant-silk.vercel.app/icon1.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
        },
        "wordCount": blog.content ? blog.content.split(/\s+/).length : 0,
        "timeRequired": blog.reading_time ? `PT${blog.reading_time}M` : undefined,
        "articleBody": blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 500) : undefined,
        "keywords": blog.meta_keywords
    };

    // Schema 2: Article
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blog.title,
        "description": blog.excerpt,
        "image": blog.featured_image,
        "datePublished": blog.created_at,
        "dateModified": blog.updated_at || blog.created_at,
        "author": {
            "@type": "Organization",
            "name": "SoltechTechServices Pvt. Ltd."
        },
        "publisher": {
            "@type": "Organization",
            "name": "SoltechTechServices Pvt. Ltd.",
            "logo": {
                "@type": "ImageObject",
                "url": "https://ant-silk.vercel.app/icon1.png"
            }
        }
    };

    // Schema 3: Breadcrumb
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ant-silk.vercel.app"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://ant-silk.vercel.app/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": blog.title,
                "item": fullUrl
            }
        ]
    };

    return (
        <>
            {/* Structured Data Scripts */}
            <Script
                id="blogposting-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
            />
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* ---------- HERO SECTION (FEATURED IMAGE) ---------- */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] py-12 flex items-center">
                {/* Background image */}
                <div className="absolute inset-0">
                    {blog.featured_image && (
                        <Image
                            src={blog.featured_image}
                            alt={blog.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/80 sm:bg-black/75 md:bg-black/70" />
                </div>

                {/* Foreground content */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mt-10">
                    <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl text-white">
                        {/* Category/Tag as yellow label */}
                        <p className="font-neuhas text-yellow-400 font-thin tracking-widest mb-2 text-sm sm:text-base md:text-[16px] uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}   // 🌟 pehla thoda delay
                        >
                            {blog.category || 'BLOG POST'}
                        </p>

                        {/* Title */}
                        <h1 className="text-white font-normal font-apfel2 mb-4 md:mb-6 text-[clamp(2.4rem,5.5vw,6rem)] leading-[1.05] [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}
                        >

                            {blog.title}
                        </h1>

                        {/* Meta data */}
                        <div className="font-neuhas text-[15px] sm:text-[16px] md:text-[20px] leading-[1.6] md:leading-[36px] font-medium text-white/85 sm:text-white/90 md:max-w-4xl">
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <span className="flex items-center gap-1.5 sm:gap-2">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>

                                {blog.reading_time && (
                                    <>
                                        <span className="text-white/50">•</span>
                                        <span className="flex items-center gap-1.5 sm:gap-2">
                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                                            {blog.reading_time} min read
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- BREADCRUMB BAR ---------- */}
            <div className="bg-[#edf3f5] border-b border-gray-200 sticky top-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-3 sm:py-4">
                    <nav className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center">
                            <Link href="/" className="hover:text-blue-800">HOME</Link>
                            <span className="mx-1.5 sm:mx-2">&gt;</span>
                            <Link href="/blog" className="hover:text-blue-800">BLOG</Link>
                            <span className="mx-1.5 sm:mx-2">&gt;</span>
                            <span className="text-blue-800 font-semibold uppercase truncate max-w-[200px] sm:max-w-none">
                                {blog.title}
                            </span>
                        </div>

                        {/* ⭐ Share Button Component */}
                        <ShareButtons url={fullUrl} title={blog.title} />
                    </nav>
                </div>
            </div>

            {/* ---------- MAIN ARTICLE & SIDEBAR ---------- */}
            <section className="bg-white py-12 sm:py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Main Blog Content */}
                        <article className="lg:col-span-8">
                            {/* Article Meta Info Box */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        Published: {new Date(blog.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </span>
                                    {blog.reading_time && (
                                        <>
                                            <span className="text-gray-400">|</span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                {blog.reading_time} minute{blog.reading_time !== 1 ? 's' : ''} read
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Excerpt */}
                            {blog.excerpt && (
                                <p className="text-lg text-gray-600 italic border-l-4 border-red-500 pl-6 mb-8">
                                    {blog.excerpt}
                                </p>
                            )}

                            {/* Main content from Jodit */}
                            <div
                                className="blog-content-wrapper prose prose-lg max-w-none prose-h2:font-semibold prose-h2:text-gray-800 prose-a:text-blue-800 prose-img:rounded-lg prose-img:shadow-md font-neuhas"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* ⭐ Share Section at Bottom */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Enjoyed this article? Share it with your network
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            aria-label="Share on Facebook"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(blog.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                                            aria-label="Share on Twitter"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                                            aria-label="Share on LinkedIn"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=Check out this article: ${fullUrl}`}
                                            className="p-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                            aria-label="Share via Email"
                                        >
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar with Recent Posts */}
                        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">
                                    Recent Posts
                                </h3>
                                <ul className="space-y-6">
                                    {recentBlogs.map(recentBlog => (
                                        <li key={recentBlog.id}>
                                            <Link href={`/blog/${recentBlog.slug}`} className="group flex items-start gap-4">
                                                {recentBlog.featured_image && (
                                                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={recentBlog.featured_image}
                                                            alt={recentBlog.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="80px"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-800 transition-colors">
                                                        {recentBlog.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                        <span>
                                                            {new Date(recentBlog.created_at).toLocaleDateString('en-US', {
                                                                month: 'short', day: 'numeric', year: 'numeric'
                                                            })}
                                                        </span>
                                                        {recentBlog.reading_time && (
                                                            <>
                                                                <span>•</span>
                                                                <span>{recentBlog.reading_time} min</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-blue-50 text-blue-900 rounded-lg p-6 border border-blue-200">
                                <h3 className="text-xl font-semibold mb-4">
                                    Have a Project?
                                </h3>
                                <p className="text-sm mb-6">
                                    Let's turn your vision into reality. Contact our experts today for a consultation.
                                </p>

                                <div className="mt-8 sm:mt-10 md:mt-12 md:-ml-8 hover:md:ml-0 transition-all duration-300">
                                    <Link
                                        href="/contact"
                                        className={cn(
                                            'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                                            'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                                            'text-sm sm:text-[20px] font-semibold text-blue-800',
                                            'transition-all duration-500 ease-out',
                                            'min-h-[44px] sm:min-h-[48px]',
                                            'w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0'
                                        )}
                                    >
                                        <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
                                        <span className="relative z-10 flex items-center justify-center md:justify-start">
                                            <span className="flex items-center justify-center rounded-full bg-blue-800 text-white transition-all duration-500 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </span>
                                            <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-neuhas">

                                                Get in Touch


                                            </span>
                                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ---------- "Back to Blog" CTA ---------- */}
            <section className="bg-[#edf3f5] py-12 text-center">

                <div className="mt-8 sm:mt-10 md:mt-12 md:-ml-8 hover:md:ml-0 transition-all duration-300">
                    <Link
                        href="/blog"
                        className={cn(
                            'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                            'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                            'text-sm sm:text-[20px] font-semibold text-blue-800',
                            'transition-all duration-500 ease-out',
                            'min-h-[44px] sm:min-h-[48px]',
                            'w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0'
                        )}
                    >
                        <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
                        <span className="relative z-10 flex items-center justify-center md:justify-start">
                            <span className="flex items-center justify-center rounded-full bg-blue-800 text-white transition-all duration-500 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                            </span>
                            <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-neuhas">

                                Back to All Posts



                            </span>
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
                        </span>
                    </Link>
                </div>
            </section>
        </>
    );
}