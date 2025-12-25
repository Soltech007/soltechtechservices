// src/app/(site)/layout.tsx
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />

            <main className="bg-white min-h-[calc(100vh_-_var(--header-height)_-_var(--footer-height))]">
                {children}
            </main>

            {/* ElevenLabs ConvAI Widget */}
            {/* <elevenlabs-convai agent-id="agent_4601kbs2j6sfecmrgy8crm65hazr"></elevenlabs-convai> */}

            <Script
                src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                strategy="afterInteractive"
            />

            <Footer />
        </>
    );
}
