// app/manifest.ts (YE FILE HONI CHAHIYE)
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SoltechTechServices Pvt. Ltd.',
        short_name: 'SoltechTechServices',
        description: 'Leading Civil Engineering Contractor',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1D4ED8',
        icons: [
            {
                src: '/icon1.png',
                sizes: '32x32',
                type: 'image/png'
            },
            {
                src: '/icon1.png',
                sizes: '128x128',
                type: 'image/png'
            },
            {
                src: '/icon1.png',
                sizes: '256x256',
                type: 'image/png'
            }
        ]
    }
}