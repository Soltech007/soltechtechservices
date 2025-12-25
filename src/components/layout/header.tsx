// components/Header.tsx
"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CtaButton } from "@/components/sections/SlaveryStatementPageWrapper";
import { useRouter, usePathname } from "next/navigation";

// ============ SOLTECH VERTICALS (With Images & Slug) ============
const soltechVerticals = [
  {
    id: 1,
    name: "BizAI Hacks",
    slug: "bizaihacks",
    url: "https://bizaihacks.com",
    // tagline: "Transform Business with AI",
    description: "AI-powered business automation and intelligence solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "SOLTECH Nexus",
    slug: "soltechnexus",
    url: "https://soltechnexus.com",
    // tagline: "Connect. Transform. Grow.",
    description: "Enterprise software development and digital transformation",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "SOLTECH 360 Ads",
    slug: "soltech360ads",
    url: "https://soltech360ads.com",
    // tagline: "360° Digital Marketing",
    description: "360° digital marketing and advertising solutions",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
];

// ============ TECHNOLOGIES WE ARE EXPERT IN (With Images) ============
const technologiesExpert = [
  {
    id: 1,
    title: "Cloud Computing",
    slug: "cloud-computing",
    description: "AWS, Azure, Google Cloud Platform - scalable cloud infrastructure",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "Machine Learning, Deep Learning, NLP, Computer Vision solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Web Development",
    slug: "web-development",
    description: "React, Next.js, Node.js - modern web applications",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "IoT & Embedded Systems",
    slug: "iot-embedded",
    description: "Arduino, Raspberry Pi, ESP32 - connected device solutions",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "AI & Automation",
    slug: "ai-automation",
  description: "AI-driven automation, CI/CD pipelines, Docker & Kubernetes for faster and reliable deployments",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Cyber Security",
    slug: "cyber-security",
    description: "Penetration testing, SIEM, security audits",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Database & Analytics",
    slug: "database-analytics",
    description: "PostgreSQL, MongoDB, Power BI - data-driven insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
];

// ============ BUSINESS INDUSTRIES ============
const businessIndustries = [
  {
    id: 1,
    title: "Retail Industry Solutions",
    slug: "retail",
    description: "POS systems, inventory management, e-commerce integration",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Automobile Industry",
    slug: "automobile",
    description: "Smart manufacturing, fleet management, connected vehicles",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Healthcare & Wellness",
    slug: "healthcare",
    description: "Hospital management, telemedicine, patient care systems",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Mining & Quarrying",
    slug: "mining",
    description: "Asset tracking, safety monitoring, automation systems",
    image: "https://images.unsplash.com/photo-1578496480157-697fc14d2e55?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Agriculture & Allied Industries",
    slug: "agriculture",
    description: "Smart farming, IoT sensors, crop monitoring systems",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
  },
];

const mainNavLinks = [
  { name: "ABOUT US", href: "/about-us" },
  { name: "VERTICALS", href: "/verticals" },
  { name: "TECHNOLOGIES EXPERT", href: "/technologies" },
  { name: "BUSINESS", href: "/industries" },
  { name: "CONTACT", href: "/contact" },
];

const megaEnabled = new Set(["VERTICALS", "TECHNOLOGIES EXPERT", "BUSINESS"]);

type MegaType = "VERTICALS" | "TECHNOLOGIES EXPERT" | "BUSINESS" | null;

/* ---------------- Header ---------------- */
export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const [activeMega, setActiveMega] = useState<MegaType>(null);
  const megaOpen = !!activeMega;

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const armClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 160);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const headerRef = useRef<HTMLElement | null>(null);
  const [headerH, setHeaderH] = useState(80);

  useEffect(() => {
    const measure = () => {
      if (!headerRef.current) return;
      setHeaderH(headerRef.current.getBoundingClientRect().height || 80);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!megaOpen) {
        if (y < lastScrollY) setIsVisible(true);
        else if (y > lastScrollY && y > 80) setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, megaOpen]);

  useEffect(() => {
    const lock = mobileMenuOpen || megaOpen;
    document.body.style.overflow = lock ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, megaOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLinkClick = () => {
    setActiveMega(null);
  };

  return (
    <>
      <style jsx global>{`
        .mega-menu-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .mega-menu-scroll::-webkit-scrollbar-track {
          background: #f3f3f3;
          border-radius: 10px;
        }
        .mega-menu-scroll::-webkit-scrollbar-thumb {
          background: #1e40af;
          border-radius: 10px;
        }
        .mega-menu-scroll::-webkit-scrollbar-thumb:hover {
          background: #1e3a8a;
        }
        .mega-menu-scroll {
          scrollbar-width: thin;
          scrollbar-color: #1e40af #f3f3f3;
        }
      `}</style>

      <header
        ref={headerRef}
        className={`font-apfel2 fixed top-0 z-[9999] w-full transition-all duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background ${
          megaOpen
            ? "translate-y-0"
            : isVisible
            ? "translate-y-0"
            : "-translate-y-full"
        }`}
        onMouseEnter={() => {
          cancelClose();
        }}
        onMouseLeave={() => {
          if (megaOpen) armClose();
        }}
      >
        {/* Top blue bar */}
        <div className="font-apfel2 h-[3px] sm:h-1 bg-blue-800" />

        <div className="font-apfel2 container flex h-16 sm:h-18 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative h-10 w-24 sm:h-12 sm:w-28 md:h-14 md:w-32">
              <Image
                src="/icon1.png"
                alt="SOLTECH TechServices Logo"
                fill
                priority
                sizes="(max-width: 768px) 100px, 140px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
            <nav className="flex items-center gap-6 xl:gap-12 font-neuhas">
              {mainNavLinks.map((link) => {
                const isMega = megaEnabled.has(link.name);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => {
                      if (isMega) {
                        cancelClose();
                        setActiveMega(link.name as MegaType);
                      } else {
                        setActiveMega(null);
                      }
                    }}
                    onFocus={() => {
                      if (isMega) setActiveMega(link.name as MegaType);
                    }}
                    onClick={() => {
                      setActiveMega(null);
                    }}
                    className="text-[13px] lg:text-sm xl:text-[15px] tracking-wider transition-colors text-gray-800 hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setActiveMega(null);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden relative z-50 hover:bg-secondary/80"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>

      {/* Desktop Mega Panel */}
      <MegaPanel
        open={megaOpen}
        top={headerH}
        which={activeMega}
        onIntentClose={armClose}
        onCancelClose={cancelClose}
        onLinkClick={handleLinkClick}
      />

      {/* Mobile Menu */}
      <div
        className={`font-apfel2 fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            mobileMenuOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 right-0 bg-white shadow-lg transition-transform duration-500 ease-in-out transform overflow-hidden ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="h-16 sm:h-18 md:h-20" />
          <div className="h-1 bg-blue-800 w-full" />

          <nav className="px-4 py-6 sm:px-6 sm:py-8 max-h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden">
            <div className="space-y-1 font-neuhas w-full">
              {/* HOME */}
              <Link
                href="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileDropdown(null);
                }}
                className="block px-4 py-3 text-base sm:text-lg font-semibold text-gray-900 hover:bg-gray-50 hover:text-blue-800 rounded-lg tracking-wider w-full"
              >
                HOME
              </Link>

              {/* VERTICALS Dropdown */}
              <div className="w-full">
                <button
                  onClick={() =>
                    setMobileDropdown(
                      mobileDropdown === "VERTICALS" ? null : "VERTICALS"
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 text-base sm:text-lg font-semibold text-gray-900 hover:bg-gray-50 hover:text-blue-800 rounded-lg tracking-wider"
                >
                  <span>VERTICALS</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform flex-shrink-0 ${
                      mobileDropdown === "VERTICALS" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdown === "VERTICALS" && (
                  <div className="ml-4 mt-2 space-y-2 w-full max-h-[300px] overflow-y-auto">
                    <Link
                      href="/verticals"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileDropdown(null);
                      }}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded w-full"
                    >
                      View All Verticals
                    </Link>
                    {soltechVerticals.map((vertical) => (
                      <Link
                        key={vertical.id}
                        href={`/verticals/${vertical.slug}`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDropdown(null);
                        }}
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded w-full cursor-pointer"
                      >
                        {vertical.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* TECHNOLOGIES Dropdown */}
              <div className="w-full">
                <button
                  onClick={() =>
                    setMobileDropdown(
                      mobileDropdown === "TECHNOLOGIES EXPERT" ? null : "TECHNOLOGIES EXPERT"
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 text-base sm:text-lg font-semibold text-gray-900 hover:bg-gray-50 hover:text-blue-800 rounded-lg tracking-wider"
                >
                  <span>TECHNOLOGIES EXPERT</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform flex-shrink-0 ${
                      mobileDropdown === "TECHNOLOGIES EXPERT" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdown === "TECHNOLOGIES EXPERT" && (
                  <div className="ml-4 mt-2 space-y-2 w-full max-h-[400px] overflow-y-auto">
                    <Link
                      href="/technologies"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileDropdown(null);
                      }}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded w-full"
                    >
                      View All Technologies
                    </Link>
                    {technologiesExpert.map((tech) => (
                      <Link
                        key={tech.id}
                        href={`/technologies/${tech.slug}`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDropdown(null);
                        }}
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded w-full"
                      >
                        {tech.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* BUSINESS Dropdown */}
              <div className="w-full">
                <button
                  onClick={() =>
                    setMobileDropdown(
                      mobileDropdown === "BUSINESS" ? null : "BUSINESS"
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 text-base sm:text-lg font-semibold text-gray-900 hover:bg-gray-50 hover:text-blue-800 rounded-lg tracking-wider"
                >
                  <span>BUSINESS</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform flex-shrink-0 ${
                      mobileDropdown === "BUSINESS" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdown === "BUSINESS" && (
                  <div className="ml-4 mt-2 space-y-2 w-full">
                    <Link
                      href="/industries"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileDropdown(null);
                      }}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded w-full"
                    >
                      View All Industries
                    </Link>
                    {businessIndustries.map((industry) => (
                      <Link
                        key={industry.id}
                        href={`/industries/${industry.slug}`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDropdown(null);
                        }}
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-50 rounded w-full"
                      >
                        {industry.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ABOUT US */}
              <Link
                href="/about-us"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileDropdown(null);
                }}
                className="block px-4 py-3 text-base sm:text-lg font-semibold text-gray-900 hover:bg-gray-50 hover:text-blue-800 rounded-lg tracking-wider w-full"
              >
                ABOUT US
              </Link>

              {/* CONTACT */}
              <Link
                href="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileDropdown(null);
                }}
                className="block px-4 py-3 text-base sm:text-lg font-semibold text-gray-900 hover:bg-gray-50 hover:text-blue-800 rounded-lg tracking-wider w-full"
              >
                CONTACT
              </Link>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 w-full">
              <Link
                href="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileDropdown(null);
                }}
                className="block w-full text-center px-6 py-3 bg-blue-800 text-white font-semibold rounded-full hover:bg-blue-900 transition-colors"
              >
                GET A CONSULTATION
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

/* ---------------- Mega Panel Router ---------------- */
function MegaPanel({
  open,
  top,
  which,
  onIntentClose,
  onCancelClose,
  onLinkClick,
}: {
  open: boolean;
  top: number;
  which: MegaType;
  onIntentClose: () => void;
  onCancelClose: () => void;
  onLinkClick: () => void;
}) {
  const style: React.CSSProperties = { top, height: `calc(100vh - ${top}px)` };

  return (
    <div
      className={`font-apfel2 fixed inset-x-0 z-[9998] hidden lg:block ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={style}
      onMouseLeave={onIntentClose}
      onMouseEnter={onCancelClose}
      aria-hidden={!open}
    >
      <div
        className={`h-full bg-white transition-transform duration-300 ease-out ${
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <div className="h-full px-8 lg:px-12 xl:px-16 py-10 overflow-y-auto mega-menu-scroll">
          <div className="max-w-[1600px] mx-auto">
            {which === "VERTICALS" && (
              <VerticalsContent onLinkClick={onLinkClick} />
            )}
            {which === "TECHNOLOGIES EXPERT" && (
              <TechnologiesContent onLinkClick={onLinkClick} />
            )}
            {which === "BUSINESS" && (
              <BusinessContent onLinkClick={onLinkClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- VERTICALS Content (With Images & Internal Links) ---------------- */
function VerticalsContent({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      {/* Left */}
      <div className="col-span-12 lg:col-span-4">
        <h2 className="text-3xl md:text-[32px] font-semibold text-gray-900 font-apfel2">
          Our Business Verticals
        </h2>
        <p className="mt-4 text-gray-600 leading-7 font-neuhas">
          SOLTECH TechServices operates multiple specialized business verticals,
          each focused on delivering excellence in their domain. Explore our
          subsidiary companies and their specialized offerings.
        </p>

        <CtaButton
          href="/verticals"
          onClick={onLinkClick}
          className="mt-6 inline-flex items-center gap-4 group"
        >
          View All Verticals
        </CtaButton>

        <div className="mt-10 pt-6 border-t">
          <div className="text-[12px] font-semibold tracking-wider text-gray-600 uppercase font-apfel2">
            Our Strengths
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-600 font-neuhas">
            <p>✓ Multiple Specialized Domains</p>
            <p>✓ Integrated Solutions</p>
            <p>✓ Industry-Leading Expertise</p>
            <p>✓ 24/7 Support Across All Verticals</p>
          </div>
        </div>
      </div>

      {/* Right - Cards with Images */}
      <div className="col-span-12 lg:col-span-8">
        <div className="border-b border-gray-200 mb-6">
          <h3 className="uppercase tracking-wide text-[13px] font-semibold pb-3 text-blue-800 border-b-2 border-blue-800 inline-block font-apfel2">
            Our Verticals
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {soltechVerticals.map((vertical) => (
            <Link
              key={vertical.id}
              href={`/verticals/${vertical.slug}`}
              onClick={onLinkClick}
              className="group block"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={vertical.image}
                  alt={vertical.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Tagline Badge */}
                {/* <div className="absolute bottom-2 left-2 bg-indigo-600/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-[10px] text-white font-medium">{vertical.tagline}</span>
                </div> */}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-gray-900 group-hover:text-blue-800 font-apfel2">
                  {vertical.name}
                </span>
                {/* External Link */}
                {/* <a
                  href={vertical.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
                  title={`Visit ${vertical.name}`}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 hover:text-blue-800" />
                </a> */}
              </div>
              <p className="text-sm text-gray-600 mt-1 font-neuhas line-clamp-2">
                {vertical.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- TECHNOLOGIES Content (With Images) ---------------- */
function TechnologiesContent({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      {/* Left */}
      <div className="col-span-12 lg:col-span-4">
        <h2 className="text-3xl md:text-[32px] font-semibold text-gray-900 font-apfel2">
          Technologies We Expert In
        </h2>
        <p className="mt-4 text-gray-600 leading-7 font-neuhas">
          We leverage cutting-edge technologies to build robust, scalable, and
          innovative solutions for our clients across all industries.
        </p>

        <CtaButton
          href="/technologies"
          onClick={onLinkClick}
          className="mt-6 inline-flex items-center gap-4 group"
        >
          Explore All Technologies
        </CtaButton>

        <div className="mt-10 pt-6 border-t">
          <div className="text-[12px] font-semibold tracking-wider text-gray-600 uppercase font-apfel2">
            Our Expertise
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-600 font-neuhas">
            <p>✓ Certified Technology Partners</p>
            <p>✓ Latest Tech Stack</p>
            <p>✓ Continuous Learning Culture</p>
            <p>✓ Industry Best Practices</p>
          </div>
        </div>
      </div>

      {/* Right - Cards with Images */}
      <div className="col-span-12 lg:col-span-8">
        <div className="border-b border-gray-200 mb-6">
          <h3 className="uppercase tracking-wide text-[13px] font-semibold pb-3 text-blue-800 border-b-2 border-blue-800 inline-block font-apfel2">
            Technology Stack
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {technologiesExpert.map((tech) => (
            <Link
              key={tech.id}
              href={`/technologies/${tech.slug}`}
              onClick={onLinkClick}
              className="group block"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={tech.image}
                  alt={tech.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 font-semibold text-gray-900 group-hover:text-blue-800 font-apfel2">
                {tech.title}
              </div>
              <p className="text-sm text-gray-600 mt-1 font-neuhas line-clamp-2">
                {tech.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- BUSINESS Content ---------------- */
function BusinessContent({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      {/* Left */}
      <div className="col-span-12 lg:col-span-4">
        <h2 className="text-3xl md:text-[32px] font-semibold text-gray-900 font-apfel2">
          Industries We Serve
        </h2>
        <p className="mt-4 text-gray-600 leading-7 font-neuhas">
          We provide tailored technology solutions across various industries,
          helping businesses achieve digital transformation and operational
          excellence.
        </p>

        <CtaButton
          href="/industries"
          onClick={onLinkClick}
          className="mt-6 inline-flex items-center gap-4 group"
        >
          View All Industries
        </CtaButton>

        <div className="mt-10 pt-6 border-t">
          <div className="text-[12px] font-semibold tracking-wider text-gray-600 uppercase font-apfel2">
            Our Approach
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-600 font-neuhas">
            <p>✓ Industry-Specific Solutions</p>
            <p>✓ End-to-End Implementation</p>
            <p>✓ Scalable & Secure Systems</p>
            <p>✓ Continuous Support & Maintenance</p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="col-span-12 lg:col-span-8">
        <div className="border-b border-gray-200 mb-6">
          <h3 className="uppercase tracking-wide text-[13px] font-semibold pb-3 text-blue-800 border-b-2 border-blue-800 font-apfel2">
            Business Industries
          </h3>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {businessIndustries.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              onClick={onLinkClick}
              className="group block"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 font-semibold text-gray-900 group-hover:text-blue-800 font-apfel2">
                {industry.title}
              </div>
              <p className="text-sm text-gray-600 mt-1 font-neuhas line-clamp-2">
                {industry.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;