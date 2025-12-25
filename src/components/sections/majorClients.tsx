// components/sections/MajorClients.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const brandPartners = [
  {
    id: 1,
    name: "HP",
    logo: "/logos/hp.png",
    website: "https://www.hp.com",
    category: "Hardware & Technology",
  },
  {
    id: 2,
    name: "IBM",
    logo: "/logos/ibm.png",
    website: "https://www.ibm.com",
    category: "Enterprise Technology",
  },
  {
    id: 3,
    name: "Bosch",
    logo: "/logos/bosch.png",
    website: "https://www.bosch.com",
    category: "Engineering & Technology",
  },
  {
    id: 4,
    name: "Jio",
    logo: "/logos/jio.png",
    website: "https://www.jio.com",
    category: "Telecommunications",
  },
  {
    id: 5,
    name: "LG",
    logo: "/logos/lg.png",
    website: "https://www.lg.com",
    category: "Consumer Electronics",
  },
  {
    id: 6,
    name: "Zoho",
    logo: "/logos/zoho.png",
    website: "https://www.zoho.com",
    category: "Business Software",
  },
  {
    id: 7,
    name: "Tally",
    logo: "/logos/tally.png",
    website: "https://tallysolutions.com",
    category: "Accounting Software",
  },
  {
    id: 8,
    name: "Brevo",
    logo: "/logos/brevo.png",
    website: "https://www.brevo.com",
    category: "Marketing Automation",
  },
  {
    id: 9,
    name: "Cisco",
    logo: "/logos/cisco.png",
    website: "https://www.cisco.com",
    category: "Networking",
  },
  {
    id: 10,
    name: "Samsung",
    logo: "/logos/samsung.png",
    website: "https://www.samsung.com",
    category: "Consumer Electronics",
  },
  {
    id: 11,
    name: "VMware",
    logo: "/logos/tally.png",
    website: "https://www.vmware.com",
    category: "Virtualization",
  },
  {
    id: 12,
    name: "Microsoft",
    logo: "/logos/hp.png",
    website: "https://www.microsoft.com",
    category: "Cloud & Enterprise",
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

export default function MajorClients() {
    const [isPaused, setIsPaused] = useState(false);

    // Triple the array for seamless infinite loop
    const triplePartners = [...brandPartners, ...brandPartners, ...brandPartners];

    return (
        <section className="font-apfel2 py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                {/* Heading */}
                <div className="mb-10">
                    <p className="text-blue-600 font-medium text-sm sm:text-base mb-2 font-neuhas">
                        Our 50+ Brand Partners
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-blue-800">
                        Trusted Technology Partners
                    </h2>
                </div>
            </div>

            {/* Infinite Scroll Marquee */}
            <div 
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient Fade Left */}
                <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                
                {/* Gradient Fade Right */}
                <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track */}
                <div
                    className={cn(
                        "flex gap-4 sm:gap-6 md:gap-8 my-10",
                        isPaused ? "animation-paused" : ""
                    )}
                    style={{
                        animation: 'scroll 40s linear infinite',
                        width: 'fit-content',
                    }}
                >
                    {triplePartners.map((partner, idx) => (
                        <a
                            key={`${partner.id}-${idx}`}
                            href={partner.website || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                'flex-shrink-0 bg-white border border-gray-200 rounded-xl',
                                'shadow-[0_4px_15px_-3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.15)]',
                                'transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer',
                                'p-4 sm:p-5 md:p-6 hover:border-blue-300 hover:scale-105',
                                'w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]'
                            )}
                        >
                            <div className="relative w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 lg:w-32 lg:h-18">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=1e40af&color=fff&size=128&font-size=0.33`;
                                    }}
                                />
                            </div>
                            <p className="font-neuhas mt-3 sm:mt-1 text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center group-hover:text-blue-800 transition-colors whitespace-nowrap">
                                {partner.category}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            {/* ✅ VIEW ALL BUTTON */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-10 md:mt-12">
                <div className="flex justify-center">
                    <CtaButton href="/partners">
                        View All Partners
                    </CtaButton>
                </div>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
                
                .animation-paused {
                    animation-play-state: paused !important;
                }
            `}</style>
        </section>
    );
}

// Export partners data for use in partners page
export { brandPartners };