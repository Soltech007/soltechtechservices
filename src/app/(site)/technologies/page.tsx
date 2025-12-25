"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code, Cloud, Shield, Database, Cpu, Globe, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import React from "react";

// SOLTECH Technologies Data
const soltechTechnologies = [
    {
        id: 1,
        title: "Cloud Computing",
        slug: "cloud-computing",
        icon: "Cloud",
        description: "AWS, Azure, Google Cloud Platform - scalable cloud infrastructure solutions for modern enterprises.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
            description: "Cloud Computing Solutions"
        }
    },
    {
        id: 2,
        title: "Artificial Intelligence",
        slug: "artificial-intelligence",
        icon: "Cpu",
        description: "Machine Learning, Deep Learning, NLP, and Computer Vision solutions that transform businesses.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
            description: "Artificial Intelligence"
        }
    },
    {
        id: 3,
        title: "Web Development",
        slug: "web-development",
        icon: "Globe",
        description: "React, Next.js, Node.js - modern, responsive, and scalable web applications.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
            description: "Web Development"
        }
    },
    {
        id: 4,
        title: "IoT & Embedded Systems",
        slug: "iot-embedded",
        icon: "Zap",
        description: "Arduino, Raspberry Pi, ESP32 - connected device solutions for smart automation.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1200&auto=format&fit=crop",
            description: "IoT & Embedded Systems"
        }
    },
    {
        id: 5,
        title: "AI & Automation",
        slug: "ai-automation",
        icon: "Code",
        description: "AI-driven automation, CI/CD pipelines, Docker & Kubernetes for faster deployments.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
            description: "AI & Automation"
        }
    },
    {
        id: 6,
        title: "Cyber Security",
        slug: "cyber-security",
        icon: "Shield",
        description: "Penetration testing, SIEM, security audits - enterprise-grade protection.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
            description: "Cyber Security"
        }
    },
    {
        id: 7,
        title: "Database & Analytics",
        slug: "database-analytics",
        icon: "Database",
        description: "PostgreSQL, MongoDB, Power BI - data-driven insights and analytics solutions.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
            description: "Database & Analytics"
        }
    },
];

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

