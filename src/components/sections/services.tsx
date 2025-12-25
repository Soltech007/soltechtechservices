"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, ArrowUpRight, MapPin } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// SOLTECH Services Data
const soltechServices = [
    {
        id: 1,
        title: "AI (Artificial Intelligence)",
        slug: "ai",
        description: "Customized, scalable, and secure AI services that help clients innovate faster, make smarter decisions, and stay ahead of the curve.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
            description: "AI Solutions"
        }
    },
    {
        id: 2,
        title: "IoT (Internet of Things)",
        slug: "iot",
        description: "Smart, connected services that drive automation, efficiency, and real-time insights. Scalable, secure IoT ecosystems tailored for modern enterprises.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1200&auto=format&fit=crop",
            description: "IoT Services"
        }
    },
    {
        id: 3,
        title: "IT Infrastructure",
        slug: "it-infrastructure",
        description: "Secure, scalable, and future-ready foundations from cloud to on-premise services. Seamless operations, robust connectivity, and strategic growth.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
            description: "IT Infrastructure"
        }
    },
    {
        id: 4,
        title: "Telecommunication",
        slug: "telecommunication",
        description: "Secure, scalable, and high-speed communication infrastructure for modern businesses. Unified communication systems to advanced networking.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
            description: "Telecommunication"
        }
    },
    {
        id: 5,
        title: "Surveillance",
        slug: "surveillance",
        description: "Advanced surveillance services designed to protect assets, ensure safety, and deliver actionable intelligence with cutting-edge technology.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
            description: "Surveillance"
        }
    },
    {
        id: 6,
        title: "Cyber Security",
        slug: "cyber-security",
        description: "Enterprise-grade security services that detect, defend, and respond with precision. Protecting your data, infrastructure, and reputation.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
            description: "Cyber Security"
        }
    },
    {
        id: 7,
        title: "Industrial Automation",
        slug: "industrial-automation",
        description: "Smart technologies and real-time control systems for manufacturing optimization. Increase efficiency, reduce downtime, and drive precision.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1200&auto=format&fit=crop",
            description: "Industrial Automation"
        }
    },
];

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

