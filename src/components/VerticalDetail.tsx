// components/sections/VerticalDetail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, CheckCircle, Brain, BarChart3, MessageSquare, Eye, Code, Cloud, Smartphone, RefreshCw, Search, Target, Users, Mail, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap: Record<string, any> = {
    Brain, BarChart3, MessageSquare, Eye, Code, Cloud, Smartphone, RefreshCw, Search, Target, Users, Mail, Sparkles, TrendingUp, Shield, Zap
};

// CTA Button Component
function CtaButton({ 
    href, 
    children, 
    className, 
    external = false,
    variant = "primary"
}: { 
    href: string; 
    children: React.ReactNode; 
    className?: string; 
    external?: boolean;
    variant?: "primary" | "secondary" | "outline";
}) {
    const LinkComponent = external ? 'a' : Link;
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    
    if (variant === "outline") {
        return (
            <LinkComponent
                href={href}
                {...externalProps}
                className={cn(
                    'group inline-flex items-center gap-2 px-6 py-3 rounded-full',
                    'border-2 border-white/80 text-white font-semibold',
                    'hover:bg-white hover:text-blue-800 transition-all duration-300',
                    'font-neuhas text-sm sm:text-base',
                    className
                )}
            >
                {children}
                {external && <ExternalLink className="w-4 h-4" />}
            </LinkComponent>
        );
    }

    if (variant === "secondary") {
        return (
            <LinkComponent
                href={href}
                {...externalProps}
                className={cn(
                    'group inline-flex items-center gap-2 px-6 py-3 rounded-full',
                    'bg-white/10 backdrop-blur-sm text-white font-semibold',
                    'hover:bg-white hover:text-blue-800 transition-all duration-300',
                    'font-neuhas text-sm sm:text-base border border-white/20',
                    className
                )}
            >
                {children}
                {external && <ExternalLink className="w-4 h-4" />}
            </LinkComponent>
        );
    }
    
    return (
        <LinkComponent
            href={href}
            {...externalProps}
            className={cn(
                'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                'px-5 sm:px-6 md:px-8 py-2.5 sm:py-3',
                'text-sm sm:text-base font-semibold text-blue-800',
                'transition-all duration-500 ease-out',
                'min-h-[44px] sm:min-h-[48px]',
                'bg-white hover:bg-blue-800 hover:text-white',
                className
            )}
        >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                <span className="whitespace-nowrap transition-colors duration-300 font-neuhas">
                    {children}
                </span>
                {external ? (
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                ) : (
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                )}
            </span>
        </LinkComponent>
    );
}

interface VerticalDetailClientProps {
    vertical: {
        name: string;
        slug: string;
        url: string;
        tagline: string;
        color: string;
        description: string;
        longDescription: string;
        heroImage: string;
        keyFeatures: Array<{
            icon: string;
            title: string;
            description: string;
        }>;
        statistics: Array<{
            value: string;
            label: string;
            description: string;
        }>;
        capabilities: string[];
        solutions: Array<{
            title: string;
            industry: string;
            value: string;
            description: string;
            image: string;
            highlights: string[];
        }>;
        technologies: string[];
        testimonial: {
            quote: string;
            author: string;
            company: string;
        };
    };
}

