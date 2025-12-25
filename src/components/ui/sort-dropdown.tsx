'use client'

import { useRouter } from 'next/navigation';

interface SortDropdownProps {
    currentSort: string;
    slug: string;
    statusFilter: string;
    regionFilter: string;
}

export function SortDropdown({ currentSort, slug, statusFilter, regionFilter }: SortDropdownProps) {
    const router = useRouter();

    const handleSortChange = (newSort: string) => {
        const url = `/markets/${slug}?status=${statusFilter}&region=${regionFilter}&sort=${newSort}#filters`;
        router.push(url, { scroll: false });
    };

    return (
        <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md 
                     bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                     focus:ring-red-500 cursor-pointer"
        >
            <option value="newest">NEWEST FIRST</option>
            <option value="oldest">OLDEST FIRST</option>
            <option value="alphabetical">ALPHABETICAL</option>
        </select>
    );
}