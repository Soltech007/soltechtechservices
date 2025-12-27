"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// SOLTECH Verticals Data - Updated with all 8 verticals
const soltechVerticals = [
    {
        id: 1,
        name: "BizAI Hacks",
        slug: "bizaihacks",
        url: "https://bizaihacks.com",
        tagline: "Transform Business with AI",
        description: "AI-powered business automation and intelligence solutions that help enterprises make smarter decisions and automate complex workflows.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
            description: "BizAI Hacks - AI Solutions"
        }
    },
    {
        id: 2,
        name: "SOLTECH Nexus",
        slug: "soltechnexus",
        url: "https://soltechnexus.com",
        tagline: "Connect. Transform. Grow.",
        description: "Enterprise software development and digital transformation solutions that connect businesses with cutting-edge technology.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
            description: "SOLTECH Nexus - Digital Transformation"
        }
    },
    {
        id: 3,
        name: "SOLTECH 360 Ads",
        slug: "soltech360ads",
        url: "https://soltech360ads.com",
        tagline: "360° Digital Marketing",
        description: "Complete digital marketing and advertising solutions that drive brand awareness, engagement, and conversions across all channels.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
            description: "SOLTECH 360 Ads - Digital Marketing"
        }
    },
    {
        id: 4,
        name: "MrCCTV",
        slug: "mrcctv",
        url: "https://mrcctv.com",
        tagline: "Smart Surveillance Solutions",
        description: "Advanced CCTV cameras, NVRs, and smart surveillance systems with AI-enabled monitoring for businesses, industries, and institutions.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
            description: "MrCCTV - Surveillance Solutions"
        }
    },
    {
        id: 5,
        name: "Soltech Virtual CTO",
        slug: "soltech-virtual-cto",
        url: "https://soltechvirtualcto.com",
        tagline: "On-Demand Technology Leadership",
        description: "Virtual CTO services offering strategic tech consultation, cloud migration, IT infrastructure planning, and digital transformation guidance.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
            description: "Soltech Virtual CTO - Tech Leadership"
        }
    },
    {
        id: 6,
        name: "Soltech Biz Solutions",
        slug: "soltech-biz-solutions",
        url: "https://soltechbizsolutions.com",
        tagline: "Streamline Your Business Operations",
        description: "Comprehensive ERP systems, CRM platforms, HRMS tools, and business process automation suites for enterprises and SMEs.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
            description: "Soltech Biz Solutions - Business Software"
        }
    },
    {
        id: 7,
        name: "Soltech Tronix",
        slug: "soltech-tronix",
        url: "https://soltechtronix.com",
        tagline: "Industrial IoT & Automation",
        description: "Embedded systems, IoT devices, industrial sensors, and smart control units for manufacturing and industrial automation needs.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            description: "Soltech Tronix - IoT & Automation"
        }
    },
    {
        id: 8,
        name: "Soltech Talent Hub",
        slug: "soltech-talent-hub",
        url: "https://soltechtalenthub.com",
        tagline: "Nurturing Future-Ready Talent",
        description: "AI-powered learning platforms, skill development programs, recruitment services, and corporate training modules for workforce excellence.",
        image: {
            imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
            description: "Soltech Talent Hub - Talent Solutions"
        }
    },
];

