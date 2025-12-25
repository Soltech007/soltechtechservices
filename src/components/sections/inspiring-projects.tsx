'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InspiringProjects() {
  return (
    <section className="bg-white overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      {/* ✅ Same padding as Hero - consistent LEFT alignment */}
      <div className="mx-auto pl-4 sm:pl-6 md:pl-8 lg:pl-16 xl:pl-20 pr-0">

        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] items-center gap-8 md:gap-12 lg:gap-24">

          {/* LEFT TEXT - NO extra padding now */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-blue-800">
              Tech That Transforms
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Your Business
            </h2>

            <p className="mt-4 sm:mt-6 md:mt-8 text-[16px] sm:text-[16px] md:text-[20px] text-gray-600 leading-[30px] font-neuhas max-w-full md:max-w-3xl">
              As a leading provider of technical services, SOLTECH TechServices Pvt Ltd specializes in delivering innovative solutions that drive business success. Our expertise spans AI, IoT, Cybersecurity, IT Infrastructure, Surveillance, and Telecommunications — empowering organisations with advancements that drive efficiency, security, and innovation.
            </p>

            <p className="mt-4 sm:mt-5 md:mt-6 text-[14px] sm:text-[16px] md:text-[22px] text-gray-600 leading-[30px] font-neuhas max-w-full md:max-w-3xl">
              Our team of experts is dedicated to providing customized services that align with your business objectives, helping you stay ahead in a rapidly evolving digital world.
            </p>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <Link
                href="/about-us"
                className={cn(
                  'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                  'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                  'text-sm sm:text-[20px] font-semibold text-blue-800',
                  'transition-all duration-500 ease-out',
                  'min-h-[44px] sm:min-h-[48px]',
                  'w-full sm:w-auto max-w-xs sm:max-w-none'
                )}
              >
                <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center justify-center md:justify-start">
                  <span className="flex items-center justify-center rounded-full bg-blue-800 text-white transition-all duration-500 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-neuhas">
                    Our Vision, Mission & Values
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE - smaller size */}
          <div className="relative mt-8 md:mt-0 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-none md:rounded-l-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:shadow-[0_6px_25px_rgba(0,0,0,0.1)] md:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop"
              alt="SOLTECH TechServices Team"
              fill
              className="object-cover object-center"
              sizes="(max-width:640px)100vw,(max-width:768px)90vw,(max-width:1024px)60vw,50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 sm:from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}