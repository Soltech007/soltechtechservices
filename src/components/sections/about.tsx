"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Settings, Wrench, Cpu, Brain, Wifi, Server, Camera, ShieldCheck,
  Check, Globe, Zap, Lock, Cloud, Database, Monitor
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-bold text-blue-800 mb-2">
      {prefix}{count}{suffix}
    </div>
  );
}

// Fade In Animation Component
function FadeInSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "transition-all duration-100",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
}

// ✅ SERVICES TABS COMPONENT
function ServicesTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "AI Solutions",
      icon: Brain,
      stats: { projects: "50+", satisfaction: "98%" },
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
      services: [
        { name: "Machine Learning", spec: "Custom ML models & algorithms", qty: "Advanced" },
        { name: "Natural Language Processing", spec: "Chatbots & text analysis", qty: "Enterprise" },
        { name: "Computer Vision", spec: "Image & video analytics", qty: "Real-time" },
        { name: "Predictive Analytics", spec: "Business forecasting", qty: "AI-powered" },
        { name: "Process Automation", spec: "RPA & intelligent automation", qty: "End-to-end" },
        { name: "AI Consulting", spec: "Strategy & implementation", qty: "Expert" }
      ]
    },
    {
      name: "IoT Solutions",
      icon: Wifi,
      stats: { projects: "75+", satisfaction: "96%" },
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1200&auto=format&fit=crop",
      services: [
        { name: "Smart Sensors", spec: "Industrial & commercial grade", qty: "Multi-protocol" },
        { name: "IoT Platforms", spec: "Cloud & edge computing", qty: "Scalable" },
        { name: "Device Management", spec: "Remote monitoring & control", qty: "24/7" },
        { name: "Data Analytics", spec: "Real-time insights", qty: "AI-enabled" },
        { name: "Integration Services", spec: "Legacy system connectivity", qty: "Seamless" }
      ]
    },
    {
      name: "Cyber Security",
      icon: ShieldCheck,
      stats: { projects: "100+", satisfaction: "99%" },
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      services: [
        { name: "Threat Detection", spec: "AI-powered monitoring", qty: "Real-time" },
        { name: "Vulnerability Assessment", spec: "Penetration testing", qty: "Comprehensive" },
        { name: "Security Audits", spec: "Compliance & risk assessment", qty: "Industry-standard" },
        { name: "Incident Response", spec: "24/7 SOC services", qty: "Immediate" },
        { name: "Data Protection", spec: "Encryption & DLP", qty: "Enterprise" },
        { name: "Security Training", spec: "Employee awareness programs", qty: "Customized" }
      ]
    },
    {
      name: "IT Infrastructure",
      icon: Server,
      stats: { projects: "120+", satisfaction: "97%" },
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      services: [
        { name: "Cloud Solutions", spec: "AWS, Azure, GCP", qty: "Multi-cloud" },
        { name: "Network Design", spec: "Enterprise networking", qty: "High-speed" },
        { name: "Server Management", spec: "On-premise & hybrid", qty: "99.9% uptime" },
        { name: "Disaster Recovery", spec: "Backup & continuity", qty: "Automated" },
        { name: "Infrastructure Monitoring", spec: "Proactive management", qty: "24/7" }
      ]
    },
    {
      name: "Surveillance",
      icon: Camera,
      stats: { projects: "80+", satisfaction: "95%" },
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
      services: [
        { name: "CCTV Systems", spec: "IP & analog cameras", qty: "HD/4K" },
        { name: "Video Analytics", spec: "AI-powered detection", qty: "Smart" },
        { name: "Access Control", spec: "Biometric & card systems", qty: "Multi-factor" },
        { name: "Remote Monitoring", spec: "Cloud-based surveillance", qty: "Anywhere" },
        { name: "Alarm Systems", spec: "Intrusion detection", qty: "Integrated" },
        { name: "Central Monitoring", spec: "Command center setup", qty: "Enterprise" }
      ]
    },
  ];

  const activeData = tabs[activeTab];
  const Icon = activeData.icon;

  return (
    <div>
      {/* Tab Buttons */}
      <div className="grid grid-cols-3 sm:flex gap-3 mb-10 justify-center font-neuhas place-items-center">
        {tabs.map((tab, idx) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={cn(
                "md:px-4 px-0 py-1 rounded-full font-neuhas transition-all duration-300 text-[12px] md:text-[16px] flex items-center gap-2 min-w-[100px] sm:min-w-[140px] justify-center",
                activeTab === idx
                  ? "bg-blue-800 text-white shadow-lg scale-105"
                  : "text-black hover:bg-blue-100 hover:text-blue-800"
              )}
            >
              <TabIcon className="md:w-4 md:h-4 w-3 h-3" />
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image & Stats */}
          <div className="relative h-[400px] lg:h-auto">
            <Image
              src={activeData.image}
              alt={activeData.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-800/30 to-transparent" />

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between text-white">
                <div>
                  <div className="font-apfel2 text-3xl font-bold mb-1">{activeData.stats.satisfaction}</div>
                  <div className="font-neuhas text-sm text-white/80">Client Satisfaction</div>
                </div>
                <div className="text-right">
                  <div className="font-apfel2 text-5xl font-bold mb-1">{activeData.stats.projects}</div>
                  <div className="font-neuhas text-sm text-white/80">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Services List */}
          <div className="p-8 lg:p-10">
            <h3 className="font-apfel2 text-3xl mb-2 text-gray-900">
              {activeData.name}
            </h3>
            <p className="font-neuhas text-gray-600 mb-8">
              Comprehensive {activeData.name.toLowerCase()} for modern enterprises
            </p>

            {/* Services Table */}
            <div className="space-y-1">
              {/* Header */}
              <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 pb-3 border-b-2 border-gray-200 font-neuhas text-sm text-gray-500 uppercase tracking-wide">
                <div>Service</div>
                <div>Specification</div>
                <div className="text-right">Type</div>
              </div>

              {/* Service Rows */}
              <div className="space-y-0 max-h-[400px] overflow-y-auto">
                {activeData.services.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[2fr_2fr_1fr] gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-neuhas font-semibold text-gray-900">{item.name}</div>
                    <div className="font-neuhas text-sm text-gray-600">{item.spec}</div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 px-3 py-1 rounded-full font-apfel2 text-blue-800 font-bold text-sm">
                        {item.qty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ MAIN ABOUT COMPONENT
export function About() {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReveal(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="font-apfel2 relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] flex items-center md:py-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
            alt="About SOLTECH TechServices"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mt-10">
          <div className="max-w-xs md:max-w-6xl text-white">
            <p className="font-neuhas text-blue-300 font-thin tracking-widest mb-2 text-sm sm:text-base md:text-[16px] uppercase animate-fade-in animate-slideInLeft"
              style={{ animationDelay: "0.9s" }}
            >
              ABOUT SOLTECH TECHSERVICES
            </p>

            <h1 className="text-white font-normal font-apfel2 mb-4 md:mb-6 text-[clamp(2.4rem,6.3vw,6.3rem)] leading-[1.05] animate-slideInLeft"
              style={{ animationDelay: '0.7s' }}
            >
              Tech That Transforms<br />Business That Grows
            </h1>

            <p className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px] leading-[1.6] md:leading-[36px] font-medium text-white/90 md:max-w-4xl animate-slideInLeft"
              style={{ animationDelay: '0.3s' }}
            >
              15+ years of delivering cutting-edge technology solutions across India,
              empowering businesses with AI, IoT, Cybersecurity, and Digital Transformation.
            </p>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-3 sm:py-4">
          <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
            <Link href="/" className="hover:text-blue-800 transition-colors">HOME</Link>
            <span className="mx-1.5 sm:mx-2">/</span>
            <span className="text-blue-800 font-semibold uppercase">ABOUT US</span>
          </nav>
        </div>
      </div>

      {/* OUR STORY SECTION */}
      <FadeInSection>
        <section className="bg-white py-6 sm:py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-12 items-start px-4 sm:px-6 md:px-8">
            <div className="lg:pl-8 xl:pl-16 2xl:pl-32 py-4 sm:py-6 md:py-8 lg:py-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight sm:leading-[1.2] md:leading-[64px] text-gray-900 mb-3 sm:mb-8 md:mb-12">
                Our Company
              </h2>

              <div className="font-neuhas space-y-4 sm:space-y-5 md:space-y-6 text-gray-700 text-[15px] sm:text-[16px] md:text-[20px] leading-[1.6] sm:leading-[1.7] md:leading-[32px]">
                <p>
                  At SOLTECH TechServices Pvt Ltd, we are at the forefront of technology, providing 
                  cutting-edge Technology Consulting & Services tailored to businesses across all industries. 
                  Our expertise spans AI, IoT, Cybersecurity, IT Infrastructure, Surveillance, and 
                  Telecommunications.
                </p>
                <p>
                  Our Registered Office is located in Vapi, Gujarat with a strategic presence across 
                  Western India. This positioning gives us the advantage of understanding diverse business 
                  needs and delivering solutions that truly transform operations.
                </p>
                <p>
                  We help businesses achieve greater clarity and efficiency through expert software 
                  automation and ERP services. Our end-to-end services are designed to streamline 
                  operations, boost productivity, and improve transparency across all business functions.
                </p>
                <p>
                  Our team of 18+ certified experts is dedicated to providing customized services that 
                  align with your business objectives, helping you stay ahead in a rapidly evolving 
                  digital world.
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 md:space-y-8 px-0 sm:px-4 md:px-6">
              <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Our Journey"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                <div className="absolute bottom-2 md:bottom-8 right-2 md:left-8 text-white">
                  {/* <p className="font-apfel2 text-2xl md:text-3xl ">Innovating for Tomorrow</p> */}
                  <p className="font-neuhas text-xs md:text-2xl">Innovating for Tomorrow</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[200px] overflow-hidden rounded-md">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop"
                    alt="Technology Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[200px] overflow-hidden rounded-md">
                  <Image
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"
                    alt="Innovation Excellence"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* COMPANY OVERVIEW */}
      <FadeInSection>
        <section className="py-16 sm:py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-gray-900 mb-8">
                  Who We Are
                </h2>

                <div className="space-y-8">
                  {[
                    {
                      title: "Technology Specialists",
                      description: "Leading technology consulting firm with expertise in AI, IoT, Cybersecurity, IT Infrastructure, Surveillance, and Telecommunications."
                    },
                    {
                      title: "Industry Certified",
                      description: "Our proven expertise is backed by globally recognized certifications, ensuring top-tier quality, security, and compliance in all solutions."
                    },
                    {
                      title: "Customer-First Approach",
                      description: "100+ successful projects, 18+ expert team members, and 98% client satisfaction rate delivering world-class technology solutions."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-apfel2 text-lg">
                          {(index + 1).toString().padStart(2, '0')}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-apfel2 text-xl mb-2 text-gray-900">{item.title}</h3>
                        <p className="font-neuhas text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                  <p className="font-neuhas text-gray-700 italic">
                    "We stand out by delivering not just services, but long-term value. Our customer-first 
                    approach, industry expertise, and commitment to innovation ensure that your business 
                    thrives in a rapidly evolving digital landscape."
                  </p>
                  <p className="font-apfel2 text-blue-800 mt-3">- SOLTECH Management</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative h-[280px] md:h-[440px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop"
                    alt="Technology Solutions"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-[200px] rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
                      alt="IT Infrastructure"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-[200px] rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
                      alt="Cyber Security"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* STATISTICS WITH ANIMATED COUNTERS */}
      <section className="bg-white py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <h2 className="text-center text-gray-900 font-apfel2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="md:border-r border-gray-200 last:border-r-0">
              <AnimatedCounter end={15} suffix="+" />
              <div className="text-gray-600 font-neuhas text-lg">Years of Excellence</div>
            </div>
            <div className="md:border-r border-gray-200 last:border-r-0">
              <AnimatedCounter end={18} suffix="+" />
              <div className="text-gray-600 font-neuhas text-lg">Expert Team Members</div>
            </div>
            <div className="md:border-r border-gray-200 last:border-r-0">
              <AnimatedCounter end={100} suffix="+" />
              <div className="text-gray-600 font-neuhas text-lg">Successful Projects</div>
            </div>
            <div>
              <AnimatedCounter end={98} suffix="%" />
              <div className="text-gray-600 font-neuhas text-lg">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION, MISSION & VALUES */}
      <FadeInSection>
        <section className="py-16 sm:py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 md:mb-16 mb-4">
              Vision, Mission & Values
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="font-apfel2 text-2xl md:text-3xl mb-4 text-blue-800">Our Vision</h3>
                  <p className="font-neuhas text-gray-700 text-[16px] md:text-[20px] leading-relaxed">
                    To be a global force in technology, empowering businesses, communities, and individuals 
                    with smart services and turning bold ideas into reality. We aim to set new standards 
                    in efficiency and customer satisfaction.
                  </p>
                </div>

                <div>
                  <h3 className="font-apfel2 text-2xl md:text-3xl mb-4 text-blue-800">Our Mission</h3>
                  <ul className="space-y-3">
                    {[
                      "Deliver cutting-edge tech services with top ROI",
                      "Provide rapid support and expert innovation",
                      "Empower businesses with smart, scalable solutions",
                      "Drive digital transformation across industries"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start font-neuhas text-gray-700 text-[16px] md:text-[18px]">
                        <Check className="w-5 h-5 text-blue-800 mr-3 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-apfel2 text-2xl md:text-3xl mb-4 text-blue-800">Our Core Values</h3>
                <div className="space-y-6">
                  {[
                    { icon: Check, title: "Innovation", desc: "Constantly pushing boundaries with cutting-edge technology solutions" },
                    { icon: Check, title: "Excellence", desc: "Quality-first approach backed by industry certifications and best practices" },
                    { icon: Check, title: "Security", desc: "Data privacy and protection in full compliance with global standards" },
                    { icon: Check, title: "Partnership", desc: "Building long-term relationships with clients as trusted technology partners" }
                  ].map((value, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <value.icon className="w-8 h-8 text-blue-800 flex-shrink-0 top-3 relative" />
                      <div>
                        <h4 className="font-apfel2 text-xl mb-1">{value.title}</h4>
                        <p className="font-neuhas text-gray-600">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CORE SERVICES */}
      <FadeInSection>
        <section className="bg-white py-16 sm:py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-gray-800 mb-6 sm:mb-16 md:mb-20">
              Our Services & Capabilities
            </h2>

            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {/* AI Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-12 items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-blue-800 mb-4">
                    AI (Artificial Intelligence)
                  </h3>
                  <p className="font-neuhas text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
                    Our AI services are designed to empower future-ready enterprises. From automation 
                    to deep data analysis, we deliver customized, scalable, and secure AI services 
                    that help clients innovate faster and make smarter decisions.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 font-neuhas">
                  {[
                    "Machine Learning Models",
                    "Natural Language Processing",
                    "Computer Vision",
                    "Predictive Analytics",
                    "Process Automation",
                    "AI Strategy Consulting"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                      <span className="text-blue-800 mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* IoT */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-12 items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-blue-800 mb-4">
                    IoT (Internet of Things)
                  </h3>
                  <p className="font-neuhas text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
                    Our IoT services empower businesses with smart, connected solutions that drive 
                    automation, efficiency, and real-time insights. We deliver scalable, secure 
                    IoT ecosystems tailored for modern enterprises.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 font-neuhas">
                  {[
                    "Smart Sensor Networks",
                    "Device Integration",
                    "Real-time Analytics",
                    "Edge Computing",
                    "Industrial IoT",
                    "Remote Monitoring"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                      <span className="text-blue-800 mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Cyber Security */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-12 items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-blue-800 mb-4">
                    Cyber Security
                  </h3>
                  <p className="font-neuhas text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
                    In a world of evolving threats, our cybersecurity services protect what matters 
                    most: your data, infrastructure, and reputation. We offer enterprise-grade 
                    security that detects, defends, and responds with precision.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 font-neuhas">
                  {[
                    "Threat Detection",
                    "Vulnerability Assessment",
                    "Security Audits",
                    "Incident Response",
                    "Data Protection",
                    "Compliance Management"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                      <span className="text-blue-800 mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* IT Infrastructure */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-12 items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-blue-800 mb-4">
                    IT Infrastructure
                  </h3>
                  <p className="font-neuhas text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
                    Our IT Infrastructure services support high-performance businesses with secure, 
                    scalable, and future-ready foundations. From cloud to on-premise, we ensure 
                    seamless operations and strategic growth.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 font-neuhas">
                  {[
                    "Cloud Solutions (AWS, Azure, GCP)",
                    "Network Design",
                    "Server Management",
                    "Disaster Recovery",
                    "Infrastructure Monitoring",
                    "Hybrid Cloud Setup"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                      <span className="text-blue-800 mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Surveillance & Industrial Automation */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-12 items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-blue-800 mb-4">
                    Surveillance & Automation
                  </h3>
                  <p className="font-neuhas text-gray-600 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
                    Advanced surveillance and industrial automation solutions that protect assets, 
                    ensure safety, and optimize manufacturing processes through smart technologies 
                    and real-time control systems.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 font-neuhas">
                  {[
                    "CCTV & Video Analytics",
                    "Access Control Systems",
                    "Industrial Automation",
                    "SCADA Systems",
                    "Smart Building Solutions",
                    "Remote Monitoring"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                      <span className="text-blue-800 mr-2 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* SERVICES & RESOURCES TABS */}
      <FadeInSection>
        <section className="py-16 sm:py-20 md:py-28" id="servicesandcapabilities">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 mb-4">
                Service Capabilities
              </h2>
              <p className="font-neuhas text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive technology solutions for every business need
              </p>
            </div>

            <ServicesTabs />
          </div>
        </section>
      </FadeInSection>

      {/* INDUSTRIES WE SERVE */}
    
      {/* CLIENT TESTIMONIALS */}
      {/* <FadeInSection>
        <section className="py-16 sm:py-20 md:py-28 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mb-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 mb-4">
                Client Testimonials
              </h2>
              <p className="font-neuhas text-xl text-gray-600 max-w-3xl mx-auto">
                We don't just deliver technology, we provide trust, innovation, and results
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

            <div className="flex overflow-hidden">
              <div className="flex animate-scroll hover:animation-pause">
                {[
                  {
                    client: "Plast India International University",
                    testimonial: "SOLTECH delivered exceptional tech solutions with professionalism and precision. Their support ensured smooth execution of our university project.",
                    designation: "Manan Sheth, Project Incharge"
                  },
                  {
                    client: "Abhshree Packaging Pvt. Ltd",
                    testimonial: "Complete and reliable tech services from SOLTECH have improved our operations. Their team is efficient, responsive, and highly skilled.",
                    designation: "Sachin Sonawane, Director"
                  },
                  {
                    client: "Swastik Productions Pvt. Ltd.",
                    testimonial: "SOLTECH's technology support has been outstanding. Their expertise helped streamline our infrastructure and boost productivity.",
                    designation: "Niraj Tiwari, General Manager"
                  },
                  {
                    client: "Leading Manufacturing Company",
                    testimonial: "Their IoT and automation solutions transformed our factory floor. Real-time monitoring and predictive maintenance saved us significant downtime.",
                    designation: "Operations Director"
                  },
                  {
                    client: "Healthcare Provider",
                    testimonial: "SOLTECH's cybersecurity implementation gave us peace of mind. Their 24/7 monitoring and quick incident response is exceptional.",
                    designation: "IT Manager"
                  },
                  {
                    client: "Retail Chain",
                    testimonial: "The AI-powered analytics solution helped us understand customer behavior better. Sales improved by 30% within 6 months.",
                    designation: "CEO"
                  }
                ].concat([
                  {
                    client: "Plast India International University",
                    testimonial: "SOLTECH delivered exceptional tech solutions with professionalism and precision. Their support ensured smooth execution of our university project.",
                    designation: "Manan Sheth, Project Incharge"
                  },
                  {
                    client: "Abhshree Packaging Pvt. Ltd",
                    testimonial: "Complete and reliable tech services from SOLTECH have improved our operations. Their team is efficient, responsive, and highly skilled.",
                    designation: "Sachin Sonawane, Director"
                  },
                  {
                    client: "Swastik Productions Pvt. Ltd.",
                    testimonial: "SOLTECH's technology support has been outstanding. Their expertise helped streamline our infrastructure and boost productivity.",
                    designation: "Niraj Tiwari, General Manager"
                  },
                  {
                    client: "Leading Manufacturing Company",
                    testimonial: "Their IoT and automation solutions transformed our factory floor. Real-time monitoring and predictive maintenance saved us significant downtime.",
                    designation: "Operations Director"
                  },
                  {
                    client: "Healthcare Provider",
                    testimonial: "SOLTECH's cybersecurity implementation gave us peace of mind. Their 24/7 monitoring and quick incident response is exceptional.",
                    designation: "IT Manager"
                  },
                  {
                    client: "Retail Chain",
                    testimonial: "The AI-powered analytics solution helped us understand customer behavior better. Sales improved by 30% within 6 months.",
                    designation: "CEO"
                  }
                ]).map((test, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[400px] mx-4">
                    <div className="bg-white rounded-lg p-6 h-full border border-gray-200">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-blue-800 fill-blue-600" />
                        ))}
                      </div>
                      <p className="font-neuhas text-gray-700 mb-4 italic text-[15px] leading-relaxed">
                        "{test.testimonial}"
                      </p>
                      <div className="border-t pt-4">
                        <p className="font-apfel2 text-lg text-gray-900">{test.client}</p>
                        <p className="font-neuhas text-sm text-gray-600">{test.designation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-scroll {
              animation: scroll 40s linear infinite;
            }

            .animation-pause:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>
      </FadeInSection> */}

      {/* CALL TO ACTION */}
     
    </>
  );
}