// app/services/[slug]/not-found.tsx
import Link from "next/link";
import { CtaButton } from "@/components/sections/SlaveryStatementPageWrapper";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-blue-800 mb-4 font-apfel2">404</h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-apfel2 text-gray-900 mb-4">
                    Service Not Found
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 font-neuhas max-w-md mx-auto">
                    The service you're looking for doesn't exist or has been moved.
                </p>
                <CtaButton href="/services">
                    View All Services
                </CtaButton>
            </div>
        </div>
    );
}