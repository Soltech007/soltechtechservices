// app/partners/page.tsx
import { Metadata } from 'next';
import PartnersPageClient from '@/components/sections/PartnersPage';

export const metadata: Metadata = {
    title: 'Our Partners | SOLTECH TechServices',
    description: 'Explore our trusted technology partners including Microsoft, Cisco, AWS, Google Cloud, and 50+ leading global technology brands.',
    keywords: 'technology partners, Microsoft partner, Cisco partner, AWS partner, cloud partners, IT partners',
    openGraph: {
        title: 'Our Technology Partners | SOLTECH TechServices',
        description: 'Trusted partnerships with 50+ global technology leaders',
        url: 'https://soltechtechservices.com/partners',
    },
};

export default function PartnersPage() {
    return <PartnersPageClient />;
}