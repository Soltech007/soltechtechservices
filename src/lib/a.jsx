"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowRightCircle,
  CheckCircle2,
  Building2,
  Users,
  Target,
  Award,
  Clock,
  Shield,
  Zap,
  Globe,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/sections/SlaveryStatementPageWrapper";

// Service detail data structure (same as before)
const serviceDetailsData: Record<string, ServiceDetail> = {
  engineering: {
    id: "engineering",
    title: "Engineering",
    tagline: "Designing for Success",
    heroImage:
      "https://www.bechtel.com/wp-content/uploads/2024/12/Line-1-Train-south-of-KAFD--1024x574.webp",
    description:
      "A&T's engineering services are the foundation of our project success, delivering innovative, technology-driven solutions to tackle our customers' toughest challenges.",
    longDescription: `Our engineering excellence spans over a century of innovation and technical leadership. We combine cutting-edge technology with proven methodologies to deliver solutions that set new industry standards. Our engineers work collaboratively across global design centers, leveraging advanced 3D, 4D, and 5D modeling, data-centric execution, and cloud-based systems to streamline schedules, reduce costs, and maximize productivity.`,

    keyFeatures: [
      {
        icon: Building2,
        title: "Global Design Centers",
        description:
          "Engineering hubs in Taiwan, Dubai, New Delhi, and major cities worldwide",
      },
      {
        icon: Zap,
        title: "Advanced Technology",
        description:
          "3D/4D/5D modeling, AI-driven design optimization, and digital twins",
      },
      {
        icon: Users,
        title: "Expert Teams",
        description:
          "A&T Fellows and Distinguished Technical Specialists leading innovation",
      },
      {
        icon: Globe,
        title: "Integrated Approach",
        description:
          "Design with supply chain, construction, and operations in mind",
      },
    ],

    capabilities: [
      "Conceptual & Front-End Engineering Design (FEED)",
      "Detailed Engineering & Design",
      "Digital Engineering & BIM",
      "Process Engineering",
      "Structural & Civil Engineering",
      "Mechanical & Electrical Engineering",
      "Environmental Engineering",
      "Systems Integration",
      "Value Engineering",
    ],

    statistics: [
      {
        value: "98,000+",
        label: "Design Drawings",
        description: "Produced for Riyadh Metro",
      },
      {
        value: "28,000",
        label: "Professionals",
        description: "At peak construction",
      },
      { value: "100+", label: "Mock-ups", description: "Created for testing" },
      {
        value: "10,000+",
        label: "Unique Designs",
        description: "For system components",
      },
    ],

    caseStudies: [
      {
        title: "Riyadh Metro",
        location: "Saudi Arabia",
        description:
          "The largest metro project in the world built in a single phase",
        image:
          "https://www.bechtel.com/wp-content/uploads/2024/12/KAFD-Steel-Structure-1-edited-900x506.webp",
        highlights: [
          "98,000 design drawings",
          "10,000 unique door designs",
          "120,000 as-built drawings",
        ],
        link: "/projects/riyadh-metro",
      },
      {
        title: "Crossrail",
        location: "United Kingdom",
        description: "Europe's largest infrastructure project",
        image:
          "https://www.bechtel.com/wp-content/uploads/2025/01/1694565110427-506x365.webp",
        highlights: [
          "42km of new tunnels",
          "10 new stations",
          "BIM implementation",
        ],
        link: "/projects/crossrail",
      },
    ],

    relatedServices: ["procurement", "construction", "project-management"],

    testimonial: {
      quote:
        "A&T's engineering capabilities have been instrumental in delivering our most complex projects on time and within budget.",
      author: "Project Director",
      company: "Major Infrastructure Client",
    },
  },
  // Add other services data here...
};

// Types
interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  heroImage: string;
  description: string;
  longDescription: string;
  keyFeatures: Array<{
    icon: React.ComponentType<{ className?: string }>,
    title: string,
    description: string,
  }>;
  capabilities: string[];
  statistics: Array<{
    value: string,
    label: string,
    description: string,
  }>;
  caseStudies: Array<{
    title: string,
    location: string,
    description: string,
    image: string,
    highlights: string[],
    link: string,
  }>;
  relatedServices: string[];
  testimonial: {
    quote: string,
    author: string,
    company: string,
  };
}

