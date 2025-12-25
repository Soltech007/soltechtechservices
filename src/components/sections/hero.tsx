'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, TrendingUp, Users, Globe, Award } from 'lucide-react';



export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="SOLTECH Technology Background"
        fill
        priority
        className="object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      
      <div className="relative z-10 h-full flex flex-col justify-center min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
          
          {/* Main Content - Centered */}
          <div className="max-w-5xl mx-auto text-center pt-20 sm:pt-24 lg:pt-[190px]">
            
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-white/10 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium font-neuhas">
                Building India's Technology Future
              </span>
            </div> */}

            {/* Main Heading */}
            <h1 className="font-apfel2 text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[84px]
                         leading-[1.1] font-normal mb-6 sm:mb-8
                         text-white tracking-tight">
              Powering Businesses with
              <br className="hidden sm:block" />
              <span className="text-blue-800"> Intelligent Technology</span>
            </h1>

            {/* Subtitle */}
            <p className="font-neuhas text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]
                        leading-[1.6] text-white/80 max-w-3xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0">
              SOLTECH TechServices is a leading technology consulting & services company, 
              delivering innovative AI, IoT, Cybersecurity, and IT Infrastructure solutions 
              to enterprises across India and beyond.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16">
              <Link
                href="/technologies"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                         bg-white text-blue-900 font-semibold rounded-full
                         hover:bg-blue-50 transition-all duration-300 
                         shadow-lg hover:shadow-xl text-sm sm:text-base font-neuhas"
              >
                Core Technologies
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                         bg-transparent text-white font-semibold rounded-full
                         border-2 border-white/50 hover:border-white hover:bg-white/10
                         transition-all duration-300 text-sm sm:text-base font-neuhas"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          
        </div>
      </div>
    </section>
  );
}