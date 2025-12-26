// components/Footer.tsx
"use client";

import { Linkedin, Facebook, Twitter, Youtube, Instagram, Phone, Mail, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

// ============ DATA MATCHING HEADER ============
const soltechVerticals = [
    { name: "BizAI Hacks", slug: "bizaihacks", url: "https://bizaihacks.com" },
    { name: "SOLTECH Nexus", slug: "soltechnexus", url: "https://soltechnexus.com" },
    { name: "SOLTECH 360 Ads", slug: "soltech360ads", url: "https://soltech360ads.com" },
];

const technologiesExpert = [
    { title: "Cloud Computing", slug: "cloud-computing" },
    { title: "Artificial Intelligence", slug: "artificial-intelligence" },
    { title: "Web Development", slug: "web-development" },
    { title: "IoT & Embedded Systems", slug: "iot-embedded" },
    { title: "AI & Automation", slug: "ai-automation" },
    { title: "Cyber Security", slug: "cyber-security" },
    { title: "Database & Analytics", slug: "database-analytics" },
];

const businessIndustries = [
    { title: "Retail Industry", slug: "retail" },
    { title: "Automobile Industry", slug: "automobile" },
    { title: "Healthcare & Wellness", slug: "healthcare" },
    { title: "Mining & Quarrying", slug: "mining" },
    { title: "Agriculture & Allied", slug: "agriculture" },
];

export function Footer() {
    const router = useRouter();
    const pathname = usePathname();
    const [email, setEmail] = useState("");
    const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setSubscribeStatus("loading");
        
        // Simulate API call - Replace with your actual newsletter API
        setTimeout(() => {
            setSubscribeStatus("success");
            setEmail("");
            setTimeout(() => setSubscribeStatus("idle"), 3000);
        }, 1000);
    };

    // ============ FOOTER LINKS (Matching Header) ============
    const footerLinks = {
        verticals: [
            { name: "All Verticals", href: "/verticals" },
            ...soltechVerticals.map((v) => ({ name: v.name, href: `/verticals/${v.slug}` })),
        ],
        technologies: [
            { name: "All Technologies", href: "/technologies" },
            ...technologiesExpert.map((t) => ({ name: t.title, href: `/technologies/${t.slug}` })),
        ],
        business: [
            { name: "All Industries", href: "/industries" },
            ...businessIndustries.map((b) => ({ name: b.title, href: `/industries/${b.slug}` })),
        ],
        company: [
            { name: "About Us", href: "/about-us" },
            { name: "Contact", href: "/contact" },
        ],
    };

    const legalLinks = [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms-of-use" },
        { name: "Cookie Policy", href: "/cookie-policy" },
    ];

    const socialLinks = [
        { icon: Linkedin, href: "https://www.linkedin.com/company/soltechtechservices/", name: "LinkedIn" },
        { icon: Facebook, href: "https://www.facebook.com/soltechtechservices/", name: "Facebook" },
        { icon: Twitter, href: "https://twitter.com/soltechtech", name: "Twitter" },
        { icon: Instagram, href: "https://www.instagram.com/soltechtechservices/", name: "Instagram" },
        { icon: Youtube, href: "https://www.youtube.com/@Soltechtechservices", name: "YouTube" },
    ];

    return (
        <footer className="bg-white border-t border-gray-200 overflow-hidden w-full">
            
            {/* ✅ NEWSLETTER SECTION */}
            <div className="bg-blue-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-white mb-3">
                                Stay Updated with SOLTECH
                            </h3>
                            <p className="text-blue-200 font-neuhas text-sm sm:text-base max-w-lg">
                                Subscribe to our newsletter for the latest technology insights, industry updates, and exclusive content delivered to your inbox.
                            </p>
                        </div>
                        <div>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 font-neuhas"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={subscribeStatus === "loading"}
                                    className="px-8 py-3.5 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition-colors font-neuhas flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {subscribeStatus === "loading" ? (
                                        <span>Subscribing...</span>
                                    ) : subscribeStatus === "success" ? (
                                        <span>Subscribed! ✓</span>
                                    ) : (
                                        <>
                                            Subscribe
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                            <p className="text-blue-300 text-xs mt-3 font-neuhas">
                                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ MAIN FOOTER CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                
                {/* TOP SECTION - Links Grid */}
                <div className="py-12 md:py-16 border-b border-gray-200">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">                  

                        {/* Technologies */}
                        <div className="w-full">
                            <h3 className="text-blue-800 font-bold text-lg md:text-xl leading-[30px] tracking-[0.5px] mb-4 md:mb-6 font-apfel2">
                                Technologies
                            </h3>
                            <ul className="space-y-2 md:space-y-3">
                                {footerLinks.technologies.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-800 transition-colors text-sm md:text-base leading-6 tracking-[0.0208px] font-neuhas font-normal block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

       {/* Verticals */}
                        <div className="w-full">
                            <h3 className="text-blue-800 font-bold text-lg md:text-xl leading-[30px] tracking-[0.5px] mb-4 md:mb-6 font-apfel2">
                                Verticals
                            </h3>
                            <ul className="space-y-2 md:space-y-3">
                                {footerLinks.verticals.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-800 transition-colors text-sm md:text-base leading-6 tracking-[0.0208px] font-neuhas font-normal block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Business / Industries */}
                        <div className="w-full">
                            <h3 className="text-blue-800 font-bold text-lg md:text-xl leading-[30px] tracking-[0.5px] mb-4 md:mb-6 font-apfel2">
                                Industries
                            </h3>
                            <ul className="space-y-2 md:space-y-3">
                                {footerLinks.business.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-800 transition-colors text-sm md:text-base leading-6 tracking-[0.0208px] font-neuhas font-normal block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                     

                        {/* External Websites */}
                        <div className="w-full">
                            <h3 className="text-blue-800 font-bold text-lg md:text-xl leading-[30px] tracking-[0.5px] mb-4 md:mb-6 font-apfel2">
                                Our Websites
                            </h3>
                            <ul className="space-y-2 md:space-y-3">
                                {soltechVerticals.map((vertical) => (
                                    <li key={vertical.name}>
                                        <a
                                            href={vertical.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-800 transition-colors text-sm md:text-base leading-6 tracking-[0.0208px] font-neuhas font-normal flex items-center gap-1.5"
                                        >
                                            {vertical.name}
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION - Contact & Info */}
                <div className="py-10 md:py-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">

                        {/* 1. Logo & Description */}
                        <div className="space-y-4 w-full lg:col-span-1">
                            <Link href="/">
                                <Image
                                    src="/icon1.png"
                                    alt="SOLTECH TechServices Logo"
                                    width={140}
                                    height={56}
                                    sizes="(max-width: 768px) 120px, 140px"
                                    className="mb-4"
                                />
                            </Link>
                            <p className="text-gray-600 text-sm font-neuhas leading-relaxed">
                                SOLTECH TechServices Pvt Ltd is a leading technology consulting company providing cutting-edge solutions in AI, IoT, Cloud, Cybersecurity, and Digital Transformation.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {socialLinks.map((social, idx) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={idx}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-50 text-blue-800 rounded-full p-2.5 hover:bg-blue-100 transition-colors flex items-center justify-center"
                                            aria-label={`Connect on ${social.name}`}
                                        >
                                            <IconComponent size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Contact Info */}
                        <div className="space-y-4 w-full">
                            <h4 className="text-blue-800 font-semibold text-lg font-apfel2">Contact Us</h4>
                            <div className="space-y-4">
                                <a
                                    href="tel:+917935703085"
                                    className="flex items-start gap-3 text-gray-600 hover:text-blue-800 transition-colors group"
                                >
                                    <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                        <Phone size={16} className="text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-neuhas">Phone</p>
                                        <span className="text-sm font-neuhas font-medium">+91 79357 03085</span>
                                    </div>
                                </a>

                                <a
                                    href="mailto:invester@soltechtechservices.com"
                                    className="flex items-start gap-3 text-gray-600 hover:text-blue-800 transition-colors group"
                                >
                                    <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                        <Mail size={16} className="text-blue-800" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-neuhas">Email</p>
                                        <span className="text-sm font-neuhas font-medium">invester@soltechtechservices.com</span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* 3. Address */}
                        <div className="space-y-4 w-full">
                            <h4 className="text-blue-800 font-semibold text-lg font-apfel2">Registered Office</h4>
                            <div className="flex items-start gap-3 text-gray-600">
                                <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin size={16} className="text-blue-800" />
                                </div>
                                <div className="text-sm font-neuhas">
                                    <p className="font-medium text-gray-800">Vibrant Park, Survey No. 182</p>
                                    <p>Near NH 8 GIDC Phase 1,</p>
                                    <p>Vapi, Gujarat - 396195</p>
                                    <p>India</p>
                                </div>
                            </div>
                        </div>

                        {/* 4. Legal Links */}
                        <div className="space-y-4 w-full">
                            <h4 className="text-blue-800 font-semibold text-lg font-apfel2">Legal</h4>
                            <ul className="space-y-2 md:space-y-3">
                                {legalLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-blue-800 transition-colors text-sm leading-6 tracking-[0.0208px] font-neuhas font-normal block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            
                        </div>

                    </div>
                </div>

                {/* COPYRIGHT BAR */}
                <div className="border-t border-gray-200 w-full">
                    <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-sm text-gray-500 font-neuhas order-2 md:order-1 text-center md:text-left">
                            © 2025 SOLTECH TechServices Pvt Ltd. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-4 order-1 md:order-2">
                            <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-800 font-neuhas transition-colors">
                                Privacy
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/terms-of-use" className="text-sm text-gray-500 hover:text-blue-800 font-neuhas transition-colors">
                                Terms
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link href="/contact" className="text-sm text-gray-500 hover:text-blue-800 font-neuhas transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;