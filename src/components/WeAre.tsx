'use client';

import Image from 'next/image';

export function WeAre() {
  return (
    <section className="relative h-[80vh] min-h-[550px] w-full text-white overflow-hidden">
      {/* Image with subtle zoom animation */}
      <div className="absolute inset-0 scale-105 animate-[zoom_20s_ease-in-out_infinite]">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
          alt="SOLTECH Technology Innovation"
          fill
          className="object-cover"
        />
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-blue-900/20" />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />

      <div className="relative z-10 flex h-full flex-col justify-end pb-20">
        {/* ✅ SAME padding as Hero - Consistent alignment */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

            {/* Left side - Title - NO extra padding */}
            <div className="max-w-xl space-y-6">
              <div className="space-y-2">
                <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full" />
                <h2 className="font-apfel2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
                  <span className="block">We Are</span>
                  <span className="block bg-gradient-to-r from-white via-blue-50 to-blue-100 bg-clip-text text-transparent">
                    SOLTECH TechServices
                  </span>
                </h2>
              </div>
            </div>

            {/* Right side - Content - NO extra padding */}
            <div className="max-w-lg">
              <div className="relative">
                {/* Decorative element */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-transparent rounded-full" />

                <p className="text-[14px] sm:text-[16px] md:text-[22px] leading-[30px] text-white/95 pl-6 font-neuhas">
                  Innovation, precision, and a <span className="font-semibold text-white">"future-ready"</span> mentality are at the heart of everything we do. Our people are innovative thinkers and skilled problem-solvers who transform complex technology challenges into seamless digital solutions. Behind every AI implementation, IoT deployment, and cybersecurity framework is a relentless drive to deliver what drives your business forward.
                </p>

                {/* Subtle glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-transparent rounded-lg blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes zoom {
            0%, 100% {
                transform: scale(1.05);
            }
            50% {
                transform: scale(1.1);
            }
        }
    `}</style>
    </section>
  );
}