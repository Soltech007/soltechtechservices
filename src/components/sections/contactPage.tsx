// app/contact/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Building2, Globe, Users, Award, Briefcase, ArrowRight, Linkedin, Twitter, Facebook, Youtube, Instagram } from 'lucide-react';
import ContactForm from '@/components/sections/contact-form';

export default function ContactPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="font-apfel2 relative min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[78vh] flex items-center py-12">
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
                        alt="Contact SOLTECH TechServices"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/85 to-blue-900/80" />
                </div>

                {/* Foreground content */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mt-10">
                    <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl text-white">
                        <p
                            className="font-neuhas text-blue-300 font-thin tracking-widest mb-2 
                            text-sm sm:text-base md:text-[16px] uppercase animate-slideInLeft"
                            style={{ animationDelay: "0.9s" }}
                        >
                            Get in Touch
                        </p>

                        <h1
                            className="text-white font-normal font-apfel2 mb-4 md:mb-6
                            text-[clamp(2.2rem,6vw,6rem)] leading-[1.05]
                            [text-wrap:balance] animate-slideInLeft"
                            style={{ animationDelay: '0.7s' }}
                        >
                            Let's Build Your Digital Future
                        </h1>

                        <p
                            className="font-neuhas text-[15px] sm:text-[16px] md:text-[24px]
                            leading-[1.6] md:leading-[36px] font-medium
                            text-white/85 sm:text-white/90 md:max-w-3xl animate-slideInLeft"
                            style={{ animationDelay: '0.3s' }}
                        >
                            Partner with SOLTECH TechServices for your technology transformation. From AI and Cloud to Cybersecurity and IoT, we deliver innovative solutions tailored to your business needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-3 sm:py-4">
                    <nav className="flex items-center text-xs sm:text-sm text-gray-600 font-neuhas tracking-wider">
                        <Link href="/" className="hover:text-blue-800 transition-colors">HOME</Link>
                        <span className="mx-1.5 sm:mx-2">/</span>
                        <span className="text-blue-800 font-semibold uppercase">CONTACT</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                        
                        {/* Contact Form - Left Side (3 columns) */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 font-normal text-gray-900 mb-2">
                                    Send Us Your Project Inquiry
                                </h2>
                                <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-[28px] font-neuhas text-gray-600 mb-8">
                                    Whether it's AI implementation, cloud migration, cybersecurity, or digital transformation - share your requirements and our experts will respond within 24 hours.
                                </p>
                                <ContactForm />
                            </div>
                        </div>

                        {/* Contact Info - Right Side (2 columns) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Main Contact Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-apfel2 font-normal text-gray-900 mb-6 flex items-center">
                                    <Building2 className="h-6 w-6 text-blue-800 mr-3" />
                                    Registered Office
                                </h3>

                                <div className="space-y-5">
                                    {/* Address */}
                                    <div className="flex items-start group">
                                        <MapPin className="h-5 w-5 text-blue-800 mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-900 font-neuhas">SOLTECH TechServices Pvt Ltd</p>
                                            <p className="text-sm sm:text-base font-neuhas text-gray-600 mt-1">
                                                Vibrant Park, Survey No. 182<br />
                                                Near NH 8 GIDC Phase 1<br />
                                                Vapi, Gujarat - 396195, India
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start group">
                                        <Phone className="h-5 w-5 text-blue-800 mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-900 mb-1 font-neuhas">Call Us</p>
                                            <a href="tel:+917935703085" className="text-sm sm:text-base font-neuhas text-gray-600 hover:text-blue-800 transition-colors">
                                                +91 79357 03085
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start group">
                                        <Mail className="h-5 w-5 text-blue-800 mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-900 mb-1 font-neuhas">Email Us</p>
                                            <div className="space-y-1">
                                                <a href="mailto:info@soltechtechservices.com" className="text-sm sm:text-base font-neuhas text-gray-600 hover:text-blue-800 transition-colors block">
                                                    info@soltechtechservices.com
                                                </a>
                                                <a href="mailto:sales@soltechtechservices.com" className="text-sm font-neuhas text-gray-500 hover:text-blue-800 transition-colors block">
                                                    sales@soltechtechservices.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    {/* <div className="flex items-start group">
                                        <Clock className="h-5 w-5 text-blue-800 mt-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-gray-900 mb-1 font-neuhas">Working Hours</p>
                                            <p className="text-sm sm:text-base font-neuhas text-gray-600">
                                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                Saturday: 9:00 AM - 2:00 PM<br />
                                                <span className="text-xs text-gray-500">24/7 Support for Enterprise Clients</span>
                                            </p>
                                        </div>
                                    </div> */}
                                </div>

                                {/* Quick Stats */}
                                {/* <div className="mt-8 pt-8 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-blue-800 font-apfel2">15+</div>
                                            <div className="text-xs text-gray-600 font-neuhas">Years</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-blue-800 font-apfel2">500+</div>
                                            <div className="text-xs text-gray-600 font-neuhas">Projects</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-blue-800 font-apfel2">50+</div>
                                            <div className="text-xs text-gray-600 font-neuhas">Partners</div>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Our Verticals */}
                                <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center font-neuhas">
                                            <Briefcase className="h-4 w-4 text-blue-800 mr-2" />
                                            Our Verticals
                                        </h4>
                                        <div className="space-y-2 ml-6">
                                            <a href="https://bizaihacks.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm font-neuhas hover:text-blue-800 transition-colors flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-blue-800 rounded-full"></span>
                                                BizAI Hacks - AI Solutions
                                            </a>
                                            <a href="https://soltechnexus.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm font-neuhas hover:text-blue-800 transition-colors flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-blue-800 rounded-full"></span>
                                                SOLTECH Nexus - Digital Transformation
                                            </a>
                                            <a href="https://soltech360ads.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm font-neuhas hover:text-blue-800 transition-colors flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-blue-800 rounded-full"></span>
                                                SOLTECH 360 Ads - Digital Marketing
                                            </a>
                                        </div>
                                    </div>

                                   
                                </div>

                                {/* Technology Partners */}
                                

                                {/* Social Links */}
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h4 className="font-semibold text-gray-900 mb-3 font-neuhas">Connect With Us</h4>
                                    <div className="flex gap-3">
                                        <a href="https://www.linkedin.com/company/soltechtechservices/s" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                                            <Linkedin className="w-5 h-5 text-blue-800" />
                                        </a>
                                        <a href="https://x.com/soltechtech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                                            <Twitter className="w-5 h-5 text-blue-800" />
                                        </a>
                                        <a href="https://facebook.com/soltechtechservices" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                                            <Facebook className="w-5 h-5 text-blue-800" />
                                        </a>
                                        <a href="https://www.youtube.com/@Soltechtechservices" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                                            <Youtube className="w-5 h-5 text-blue-800" />
                                        </a>
                                        <a href="https://www.instagram.com/soltechtechservices/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                                            <Instagram className="w-5 h-5 text-blue-800" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        

            {/* Map Section */}
         

            {/* CTA Section */}
         

         
        </>
    );
}