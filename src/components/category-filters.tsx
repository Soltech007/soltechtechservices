// components/category-filters.tsx
'use client';

import Link from "next/link";
import { Earth } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryFiltersProps {
    slug: string;
    regions?: string[];
    statusFilter: string;
    regionFilter: string;
    sortFilter: string;
}

export function CategoryFilters({
    slug,
    regions,
    statusFilter,
    regionFilter,
    sortFilter
}: CategoryFiltersProps) {
    const router = useRouter();

    const handleRegionChange = (newRegion: string) => {
        router.push(`/markets/${slug}?status=${statusFilter}&region=${newRegion}&sort=${sortFilter}#filters`, { scroll: false });
    };

    const handleStatusChange = (newStatus: string) => {
        router.push(`/markets/${slug}?status=${newStatus}&region=${regionFilter}&sort=${sortFilter}#filters`, { scroll: false });
    };

    return (
        <>
            {/* Mobile Dropdowns */}
            <div className="lg:hidden space-y-4">

                {/* REGIONS Dropdown for Mobile */}
                {regions && regions.length > 0 && (
                    <div>
                        <label className="font-neuhas text-xs font-semibold text-gray-700 mb-2 block tracking-wider uppercase">
                            REGIONS
                        </label>
                        <select
                            value={regionFilter}
                            onChange={(e) => handleRegionChange(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                            <option value="all">ALL REGIONS</option>
                            {regions.map((region, idx) => (
                                <option key={idx} value={region.toLowerCase()}>
                                    {region.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* STATUS Dropdown for Mobile */}
                <div>
                    <label className="font-neuhas text-xs font-semibold text-gray-700 mb-2 block tracking-wider uppercase">
                        STATUS
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="all">ALL STATUS</option>
                        <option value="ongoing">ONGOING</option>
                        <option value="completed">COMPLETED</option>
                        <option value="upcoming">UPCOMING</option>
                    </select>
                </div>
            </div>

            {/* Desktop Pills Style - Hidden on Mobile */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">

                {/* REGIONS Filter (if regions exist) */}
                {regions && regions.length > 0 && (
                    <div>
                        <h3 className="font-neuhas text-xs md:text-[16px] leading-[24px] font-semibold text-gray-700 mb-4 tracking-wider uppercase">REGIONS</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/markets/${slug}?status=${statusFilter}&sort=${sortFilter}#filters`}
                                scroll={false}
                                className={`px-3 py-1.5 rounded-full text-[12px] font-normal tracking-wide transition-colors flex items-center gap-1.5
                        ${regionFilter === 'all'
                                        ? 'bg-blue-800 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                ALL REGIONS
                            </Link>
                            {regions.map((region, idx) => (
                                <Link
                                    key={idx}
                                    href={`/markets/${slug}?status=${statusFilter}&region=${region.toLowerCase()}&sort=${sortFilter}#filters`}
                                    scroll={false}
                                    className={`px-3 py-1.5 rounded-full text-[14px] leading-[14px] font-normal tracking-wide transition-colors flex items-center gap-1.5
                            ${regionFilter === region.toLowerCase()
                                            ? 'bg-blue-800 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    <Earth className="h-4 w-4" /> {region.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* STATUS Filter */}
                <div>
                    <h3 className="font-neuhas text-xs md:text-[16px] leading-[24px] font-semibold text-gray-700 mb-4 tracking-wider uppercase">STATUS</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={`/markets/${slug}?region=${regionFilter}&sort=${sortFilter}#filters`}
                            scroll={false}
                            className={`px-3 py-1.5 rounded-full text-[12px] font-normal tracking-wide transition-colors flex items-center gap-1.5
                    ${statusFilter === 'all'
                                    ? 'bg-blue-800 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            ALL STATUS
                        </Link>
                        <Link
                            href={`/markets/${slug}?status=ongoing&region=${regionFilter}&sort=${sortFilter}#filters`}
                            scroll={false}
                            className={`px-3 py-1.5 rounded-full text-[14px] leading-[14px] font-normal tracking-wide transition-colors flex items-center gap-1.5
                    ${statusFilter === 'ongoing'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            ONGOING
                        </Link>
                        <Link
                            href={`/markets/${slug}?status=completed&region=${regionFilter}&sort=${sortFilter}#filters`}
                            scroll={false}
                            className={`px-3 py-1.5 rounded-full text-[14px] leading-[14px] font-normal tracking-wide transition-colors flex items-center gap-1.5
                    ${statusFilter === 'completed'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            COMPLETED
                        </Link>
                        <Link
                            href={`/markets/${slug}?status=upcoming&region=${regionFilter}&sort=${sortFilter}#filters`}
                            scroll={false}
                            className={`px-3 py-1.5 rounded-full text-[14px] leading-[14px] font-normal tracking-wide transition-colors flex items-center gap-1.5
                    ${statusFilter === 'upcoming'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            UPCOMING
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}