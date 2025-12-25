// components/ShareButtons.tsx
"use client"

import { useState } from "react"
import { Share2, X, Facebook, Twitter, Linkedin, Instagram, Mail, Link2, Check } from "lucide-react"

interface ShareButtonsProps {
    url: string;
    title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    // Social share URLs
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
        mail: `mailto:?subject=${encodedTitle}&body=Check out this article: ${url}`,
    };

    // Copy link to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {/* Share Button */}
            <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-1.5 text-gray-600 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-white"
            >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
            </button>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-fadeIn">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Share this article</h3>
                        <p className="text-sm text-gray-600 mb-6">Spread the knowledge with your network</p>

                        {/* Social Icons Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                            >
                                <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Facebook className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-blue-900">Facebook</span>
                            </a>

                            <a
                                href={shareLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors group"
                            >
                                <div className="p-2 bg-sky-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <Twitter className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-sky-900">Twitter</span>
                            </a>

                            <a
                                href={shareLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                            >
                                <div className="p-2 bg-blue-700 rounded-lg group-hover:scale-110 transition-transform">
                                    <Linkedin className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-blue-900">LinkedIn</span>
                            </a>

                            <button
                                onClick={() => {
                                    window.open(shareLinks.instagram, '_blank');
                                    alert('Please share this article on your Instagram story!');
                                }}
                                className="flex items-center gap-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors group"
                            >
                                <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Instagram className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-pink-900">Instagram</span>
                            </button>

                            <a
                                href={shareLinks.mail}
                                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group col-span-2"
                            >
                                <div className="p-2 bg-gray-600 rounded-lg group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900">Email</span>
                            </a>
                        </div>

                        {/* Copy Link Section */}
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Or copy link
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={url}
                                    readOnly
                                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-800 text-white hover:bg-gray-900'
                                        }`}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}