export default function ServiceDetailPage({
  serviceSlug = "engineering",
}: {
  serviceSlug?: string,
}) {
  const [service, setService] = (useState < ServiceDetail) | (null > null);

  useEffect(() => {
    const serviceData = serviceDetailsData[serviceSlug];
    if (serviceData) {
      setService(serviceData);
    }
  }, [serviceSlug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Service not found</h2>
          <Link href="/services" className="text-blue-800 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="font-apfel2 relative min-h-[70vh] sm:min-h-[80vh] flex items-center pt-[20px] sm:pt-[100px] md:pt-[120px]">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-5xl text-white">
            <p className="text-yellow-400 tracking-[0.2em] mb-4 text-xs sm:text-sm uppercase font-neuhas font-semibold">
              OUR SERVICES
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] leading-[1.05] font-medium font-apfel2 mb-6">
              {service.title}
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl text-white/90 mb-8 font-apfel2 font-light">
              {service.tagline}
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-4xl font-neuhas leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-4">
          <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
            <Link href="/" className="hover:text-blue-800 transition-colors">
              HOME
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link
              href="/services"
              className="hover:text-blue-800 transition-colors"
            >
              SERVICES
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-blue-800 font-semibold uppercase">
              {service.title}
            </span>
          </nav>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <section className="py-20 sm:py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-apfel2 mb-8 sm:mb-12 text-gray-900">
              Excellence Through Innovation
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-neuhas">
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="py-20 sm:py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-apfel2 text-center mb-16 sm:mb-20 text-gray-900">
            Key Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 max-w-6xl mx-auto">
            {service.keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-5 sm:gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-800" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-3 font-apfel2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-neuhas text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-20 sm:py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-apfel2 text-center mb-16 sm:mb-20 text-gray-900">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 max-w-6xl mx-auto">
            {service.statistics.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl sm:text-6xl md:text-5xl font-bold text-blue-800 mb-3 font-apfel2">
                  {stat.value}
                </div>
                <div className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 font-apfel2">
                  {stat.label}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-neuhas">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20 sm:py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-apfel2 text-center mb-16 sm:mb-20 text-gray-900">
            Our Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {service.capabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 sm:p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <CheckCircle2 className="w-6 h-6 text-blue-800 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-800 font-medium font-neuhas text-lg">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 sm:py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-apfel2 text-center mb-16 sm:mb-20 text-gray-900">
            Featured Projects
          </h2>
          <div className="space-y-20 sm:space-y-24">
            {service.caseStudies.map((study, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center"
              >
                <div
                  className={cn(
                    "relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl",
                    index % 2 === 1 && "lg:order-2"
                  )}
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={cn(index % 2 === 1 && "lg:order-1")}>
                  <p className="text-yellow-500 uppercase text-sm font-bold mb-3 tracking-wider font-neuhas">
                    {study.location}
                  </p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-apfel2 mb-6 text-gray-900">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-8 font-neuhas text-xl leading-relaxed">
                    {study.description}
                  </p>
                  <ul className="space-y-3 mb-10">
                    {study.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-800 flex-shrink-0" />
                        <span className="text-gray-700 font-neuhas text-lg">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 sm:mt-10 md:mt-12 md:-ml-6 hover:md:ml-0 transition-all duration-300">
                    <CtaButton href={study.link}>
                      View Project Details
                    </CtaButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 sm:py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-7xl text-blue-800/20 mb-8 font-serif leading-none">
              "
            </div>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-gray-800 mb-8 leading-relaxed">
              {service.testimonial.quote}
            </blockquote>
            <div className="text-gray-600">
              <p className="font-semibold text-xl mb-1 font-neuhas">
                {service.testimonial.author}
              </p>
              <p className="text-lg font-neuhas">
                {service.testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA SECTION */}
      <section className="py-20 sm:py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-apfel2 mb-6 sm:mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl sm:text-2xl mb-10 sm:mb-12 max-w-3xl mx-auto font-neuhas leading-relaxed">
            Let's discuss how our {service.title.toLowerCase()} expertise can
            help deliver your next project with excellence.
          </p>
          <CtaButton href="/contact"> Contact Our Team</CtaButton>
        </div>
      </section>
    </>
  );
}
