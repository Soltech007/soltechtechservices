// app/terms/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function CtaButton({
    href,
    children,
    variant = "default",
}: {
    href: string;
    children: React.ReactNode;
    variant?: "default" | "download";
}) {
    const icon =
        variant === "download" ? (
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        );

    return (
        <Link
            href={href}
            className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "px-4 sm:px-5 md:px-6 py-2 sm:py-2.5",
                "text-sm sm:text-[20px] font-semibold text-blue-800 font-neuhas",
                "transition-all duration-500 ease-out mt-3",
                "min-h-[44px] sm:min-h-[48px]",
                "w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0"
            )}
        >
            {/* Background animation — fills blue on hover */}
            <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center md:justify-start">
                {/* Left blue icon bubble (collapses on hover) */}
                <span
                    className="flex items-center justify-center rounded-full bg-blue-800 text-white transition-all duration-500 
                     group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 
                     h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                >
                    {icon}
                </span>

                {/* Text */}
                <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white">
                    {children}
                </span>

                {/* Right arrow fades in on hover */}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
            </span>
        </Link>
    );
}

export default function TermsOfUsePage() {
    return (
        <>
            {/* HERO SECTION */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] py-12 flex items-center">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000"
                        alt="Terms of Use hero"
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
                            Terms of Use
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
                            TERMS OF USE
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
                                These Terms of Use ("Terms") govern your access to and use of the websites operated by SOLTECH TechServices Pvt Ltd – including its affiliates, divisions, business units, and subsidiaries (collectively, "SOLTECH", "we", "us", or "our").
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                If you do not agree with the terms or have any questions, contact us before proceeding and we will be pleased to assist you. By choosing to access and use this site, you are expressly agreeing to be bound by these terms.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                Please read these terms carefully before using our website. Your use of this site constitutes acceptance of these terms.
                            </p>
                        </div>

                        {/* License and Site Access */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                License and Site Access
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                SOLTECH or third parties granting rights to SOLTECH hold title to the materials on this site, which are the copyrighted work of SOLTECH or such third parties. SOLTECH grants you a limited license to access and make personal, noncommercial use of this site, including the right to download and make a single electronic or hard copy of limited portions (including text, photos, videos, and graphics), provided that the SOLTECH copyright is acknowledged on each page copied. However, you may not modify it or any portion of it.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                This license does not include:
                            </p>
                            <ul className="space-y-3 list-disc list-outside ml-5 mb-4">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Any commercial use of this site or its contents other than our e-commerce services
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Any collection and use of any product listings, descriptions, or prices
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Any derivative use of this site or its contents
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    Any use of data mining, robots, or similar data gathering and extraction tools
                                </li>
                            </ul>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                Neither this Web site nor any portion thereof may be reproduced, duplicated, copied, sold, or otherwise exploited for any commercial purpose. You may not frame or use framing techniques to enclose any portion of this site. You may not use meta tags or any other hidden text using SOLTECH's name or trademarks. Any unauthorized use terminates the license to use granted herein.
                            </p>
                        </div>

                        {/* Acceptable Use */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Acceptable Use
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                You agree to use our website only for lawful purposes. You must not use our site:
                            </p>
                            <ul className="space-y-3 list-disc list-outside ml-5">
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    In any way that breaches any applicable local, national, or international law or regulation
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    In any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material
                                </li>
                                <li className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] pl-2">
                                    To knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, or any other harmful programs
                                </li>
                            </ul>
                        </div>

                        {/* Changes to Site */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Changes to Site
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                In order to improve our service to you, we reserve the right to make changes in the access, operation, and content of this site at any time without notice. We also reserve the right to make changes in the Terms and the Privacy Policy, so please check before each use for changes.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Intellectual Property Rights
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of SOLTECH TechServices or its content suppliers and is protected by Indian and international copyright laws.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                The trademarks, logos, and service marks displayed on the site are registered and unregistered marks of SOLTECH and others. Nothing on this site should be construed as granting any license or right to use any trademark without our prior written permission.
                            </p>
                        </div>

                        {/* Confidential Information */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Confidential Information
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                SOLTECH discourages you from sending or posting to the site materials or information that you consider to be confidential or proprietary. Please note that if you do send such information, SOLTECH will assume that it is not confidential. By sending or posting such information or material, you grant SOLTECH an unrestricted license to use, reproduce, and distribute those materials or information, and you agree that SOLTECH may use any ideas, concepts, know-how or techniques that you send or post for any purpose.
                            </p>
                        </div>

                        {/* No Warranties */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Disclaimer of Warranties
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                The information on this site is provided for general information purposes only. While SOLTECH strives to provide only accurate information on this Web site, you may discover some inadvertent inaccuracies in the information provided.
                            </p>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] font-semibold">
                                SOLTECH MAKES NO GUARANTEES, WARRANTIES, OR REPRESENTATIONS CONCERNING THE ACCURACY, RELIABILITY, FITNESS FOR ANY PARTICULAR PURPOSE, OR COMPLETENESS OF ANY INFORMATION ON THIS SITE. WE ARE PROVIDING THE INFORMATION ON AN "AS IS, WHERE IS" BASIS, AND ALL WARRANTIES (EXPRESS OR IMPLIED) ARE DISCLAIMED.
                            </p>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Limitation of Liability
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                To the fullest extent permitted by law, SOLTECH shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the site.
                            </p>
                        </div>

                        {/* Links to Other Sites */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Links to Other Sites
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                As a convenience, this Web site may contain links to other sites that are not controlled by, or affiliated or associated with, SOLTECH. Accordingly, SOLTECH does not make any representations concerning the privacy practices or terms of use of such sites, nor does SOLTECH control or guarantee the accuracy, integrity, or quality of the information and materials available on such sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.
                            </p>
                        </div>

                        {/* Indemnification */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Indemnification
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                You agree to indemnify, defend, and hold harmless SOLTECH, its officers, directors, employees, agents, and third parties, for any losses, costs, liabilities, and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the site, any user postings made by you, your violation of any terms of this Agreement, or your violation of any rights of a third party.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Governing Law
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in Gujarat, India.
                            </p>
                        </div>

                        {/* Severability */}
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-4 sm:mb-6">
                                Severability
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, such invalidity shall not affect the validity of the remaining provisions, which shall remain in full force and effect.
                            </p>
                        </div>

                        {/* Contact Us */}
                        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-blue-50 rounded-2xl border border-blue-100">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-blue-800 mb-4 sm:mb-6">
                                Questions or Concerns?
                            </h2>
                            <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px] mb-4">
                                If you have any questions about these Terms of Use or need assistance, please contact us:
                            </p>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <p className="font-semibold text-gray-900 font-apfel2 mb-1">Email:</p>
                                    <a href="mailto:legal@soltechtechservices.com" className="text-blue-800 hover:underline font-neuhas">
                                        legal@soltechtechservices.com
                                    </a>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 font-apfel2 mb-1">Phone:</p>
                                    <a href="tel:+917935703085" className="text-blue-800 hover:underline font-neuhas">
                                        +91 79357 03085
                                    </a>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="font-semibold text-gray-900 font-apfel2 mb-2">Registered Office:</p>
                                <p className="text-[15px] sm:text-[16px] md:text-[18px] font-neuhas text-gray-700 leading-[1.6] sm:leading-[1.7] md:leading-[28px]">
                                    SOLTECH TechServices Pvt Ltd<br />
                                    Vibrant Park, Survey No. 182<br />
                                    Near NH 8 GIDC Phase 1<br />
                                    Vapi, Gujarat - 396195<br />
                                    India
                                </p>
                            </div>

                            <CtaButton href="/contact">
                                Contact Us
                            </CtaButton>
                        </div>

                        {/* Subsidiaries Note */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-sm text-gray-600 font-neuhas text-center">
                                These Terms of Use also apply to our subsidiaries: <strong>BizAI Hacks</strong>, <strong>SOLTECH Nexus</strong>, and <strong>SOLTECH 360 Ads</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}