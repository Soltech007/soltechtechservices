'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Static SOLTECH Services Data
const soltechServices = [
  {
    id: 1,
    title: "AI Solutions",
    slug: "ai",
    location: "Artificial Intelligence",
    tagline: "Customized, scalable, and secure AI services that help clients innovate faster and make smarter decisions.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "IoT Integration",
    slug: "iot",
    location: "Internet of Things",
    tagline: "Smart, connected services that drive automation, efficiency, and real-time insights for modern enterprises.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "IT Infrastructure",
    slug: "it-infrastructure",
    location: "Cloud & On-Premise",
    tagline: "Secure, scalable, and future-ready foundations from cloud to on-premise services for high-performance businesses.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Telecommunication",
    slug: "telecommunication",
    location: "Enterprise Connectivity",
    tagline: "Secure, scalable, and high-speed communication infrastructure for modern businesses.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Surveillance Systems",
    slug: "surveillance",
    location: "Security Solutions",
    tagline: "Advanced surveillance services designed to protect assets, ensure safety, and deliver actionable intelligence.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Cyber Security",
    slug: "cyber-security",
    location: "Enterprise Protection",
    tagline: "Enterprise-grade security services that detect, defend, and respond with precision to protect your data and infrastructure.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Industrial Automation",
    slug: "industrial-automation",
    location: "Manufacturing Excellence",
    tagline: "Smart technologies and real-time control systems for manufacturing optimization and increased efficiency.",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Retail Solutions",
    slug: "retail",
    location: "Industry Solutions",
    tagline: "Tailored technology solutions for the retail industry to enhance customer experience and streamline operations.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Healthcare Tech",
    slug: "healthcare",
    location: "Industry Solutions",
    tagline: "Advanced technology solutions for healthcare and wellness sector to improve patient care and operational efficiency.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Automobile Industry",
    slug: "automobile",
    location: "Industry Solutions",
    tagline: "Cutting-edge technology solutions for the automobile industry to drive innovation and efficiency.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
  },
];

export function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive items per view
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
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.scrollWidth / soltechServices.length;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (direction: "prev" | "next") => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / soltechServices.length;
      const currentScroll = scrollRef.current.scrollLeft;

      scrollRef.current.scrollTo({
        left:
          direction === "next"
            ? currentScroll + itemWidth
            : currentScroll - itemWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="font-apfel2 py-12 sm:py-16 md:py-20 lg:py-12 bg-secondary/30 overflow-x-hidden">
      {/* ✅ Header - SAME padding as Hero */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-blue-800">
          Our Services
        </h2>
      </div>

      {/* ✅ Scrollable Services Container */}
      <div className="w-full">
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto scroll-smooth 
                     scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200"
        >
          {/* ✅ Flex container with Hero's LEFT padding + matching RIGHT spacer */}
          <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-4
                          pl-4 sm:pl-6 md:pl-8 lg:pl-16 xl:pl-20">
            {soltechServices.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className={cn(
                  "group block flex-shrink-0",
                  visibleCount === 1
                    ? "w-[85vw]"
                    : visibleCount === 2
                      ? "w-[48vw]"
                      : "w-[35vw]"
                )}
              >
                <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] 
                                w-full rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, 
                           (max-width: 1024px) 48vw, 
                           35vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 
                                  bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-blue-900/30 
                                  transition-all duration-500 ease-in-out" />

                  {/* Content Overlay */}
                  <div className="absolute left-0 right-0 bottom-6
                                  px-4 sm:px-5 md:px-6 lg:px-8
                                  text-white">
                    <p className="text-blue-300 uppercase text-sm font-medium">{service.location}</p>

                    <h3 className="font-apfel2 
                                   text-2xl sm:text-3xl md:text-4xl lg:text-[30px] max-w-[85%] sm:max-w-sm">
                      {service.title}
                    </h3>

                    {/* Description - Smooth slide up */}
                    <div className="overflow-hidden 
                                    max-h-0 group-hover:max-h-32 sm:group-hover:max-h-40 md:group-hover:max-h-48
                                    transition-all duration-500 ease-in-out
                                    mt-2">
                      <p className="text-sm sm:text-base md:text-[16px]
                                    font-neuhas
                                    text-white/90 
                                    leading-relaxed
                                    pb-0
                                    max-w-[85%] sm:max-w-[80%] md:max-w-[80%]
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-500 ease-in-out">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="absolute bottom-0 right-4 sm:right-5 md:right-6 lg:right-8">
                      <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12
                                      rounded-full bg-blue-600 
                                      text-white flex items-center 
                                      justify-center 
                                      transition-all duration-300 
                                      group-hover:bg-blue-700
                                      shadow-lg">
                        <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* ✅ RIGHT spacer - SAME width as left padding for symmetry */}
            <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 lg:w-16 xl:w-20" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ✅ Navigation Controls - SAME padding as Hero */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
        <div className="flex items-center justify-center sm:justify-start 
                        gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={() => scrollToIndex("prev")}
            disabled={currentIndex === 0}
            className="h-10 w-10 sm:h-11 sm:w-11 
                       rounded-full bg-blue-100 
                       text-blue-600 flex items-center 
                       justify-center hover:bg-blue-200 
                       transition-colors 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <span className="text-blue-800 font-semibold text-sm sm:text-base">
            {currentIndex + 1} –{" "}
            {Math.min(currentIndex + visibleCount, soltechServices.length)} of{" "}
            {soltechServices.length}
          </span>

          <button
            onClick={() => scrollToIndex("next")}
            disabled={currentIndex + visibleCount >= soltechServices.length}
            className="h-10 w-10 sm:h-11 sm:w-11 
                       rounded-full bg-blue-100 
                       text-blue-600 flex items-center 
                       justify-center hover:bg-blue-200 
                       transition-colors 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}