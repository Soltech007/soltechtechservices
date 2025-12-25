// components/sections/TechnologyDetail.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Quote, Cloud, Cpu, Globe, Zap, Code, Shield, Database, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping
const iconMap: Record<string, any> = { Cloud, Cpu, Globe, Zap, Code, Shield, Database };

// CTA Button Component
function CtaButton({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
    return (
        <Link
            href={href}
            className={cn(
                'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                'text-sm sm:text-[18px] font-semibold text-white',
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

interface TechnologyDetailClientProps {
    technology: {
        title: string;
        slug: string;
        tagline: string;
        icon: string;
        description: string;
        longDescription: string;
        heroImage: string;
        keyFeatures: Array<{ title: string; description: string }>;
        statistics: Array<{ value: string; label: string; description: string }>;
        technologies: string[];
        useCases: Array<{ title: string; description: string; image: string }>;
        certifications: string[];
    };
}

export default function TechnologyDetailClient({ technology }: TechnologyDetailClientProps) {
    const IconComponent = iconMap[technology.icon] || Code;

    return (
        <>
            {/* ✅ HERO SECTION */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] flex items-center py-12">
                <div className="absolute inset-0">
                    <Image
                        src={technology.heroImage}
                        alt={technology.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/85 to-blue-900/75" />
                </div>

                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-10 w-full">
                    <div className="max-w-xs md:max-w-6xl text-white">
                        {/* Icon Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-slideInLeft" style={{ animationDelay: "1s" }}>
                            <IconComponent className="w-5 h-5 text-blue-300" />
                            <span className="text-sm font-medium text-blue-200 font-neuhas uppercase tracking-wider">Technology Expertise</span>
                        </div>

                        <h1 className="text-white font-normal font-apfel2 mb-4 md:mb-6 text-[clamp(2.2rem,6vw,6rem)] leading-[1.05] [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}>
                            {technology.title}
                        </h1>

                        <p className="text-2xl sm:text-3xl text-blue-300 font-semibold mb-4 font-neuhas animate-slideInLeft"
                            style={{ animationDelay: '0.5s' }}>
                            {technology.tagline}
                        </p>

                        <p className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px] leading-[1.6] md:leading-[36px] font-medium text-white/85 sm:text-white/90 md:max-w-4xl animate-slideInLeft"
                            style={{ animationDelay: '0.3s' }}>
                            {technology.description}
                        </p>

                        <div className="mt-8  animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                            <CtaButton href="/contact">
                                Start Your Project
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
                        <Link href="/technologies" className="hover:text-blue-800 transition-colors">TECHNOLOGIES</Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <span className="text-blue-800 font-semibold uppercase">{technology.title}</span>
                    </nav>
                </div>
            </div>

            {/* ✅ ABOUT SECTION */}
            <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <IconComponent className="w-8 h-8 text-blue-800" />
                            </div>
                            <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800">
                                About {technology.title}
                            </h2>
                        </div>
                        <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                            {technology.longDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* ✅ STATISTICS SECTION */}
            <section className="py-16 sm:py-20 bg-blue-800">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {technology.statistics.map((stat, idx) => (
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
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800 mb-12 text-center">
                            Key Capabilities
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {technology.keyFeatures.map((feature, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-blue-800 font-bold text-xl font-apfel2">{idx + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 font-apfel2">{feature.title}</h3>
                                    <p className="text-gray-600 font-neuhas">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ TECHNOLOGIES WE USE */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800 mb-12 text-center">
                            Tools & Technologies
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {technology.technologies.map((tech, idx) => (
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

            {/* ✅ USE CASES */}
            <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800 mb-12 text-center">
                            Success Stories
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {technology.useCases.map((useCase, idx) => (
                                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="relative h-56">
                                        <Image
                                            src={useCase.image}
                                            alt={useCase.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl font-semibold text-white font-apfel2">{useCase.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 font-neuhas">{useCase.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        

            {/* ✅ CTA SECTION */}
            {/* <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-blue-800 to-blue-900 text-center">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal text-white mb-6">
                        Ready to Build with {technology.title}?
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-neuhas">
                        Let's discuss how our {technology.title} expertise can help transform your business.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition-colors font-neuhas text-lg"
                    >
                        Start a Conversation
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section> */}

            {/* ✅ OTHER TECHNOLOGIES */}
            {/* <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800 mb-12 text-center">
                            Explore Other Technologies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "Cloud Computing", slug: "cloud-computing", icon: "Cloud", tagline: "Scale Without Limits" },
                                { title: "Artificial Intelligence", slug: "artificial-intelligence", icon: "Cpu", tagline: "Intelligence That Delivers" },
                                { title: "Web Development", slug: "web-development", icon: "Globe", tagline: "Modern Web Experiences" },
                                { title: "IoT & Embedded", slug: "iot-embedded", icon: "Zap", tagline: "Connected Solutions" },
                                { title: "Cyber Security", slug: "cyber-security", icon: "Shield", tagline: "Enterprise Protection" },
                                { title: "Database & Analytics", slug: "database-analytics", icon: "Database", tagline: "Data-Driven Insights" },
                            ].filter(t => t.slug !== technology.slug).slice(0, 3).map((tech, idx) => {
                                const TechIcon = iconMap[tech.icon] || Code;
                                return (
                                    <Link
                                        key={idx}
                                        href={`/technologies/${tech.slug}`}
                                        className="group flex items-center gap-4 p-5 bg-white rounded-xl hover:shadow-lg transition-all border border-gray-100"
                                    >
                                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                                            <TechIcon className="w-7 h-7 text-blue-800" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-800 font-apfel2">{tech.title}</h3>
                                            <p className="text-sm text-blue-600 font-neuhas">{tech.tagline}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-800 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="text-center mt-10">
                            <CtaButton href="/technologies">
                                View All Technologies
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}