export default function ServicesPage() {
    const [visibleCount, setVisibleCount] = useState(3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleCount(1);
            } else if (width < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const itemWidth = scrollRef.current.scrollWidth / soltechServices.length;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setCurrentIndex(newIndex);
        }
    };

    const scrollToIndex = (direction: 'prev' | 'next') => {
        if (scrollRef.current) {
            const itemWidth = scrollRef.current.scrollWidth / soltechServices.length;
            const currentScroll = scrollRef.current.scrollLeft;

            scrollRef.current.scrollTo({
                left: direction === 'next'
                    ? currentScroll + itemWidth
                    : currentScroll - itemWidth,
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
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
                        alt="Technology Services Background"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/70" />
                </div>

                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-10 w-full">
                    <div className="max-w-xs md:max-w-6xl text-white">
                        <p className="font-neuhas text-blue-300 font-thin tracking-widest mb-2 text-sm sm:text-base md:text-[16px] uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}>
                            OUR SERVICES
                        </p>

                        <h1 className="text-white font-normal font-apfel2 mb-4 md:mb-6 text-[clamp(2.2rem,6vw,6rem)] leading-[1.05] [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}>
                            Technology Solutions
                        </h1>

                        <p className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px] leading-[1.6] md:leading-[36px] font-medium text-white/85 sm:text-white/90 md:max-w-4xl">
                            With 15+ years of expertise in technology consulting, SOLTECH TechServices delivers comprehensive solutions across AI, IoT, Cybersecurity, IT Infrastructure, Surveillance, and Telecommunications. We empower businesses with innovations that drive efficiency, security, and growth.
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
                        <span className="text-blue-800 font-semibold uppercase">OUR SERVICES</span>
                    </nav>
                </div>
            </div>

            {/* ✅ EXCELLENCE SECTION */}
            <section
                className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-white"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
                    backgroundSize: "16px 16px sm:20px 20px",
                }}
            >
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-blue-800 mb-3 sm:mb-4 md:mb-12">
                            Excellence in Innovation, <br /> Quality in Delivery
                        </h2>
                        <div className="mt-4 sm:mt-5 md:mt-6 space-y-3 sm:space-y-4 text-start">
                            <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                                At SOLTECH TechServices Pvt Ltd, we are at the forefront of technology, providing cutting-edge Technology Consulting & Services tailored to businesses across all industries. Our expertise spans AI, IoT, Cybersecurity, IT Infrastructure, Surveillance, and Telecommunications.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                                With our headquarters in Vapi, Gujarat, we serve clients across India and beyond. Our strategic positioning allows us to understand diverse business needs and deliver solutions that truly transform operations and drive growth.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                                Our team of 18+ certified experts brings deep technical knowledge and hands-on experience. From consultation to deployment, we uphold the highest standards in everything we do. Our services are reliable, scalable, and backed by 24/7 expert support.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[21px] font-neuhas text-[#30454c] leading-relaxed">
                                We help businesses achieve greater clarity and efficiency through expert software automation and ERP services. Our end-to-end solutions are designed to streamline operations, boost productivity, and improve transparency across all business functions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔥 AI SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative mx-20 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[600px] order-2 lg:order-1">
                        <img
                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
                            alt="AI Solutions"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12 order-1 lg:order-2">
                        <p className="uppercase text-[24px] leading-[31.2px] text-blue-600 font-necto mb-6">ARTIFICIAL INTELLIGENCE</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            AI-Powered Innovation
                        </h2>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                Our AI services are designed to empower future-ready enterprises. From automation to deep data analysis, we deliver customized, scalable, and secure AI solutions that help our clients innovate faster, make smarter decisions, and stay ahead of the competition.
                            </p>
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                We specialize in Machine Learning, Natural Language Processing, Computer Vision, Predictive Analytics, and Intelligent Process Automation. Our AI experts work closely with your team to understand business challenges and develop solutions that deliver measurable ROI.
                            </p>
                        </div>
                        <div className="mt-6">
                            <CtaButton href="/services/ai">
                                Explore AI Solutions
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ IOT SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="space-y-3 sm:space-y-4 font-neuhas">
                        <p className="uppercase text-[20px] leading-[31.2px] text-blue-600 font-necto mb-2">INTERNET OF THINGS</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-4 text-blue-800">
                            Connected Intelligence
                        </h2>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            Our IoT services empower businesses with smart, connected solutions that drive automation, efficiency, and real-time insights. From device integration to data analytics, we deliver scalable, secure IoT ecosystems tailored for modern enterprises.
                        </p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            We provide end-to-end IoT solutions including sensor networks, edge computing, cloud platforms, device management, and real-time analytics dashboards. Our solutions help businesses optimize operations, reduce costs, and unlock new revenue streams.
                        </p>
                        <div className="mt-6">
                            <CtaButton href="/services/iot">
                                Explore IoT Solutions
                            </CtaButton>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop" alt="IoT Solutions 1" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" alt="IoT Solutions 2" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔥 CYBER SECURITY SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative mx-20  h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[700px]">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" alt="Cyber Security" className="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12">
                        <p className="uppercase text-[24px] leading-[31.2px] text-blue-600 font-necto mb-6">CYBER SECURITY</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            Protecting What Matters Most
                        </h2>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                In a world of evolving threats, our cybersecurity services protect what matters most: your data, infrastructure, and reputation. We offer enterprise-grade security solutions that detect, defend, and respond to threats with precision, ensuring your business stays resilient and compliant.
                            </p>
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                Our services include threat detection and monitoring, vulnerability assessments, penetration testing, security audits, incident response, data protection, encryption, and employee security awareness training. We ensure your sensitive data is managed and protected in full compliance with global privacy standards.
                            </p>
                        </div>
                        <div className="mt-6">
                            <CtaButton href="/services/cyber-security">
                                Explore Security Solutions
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ IT INFRASTRUCTURE SECTION */}
            <section className="mt-20 sm:mt-32 md:mt-40 lg:mt-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 border-t border-gray-200 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center pt-12">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop" alt="IT Infrastructure" className="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>

                    <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                        <p className="uppercase text-[20px] leading-[31.2px] text-blue-600 font-necto">IT INFRASTRUCTURE</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight text-blue-800">
                            Future-Ready Foundations
                        </h2>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px] font-neuhas">
                            Our IT Infrastructure services are designed to support high-performance businesses with secure, scalable, and future-ready foundations. From cloud to on-premise solutions, we ensure seamless operations, robust connectivity, and strategic growth through smart infrastructure design. We specialize in AWS, Azure, Google Cloud, hybrid cloud setups, network design, server management, disaster recovery, and 24/7 infrastructure monitoring.
                        </p>
                        <div className="mt-6">
                            <CtaButton href="/services/it-infrastructure">Explore IT Infrastructure</CtaButton>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center py-10 sm:py-14 md:py-20">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop" alt="Telecommunication" className="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>

                    <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                        <p className="uppercase text-[20px] leading-[31.2px] text-blue-600 font-necto">TELECOMMUNICATION</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight text-blue-800">
                            Seamless Connectivity
                        </h2>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px] font-neuhas">
                            Our Telecommunication services provide secure, scalable, and high-speed communication infrastructure for modern businesses. From unified communication systems to advanced networking, we help enterprises stay connected, collaborative, and competitive in a fast-moving digital world. Our solutions include VoIP, video conferencing, network optimization, and enterprise communication platforms.
                        </p>
                        <div className="mt-6">
                            <CtaButton href="/services/telecommunication">Explore Telecom Solutions</CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔥 SURVEILLANCE SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative mx-20 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[700px] order-2 lg:order-1">
                        <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop" alt="Surveillance" className="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12 order-1 lg:order-2">
                        <p className="uppercase text-[24px] leading-[31.2px] text-blue-600 font-necto mb-6">SURVEILLANCE</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            Intelligent Security Systems
                        </h2>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                We provide advanced surveillance solutions designed to protect assets, ensure safety, and deliver actionable intelligence. Our systems combine cutting-edge technology with strategic design, tailored to meet the unique security needs of enterprises, smart spaces, and critical infrastructures.
                            </p>
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                Our surveillance portfolio includes CCTV systems (IP and analog), AI-powered video analytics, access control with biometric and card systems, remote cloud-based monitoring, integrated alarm systems, and enterprise command center setups.
                            </p>
                        </div>
                        <div className="mt-6">
                            <CtaButton href="/services/surveillance">
                                Explore Surveillance Solutions
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ INDUSTRIAL AUTOMATION SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="space-y-3 sm:space-y-4 font-neuhas order-2 lg:order-1">
                        <p className="uppercase text-[20px] leading-[31.2px] text-blue-600 font-necto mb-2">INDUSTRIAL AUTOMATION</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-4 text-blue-800">
                            Smart Manufacturing
                        </h2>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            Our Industrial Automation solutions optimize manufacturing and industrial processes through smart technologies, real-time control systems, and seamless integration. We empower enterprises to increase efficiency, reduce downtime, and drive precision at every stage of production.
                        </p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            Our automation services include SCADA systems, PLC programming, robotics integration, predictive maintenance solutions, and complete factory automation. We help manufacturers achieve Industry 4.0 readiness.
                        </p>
                        <div className="mt-6">
                            <CtaButton href="/services/industrial-automation">
                                Explore Automation Solutions
                            </CtaButton>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6 order-1 lg:order-2">
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=800&auto=format&fit=crop" alt="Industrial Automation 1" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" alt="Industrial Automation 2" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔥 INDUSTRY SOLUTIONS SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative mx-20 h-[250px] sm:h-[300px] md:h-[450px] lg:h-[550px]">
<img 
  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
  alt="Enterprise Office Workspace"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>


                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12">
                        <p className="uppercase text-[24px] leading-[31.2px] text-blue-600 font-necto mb-6">INDUSTRY SOLUTIONS</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            Tailored for Your Industry
                        </h2>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                We provide specialized technology solutions across diverse industries including Retail, Automobile, Healthcare & Wellness, Mining & Quarrying, and Agriculture & Allied Industries. Our industry-specific expertise ensures solutions that address your unique challenges and drive measurable results.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {['Retail Industry', 'Automobile', 'Healthcare', 'Mining', 'Agriculture'].map((industry, idx) => (
                                    <div key={idx} className="flex items-center text-gray-700">
                                        <span className="text-blue-800 mr-2">✓</span>
                                        <span>{industry}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            <CtaButton href="/industries">
                                Explore Industry Solutions
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ WHY CHOOSE US SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="space-y-3 sm:space-y-4 font-neuhas">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-4 text-blue-800">
                            Why Choose SOLTECH?
                        </h2>
                        <div className="space-y-4">
                            {[
                                { title: "15+ Years of Experience", desc: "Proven track record in delivering technology solutions" },
                                { title: "100+ Successful Projects", desc: "Diverse portfolio across multiple industries" },
                                { title: "98% Client Satisfaction", desc: "Committed to exceeding expectations" },
                                { title: "24/7 Expert Support", desc: "Round-the-clock assistance for your business" },
                                { title: "Industry Certified", desc: "Globally recognized certifications ensuring quality" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start">
                                    <span className="text-blue-800 mr-3 mt-1 text-xl">✓</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.title}</p>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <CtaButton href="/about-us">
                                Learn More About Us
                            </CtaButton>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[350px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="Team" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[350px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop" alt="Office" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ OUR SERVICES SCROLLABLE */}
            <section className="font-apfel2 py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary/30 overflow-x-hidden" id="servicespage">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                        <h2 className="font-apfel2 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-blue-800 leading-[1.1] sm:leading-[1.2] lg:leading-tight text-center lg:text-left">
                            Our Core Services
                        </h2>
                        <p className="text-[15px] md:text-[20px] font-neuhas text-[#30454c] leading-[1.6] md:leading-[30px] max-w-full lg:max-w-3xl text-center lg:text-left mx-auto lg:ml-auto">
                            From AI and IoT to Cybersecurity and Industrial Automation - SOLTECH TechServices delivers comprehensive technology solutions tailored to your business needs. Our 15+ years of expertise ensures excellence in every engagement.
                        </p>
                    </div>
                </div>

                <div className="w-full">
                    <div ref={scrollRef} className="w-full overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-gray-200">
                        <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-4 pl-4 sm:pl-6 md:pl-8 lg:pl-16 xl:pl-20">
                            {soltechServices.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className={cn(
                                        "group block flex-shrink-0",
                                        visibleCount === 1 ? "w-[85vw]" : visibleCount === 2 ? "w-[48vw]" : "w-[35vw]"
                                    )}
                                >
                                    <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[700px] w-full rounded-lg overflow-hidden shadow-md">
                                        <Image src={service.image.imageUrl} alt={service.image.description} fill className="object-cover" sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 35vw" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-blue-900/30 transition-all duration-500 ease-in-out" />
                                        <div className="absolute left-0 right-0 bottom-6 px-4 sm:px-5 md:px-6 lg:px-8 text-white">
                                            <h3 className="font-apfel2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{service.title}</h3>
                                            <div className="overflow-hidden max-h-0 group-hover:max-h-32 sm:group-hover:max-h-40 md:group-hover:max-h-48 transition-all duration-500 ease-in-out mt-2">
                                                <p className="text-sm sm:text-base md:text-lg font-neuhas text-white/90 leading-relaxed pb-14 max-w-[85%] sm:max-w-[80%] md:max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                    {service.description}
                                                </p>
                                            </div>
                                            <div className="absolute -bottom-3 right-4 sm:right-5 md:right-6 lg:right-3">
                                                <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700 shadow-lg">
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
                            {currentIndex + 1} – {Math.min(currentIndex + visibleCount, soltechServices.length)} of {soltechServices.length}
                        </span>
                        <button onClick={() => scrollToIndex("next")} disabled={currentIndex + visibleCount >= soltechServices.length} className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ✅ CTA SECTION */}
            <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 text-center">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                    <h2 className="text-[28px] sm:text-[64px] md:leading-[70.4px] font-apfel2 font-light text-blue-800 mb-3 sm:mb-4 md:mb-6">
                        Connect with the <br />SOLTECH Team
                    </h2>
                    <p className="text-[16px] md:text-[20px] text-[#2d3b40]/80 leading-[30px] max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 sm:px-0 font-neuhas">
                        Whether you're seeking a technology partner for digital transformation, have inquiries about our services, or are interested in career opportunities, connect with our expert team. We're ready to bring our 15+ years of technology expertise to your business.
                    </p>
                    <CtaButton href="/contact">Contact Us</CtaButton>
                </div>
            </section>
        </>
    );
}