export default function TechnologiesPage() {
    const [visibleCount, setVisibleCount] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width < 640) setVisibleCount(1);
            else if (width < 1024) setVisibleCount(2);
            else setVisibleCount(3);
        };
        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const itemWidth = scrollRef.current.scrollWidth / soltechTechnologies.length;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setCurrentIndex(newIndex);
        }
    };

    const scrollToIndex = (direction: 'prev' | 'next') => {
        if (scrollRef.current) {
            const itemWidth = scrollRef.current.scrollWidth / soltechTechnologies.length;
            const currentScroll = scrollRef.current.scrollLeft;
            scrollRef.current.scrollTo({
                left: direction === 'next' ? currentScroll + itemWidth : currentScroll - itemWidth,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <>
            {/* ✅ HERO SECTION */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] flex items-center py-12">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
                        alt="Technologies We Master"
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
                            TECHNOLOGY EXPERTISE
                        </p>

                        <h1 className="text-white font-normal font-apfel2 mb-4 md:mb-6 text-[clamp(2.2rem,6vw,6rem)] leading-[1.05] [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}>
                            Technologies We Master
                        </h1>

                        <p className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px] leading-[1.6] md:leading-[36px] font-medium text-white/85 sm:text-white/90 md:max-w-4xl">
                            We leverage cutting-edge technologies to build robust, scalable, and innovative solutions. Our expertise spans cloud, AI, web development, IoT, security, and more.
                        </p>
                    </div>
                </div>
            </section>

            {/* ✅ BREADCRUMB */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-3 sm:py-4">
                    <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
                        <Link href="/" className="hover:text-blue-800 transition-colors">HOME</Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <span className="text-blue-800 font-semibold uppercase">TECHNOLOGIES</span>
                    </nav>
                </div>
            </div>

            {/* ✅ INTRODUCTION SECTION */}
            <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-blue-800 mb-3 sm:mb-4 md:mb-12">
                            Powering Innovation with Modern Tech
                        </h2>
                        <div className="mt-4 sm:mt-5 md:mt-6 space-y-3 sm:space-y-4 text-start">
                            <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                                At SOLTECH TechServices, we stay at the forefront of technology evolution. Our team continuously learns and adopts the latest tools, frameworks, and methodologies to deliver solutions that stand the test of time.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                                From cloud-native architectures and AI-powered applications to IoT ecosystems and secure infrastructures, we combine multiple technologies to create comprehensive solutions tailored to your business needs.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                                Our certified technology partners and industry best practices ensure that every project we deliver meets the highest standards of quality, security, and performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ TECHNOLOGY GRID */}
            <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-blue-50 to-white">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800 mb-4">
                                Our Technology Stack
                            </h2>
                            <p className="text-gray-600 font-neuhas max-w-2xl mx-auto">
                                Explore our comprehensive technology expertise across various domains
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {soltechTechnologies.map((tech) => {
                                const IconComponent = iconMap[tech.icon] || Code;
                                return (
                                    <Link
                                        key={tech.id}
                                        href={`/technologies/${tech.slug}`}
                                        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={tech.image.imageUrl}
                                                alt={tech.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
                                            
                                            {/* Icon Badge */}
                                            <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                                                <IconComponent className="w-6 h-6 text-blue-800" />
                                            </div>
                                            
                                            {/* Title on Image */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-xl font-semibold text-white font-apfel2">
                                                    {tech.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <p className="text-gray-600 text-sm font-neuhas line-clamp-2 mb-4">
                                                {tech.description}
                                            </p>
                                            <div className="flex items-center text-blue-800 font-semibold text-sm font-neuhas group-hover:gap-3 gap-2 transition-all">
                                                <span>Explore</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Hover Border Effect */}
                                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-colors duration-300 pointer-events-none" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ CLOUD COMPUTING FEATURE */}
            <section className="py-20 sm:py-28 md:py-32 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-[300px] sm:h-[400px] lg:h-auto min-h-[400px]">
                        <Image
                            src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop"
                            alt="Cloud Computing"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-900/20" />
                    </div>

                    <div className="px-6 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 lg:py-16 flex flex-col justify-center bg-blue-50">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full w-fit mb-6">
                            <Cloud className="w-4 h-4 text-blue-800" />
                            <span className="text-sm font-semibold text-blue-800 font-neuhas">CLOUD COMPUTING</span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal text-blue-800 mb-6">
                            Scale Without Limits
                        </h2>
                        
                        <p className="text-gray-600 text-[16px] md:text-[18px] leading-relaxed font-neuhas mb-6">
                            Our cloud expertise spans AWS, Azure, and Google Cloud Platform. We design and implement cloud-native architectures that are secure, scalable, and cost-optimized for your specific needs.
                        </p>
                        
                        <ul className="space-y-3 mb-8">
                            {["Multi-cloud & Hybrid Solutions", "Cloud Migration & Modernization", "Infrastructure as Code (Terraform)", "Serverless Architecture", "Cost Optimization"].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-700 font-neuhas">
                                    <div className="w-2 h-2 bg-blue-800 rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        
                        <CtaButton href="/technologies/cloud-computing">
                            Explore Cloud Solutions
                        </CtaButton>
                    </div>
                </div>
            </section>

            {/* ✅ AI SECTION */}
            <section className="py-20 sm:py-28 md:py-32 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="px-6 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 lg:py-16 flex flex-col justify-center order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full w-fit mb-6">
                            <Cpu className="w-4 h-4 text-blue-800" />
                            <span className="text-sm font-semibold text-blue-800 font-neuhas">ARTIFICIAL INTELLIGENCE</span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal text-blue-800 mb-6">
                            Intelligence That Delivers
                        </h2>
                        
                        <p className="text-gray-600 text-[16px] md:text-[18px] leading-relaxed font-neuhas mb-6">
                            From predictive analytics to computer vision, we build AI solutions that automate processes, enhance decision-making, and create competitive advantages for your business.
                        </p>
                        
                        <ul className="space-y-3 mb-8">
                            {["Machine Learning Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics", "AI Chatbots & Assistants"].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-gray-700 font-neuhas">
                                    <div className="w-2 h-2 bg-blue-800 rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        
                        <CtaButton href="/technologies/artificial-intelligence">
                            Explore AI Solutions
                        </CtaButton>
                    </div>

                    <div className="relative h-[300px] sm:h-[400px] lg:h-auto min-h-[400px] order-1 lg:order-2">
                        <Image
                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
                            alt="Artificial Intelligence"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-900/20" />
                    </div>
                </div>
            </section>

            {/* ✅ STATS SECTION */}
            <section className="py-16 sm:py-20 bg-blue-800">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { value: "50+", label: "Technologies", desc: "In our stack" },
                                { value: "100+", label: "Certifications", desc: "Team certifications" },
                                { value: "15+", label: "Years", desc: "Of expertise" },
                                { value: "500+", label: "Projects", desc: "Delivered" },
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-apfel2">
                                        {stat.value}
                                    </div>
                                    <div className="text-lg font-semibold text-blue-200 mt-2 font-apfel2">{stat.label}</div>
                                    <div className="text-sm text-blue-300 font-neuhas">{stat.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ MORE TECHNOLOGIES */}
            <section className="py-20 sm:py-28 bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800 mb-12 text-center">
                            More Technologies We Excel In
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Web Development */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-7 h-7 text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 font-apfel2">Web Development</h3>
                                        <p className="text-sm text-blue-600 font-neuhas">Modern Web Applications</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-neuhas mb-4">
                                    React, Next.js, Vue.js, Node.js - we build fast, responsive, and SEO-friendly web applications.
                                </p>
                                <Link href="/technologies/web-development" className="text-blue-800 font-semibold text-sm font-neuhas flex items-center gap-2 hover:gap-3 transition-all">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* IoT */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-7 h-7 text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 font-apfel2">IoT & Embedded</h3>
                                        <p className="text-sm text-blue-600 font-neuhas">Connected Device Solutions</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-neuhas mb-4">
                                    Arduino, Raspberry Pi, ESP32 - smart sensors, automation, and real-time monitoring systems.
                                </p>
                                <Link href="/technologies/iot-embedded" className="text-blue-800 font-semibold text-sm font-neuhas flex items-center gap-2 hover:gap-3 transition-all">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Cyber Security */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-7 h-7 text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 font-apfel2">Cyber Security</h3>
                                        <p className="text-sm text-blue-600 font-neuhas">Enterprise Protection</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-neuhas mb-4">
                                    Penetration testing, SIEM, SOC operations - comprehensive security solutions for enterprises.
                                </p>
                                <Link href="/technologies/cyber-security" className="text-blue-800 font-semibold text-sm font-neuhas flex items-center gap-2 hover:gap-3 transition-all">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Database */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Database className="w-7 h-7 text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 font-apfel2">Database & Analytics</h3>
                                        <p className="text-sm text-blue-600 font-neuhas">Data-Driven Insights</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-neuhas mb-4">
                                    PostgreSQL, MongoDB, Redis, Power BI - robust data solutions and business intelligence.
                                </p>
                                <Link href="/technologies/database-analytics" className="text-blue-800 font-semibold text-sm font-neuhas flex items-center gap-2 hover:gap-3 transition-all">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ SCROLLABLE TECHNOLOGIES */}
            <section className="font-apfel2 py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-x-hidden">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                        <h2 className="font-apfel2 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-blue-800 leading-[1.1] sm:leading-[1.2] lg:leading-tight text-center lg:text-left">
                            All Technologies
                        </h2>
                        <p className="text-[15px] md:text-[20px] font-neuhas text-[#30454c] leading-[1.6] md:leading-[30px] max-w-full lg:max-w-3xl text-center lg:text-left mx-auto lg:ml-auto">
                            Explore our complete technology expertise across cloud, AI, web, IoT, security, and data analytics.
                        </p>
                    </div>
                </div>

                <div className="w-full">
                    <div ref={scrollRef} className="w-full overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-gray-200">
                        <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-4 pl-4 sm:pl-6 md:pl-8 lg:pl-16 xl:pl-20">
                            {soltechTechnologies.map((tech) => (
                                <Link
                                    key={tech.id}
                                    href={`/technologies/${tech.slug}`}
                                    className={cn(
                                        "group block flex-shrink-0",
                                        visibleCount === 1 ? "w-[85vw]" : visibleCount === 2 ? "w-[48vw]" : "w-[35vw]"
                                    )}
                                >
                                    <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] w-full rounded-2xl overflow-hidden shadow-md">
                                        <Image src={tech.image.imageUrl} alt={tech.image.description} fill className="object-cover" sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 35vw" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-800/50 to-transparent" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-blue-900/30 transition-all duration-500 ease-in-out" />
                                        
                                        {/* Icon */}
                                        <div className="absolute top-6 left-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            {React.createElement(iconMap[tech.icon] || Code, { className: "w-7 h-7 text-blue-800" })}
                                        </div>
                                        
                                        <div className="absolute left-0 right-0 bottom-6 px-4 sm:px-5 md:px-6 lg:px-8 text-white">
                                            <h3 className="font-apfel2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{tech.title}</h3>
                                            <div className="overflow-hidden max-h-0 group-hover:max-h-32 sm:group-hover:max-h-40 md:group-hover:max-h-48 transition-all duration-500 ease-in-out mt-2">
                                                <p className="text-sm sm:text-base md:text-lg font-neuhas text-white/90 leading-relaxed pb-14 max-w-[85%] sm:max-w-[80%] md:max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                    {tech.description}
                                                </p>
                                            </div>
                                            <div className="absolute -bottom-3 right-4 sm:right-5 md:right-6 lg:right-3">
                                                <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500 shadow-lg">
                                                    <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 lg:w-16 xl:w-20" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <button onClick={() => scrollToIndex("prev")} disabled={currentIndex === 0} className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="text-blue-800 font-semibold text-sm sm:text-base">
                            {currentIndex + 1} – {Math.min(currentIndex + visibleCount, soltechTechnologies.length)} of {soltechTechnologies.length}
                        </span>
                        <button onClick={() => scrollToIndex("next")} disabled={currentIndex + visibleCount >= soltechTechnologies.length} className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ✅ CTA SECTION */}
            {/* <section className="bg-gradient-to-r from-blue-800 to-blue-900 py-16 sm:py-20 md:py-24 text-center">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <h2 className="text-[28px] sm:text-[48px] md:text-[56px] font-apfel2 font-normal text-white mb-4 sm:mb-6">
                        Ready to Build with <br className="hidden sm:block" />Modern Technology?
                    </h2>
                    <p className="text-[16px] md:text-[20px] text-white/80 leading-[30px] max-w-2xl mx-auto mb-8 sm:mb-10 font-neuhas">
                        Let's discuss how our technology expertise can help transform your business and drive innovation.
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
        </>
    );
}