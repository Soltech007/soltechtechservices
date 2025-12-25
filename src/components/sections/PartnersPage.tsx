// components/sections/PartnersPage.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Complete Partners Data
const allPartners = [
  { id: 1, name: "2N", logo: "/logos/2N.png", alt: "2N brand logo" },

  { id: 2, name: "APC", logo: "/logos/apc.png", alt: "APC brand logo" },
  { id: 3, name: "Aruba", logo: "/logos/aruba.png", alt: "Aruba Networks logo" },
  { id: 4, name: "Asterick", logo: "/logos/Asterick.png", alt: "Asterisk communication logo" },
  { id: 5, name: "Avaya", logo: "/logos/avaya.png", alt: "Avaya communication systems logo" },

  { id: 6, name: "Beetal", logo: "/logos/beetal.png", alt: "Beetal telecom devices logo" },
  { id: 7, name: "Biomax", logo: "/logos/biomax.png", alt: "Biomax biometric solutions logo" },
  { id: 8, name: "Bosch", logo: "/logos/bosch.png", alt: "Bosch technology solutions logo" },
  { id: 9, name: "Brevo", logo: "/logos/brevo.png", alt: "Brevo business solutions logo" },
  { id: 10, name: "Busy", logo: "/logos/busy.png", alt: "Busy accounting software logo" },

  { id: 11, name: "Cambium Netwoks", logo: "/logos/cambium netwoks.png", alt: "Cambium Networks logo" },
  { id: 12, name: "Cisco", logo: "/logos/cisco.png", alt: "Cisco networking solutions logo" },
  { id: 13, name: "Crestron", logo: "/logos/crestron.png", alt: "Crestron automation systems logo" },
  { id: 14, name: "Cyber Data", logo: "/logos/Cyber data.png", alt: "Cyber Data communication devices logo" },

  { id: 15, name: "D-Link", logo: "/logos/d-link.png", alt: "D-Link networking equipment logo" },

  { id: 16, name: "Eocortex", logo: "/logos/eocortex.png", alt: "Eocortex video analytics logo" },
  { id: 17, name: "ERPNext", logo: "/logos/erpnext.png", alt: "ERPNext enterprise software logo" },

  { id: 18, name: "Fortinet", logo: "/logos/fortinet.png", alt: "Fortinet cybersecurity solutions logo" },

  { id: 19, name: "Guardian Telecom", logo: "/logos/guardian telecom.png", alt: "Guardian Telecom industrial phones logo" },
  { id: 20, name: "Grandstre", logo: "/logos/granstre.png", alt: "Grandstream communication solutions logo" },

  { id: 21, name: "Honeywell", logo: "/logos/honeywell.png", alt: "Honeywell industrial technology logo" },
  { id: 22, name: "HP", logo: "/logos/hp.png", alt: "HP enterprise technology logo" },
  { id: 23, name: "IBM", logo: "/logos/ibm.png", alt: "IBM enterprise solutions logo" },
  { id: 24, name: "Intel", logo: "/logos/interl.png", alt: "Intel processor technology logo" },

  { id: 25, name: "Jio", logo: "/logos/jio.png", alt: "Jio digital services logo" },

  { id: 26, name: "LG", logo: "/logos/lg.png", alt: "LG electronics logo" },

  { id: 27, name: "NEC", logo: "/logos/nec.png", alt: "NEC communication solutions logo" },
  { id: 28, name: "Netgaer", logo: "/logos/netgaer.png", alt: "Netgear networking solutions logo" },
  { id: 29, name: "Network Enclousers", logo: "/logos/network enclousers.png", alt: "Network enclosures solutions logo" },
  { id: 30, name: "Newline", logo: "/logos/newline.png", alt: "Newline interactive display solutions logo" },

  { id: 31, name: "Panasonic", logo: "/logos/panasonic.png", alt: "Panasonic electronics logo" },
  { id: 32, name: "PeopleLink", logo: "/logos/peopleLink.png", alt: "PeopleLink collaboration solutions logo" },
  { id: 33, name: "Poly", logo: "/logos/poly.png", alt: "Poly communication devices logo" },
  { id: 34, name: "Quantum", logo: "/logos/quantum.png", alt: "Quantum data storage solutions logo" },
  { id: 35, name: "Ruckus Commscope", logo: "/logos/ruckus commscope.png", alt: "Ruckus Commscope networking logo" },

  { id: 36, name: "Samsung", logo: "/logos/samsung.png", alt: "Samsung electronics logo" },
  { id: 37, name: "Siemens", logo: "/logos/siemens.png", alt: "Siemens industrial automation logo" },
  { id: 38, name: "SmartOffice", logo: "/logos/SmartOffice.png", alt: "SmartOffice workplace solutions logo" },
  { id: 39, name: "Snom", logo: "/logos/snom.png", alt: "Snom IP phone solutions logo" },
  { id: 40, name: "SonicWall", logo: "/logos/sonicwall.png", alt: "SonicWall network security logo" },
  {
    id: 41,
    name: "Sophes Cybersecurity as a Service",
    logo: "/logos/sophes cybersecurity as a Service.png",
    alt: "Sophes cybersecurity as a service logo",
  },
  { id: 42, name: "Syntel", logo: "/logos/syntel.png", alt: "Syntel IT services logo" },
  { id: 43, name: "Systimax Solutions", logo: "/logos/systimax solutions.png", alt: "Systimax structured cabling solutions logo" },

  { id: 44, name: "Tally", logo: "/logos/tally.png", alt: "Tally accounting software logo" },
  { id: 45, name: "Tonmind", logo: "/logos/tonmind.png", alt: "Tonmind IP paging solutions logo" },
  { id: 46, name: "TP-Link", logo: "/logos/tp-link.png", alt: "TP-Link networking products logo" },

  { id: 47, name: "Ubiquiti Networks", logo: "/logos/ubiquiti networks.png", alt: "Ubiquiti Networks wireless solutions logo" },
  { id: 48, name: "Uniview", logo: "/logos/uniview.png", alt: "Uniview video surveillance solutions logo" },

  { id: 49, name: "Vertiv", logo: "/logos/vertiv.png", alt: "Vertiv data center infrastructure logo" },
  { id: 50, name: "VI", logo: "/logos/vi.png", alt: "Vodafone Idea telecom logo" },
  { id: 51, name: "VMware", logo: "/logos/vmvare.png", alt: "VMware virtualization solutions logo" },

  { id: 52, name: "Wi-Tek", logo: "/logos/wi-tek.png", alt: "Wi-Tek networking solutions logo" },
  { id: 53, name: "Yeaster", logo: "/logos/Yeaster.png", alt: "Yeastar IP PBX solutions logo" },
  { id: 54, name: "Zoho", logo: "/logos/zoho.png", alt: "Zoho business software logo" },
];


