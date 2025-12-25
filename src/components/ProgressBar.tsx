'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

NProgress.configure({
    showSpinner: false,
    speed: 300,
    minimum: 0.25,
    trickleSpeed: 100,
});

// Separate component for search params
function ProgressBarComponent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    }, [pathname, searchParams]);

    return null;
}

// Main component with Suspense
export function ProgressBar() {
    return (
        <Suspense fallback={null}>
            <ProgressBarComponent />
        </Suspense>
    );
}