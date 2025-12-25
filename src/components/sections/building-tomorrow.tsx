import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BuildingTomorrow() {
  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background relative overflow-hidden"
    >
      {/* Left side grid pattern */}
      <div
        className="absolute inset-y-0 left-0 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[300px] opacity-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 2px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Right side grid pattern */}
      <div
        className="absolute inset-y-0 right-0 w-[100px] sm:w-[150px] md:w-[200px] lg:w-[300px] opacity-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 2px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="container text-center max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Heading - Responsive sizing */}
        <h2 className="font-apfel2 
                     text-3xl sm:text-4xl md:text-5xl lg:text-[42px] 
                     font-normal text-blue-800 leading-tight md:leading-[63px]
                     mb-4 sm:mb-5">
          Innovating Tomorrow, Together
        </h2>

        {/* Paragraphs - Responsive text and spacing */}
        <p className="mt-4 sm:mt-5 md:mt-8 mb-8 
                    text-[14px] sm:text-[16px] md:text-[20px] 
                    text-[#30454c] leading-[30px] font-neuhas
                    max-w-3xl mx-auto px-2 sm:px-0 text-start">
          With expertise spanning AI, IoT, Cybersecurity, IT Infrastructure, Surveillance, and Telecommunications, our reach and capabilities in cutting-edge technology solutions are unmatched. At SOLTECH TechServices, we don't just take on complex tech challenges — we solve them with precision and innovation. Whether implementing AI-driven automation, securing enterprise networks, or building smart IoT ecosystems, we lead with expertise, security, and collaboration.
        </p>

        <p className="mt-4 sm:mt-5 md:mt-8 mb-8 
                    text-[14px] sm:text-[16px] md:text-[20px] 
                    text-[#30454c] leading-[30px] font-neuhas
                    max-w-3xl mx-auto px-2 sm:px-0 text-start">
          From AI engineers and cybersecurity specialists to IoT architects and infrastructure experts, we value colleagues with diverse perspectives who are ready to embrace challenges and push the boundaries of what's possible in technology.
        </p>

        {/* CTA Button - Responsive */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-start font-extrabold">
          <Link
            href="/career"
            className={cn(
              'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
              'px-4 sm:px-5 md:px-6 py-2 sm:py-2.5',
              'text-sm sm:text-[15px] md:text-[20px] font-extrabold',
              'text-blue-800 transition-all duration-500 ease-out',
              'min-h-[40px] sm:min-h-[44px] md:min-h-[48px]',
              'hover:shadow-md',
              'w-full sm:w-auto max-w-xs sm:max-w-none mx-auto'
            )}
          >
            <span className="absolute inset-0 rounded-full bg-blue-800 scale-x-0 
                               group-hover:scale-x-100 origin-center transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center justify-center">
              <span className="flex items-center justify-center rounded-full bg-blue-800 text-white 
                                 transition-all duration-500 group-hover:w-0 group-hover:opacity-0 
                                 group-hover:scale-0 mr-2 sm:mr-2.5 md:mr-3 group-hover:mr-0 
                                 h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </span>
              <span className="whitespace-nowrap transition-colors duration-500 group-hover:text-white font-apfel2 font-extrabold">
                Join the SOLTECH Team
              </span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 
                                       opacity-0 transition-all duration-500 
                                       group-hover:w-3.5 sm:group-hover:w-4 md:group-hover:w-5 
                                       group-hover:opacity-100 group-hover:text-white 
                                       group-hover:ml-2 sm:group-hover:ml-2.5 md:group-hover:ml-3" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}