export default function PartnersPageClient() {
    return (
        <>
            {/* ✅ HERO SECTION */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-center py-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                        backgroundSize: "40px 40px"
                    }} />
                </div>
                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 mt-10 w-full">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <p className="font-neuhas text-blue-300 font-medium tracking-widest mb-3 text-sm sm:text-base uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}>
                            OUR TECHNOLOGY ECOSYSTEM
                        </p>

                        <h1 className="text-white font-normal font-apfel2 mb-6 text-[clamp(2.2rem,6vw,5rem)] leading-[1.1] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}>
                            Trusted Technology Partners
                        </h1>

                        <p className="font-neuhas text-[16px] sm:text-[18px] md:text-[22px] leading-[1.6] font-medium text-white/85 max-w-3xl mx-auto animate-slideInLeft"
                            style={{ animationDelay: '0.5s' }}>
                            We collaborate with 50+ world-leading technology companies to deliver comprehensive, best-in-class solutions for our clients.
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
                        <span className="text-blue-800 font-semibold uppercase">PARTNERS</span>
                    </nav>
                </div>
            </div>            

            {/* ✅ PARTNERS GRID */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allPartners.map((partner) => (
                            <a
                                key={partner.id}
                        
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                            >
                                {/* Partner Level Badge */}
                                

                                {/* Logo */}
                                <div className="relative w-full h-16 mb-4">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=1e40af&color=fff&size=128&font-size=0.33`;
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ✅ WHY PARTNER SECTION */}
            <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl font-normal text-blue-800 mb-4">
                            Why We Partner with the Best
                        </h2>
                        <p className="text-gray-600 font-neuhas max-w-2xl mx-auto">
                            Our strategic partnerships enable us to deliver comprehensive, cutting-edge solutions that drive real business value.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Certified Expertise",
                                description: "Our team holds certifications across all partner technologies, ensuring expert-level implementation.",
                                icon: "🎓"
                            },
                            {
                                title: "Priority Support",
                                description: "Partner status gives us direct access to vendor support teams for faster issue resolution.",
                                icon: "🚀"
                            },
                            {
                                title: "Best Pricing",
                                description: "Strong partnerships allow us to offer competitive pricing on hardware and software.",
                                icon: "💰"
                            },
                            {
                                title: "Latest Technology",
                                description: "Early access to new products and features keeps our clients ahead of the curve.",
                                icon: "⚡"
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-semibold text-gray-900 text-lg font-apfel2 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm font-neuhas">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

          
        </>
    );
}