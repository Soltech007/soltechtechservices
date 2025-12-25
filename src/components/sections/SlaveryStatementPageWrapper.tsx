// components/sections/SlaveryStatementPageWrapper.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function CtaButton({
    href,
    children,
    variant = "default",
    onClick, // Added onClick prop
    className = "",
}: {
    href: string;
    children: React.ReactNode;
    variant?: "default" | "download";
    onClick?: () => void; // Added type
    className?: string;
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
            onClick={onClick} // Added onClick
            className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "px-4 sm:px-5 md:px-6 py-2 sm:py-2.5",
                "text-sm sm:text-[20px] font-semibold text-blue-800 font-neuhas",
                "transition-all duration-500 ease-out mt-3",
                "min-h-[44px] sm:min-h-[48px]",
                "w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0",
                className
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