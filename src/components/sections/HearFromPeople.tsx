'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

/* ---------- HEAR FROM OUR PEOPLE SECTION ---------- */
export const HearFromPeople = () => {
    const slides = [
        {
            id: 1,
            quote: 'What sets us apart is amazingly diverse teams.',
            desc: 'Apart from the incredible projects we do, what really sets us apart are the amazingly diverse teams we have at A&T. In India, we call it unity in diversity—and that fits A&T perfectly. Diverse colleagues worldwide come together through our shared A&T culture.',
            name: 'Tara Pillai',
            title: 'PROJECT MANAGER',
            image: 'https://www.bechtel.com/wp-content/uploads/2025/01/video-capture-80.43seg-7442.webp'
        },
        {
            id: 2,
            quote: 'Learning never stops at A&T.',
            desc: 'Continuous learning is embedded in everything we do. With mentorship, training, and opportunities across disciplines, every day is a step forward in personal and professional growth.',
            name: 'Luis Fernandez',
            title: 'ENGINEERING LEAD',
            image: 'https://www.bechtel.com/wp-content/uploads/2025/01/ToTheExtraordinary-VVC-Video.00_02_58_11.Still001-1.webp'
        },
        {
            id: 3,
            quote: 'Safety and teamwork drive our success.',
            desc: 'Our commitment to safety means every team member knows they are valued. Working together across regions, we deliver excellence and protect each other—every single day.',
            name: 'Aisha Rahman',
            title: 'PROJECT SUPERVISOR',
            image: 'https://www.bechtel.com/wp-content/uploads/2025/01/video-capture-292.58seg-8091.webp'
        }
    ];

    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-change slide every 5 seconds
    useEffect(() => {
        if (isPaused) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            handleSlideChange((index + 1) % slides.length);
        }, 5000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [index, isPaused, slides.length]);

    // Smooth progress bar animation
    useEffect(() => {
        const bar = progressRef.current;
        if (!bar) return;

        // Reset animation
        bar.style.transition = 'none';
        bar.style.width = '0%';

        // Force reflow to ensure the reset takes effect
        void bar.offsetWidth;

        // Start animation
        requestAnimationFrame(() => {
            if (!isPaused) {
                bar.style.transition = 'width 5s linear';
                bar.style.width = '100%';
            }
        });
    }, [index, isPaused]);

    // Handle slide change with animation
    const handleSlideChange = (newIndex: number) => {
        setIsAnimating(true);
        setTimeout(() => {
            setIndex(newIndex);
            setIsAnimating(false);
        }, 300);
    };

    // Manual navigation
    const goToSlide = (slideIndex: number) => {
        if (slideIndex === index) return;
        handleSlideChange(slideIndex);
    };

    const handlePausePlay = () => {
        setIsPaused(prev => !prev);

        // If resuming, reset progress bar
        if (isPaused && progressRef.current) {
            const bar = progressRef.current;
            const currentWidth = bar.offsetWidth;
            const totalWidth = bar.parentElement?.offsetWidth || 1;
            const remainingPercent = ((totalWidth - currentWidth) / totalWidth) * 100;
            const remainingTime = (remainingPercent / 100) * 5;

            bar.style.transition = `width ${remainingTime}s linear`;
            bar.style.width = '100%';
        }
    };

    const slide = slides[index];

    return (
        <section className="font-apfel2 py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 sm:px-24">
                <h2 className="text-4xl lg:text-6xl text-center text-primary mb-20">
                    Hear From Our People
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                    {/* LEFT TEXT */}
                    <div className="space-y-6 text-gray-700">
                        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                            <span className="block text-6xl text-blue-800 mb-4 font-serif">"</span>
                            <h3 className="text-3xl lg:text-4xl font-semibold leading-snug mb-6 text-gray-900 font-apfel">
                                {slide.quote}
                            </h3>
                            <p className="text-lg leading-relaxed text-gray-600 font-neuhas">
                                {slide.desc}
                            </p>
                        </div>

                        {/* Author */}
                        <div className={`flex items-center mt-10 gap-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden">
                                <Image
                                    src={slide.image}
                                    alt={slide.name}
                                    fill
                                    sizes="52px"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-lg font-apfel">
                                    {slide.name}
                                </p>
                                <p className="text-sm text-gray-500 uppercase tracking-wide font-neuhas">
                                    {slide.title}
                                </p>
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex items-center gap-4 mt-8">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${idx === index
                                        ? 'flex-1 bg-gray-200' // flex-1 se pura available space le lega
                                        : 'w-8 bg-gray-300 hover:bg-gray-400' // inactive ko thoda bada kar diya
                                        }`}
                                >
                                    {idx === index && (
                                        <div
                                            ref={progressRef}
                                            className="absolute left-0 top-0 h-full bg-blue-800 rounded-full"
                                            style={{ width: '0%' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Pause/Play Button */}
                        <button
                            onClick={handlePausePlay}
                            className="mt-4 flex items-center gap-2 text-blue-800 font-semibold hover:text-red-700 transition-colors"
                            aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                        >
                            {isPaused ? (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <span>Play</span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                    <span>Pause</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                        <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                            <Image
                                src={slide.image}
                                alt={slide.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>

                        {/* Overlay gradient for better text visibility if needed */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};