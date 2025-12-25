import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WeBuildHistory() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      {/* ✅ SAME padding as Hero - Consistent alignment */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

          {/* Left side - Title & Button - NO extra padding */}
          <div className="text-center md:text-left">
            {/* Heading - Responsive sizing */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-apfel2 font-normal leading-tight text-blue-800">
              We Build the Future
            </h2>

            {/* CTA Button - Responsive */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <Link
                href="/verticals"
                className={cn(
                  'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
                  'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
                  'text-sm sm:text-[20px] font-semibold text-blue-800',
                  'transition-all duration-500 ease-out',
                  'min-h-[44px] sm:min-h-[48px]',
                  'w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0'
                )}
              >
                <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center justify-center md:justify-start">
                  <span className="flex items-center justify-center rounded-full bg-blue-800 text-white transition-all duration-500 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 mr-2 sm:mr-3 group-hover:mr-0 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-neuhas">
                    Explore Our Verticals
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 opacity-0 transition-all duration-500 group-hover:w-4 sm:group-hover:w-5 group-hover:opacity-100 group-hover:text-white group-hover:ml-2 sm:group-hover:ml-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right side - Content - NO extra padding */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left">
            <p className="text-[#30454c] text-[14px] sm:text-[16px] md:text-[20px] leading-[30px] font-neuhas max-w-2xl md:max-w-none mx-auto md:mx-0">
              The 21st century and beyond will be defined by the ability to harness technology efficiently, securely, and at scale — meeting the fast-changing demands of AI, IoT, cybersecurity, cloud infrastructure, and industrial automation.
            </p>
            <p className="text-[#30454c] text-[14px] sm:text-[16px] md:text-[20px] leading-[30px] font-neuhas max-w-2xl md:max-w-none mx-auto md:mx-0">
              For more than 15 years, SOLTECH TechServices has risen to the occasion. With our deep expertise in cutting-edge technologies and complex business environments, we are purpose-built to deliver solutions that shape your digital transformation journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}