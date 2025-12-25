"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export default function ProjectsSearchBar() {
    const [query, setQuery] = useState("");

    return (
        <section className="bg-[#f2f5f7] border-b">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
                {/* Search Bar - Responsive heights and padding */}
                <div className="relative bg-white shadow-sm border border-gray-200 rounded-md overflow-hidden">
                    <div className="flex items-center">
                        {/* Search icon - smaller on mobile */}
                        <div className="pl-3 sm:pl-4 text-red-500">
                            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>

                        {/* Input - adjusted height and text size */}
                        <input
                            type="text"
                            placeholder="Search for Projects..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-2 sm:px-3 py-3 sm:py-3.5 md:py-4 
                                     text-sm sm:text-base text-gray-700 
                                     placeholder-gray-400 focus:outline-none"
                        />

                        {/* Red circle button - responsive sizing */}
                        <button
                            type="button"
                            className="flex items-center justify-center 
                                     w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                                     mr-2 sm:mr-3 rounded-full 
                                     bg-red-100 text-blue-800 
                                     hover:bg-red-200 transition-all duration-200"
                            aria-label="Search"
                        >
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                </div>

                {/* Optional mobile suggestions - hidden by default, shown on small screens */}
                <div className="mt-2 text-xs text-gray-500 hidden sm:hidden">
                    <span className="mr-2">Popular:</span>
                    <button className="underline mr-2" onClick={() => setQuery("Bridges")}>Bridges</button>
                    <button className="underline mr-2" onClick={() => setQuery("Highways")}>Highways</button>
                    <button className="underline" onClick={() => setQuery("Energy")}>Energy</button>
                </div>
            </div>
        </section>
    );
}