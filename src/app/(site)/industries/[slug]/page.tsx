// app/industries/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import IndustryDetailClient from "@/components/sections/IndustryDetails";

// SOLTECH Industries Data for static params
const soltechIndustries = [
    { id: 1, title: "Retail Industry", slug: "retail" },
    { id: 2, title: "Automobile Industry", slug: "automobile" },
    { id: 3, title: "Healthcare & Wellness", slug: "healthcare" },
    { id: 4, title: "Mining & Quarrying", slug: "mining" },
    { id: 5, title: "Agriculture & Allied", slug: "agriculture" },
];

// Industry Details Data
const industryDetailsData: Record<string, any> = {
    "retail": {
        title: "Retail Industry",
        slug: "retail",
        tagline: "Smart Retail for the Modern Era",
        description: "Transform your retail operations with intelligent technology solutions that enhance customer experience, optimize inventory, and drive sales growth.",
        longDescription: "SOLTECH's retail solutions empower businesses to thrive in the competitive retail landscape. We combine cutting-edge technologies like AI, IoT, and data analytics to create seamless shopping experiences across all channels. From smart POS systems and inventory management to customer behavior analytics and personalized marketing, our solutions help retailers increase revenue, reduce costs, and build lasting customer relationships.",
        heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "ShoppingCart",
                title: "Smart POS Systems",
                description: "Advanced point-of-sale solutions with integrated payment processing, inventory sync, and real-time sales analytics."
            },
            {
                icon: "BarChart3",
                title: "Customer Analytics",
                description: "AI-powered insights into customer behavior, preferences, and buying patterns for personalized marketing."
            },
            {
                icon: "Package",
                title: "Inventory Management",
                description: "Real-time inventory tracking, automated reordering, and demand forecasting to optimize stock levels."
            },
            {
                icon: "Globe",
                title: "Omnichannel Integration",
                description: "Seamless integration of online and offline channels for unified customer experience across all touchpoints."
            }
        ],
        statistics: [
            { value: "40%", label: "Sales Increase", description: "Average revenue growth" },
            { value: "60%", label: "Inventory Accuracy", description: "Improvement in stock management" },
            { value: "35%", label: "Cost Reduction", description: "Operational efficiency gains" },
            { value: "50%", label: "Customer Retention", description: "Improved loyalty rates" }
        ],
        capabilities: [
            "Point-of-Sale (POS) Systems",
            "Inventory Management Software",
            "Customer Relationship Management (CRM)",
            "E-commerce Platform Integration",
            "Mobile Commerce Solutions",
            "Loyalty Program Management",
            "Supply Chain Optimization",
            "Retail Analytics & BI",
            "Loss Prevention Systems",
            "Store Traffic Analysis",
            "Price Optimization",
            "Vendor Management Systems"
        ],
        solutions: [
            {
                title: "Smart Store Management",
                location: "Retail Chain",
                value: "Complete Solution",
                description: "Implemented an integrated store management system across 50+ retail outlets with real-time inventory tracking, automated replenishment, and unified POS systems.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
                highlights: ["50+ stores connected", "Real-time inventory visibility", "30% reduction in stockouts", "Unified customer database"]
            },
            {
                title: "Customer Analytics Platform",
                location: "Fashion Retail",
                value: "AI-Powered Analytics",
                description: "Deployed an AI-driven customer analytics platform that analyzes shopping patterns, predicts trends, and enables personalized marketing campaigns.",
                image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop",
                highlights: ["360° customer view", "Personalized recommendations", "45% increase in repeat purchases", "Targeted marketing automation"]
            }
        ],
        technologies: ["Cloud POS Systems", "RFID Technology", "Beacon Technology", "AI/ML Analytics", "Mobile Apps", "Payment Gateways", "Inventory Sensors", "Digital Signage", "Customer Wi-Fi Analytics", "Queue Management"],
        testimonial: {
            quote: "SOLTECH transformed our retail operations completely. The integrated system has given us visibility and control we never had before, resulting in significant sales growth.",
            author: "Retail Operations Head",
            company: "Leading Fashion Retail Chain"
        }
    },

    "automobile": {
        title: "Automobile Industry",
        slug: "automobile",
        tagline: "Driving Innovation in Automotive Manufacturing",
        description: "Accelerate your automotive operations with Industry 4.0 technologies that optimize production, ensure quality, and enable connected vehicle ecosystems.",
        longDescription: "SOLTECH's automobile industry solutions help manufacturers embrace digital transformation across the entire value chain. From smart factory automation and predictive maintenance to connected vehicle platforms and supply chain optimization, we enable automotive companies to improve efficiency, reduce costs, and deliver superior products. Our expertise spans OEMs, tier-1 suppliers, and aftermarket service providers.",
        heroImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Factory",
                title: "Smart Manufacturing",
                description: "Industry 4.0 solutions with robotics, automation, and real-time production monitoring for efficient manufacturing."
            },
            {
                icon: "Gauge",
                title: "Quality Control",
                description: "AI-powered vision systems and automated testing for zero-defect manufacturing and quality assurance."
            },
            {
                icon: "Truck",
                title: "Supply Chain Optimization",
                description: "End-to-end supply chain visibility with demand forecasting, vendor management, and logistics optimization."
            },
            {
                icon: "Car",
                title: "Connected Vehicles",
                description: "IoT platforms for vehicle telematics, remote diagnostics, and over-the-air update capabilities."
            }
        ],
        statistics: [
            { value: "35%", label: "Productivity Gain", description: "Manufacturing efficiency" },
            { value: "50%", label: "Defect Reduction", description: "Quality improvement" },
            { value: "40%", label: "Downtime Reduction", description: "Predictive maintenance" },
            { value: "25%", label: "Cost Savings", description: "Operational efficiency" }
        ],
        capabilities: ["Factory Automation (SCADA/PLC)", "Robotic Process Automation", "Quality Management Systems", "Manufacturing Execution Systems (MES)", "Supply Chain Management", "Predictive Maintenance", "Connected Vehicle Platforms", "Dealer Management Systems", "Warranty Management", "Production Planning & Scheduling", "Asset Tracking & Management", "Energy Management Systems"],
        solutions: [
            {
                title: "Smart Factory Implementation",
                location: "Auto Component Manufacturer",
                value: "Industry 4.0",
                description: "Complete digital transformation of a manufacturing facility with SCADA integration, robotic automation, and real-time production monitoring.",
                image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=800&auto=format&fit=crop",
                highlights: ["15 robotic cells integrated", "Real-time OEE monitoring", "40% productivity improvement", "Predictive maintenance enabled"]
            },
            {
                title: "Connected Vehicle Platform",
                location: "Vehicle OEM",
                value: "IoT Solution",
                description: "Developed a comprehensive telematics platform for fleet management with GPS tracking, driver behavior analysis, and remote diagnostics.",
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop",
                highlights: ["10,000+ vehicles connected", "Real-time tracking & alerts", "Fuel efficiency optimization", "Predictive service scheduling"]
            }
        ],
        technologies: ["SCADA Systems", "PLC Programming", "Industrial Robotics", "MES Platforms", "IoT Sensors", "AI/ML for Quality", "Digital Twin", "Cloud Manufacturing", "Edge Computing", "5G Connectivity"],
        testimonial: {
            quote: "The Industry 4.0 transformation SOLTECH delivered has revolutionized our manufacturing. We've achieved unprecedented visibility and control over our production processes.",
            author: "VP Manufacturing",
            company: "Leading Auto Component Manufacturer"
        }
    },

    "healthcare": {
        title: "Healthcare & Wellness",
        slug: "healthcare",
        tagline: "Technology for Better Patient Outcomes",
        description: "Enhance patient care and operational efficiency with healthcare technology solutions that ensure compliance, security, and seamless information flow.",
        longDescription: "SOLTECH's healthcare solutions address the unique challenges of modern healthcare delivery. We help hospitals, clinics, and wellness centers implement technology that improves patient outcomes, streamlines operations, and ensures regulatory compliance. From hospital information systems and telemedicine platforms to medical IoT integration and data analytics, our solutions enable healthcare providers to deliver better care while managing costs effectively.",
        heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Hospital",
                title: "Hospital Management Systems",
                description: "Comprehensive HMS solutions covering patient registration, billing, inventory, and clinical workflows."
            },
            {
                icon: "Video",
                title: "Telemedicine Platforms",
                description: "Secure video consultation, remote patient monitoring, and virtual care delivery solutions."
            },
            {
                icon: "FileText",
                title: "Electronic Health Records",
                description: "HIPAA-compliant EHR systems with interoperability, clinical decision support, and patient portals."
            },
            {
                icon: "Activity",
                title: "Medical IoT",
                description: "Connected medical devices, vital signs monitoring, and real-time patient health tracking systems."
            }
        ],
        statistics: [
            { value: "45%", label: "Efficiency Gain", description: "Administrative tasks" },
            { value: "60%", label: "Error Reduction", description: "Clinical documentation" },
            { value: "30%", label: "Cost Savings", description: "Operational costs" },
            { value: "40%", label: "Patient Satisfaction", description: "Improved experience" }
        ],
        capabilities: ["Hospital Information Systems (HIS)", "Electronic Medical Records (EMR)", "Practice Management Software", "Telemedicine Solutions", "Medical Billing & Revenue Cycle", "Laboratory Information Systems", "Pharmacy Management", "Patient Portal Development", "Medical Device Integration", "Healthcare Analytics", "Compliance Management (HIPAA)", "Remote Patient Monitoring"],
        solutions: [
            {
                title: "Integrated Hospital Management",
                location: "Multi-Specialty Hospital",
                value: "Complete HMS",
                description: "Implemented a comprehensive hospital management system covering all departments from registration to discharge with integrated billing and inventory.",
                image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800&auto=format&fit=crop",
                highlights: ["500+ bed facility", "Paperless operations", "Integrated lab & pharmacy", "Real-time reporting"]
            },
            {
                title: "Telemedicine Platform",
                location: "Healthcare Network",
                value: "Virtual Care",
                description: "Developed a telemedicine platform enabling remote consultations, prescription management, and follow-up care across multiple specialties.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
                highlights: ["50+ doctors onboarded", "Video consultation", "E-prescription integration", "Patient app with reminders"]
            }
        ],
        technologies: ["HL7/FHIR Standards", "HIPAA Compliance Tools", "Cloud Healthcare Platforms", "Medical Imaging (DICOM)", "Wearable Integration", "AI Diagnostics", "Blockchain for Records", "Secure Video Conferencing", "Mobile Health Apps", "IoT Medical Devices"],
        testimonial: {
            quote: "SOLTECH's healthcare solution transformed our hospital operations. The integrated system has improved patient care while significantly reducing administrative burden.",
            author: "Medical Director",
            company: "Multi-Specialty Hospital"
        }
    },

    "mining": {
        title: "Mining & Quarrying",
        slug: "mining",
        tagline: "Smart Mining for Safer, Efficient Operations",
        description: "Optimize mining operations with industrial technology solutions that improve safety, increase productivity, and ensure environmental compliance.",
        longDescription: "SOLTECH's mining solutions address the complex challenges of modern mining operations. We help mining companies implement technology that enhances worker safety, optimizes equipment utilization, and ensures environmental compliance. From automated machinery and real-time monitoring to predictive maintenance and fleet management, our solutions enable mining operations to achieve operational excellence while minimizing environmental impact.",
        heroImage: "https://images.unsplash.com/photo-1578496480157-697fc14d2e55?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Shield",
                title: "Safety Systems",
                description: "Comprehensive safety monitoring including gas detection, proximity warnings, and emergency response systems."
            },
            {
                icon: "Truck",
                title: "Fleet Management",
                description: "GPS tracking, fuel monitoring, and maintenance scheduling for efficient fleet operations."
            },
            {
                icon: "Activity",
                title: "Production Monitoring",
                description: "Real-time tracking of extraction, processing, and stockpile levels with automated reporting."
            },
            {
                icon: "Leaf",
                title: "Environmental Compliance",
                description: "Air quality, water quality, and noise monitoring systems for regulatory compliance."
            }
        ],
        statistics: [
            { value: "50%", label: "Safety Incidents", description: "Reduction in accidents" },
            { value: "30%", label: "Equipment Uptime", description: "Improved availability" },
            { value: "25%", label: "Fuel Savings", description: "Optimized consumption" },
            { value: "40%", label: "Productivity Gain", description: "Operational efficiency" }
        ],
        capabilities: ["Mine Safety Systems", "Fleet Management Solutions", "Production Monitoring", "Predictive Maintenance", "Environmental Monitoring", "Asset Tracking", "Drill & Blast Optimization", "Crusher & Conveyor Automation", "Weighbridge Integration", "Dispatch Systems", "Ventilation Monitoring", "Geotechnical Monitoring"],
        solutions: [
            {
                title: "Integrated Mine Management",
                location: "Open Cast Mine",
                value: "Complete Solution",
                description: "Deployed a comprehensive mine management system with fleet tracking, production monitoring, and safety management across the entire mining operation.",
                image: "https://images.unsplash.com/photo-1578496480157-697fc14d2e55?q=80&w=800&auto=format&fit=crop",
                highlights: ["100+ vehicles tracked", "Real-time production data", "Automated dispatch system", "Safety incident reduction"]
            },
            {
                title: "Predictive Maintenance Platform",
                location: "Quarry Operations",
                value: "IoT + AI Solution",
                description: "Implemented sensor-based monitoring on crushers and conveyors with AI-powered predictive maintenance to prevent breakdowns.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                highlights: ["Critical equipment monitored", "Vibration & temperature sensors", "Failure prediction 72 hours ahead", "40% reduction in downtime"]
            }
        ],
        technologies: ["GPS/GNSS Tracking", "Industrial IoT Sensors", "SCADA Systems", "Radio Communication", "Collision Avoidance", "Dust Suppression Systems", "Load Monitoring", "Tire Pressure Monitoring", "Fatigue Detection", "Drone Surveying"],
        testimonial: {
            quote: "SOLTECH's mining solutions have significantly improved our safety record and operational efficiency. The real-time visibility has transformed how we manage our operations.",
            author: "Operations Manager",
            company: "Large Mining Operation"
        }
    },

    "agriculture": {
        title: "Agriculture & Allied Industries",
        slug: "agriculture",
        tagline: "Smart Farming for Sustainable Agriculture",
        description: "Transform traditional farming with precision agriculture technologies that increase yields, reduce waste, and promote sustainable farming practices.",
        longDescription: "SOLTECH's agricultural solutions bring the power of modern technology to farming. We help farmers and agribusinesses implement precision agriculture technologies that optimize resource usage, increase crop yields, and ensure sustainable practices. From IoT-based soil monitoring and automated irrigation to crop health analytics and supply chain tracking, our solutions enable data-driven farming decisions that improve profitability while protecting the environment.",
        heroImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Thermometer",
                title: "Soil & Weather Monitoring",
                description: "IoT sensors for real-time monitoring of soil moisture, temperature, nutrients, and weather conditions."
            },
            {
                icon: "Droplets",
                title: "Smart Irrigation",
                description: "Automated irrigation systems based on crop needs, weather forecasts, and soil moisture levels."
            },
            {
                icon: "Leaf",
                title: "Crop Health Analytics",
                description: "AI-powered analysis of crop health using drone imagery and satellite data for early disease detection."
            },
            {
                icon: "Truck",
                title: "Supply Chain Tracking",
                description: "End-to-end traceability from farm to fork with cold chain monitoring and quality assurance."
            }
        ],
        statistics: [
            { value: "30%", label: "Yield Increase", description: "Improved crop production" },
            { value: "40%", label: "Water Savings", description: "Efficient irrigation" },
            { value: "25%", label: "Input Cost Reduction", description: "Optimized fertilizer use" },
            { value: "50%", label: "Crop Loss Reduction", description: "Early disease detection" }
        ],
        capabilities: ["Precision Farming Solutions", "IoT Soil Monitoring", "Automated Irrigation Systems", "Crop Health Monitoring", "Weather Station Integration", "Drone-Based Surveying", "Farm Management Software", "Supply Chain Traceability", "Cold Chain Monitoring", "Livestock Management", "Greenhouse Automation", "Agricultural Analytics"],
        solutions: [
            {
                title: "Precision Agriculture Platform",
                location: "Large Farm Operation",
                value: "Smart Farming",
                description: "Implemented a comprehensive precision agriculture solution with soil sensors, automated irrigation, and crop monitoring across 500+ hectares.",
                image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop",
                highlights: ["500+ hectares covered", "200+ IoT sensors deployed", "40% water savings achieved", "Mobile app for farmers"]
            },
            {
                title: "Supply Chain Traceability",
                location: "Agribusiness",
                value: "Farm to Fork",
                description: "Developed a blockchain-based traceability platform tracking produce from farm to retail with quality monitoring at each stage.",
                image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=800&auto=format&fit=crop",
                highlights: ["Complete chain visibility", "QR code-based tracking", "Cold chain monitoring", "Consumer transparency"]
            }
        ],
        technologies: ["IoT Soil Sensors", "Weather Stations", "Drone Imaging", "Satellite Imagery", "AI/ML Analytics", "Smart Irrigation Controllers", "GPS Field Mapping", "Mobile Farm Apps", "Blockchain Traceability", "Cold Chain IoT"],
        testimonial: {
            quote: "SOLTECH's smart farming solution has transformed our agricultural practices. We've significantly increased yields while reducing water and fertilizer costs.",
            author: "Farm Owner",
            company: "Progressive Farming Operation"
        }
    }
};

// ✅ FIX: Interface with Promise type for params (Next.js 15+)
interface IndustryDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// ✅ FIX: Await params in the main component
export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
    const { slug } = await params; // ✅ FIXED: Added await
    const industryData = industryDetailsData[slug];

    if (!industryData) {
        notFound();
    }

    return <IndustryDetailClient industry={industryData} />;
}

// ✅ Metadata function (already correct)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const industry = industryDetailsData[slug];

    if (!industry) {
        return { title: 'Industry Not Found' };
    }

    return {
        title: `${industry.title} Solutions | SOLTECH TechServices`,
        description: industry.description,
        keywords: `${industry.title}, technology solutions, digital transformation`,
        openGraph: {
            title: `${industry.title} | SOLTECH TechServices`,
            description: industry.tagline,
            url: `https://soltechtechservices.com/industries/${slug}`,
            images: [{ url: industry.heroImage }],
        },
        alternates: { canonical: `https://soltechtechservices.com/industries/${slug}` },
    };
}

// ✅ Generate static params for all industries
export async function generateStaticParams() {
    return soltechIndustries.map((industry) => ({
        slug: industry.slug,
    }));
}