export default function VerticalDetailClient({ vertical }: VerticalDetailClientProps) {
    return (
        <>
            {/* ============ HERO SECTION ============ */}
            <section className="font-apfel2 relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={vertical.heroImage}
                        alt={vertical.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Multi-layer Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                    {/* Blue Accent Overlay */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-800/40 to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl bg-blue-800" />
                <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 blur-3xl bg-blue-800" />

                <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-20 sm:py-24 md:py-32">
                    <div className="max-w-5xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fadeIn bg-blue-800/20 border border-blue-800/40">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="font-neuhas text-sm font-medium tracking-wide text-blue-400">
                                SOLTECH VERTICAL
                            </span>
                        </div>

                        {/* Title */}
                        <h1 
                            className="text-white font-normal font-apfel2 mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] animate-slideInLeft"
                            style={{ animationDelay: '0.1s' }}
                        >
                            {vertical.name}
                        </h1>

                        {/* Tagline */}
                        <p 
                            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 font-neuhas text-blue-400 animate-slideInLeft"
                            style={{ animationDelay: '0.2s' }}
                        >
                            {vertical.tagline}
                        </p>

                        {/* Description */}
                        <p 
                            className="font-neuhas text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/85 max-w-3xl mb-10 animate-slideInLeft"
                            style={{ animationDelay: '0.3s' }}
                        >
                            {vertical.description}
                        </p>

                        {/* CTA Buttons */}
                        <div 
                            className="flex flex-wrap gap-4 animate-slideInLeft"
                            style={{ animationDelay: '0.4s' }}
                        >
                            <CtaButton href="/contact">
                                Get Started
                            </CtaButton>
                            <CtaButton href={vertical.url} external variant="secondary">
                                Visit Website
                            </CtaButton>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
               
            </section>

            {/* ============ BREADCRUMB ============ */}
            <div className="bg-white border-b border-gray-100 fix top-[72px] sm:top-[80px] z-40 backdrop-blur-sm bg-white/95">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-4">
                    <nav className="flex items-center text-sm text-gray-500 font-neuhas">
                        <Link href="/" className="hover:text-blue-800 transition-colors">Home</Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <Link href="/verticals" className="hover:text-blue-800 transition-colors">Verticals</Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="font-semibold text-blue-800">{vertical.name}</span>
                    </nav>
                </div>
            </div>

            {/* ============ STATISTICS SECTION ============ */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {vertical.statistics.map((stat, idx) => (
                                <div 
                                    key={idx} 
                                    className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Accent Line */}
                                    <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-apfel2 text-blue-800 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-lg sm:text-xl font-semibold text-gray-900 font-apfel2 mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-sm text-gray-500 font-neuhas">
                                        {stat.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ ABOUT SECTION ============ */}
            <section className="py-20 sm:py-24 md:py-32 bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Left Content */}
                            <div>
                                <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 font-neuhas text-blue-800">
                                    About Us
                                </span>
                                <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-gray-900 mb-8">
                                    What is{" "}
                                    <span className="text-blue-800">{vertical.name}</span>?
                                </h2>
                                <p className="text-lg sm:text-xl font-neuhas text-gray-600 leading-relaxed mb-8">
                                    {vertical.longDescription}
                                </p>
                                <Link
                                    href={vertical.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-800 text-white font-semibold rounded-full hover:bg-blue-900 transition-all duration-300 font-neuhas"
                                >
                                    Explore {vertical.name}
                                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>

                            {/* Right - Visual */}
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-3xl opacity-10 blur-2xl bg-blue-800" />
                                <div className="relative aspect-square rounded-3xl overflow-hidden">
                                    <Image
                                        src={vertical.heroImage}
                                        alt={vertical.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 to-transparent" />
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-800">
                                    <div className="text-3xl font-bold font-apfel2 text-blue-800">
                                        {vertical.statistics[0]?.value}
                                    </div>
                                    <div className="text-sm text-gray-600 font-neuhas">
                                        {vertical.statistics[0]?.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ KEY FEATURES SECTION ============ */}
            <section className="py-20 sm:py-24 md:py-32 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 font-neuhas text-blue-800">
                                Features
                            </span>
                            <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-gray-900 mb-6">
                                Key Features & Capabilities
                            </h2>
                            <p className="text-lg text-gray-600 font-neuhas">
                                Discover what makes {vertical.name} the perfect solution for your business needs.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {vertical.keyFeatures.map((feature, idx) => {
                                const IconComponent = iconMap[feature.icon] || Brain;
                                return (
                                    <div 
                                        key={idx} 
                                        className="group relative p-6 sm:p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-blue-100 transition-all duration-300"
                                    >
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-blue-100 transition-transform group-hover:scale-110">
                                            <IconComponent className="w-7 h-7 text-blue-800" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 font-apfel2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 font-neuhas leading-relaxed">
                                            {feature.description}
                                        </p>

                                        {/* Hover Arrow */}
                                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <ArrowRight className="w-5 h-5 text-blue-800" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CAPABILITIES SECTION ============ */}
            <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-blue-50">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-blue-800 opacity-10" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl bg-blue-800 opacity-10" />
                </div>

                <div className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 font-neuhas text-blue-800">
                                Capabilities
                            </span>
                            <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-gray-900">
                                What We Can Do For You
                            </h2>
                        </div>

                        {/* Capabilities Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {vertical.capabilities.map((capability, idx) => (
                                <div 
                                    key={idx} 
                                    className="group flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 transition-colors">
                                        <CheckCircle className="w-5 h-5 text-blue-800" />
                                    </div>
                                    <span className="text-gray-800 font-medium font-neuhas group-hover:text-gray-900 transition-colors">
                                        {capability}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ SUCCESS STORIES SECTION ============ */}
            <section className="py-20 sm:py-24 md:py-32 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 font-neuhas text-blue-800">
                                Case Studies
                            </span>
                            <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-gray-900 mb-6">
                                Success Stories
                            </h2>
                            <p className="text-lg text-gray-600 font-neuhas">
                                See how we've helped businesses achieve remarkable results.
                            </p>
                        </div>

                        {/* Solutions Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {vertical.solutions.map((solution, idx) => (
                                <div 
                                    key={idx} 
                                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative h-56 sm:h-64 overflow-hidden">
                                        <Image
                                            src={solution.image}
                                            alt={solution.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        
                                        {/* Value Badge */}
                                        <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-bold font-neuhas bg-blue-800">
                                            {solution.value}
                                        </div>

                                        {/* Industry Tag */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 font-neuhas">
                                                {solution.industry}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 sm:p-8">
                                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 font-apfel2 group-hover:text-blue-800 transition-colors">
                                            {solution.title}
                                        </h3>
                                        <p className="text-gray-600 font-neuhas mb-6 leading-relaxed">
                                            {solution.description}
                                        </p>

                                        {/* Highlights */}
                                        <div className="flex flex-wrap gap-2">
                                            {solution.highlights.map((highlight, hIdx) => (
                                                <span 
                                                    key={hIdx} 
                                                    className="px-3 py-1.5 rounded-full text-xs font-medium font-neuhas bg-blue-100 text-blue-800"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CTA SECTION ============ */}
            {/* <section className="relative py-24 sm:py-32 overflow-hidden bg-blue-800">
                
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

                <div className="relative px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal text-white mb-6 leading-tight">
                            Ready to Transform Your Business with {vertical.name}?
                        </h2>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-neuhas">
                            Let's discuss how we can help you achieve your business goals with our innovative solutions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 font-neuhas shadow-lg hover:shadow-xl"
                            >
                                Start a Conversation
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a
                                href={vertical.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-full hover:bg-white hover:text-blue-800 transition-all duration-300 font-neuhas"
                            >
                                Visit {vertical.name}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* ============ OTHER VERTICALS SECTION ============ */}
            <section className="py-20 sm:py-24 md:py-32 bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 font-neuhas text-blue-800">
                                Explore More
                            </span>
                            <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-gray-900">
                                Other SOLTECH Verticals
                            </h2>
                        </div>

                        {/* Verticals Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {[
                                { 
                                    name: "BizAI Hacks", 
                                    slug: "bizaihacks", 
                                    tagline: "Transform Business with AI", 
                                    description: "AI-powered business automation and intelligence solutions",
                                    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" 
                                },
                                { 
                                    name: "SOLTECH Nexus", 
                                    slug: "soltechnexus", 
                                    tagline: "Connect. Transform. Grow.", 
                                    description: "Enterprise software development and digital transformation",
                                    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop" 
                                },
                                { 
                                    name: "SOLTECH 360 Ads", 
                                    slug: "soltech360ads", 
                                    tagline: "360° Digital Marketing", 
                                    description: "Complete digital marketing and advertising solutions",
                                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
                                },
                            ].filter(v => v.slug !== vertical.slug).map((v, idx) => (
                                <Link
                                    key={idx}
                                    href={`/verticals/${v.slug}`}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image 
                                            src={v.image} 
                                            alt={v.name} 
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
                                        
                                        {/* Title on Image */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl sm:text-2xl font-semibold text-white font-apfel2">
                                                {v.name}
                                            </h3>
                                            <p className="text-white/90 text-sm font-neuhas">
                                                {v.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-gray-600 font-neuhas mb-4 line-clamp-2">
                                            {v.description}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold font-neuhas text-blue-800 transition-all group-hover:gap-3">
                                            Explore Vertical
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>

                                    {/* Blue Accent */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-800 transition-all group-hover:w-1.5" />
                                </Link>
                            ))}
                        </div>

                        {/* View All Link */}
                        <div className="text-center mt-12">
                            <Link
                                href="/verticals"
                                className="group inline-flex items-center gap-2 text-blue-800 font-semibold font-neuhas hover:gap-3 transition-all"
                            >
                                View All Verticals
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}