// CTA Button Component
function CtaButton({ href, children, className, external = false }: { href: string; children: React.ReactNode; className?: string; external?: boolean }) {
    const LinkComponent = external ? 'a' : Link;
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    
    return (
        <LinkComponent
            href={href}
            {...externalProps}
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
                    {external ? <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" /> : <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />}
                </span>
                <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-neuhas">
                    {children}
                </span>
                {external ? (
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
                ) : (
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
                )}
            </span>
        </LinkComponent>
    );
}

export default function VerticalsPage() {
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
            const itemWidth = scrollRef.current.scrollWidth / soltechVerticals.length;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setCurrentIndex(newIndex);
        }
    };

    const scrollToIndex = (direction: 'prev' | 'next') => {
        if (scrollRef.current) {
            const itemWidth = scrollRef.current.scrollWidth / soltechVerticals.length;
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
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2000&auto=format&fit=crop"
                        alt="Our Business Verticals"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-blue-800/80 to-purple-900/70" />
                </div>

                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-10 w-full">
                    <div className="max-w-xs md:max-w-6xl text-white">
                        <p className="font-neuhas text-indigo-300 font-thin tracking-widest mb-2 text-sm sm:text-base md:text-[16px] uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}>
                            OUR BUSINESS VERTICALS
                        </p>

                        <h1 className="text-white font-normal font-apfel2 mb-4 md:mb-6 text-[clamp(2.2rem,6vw,6rem)] leading-[1.05] [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}>
                            SOLTECH Verticals
                        </h1>

                        <p className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px] leading-[1.6] md:leading-[36px] font-medium text-white/85 sm:text-white/90 md:max-w-4xl">
                            SOLTECH TechServices operates multiple specialized business verticals, each focused on delivering excellence in their domain. Explore our subsidiary companies and their unique offerings.
                        </p>
                    </div>
                </div>
            </section>

            {/* ✅ BREADCRUMB */}
            <div className="bg-white border-b border-gray-200 mb-20">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-3 sm:py-4">
                    <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
                        <Link href="/" className="hover:text-blue-800 transition-colors">HOME</Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <span className="text-blue-800 font-semibold uppercase">VERTICALS</span>
                    </nav>
                </div>
            </div>



 {/* 🔥 BIZAI HACKS SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[600px]">
                        <img
                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
                            alt="BizAI Hacks"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12">
                        <p className="uppercase text-[24px] leading-[31.2px] text-indigo-600 font-necto mb-6">AI SOLUTIONS</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            BizAI Hacks
                        </h2>
                        <p className="text-lg text-indigo-600 font-semibold mb-4 font-neuhas">Transform Business with AI</p>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                BizAI Hacks is our dedicated AI vertical, specializing in helping businesses harness the power of artificial intelligence. From intelligent automation and predictive analytics to natural language processing and computer vision, we deliver AI solutions that drive real business value.
                            </p>
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                Our team of AI experts works closely with clients to identify opportunities, develop custom AI models, and implement solutions that automate complex processes, enhance decision-making, and create competitive advantages.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <CtaButton href="/verticals/bizaihacks">
                                Learn More
                            </CtaButton>
                            <CtaButton href="https://bizaihacks.com" external>
                                Visit Website
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ SOLTECH NEXUS SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="space-y-3 sm:space-y-4 font-neuhas">
                        <p className="uppercase text-[20px] leading-[31.2px] text-cyan-600 font-necto mb-2">DIGITAL TRANSFORMATION</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-4 text-blue-800">
                            SOLTECH Nexus
                        </h2>
                        <p className="text-lg text-cyan-600 font-semibold mb-4">Connect. Transform. Grow.</p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            SOLTECH Nexus is our enterprise software development and digital transformation vertical. We help businesses modernize their technology infrastructure, build custom software solutions, and embrace digital-first strategies that drive growth.
                        </p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            From cloud migration and system integration to custom web and mobile applications, our team delivers scalable, secure solutions that connect businesses with their customers, partners, and data.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <CtaButton href="/verticals/soltechnexus">
                                Learn More
                            </CtaButton>
                            <CtaButton href="https://soltechnexus.com" external>
                                Visit Website
                            </CtaButton>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop" alt="SOLTECH Nexus 1" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="SOLTECH Nexus 2" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔥 SOLTECH 360 ADS SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[600px]">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" alt="SOLTECH 360 Ads" className="absolute inset-0 w-full h-full object-cover object-center" />
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12">
                        <p className="uppercase text-[24px] leading-[31.2px] text-blue-700 font-necto mb-6">DIGITAL MARKETING</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            SOLTECH 360 Ads
                        </h2>
                        <p className="text-lg text-blue-700 font-semibold mb-4 font-neuhas">360° Digital Marketing</p>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                SOLTECH 360 Ads is our comprehensive digital marketing vertical, offering end-to-end marketing solutions that help brands reach, engage, and convert their target audiences across all digital channels.
                            </p>
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                From SEO and content marketing to paid advertising, social media management, and marketing automation, we create data-driven campaigns that maximize ROI and build lasting brand equity.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <CtaButton href="/verticals/soltech360ads">
                                Learn More
                            </CtaButton>
                            <CtaButton href="https://soltech360ads.com" external>
                                Visit Website
                            </CtaButton>
                        </div>
                    </div>
                </div>
            </section>




           

            {/* ✅ SOLTECH VIRTUAL CTO SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="space-y-3 sm:space-y-4 font-neuhas">
                        <p className="uppercase text-[20px] leading-[31.2px] text-blue-800 font-necto mb-2">TECHNOLOGY LEADERSHIP</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-4 text-blue-800">
                            Soltech Virtual CTO
                        </h2>
                        <p className="text-lg text-blue-800 font-semibold mb-4">On-Demand Technology Leadership</p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            Soltech Virtual CTO provides on-demand technology leadership for startups, SMEs, and enterprises. We offer Virtual CTO subscription plans, IT infrastructure strategy, cloud migration, ERP consultancy, and AI automation roadmaps.
                        </p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            Partner with IBM, Microsoft Azure, AWS, Google Cloud, and Zoho to deliver comprehensive digital transformation blueprints, cybersecurity audits, and technology vendor management services.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <CtaButton href="/verticals/soltech-virtual-cto">
                                Learn More
                            </CtaButton>
                            {/* <CtaButton href="https://soltechvirtualcto.com" external>
                                Visit Website
                            </CtaButton> */}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop" alt="Virtual CTO 1" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" alt="Virtual CTO 2" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>
 {/* 🔥 MRCCTV SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[600px] order-2 lg:order-1">
                        <img
                            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop"
                            alt="MrCCTV"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12 order-1 lg:order-2">
                        <p className="uppercase text-[24px] leading-[31.2px] text-blue-800 font-necto mb-6">SURVEILLANCE SOLUTIONS</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            MrCCTV
                        </h2>
                        <p className="text-lg text-blue-800 font-semibold mb-4 font-neuhas">Smart Surveillance Solutions</p>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                MrCCTV is our dedicated surveillance vertical, offering advanced CCTV cameras, NVRs, PoE switches, and AI-enabled video analytics systems. We provide comprehensive security solutions for businesses, factories, housing societies, retail outlets, and institutions.
                            </p>
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                Our services include complete installation, regular maintenance, AMC plans, remote cloud-based monitoring, and system upgrades from analog to AI-enabled CCTV with smart analytics integration.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <CtaButton href="/verticals/mrcctv">
                                Learn More
                            </CtaButton>
                            {/* <CtaButton href="https://mrcctv.com" external>
                                Visit Website
                            </CtaButton> */}
                        </div>
                    </div>
                </div>
            </section>
           
            {/* ✅ SOLTECH TRONIX SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                    <div className="space-y-3 sm:space-y-4 font-neuhas">
                        <p className="uppercase text-[20px] leading-[31.2px] text-blue-600 font-necto mb-2">IOT & AUTOMATION</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-4 text-blue-800">
                            Soltech Tronix
                        </h2>
                        <p className="text-lg text-blue-600 font-semibold mb-4">Industrial IoT & Automation</p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            Soltech Tronix specializes in embedded systems, IoT devices, industrial sensors, and smart control units. We serve manufacturing units, industrial automation firms, research institutes, and system integrators.
                        </p>
                        <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                            Our product range includes IoT sensors (temperature, pressure, motion, proximity), smart energy meters, RFID tracking devices, IoT gateways, automation hardware (PLC, HMI), and edge computing devices. We partner with Keyence, Siemens, Schneider Electric, and Honeywell.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <CtaButton href="/verticals/soltech-tronix">
                                Learn More
                            </CtaButton>
                            {/* <CtaButton href="https://soltechtronix.com" external>
                                Visit Website
                            </CtaButton> */}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" alt="Soltech Tronix 1" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" alt="Soltech Tronix 2" className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            </section>




            {/* 🔥 SOLTECH TALENT HUB SECTION */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[600px] order-2 lg:order-1">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                            alt="Soltech Talent Hub"
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 lg:px-0 lg:pr-16 xl:pr-20 py-6 sm:py-8 md:py-12 order-1 lg:order-2">
                        <p className="uppercase text-[24px] leading-[31.2px] text-blue-800 font-necto mb-6">TALENT & TRAINING</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-apfel2 font-normal leading-tight mb-4 sm:mb-6 md:mb-9 text-blue-800">
                            Soltech Talent Hub
                        </h2>
                        <p className="text-lg text-blue-800 font-semibold mb-4 font-neuhas">Nurturing Future-Ready Talent</p>
                        <div className="space-y-3 sm:space-y-4 font-neuhas">
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                Soltech Talent Hub offers AI-powered learning platforms, internship and placement programs, skill development courses, and corporate training modules. We serve colleges, universities, corporate HR departments, and job seekers.
                            </p>
                            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                                Our services include campus-to-corporate training, IT recruitment, contract staffing, employee upskilling in AI, IoT, ERP, Cloud, and Cybersecurity, along with virtual talent management and payroll services.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <CtaButton href="/verticals/soltech-talent-hub">
                                Learn More
                            </CtaButton>
                            {/* <CtaButton href="https://soltechtalenthub.com" external>
                                Visit Website
                            </CtaButton> */}
                        </div>
                    </div>
                </div>
            </section>


           {/* 🔥 SOLTECH BIZ SOLUTIONS SECTION */}
<section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">

        {/* TEXT CONTENT */}
        <div className="space-y-3 sm:space-y-4 font-neuhas">
            <p className="uppercase text-[20px] leading-[31.2px] text-blue-700 font-necto mb-2">
                BUSINESS SOFTWARE
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-4 text-blue-800">
                Soltech Biz Solutions
            </h2>

            <p className="text-lg text-blue-700 font-semibold mb-4">
                Streamline Your Business Operations
            </p>

            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                Soltech Biz Solutions offers comprehensive ERP systems, CRM platforms,
                HRMS tools, and business process automation suites. We partner with
                Zoho, ERPNext, Tally, SAP, and Busy to deliver tailored solutions.
            </p>

            <p className="text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[30px]">
                Our services include ERP customization, cloud deployment,
                data migration, AMC support, and renewal management for
                enterprises, SMEs, and startups.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
                <CtaButton href="/verticals/soltech-biz-solutions">
                    Learn More
                </CtaButton>
            </div>
        </div>

        {/* IMAGE STACK */}
        <div className="flex flex-col gap-4 sm:gap-6">
            <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
                    alt="Soltech Biz Solutions 1"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            </div>

            <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] rounded-lg overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=800&auto=format&fit=crop"
                    alt="Soltech Biz Solutions 2"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            </div>
        </div>

    </div>
</section>



           

            {/* ✅ WHY CHOOSE OUR VERTICALS */}
            <section className="mb-20 sm:mb-32 md:mb-40 lg:mb-52 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 font-normal leading-tight mb-12 text-blue-800 text-center">
                        Why Choose SOLTECH Verticals?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Focused Expertise", desc: "Each vertical specializes in their domain, ensuring deep knowledge and exceptional quality" },
                            { title: "Integrated Solutions", desc: "Verticals collaborate seamlessly to deliver comprehensive, end-to-end solutions" },
                            { title: "Innovation First", desc: "Continuous R&D ensures we stay ahead of technology and market trends" },
                            { title: "Proven Track Record", desc: "Hundreds of successful projects across diverse industries and geographies" },
                            { title: "Flexible Engagement", desc: "Choose to work with one vertical or leverage our full ecosystem" },
                            { title: "24/7 Support", desc: "Round-the-clock assistance and dedicated account management" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-blue-800 font-bold">{idx + 1}</span>
                                </div>
                                <h3 className="font-apfel2 text-xl mb-2 text-gray-900">{item.title}</h3>
                                <p className="font-neuhas text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ✅ VERTICALS SCROLLABLE */}
            <section className="font-apfel2 py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary/30 overflow-x-hidden" id="verticalspage">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                        <h2 className="font-apfel2 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-blue-800 leading-[1.1] sm:leading-[1.2] lg:leading-tight text-center lg:text-left">
                            All Verticals
                        </h2>
                        <p className="text-[15px] md:text-[20px] font-neuhas text-[#30454c] leading-[1.6] md:leading-[30px] max-w-full lg:max-w-3xl text-center lg:text-left mx-auto lg:ml-auto">
                            Explore our specialized business verticals, each designed to deliver exceptional value in their focus areas.
                        </p>
                    </div>
                </div>

                <div className="w-full">
                    <div ref={scrollRef} className="w-full overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-gray-200">
                        <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-4 pl-4 sm:pl-6 md:pl-8 lg:pl-16 xl:pl-20">
                            {soltechVerticals.map((vertical) => (
                                <Link
                                    key={vertical.id}
                                    href={`/verticals/${vertical.slug}`}
                                    className={cn(
                                        "group block flex-shrink-0",
                                        visibleCount === 1 ? "w-[85vw]" : visibleCount === 2 ? "w-[48vw]" : "w-[35vw]"
                                    )}
                                >
                                    <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[600px] w-full rounded-lg overflow-hidden shadow-md">
                                        <Image src={vertical.image.imageUrl} alt={vertical.image.description} fill className="object-cover" sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 35vw" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-blue-800/50 to-transparent" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-indigo-900/30 transition-all duration-500 ease-in-out" />
                                        <div className="absolute left-0 right-0 bottom-6 px-4 sm:px-5 md:px-6 lg:px-8 text-white">
                                            <p className="text-sm text-indigo-300 font-medium mb-2">{vertical.tagline}</p>
                                            <h3 className="font-apfel2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{vertical.name}</h3>
                                            <div className="overflow-hidden max-h-0 group-hover:max-h-32 sm:group-hover:max-h-40 md:group-hover:max-h-48 transition-all duration-500 ease-in-out mt-2">
                                                <p className="text-sm sm:text-base md:text-lg font-neuhas text-white/90 leading-relaxed pb-14 max-w-[85%] sm:max-w-[80%] md:max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                                    {vertical.description}
                                                </p>
                                            </div>
                                            <div className="absolute -bottom-3 right-4 sm:right-5 md:right-6 lg:right-3">
                                                <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-700 shadow-lg">
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
                        <button onClick={() => scrollToIndex("prev")} disabled={currentIndex === 0} className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center hover:bg-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="text-indigo-800 font-semibold text-sm sm:text-base">
                            {currentIndex + 1} – {Math.min(currentIndex + visibleCount, soltechVerticals.length)} of {soltechVerticals.length}
                        </span>
                        <button onClick={() => scrollToIndex("next")} disabled={currentIndex + visibleCount >= soltechVerticals.length} className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center hover:bg-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}