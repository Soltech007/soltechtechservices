import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QualityPeople() {
  return (
    <section className="relative bg-blue-800 text-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
          alt="SOLTECH Team Collaboration"
          fill
          className="object-cover opacity-15"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-800/90 sm:via-blue-800/80 to-blue-800/60 md:to-transparent" /> */}
      </div>

      {/* ✅ Content Container - SAME padding as Hero */}
      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

          {/* LEFT: Heading + Button - NO extra padding */}
          <div className="text-center md:text-left">
            <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight max-w-md md:max-w-none mx-auto md:mx-0">
              Defined by the Quality of Our Experts
            </h2>

            {/* CTA Button - Responsive */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <Link
                href="/about-us"
                className={cn(
                  'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                  'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                  'text-sm sm:text-[20px] font-semibold text-blue-200',
                  'transition-all duration-500 ease-out',
                  'min-h-[44px] sm:min-h-[48px]',
                  'w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0'
                )}
              >
                <span className="absolute inset-0 rounded-full bg-white scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center justify-center md:justify-start">
                  <span className="flex items-center justify-center rounded-full bg-white text-blue-800 transition-all duration-500 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-blue-800 font-neuhas">
                    Meet Our Team
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-blue-800 group-hover:ml-2 sm:group-hover:ml-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Description Text - NO extra padding */}
          <div className="md:text-left">
            <p className="text-[16px] sm:text-[16px] md:text-[22px] text-white/90 sm:text-white/85 md:text-white/80 leading-[30px] font-neuhas max-w-lg md:max-w-none mx-auto md:mx-0">
              Our team brings technical expertise, innovation, and hands-on experience to help businesses achieve their digital transformation goals. With 18+ certified professionals and 15+ years of industry experience, we succeed through collaboration and a shared commitment to delivering cutting-edge technology solutions that drive lasting impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}