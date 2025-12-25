'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        setDisplayChildren(children);
    }, [children, pathname]);

    return (
        <div
            key={pathname}
            className="transition-opacity duration-100 ease-out animate-fadeIn"
        >
            {displayChildren}
        </div>
    );
}