// components/sections/IndustryDetail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Quote, ShoppingCart, BarChart3, Package, Globe, Factory, Gauge, Truck, Car, Hospital, Video, FileText, Activity, Shield, Leaf, Thermometer, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap: Record<string, any> = {
    ShoppingCart, BarChart3, Package, Globe, Factory, Gauge, Truck, Car,
    Hospital, Video, FileText, Activity, Shield, Leaf, Thermometer, Droplets
};

// CTA Button Component
function CtaButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    return (
        <Link
            href={href}
            className={cn(
                'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                'text-sm sm:text-[18px] font-semibold text-blue-800',
                'transition-all duration-500 ease-out',
                'min-h-[44px] sm:min-h-[48px]',
                className
            )}
        >
            <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center justify-center">
                <span className="flex items-center justify-center rounded-full bg-blue-800 text-white transition-all duration-500 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-neuhas">
                    {children}
                </span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
            </span>
        </Link>
    );
}

interface IndustryDetailClientProps {
    industry: {
        title: string;
        slug: string;
        tagline: string;
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
            location: string;
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

export default function IndustryDetailClient({ industry }: IndustryDetailClientProps) {
    return (
        <>
            {/* ✅ HERO SECTION */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] flex items-center py-12">
                <div className="absolute inset-0">
                    <Image
                        src={industry.heroImage}
                        alt={industry.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/85 to-blue-900/75" />
                </div>

                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-10 w-full">
                    <div className="max-w-xs md:max-w-6xl text-white">
                        <p className="font-neuhas text-blue-300 font-thin tracking-widest mb-2 text-sm sm:text-base md:text-[16px] uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}>
                            INDUSTRY SOLUTIONS
                        </p>

                        <h1 className="text-white font-normal font-apfel2 mb-4 md:mb-6 text-[clamp(2.2rem,6vw,6rem)] leading-[1.05] [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}>
                            {industry.title}
                        </h1>

                        <p className="text-2xl sm:text-3xl text-blue-300 font-semibold mb-4 font-neuhas animate-slideInLeft"
                            style={{ animationDelay: '0.5s' }}>
                            {industry.tagline}
                        </p>

                        <p className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px] leading-[1.6] md:leading-[36px] font-medium text-white/85 sm:text-white/90 md:max-w-4xl animate-slideInLeft"
                            style={{ animationDelay: '0.3s' }}>
                            {industry.description}
                        </p>

                        <div className="mt-8 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                            <CtaButton href="/contact">
                                Get Industry Solutions
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ BREADCRUMB */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-3 sm:py-4">
                    <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
                        <Link href="/" className="hover:text-blue-800 transition-colors">HOME</Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <Link href="/industries" className="hover:text-blue-800 transition-colors">INDUSTRIES</Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <span className="text-blue-800 font-semibold uppercase">{industry.title}</span>
                    </nav>
                </div>
            </div>

            {/* ✅ ABOUT SECTION */}
            <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-blue-800 mb-8">
                            About Our {industry.title} Solutions
                        </h2>
                        <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                            {industry.longDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* ✅ STATISTICS SECTION */}
            <section className="py-16 sm:py-20 bg-blue-800">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {industry.statistics.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-apfel2">
                                        {stat.value}
                                    </div>
                                    <div className="text-lg font-semibold text-blue-200 mt-2 font-apfel2">{stat.label}</div>
                                    <div className="text-sm text-blue-300 font-neuhas">{stat.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ KEY FEATURES SECTION */}
            <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-blue-800 mb-12 text-center">
                            Key Features & Capabilities
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {industry.keyFeatures.map((feature, idx) => {
                                const IconComponent = iconMap[feature.icon] || Package;
                                return (
                                    <div key={idx} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                        <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <IconComponent className="w-7 h-7 text-blue-800" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-apfel2">{feature.title}</h3>
                                            <p className="text-gray-600 font-neuhas">{feature.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ CAPABILITIES SECTION */}
            <section className="py-16 sm:py-20 md:py-24 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-blue-800 mb-12 text-center">
                            Our Capabilities
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {industry.capabilities.map((capability, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <CheckCircle className="w-5 h-5 text-blue-800 flex-shrink-0" />
                                    <span className="text-gray-800 font-neuhas">{capability}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ CASE STUDIES / SOLUTIONS SECTION */}
            <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-blue-800 mb-12 text-center">
                            Success Stories
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {industry.solutions.map((solution, idx) => (
                                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="relative h-56 sm:h-64">
                                        <Image
                                            src={solution.image}
                                            alt={solution.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                                                {solution.value}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-sm text-blue-200 font-neuhas mb-1">{solution.location}</p>
                                            <h3 className="text-xl font-semibold text-white font-apfel2">{solution.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 font-neuhas mb-4">{solution.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {solution.highlights.map((highlight, hIdx) => (
                                                <span key={hIdx} className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-800 font-semibold font-neuhas">
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

            {/* ✅ TECHNOLOGIES SECTION */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-blue-800 mb-12 text-center">
                            Technologies We Use
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {industry.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-5 py-3 bg-blue-50 border border-blue-200 rounded-full text-blue-800 font-semibold font-neuhas hover:bg-blue-100 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ TESTIMONIAL SECTION */}
            <section className="py-16 sm:py-20 md:py-24 bg-blue-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <Quote className="w-12 h-12 mx-auto mb-6 text-blue-800" />
                        <blockquote className="text-xl sm:text-2xl md:text-3xl font-apfel2 text-gray-900 mb-8 leading-relaxed">
                            "{industry.testimonial.quote}"
                        </blockquote>
                        <div>
                            <p className="font-semibold text-gray-900 font-apfel2">{industry.testimonial.author}</p>
                            <p className="text-blue-600 font-neuhas">{industry.testimonial.company}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ CTA SECTION */}
            {/* <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-blue-800 to-blue-900 text-center">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal text-white mb-6">
                        Ready to Transform Your {industry.title}?
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-neuhas">
                        Let's discuss how our {industry.title} solutions can help your business achieve operational excellence and competitive advantage.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition-colors font-neuhas text-lg"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                    </Link> 
                </div>
            </section> */}

            {/* ✅ OTHER INDUSTRIES */}
            <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-blue-800 mb-12 text-center">
                            Explore Other Industries
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Retail Industry", slug: "retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" },
                                { title: "Automobile Industry", slug: "automobile", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop" },
                                { title: "Healthcare & Wellness", slug: "healthcare", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
                                { title: "Mining & Quarrying", slug: "mining", image: "https://images.unsplash.com/photo-1578496480157-697fc14d2e55?q=80&w=800&auto=format&fit=crop" },
                                { title: "Agriculture & Allied", slug: "agriculture", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop" },
                            ].filter(ind => ind.slug !== industry.slug).slice(0, 4).map((ind, idx) => (
                                <Link
                                    key={idx}
                                    href={`/industries/${ind.slug}`}
                                    className="group block overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <Image
                                            src={ind.image}
                                            alt={ind.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-800 font-apfel2 flex items-center justify-between">
                                            {ind.title}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <CtaButton href="/industries">
                                View All Industries
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}