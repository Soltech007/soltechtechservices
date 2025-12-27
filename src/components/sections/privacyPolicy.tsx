// app/privacy/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <>
            {/* HERO SECTION */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] py-12 flex items-center">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000"
                        alt="Privacy Policy hero"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/85 to-blue-900/80" />
                </div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mt-10">
                    <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl text-white">
                        <p
                            className="font-neuhas text-blue-300 font-thin tracking-widest mb-2 
                            text-sm sm:text-base md:text-[16px] uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}
                        >
                            LEGAL & COMPLIANCE
                        </p>

                        <h1
                            className="text-white font-normal font-apfel2 mb-4 md:mb-6
                            text-[clamp(2.2rem,6vw,6rem)] leading-[1.05]
                            [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}
                        >
                            Privacy Policy
                        </h1>

                        <p
                            className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px]
                            leading-[1.6] md:leading-[36px] font-medium
                            text-white/85 sm:text-white/90 md:max-w-3xl animate-slideInLeft"
                            style={{ animationDelay: '0.3s' }}
                        >
                            Last Updated: January 1, 2025
                        </p>
                    </div>
                </div>
            </section>

            {/* BREADCRUMB */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-3 sm:py-4">
                    <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
                        <Link href="/" className="hover:text-blue-800">
                            HOME
                        </Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <span className="text-blue-800 font-semibold uppercase">
                            PRIVACY POLICY
                        </span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <section className="bg-white py-10 sm:py-14 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                    <div className="max-w-4xl mx-auto">
                        
                        {/* Introduction */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Introduction
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                This website is operated by SOLTECH TechServices Pvt Ltd – including its affiliates, divisions, business units, and subsidiaries (collectively, "SOLTECH", "we", "us", or "our").
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                This privacy policy applies to personal information SOLTECH may collect about you through its websites (including soltechtechservices.com, bizaihacks.com, soltechnexus.com, soltech360ads.com), mobile applications, or other online media under its operation and control (collectively, the "Site") and to other information we may collect about you in the course of our business.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                SOLTECH TechServices recognizes and respects the privacy of the individuals whose personal information it collects, uses, and otherwise processes in the course of its business. We are committed to protecting your privacy and ensuring the security of your personal data.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                By using our Site or services, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy.
                            </p>
                        </div>

                        {/* Categories of Personal Information */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Categories of Personal Information We Collect
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                We may collect the following categories of personal information:
                            </p>
                            <ul className="space-y-3 list-disc list-outside ml-5">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Identifiers.</strong> Name, email address, phone number, postal address, company name, job title, IP address, and other similar identifiers.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Contact Information.</strong> Business email, phone numbers, and physical address for business correspondence.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Internet/Network Information.</strong> Browsing history, search history, device information, browser type, and information regarding your interaction with the Site.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Professional Information.</strong> Company details, industry, job function, and professional interests relevant to our services.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Communication Data.</strong> Records of correspondence with us, including emails, contact form submissions, and chat logs.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Transaction Data.</strong> Details about services you have inquired about or purchased from us.
                                </li>
                            </ul>
                        </div>

                        {/* Sources of Personal Information */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                How We Collect Your Information
                            </h2>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-3 sm:mb-4">
                                Information You Provide Directly
                            </h3>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-6">
                                We collect personal information when you voluntarily provide it to us, including:
                            </p>
                            <ul className="space-y-2 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Filling out contact forms or requesting a consultation
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Subscribing to our newsletter or marketing communications
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Attending our events, webinars, or training programs
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Engaging with us for technology consulting or project discussions
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Providing feedback or testimonials
                                </li>
                            </ul>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-3 sm:mb-4">
                                Information Collected Automatically
                            </h3>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                When you visit our Site, we automatically collect certain information through cookies and similar technologies:
                            </p>
                            <ul className="space-y-3 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Log Data:</strong> IP addresses, browser type, operating system, referring URLs, pages viewed, and timestamps.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Device Information:</strong> Device type, screen resolution, and unique device identifiers.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Analytics Data:</strong> We use Google Analytics and similar tools to understand how visitors interact with our Site. This helps us improve user experience and content relevance.
                                </li>
                            </ul>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-3 sm:mb-4">
                                Information from Third Parties
                            </h3>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                We may receive information about you from our business partners, technology partners (such as Microsoft, AWS, Cisco, etc.), and publicly available sources such as LinkedIn or company websites for business development purposes.
                            </p>
                        </div>

                        {/* Use of Your Personal Information */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                How We Use Your Information
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                We use the information we collect for the following purposes:
                            </p>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-3 sm:mb-4">
                                Service Delivery
                            </h3>
                            <ul className="space-y-2 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Responding to your inquiries and consultation requests
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Providing technology consulting and implementation services
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Managing projects and client relationships
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Sending service-related communications and updates
                                </li>
                            </ul>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-3 sm:mb-4">
                                Marketing & Communications
                            </h3>
                            <ul className="space-y-2 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Sending newsletters, industry insights, and technology updates
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Informing you about our services, events, and webinars
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Personalizing content and recommendations based on your interests
                                </li>
                            </ul>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-3 sm:mb-4">
                                Website Improvement
                            </h3>
                            <ul className="space-y-2 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Analyzing website traffic and user behavior
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Improving website functionality and user experience
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Debugging and troubleshooting technical issues
                                </li>
                            </ul>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-3 sm:mb-4">
                                Legal & Security
                            </h3>
                            <ul className="space-y-2 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Complying with legal obligations and regulatory requirements
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Protecting against fraud, unauthorized access, and security threats
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Exercising and defending our legal rights
                                </li>
                            </ul>
                        </div>

                        {/* Data Sharing */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                How We Share Your Information
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                <strong>SOLTECH does not sell, trade, or rent your personal information to third parties.</strong> We may share your information only in the following circumstances:
                            </p>
                            <ul className="space-y-3 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our business (hosting, analytics, email services) under strict confidentiality agreements.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Technology Partners:</strong> With our certified technology partners (Microsoft, AWS, Cisco, etc.) when required for service delivery.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Affiliates:</strong> With our subsidiaries including BizAI Hacks, SOLTECH Nexus, and SOLTECH 360 Ads for integrated service delivery.
                                </li>
                            </ul>
                        </div>

                        {/* Cookies */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Cookies and Tracking Technologies
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                Our Site uses cookies and similar tracking technologies to enhance your browsing experience. These include:
                            </p>
                            <ul className="space-y-3 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Essential Cookies:</strong> Required for basic site functionality.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Site (Google Analytics).
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign performance.
                                </li>
                            </ul>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                You can manage your cookie preferences through your browser settings. Note that disabling certain cookies may affect site functionality.
                            </p>
                        </div>

                        {/* Data Security */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Data Security
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                SOLTECH implements industry-standard security measures to protect your personal information, including:
                            </p>
                            <ul className="space-y-2 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    SSL/TLS encryption for data transmission
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Secure cloud infrastructure with regular security audits
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Access controls and authentication protocols
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Regular employee training on data protection
                                </li>
                            </ul>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                While we strive to protect your information, no method of transmission over the Internet is 100% secure. We encourage you to take precautions when sharing personal information online.
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Your Rights
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="space-y-2 list-disc list-outside ml-5 mb-6">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Access:</strong> Request a copy of the personal information we hold about you.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements).
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    <strong>Data Portability:</strong> Request your data in a machine-readable format.
                                </li>
                            </ul>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                To exercise any of these rights, please contact us using the information provided below.
                            </p>
                        </div>

                        {/* Data Retention */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Data Retention
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. When personal information is no longer required, we securely delete or anonymize it.
                            </p>
                        </div>

                        {/* Third-Party Links */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Third-Party Links
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                Our Site may contain links to third-party websites, including our technology partners' websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                            </p>
                        </div>

                        {/* Children's Privacy */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Children's Privacy
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                Our services are intended for businesses and professionals. We do not knowingly collect personal information from children under 18. If you believe we have inadvertently collected information from a minor, please contact us immediately.
                            </p>
                        </div>

                        {/* Updates to Policy */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Updates to This Policy
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.
                            </p>
                        </div>

                        {/* Contact Us */}
                        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-blue-50 rounded-2xl border border-blue-100">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-blue-800 mb-4 sm:mb-6">
                                Contact Us
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                            </p>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="font-semibold text-gray-900 font-apfel2 mb-1">Email:</p>
                                    <a href="mailto:privacy@soltechtechservices.com" className="text-blue-800 hover:underline font-neuhas">
                                        privacy@soltechtechservices.com
                                    </a>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 font-apfel2 mb-1">Phone:</p>
                                    <a href="tel:+917935703085" className="text-blue-800 hover:underline font-neuhas">
                                        +91 97237 23322
                                    </a>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-900 font-apfel2 mb-2">Registered Office:</p>
                                <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                    SOLTECH TechServices Pvt Ltd<br />
                                    Vibrant Park, Survey No. 182<br />
                                    Near NH 8 GIDC Phase 1<br />
                                    Vapi, Gujarat - 396195<br />
                                    India
                                </p>
                            </div>
                        </div>

                        {/* Subsidiaries Note */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-sm text-gray-600 font-neuhas text-center">
                                This Privacy Policy also applies to our subsidiaries: <strong>BizAI Hacks</strong>, <strong>SOLTECH Nexus</strong>, and <strong>SOLTECH 360 Ads</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}