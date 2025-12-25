import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <html lang="en">
            <body className="font-body bg-background text-foreground antialiased">
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                    <div className="max-w-2xl w-full text-center">
                        {/* 404 Large Text */}
                        <div className="mb-8">
                            <h1 className="text-9xl font-bold text-blue-800 tracking-tight">
                                404
                            </h1>
                            <div className="h-1 w-24 bg-blue-800 mx-auto mt-4"></div>
                        </div>

                        {/* Error Message */}
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                            Sorry, we couldn't find the page you're looking for.
                            The page might have been moved or deleted.
                        </p>

                        {/* Action Buttons - ✅ onClick REMOVED */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Link>

                            {/* ✅ Simple Link instead of button */}
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-300 hover:border-gray-400"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Go Back
                            </Link>
                        </div>

                        {/* Company Info */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                <strong className="text-gray-700">SoltechTechServices Pvt. Ltd.</strong>
                                <br />
                                Building Infrastructure Since 1989
                            </p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}