// app/verticals/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import VerticalDetailClient from "@/components/VerticalDetail";

// SOLTECH Verticals Data for static params
const soltechVerticals = [
    { id: 1, name: "BizAI Hacks", slug: "bizaihacks" },
    { id: 2, name: "SOLTECH Nexus", slug: "soltechnexus" },
    { id: 3, name: "SOLTECH 360 Ads", slug: "soltech360ads" },
];

// Vertical Details Data
const verticalDetailsData: Record<string, any> = {
    "bizaihacks": {
        name: "BizAI Hacks",
        slug: "bizaihacks",
        url: "https://bizaihacks.com",
        tagline: "Transform Business with AI",
        color: "#6366f1",
        description: "AI-powered business automation and intelligence solutions that help enterprises make smarter decisions and automate complex workflows.",
        longDescription: "BizAI Hacks is SOLTECH's dedicated AI vertical, specializing in helping businesses harness the transformative power of artificial intelligence. We combine cutting-edge AI technologies with deep business understanding to deliver solutions that drive real, measurable impact. From intelligent process automation and predictive analytics to conversational AI and computer vision, we help organizations unlock new possibilities and gain competitive advantages through AI innovation.",
        heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Brain",
                title: "Intelligent Automation",
                description: "AI-powered automation that learns, adapts, and optimizes business processes for maximum efficiency."
            },
            {
                icon: "BarChart3",
                title: "Predictive Analytics",
                description: "Advanced ML models that forecast trends, identify patterns, and enable data-driven decision making."
            },
            {
                icon: "MessageSquare",
                title: "Conversational AI",
                description: "Smart chatbots and virtual assistants that engage customers and streamline support operations."
            },
            {
                icon: "Eye",
                title: "Computer Vision",
                description: "Image and video analysis solutions for quality control, security, and document processing."
            }
        ],
        statistics: [
            { value: "50+", label: "AI Projects", description: "Delivered successfully" },
            { value: "85%", label: "Automation Rate", description: "Process efficiency" },
            { value: "40%", label: "Cost Reduction", description: "Average savings" },
            { value: "3x", label: "Faster Decisions", description: "With AI insights" }
        ],
        capabilities: [
            "Machine Learning Model Development",
            "Natural Language Processing (NLP)",
            "Computer Vision Solutions",
            "Predictive Analytics",
            "Intelligent Process Automation",
            "Conversational AI / Chatbots",
            "Recommendation Systems",
            "Anomaly Detection",
            "Document Intelligence",
            "AI Strategy Consulting",
            "MLOps & Model Deployment",
            "Custom AI Development"
        ],
        solutions: [
            {
                title: "Intelligent Customer Service Bot",
                industry: "E-commerce",
                value: "Conversational AI",
                description: "Developed an AI-powered customer service chatbot handling 70% of queries autonomously with 95% accuracy.",
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "70% query automation",
                    "24/7 availability",
                    "Multi-language support",
                    "CRM integration"
                ]
            },
            {
                title: "Predictive Maintenance System",
                industry: "Manufacturing",
                value: "ML Solution",
                description: "Implemented an AI system that predicts equipment failures 72 hours in advance, reducing downtime by 45%.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "72-hour prediction window",
                    "45% downtime reduction",
                    "IoT sensor integration",
                    "Real-time dashboards"
                ]
            }
        ],
        technologies: [
            "TensorFlow",
            "PyTorch",
            "OpenAI GPT",
            "LangChain",
            "Hugging Face",
            "AWS SageMaker",
            "Azure ML",
            "Google Vertex AI",
            "MLflow",
            "Kubeflow"
        ],
        testimonial: {
            quote: "BizAI Hacks transformed our customer service with their AI chatbot. The automation and accuracy levels exceeded our expectations.",
            author: "Director of Operations",
            company: "Leading E-commerce Platform"
        }
    },

    "soltechnexus": {
        name: "SOLTECH Nexus",
        slug: "soltechnexus",
        url: "https://soltechnexus.com",
        tagline: "Connect. Transform. Grow.",
        color: "#0891b2",
        description: "Enterprise software development and digital transformation solutions that connect businesses with cutting-edge technology.",
        longDescription: "SOLTECH Nexus is our enterprise software development and digital transformation vertical. We help businesses modernize their technology landscape, build custom software solutions, and embrace digital-first strategies that accelerate growth. Our team of experienced architects, developers, and consultants work closely with clients to understand their unique challenges and deliver solutions that drive measurable business outcomes. From legacy modernization and cloud migration to custom application development and system integration, we are your trusted technology partner.",
        heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Code",
                title: "Custom Software Development",
                description: "Tailored software solutions built with modern technologies to meet your unique business requirements."
            },
            {
                icon: "Cloud",
                title: "Cloud Solutions",
                description: "Cloud-native development, migration, and optimization across AWS, Azure, and Google Cloud."
            },
            {
                icon: "Smartphone",
                title: "Mobile Applications",
                description: "Native and cross-platform mobile apps that deliver exceptional user experiences."
            },
            {
                icon: "RefreshCw",
                title: "Digital Transformation",
                description: "End-to-end transformation services that modernize operations and enhance digital capabilities."
            }
        ],
        statistics: [
            { value: "200+", label: "Projects Delivered", description: "Successfully completed" },
            { value: "50+", label: "Enterprise Clients", description: "Trusted partnerships" },
            { value: "15+", label: "Years Experience", description: "Industry expertise" },
            { value: "99.9%", label: "Uptime", description: "System reliability" }
        ],
        capabilities: [
            "Custom Web Application Development",
            "Mobile App Development (iOS/Android)",
            "Cloud Migration & Optimization",
            "Enterprise System Integration",
            "API Development & Management",
            "Legacy System Modernization",
            "DevOps & CI/CD Implementation",
            "Microservices Architecture",
            "Database Design & Optimization",
            "Quality Assurance & Testing",
            "UI/UX Design",
            "Technical Consulting"
        ],
        solutions: [
            {
                title: "Enterprise Resource Planning System",
                industry: "Manufacturing",
                value: "Custom ERP",
                description: "Developed a comprehensive ERP system integrating production, inventory, finance, and HR modules for a manufacturing enterprise.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "5 integrated modules",
                    "500+ daily users",
                    "Real-time reporting",
                    "Mobile access"
                ]
            },
            {
                title: "E-commerce Platform",
                industry: "Retail",
                value: "Full-Stack Solution",
                description: "Built a scalable e-commerce platform handling 100K+ daily transactions with integrated payment, inventory, and logistics.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "100K+ daily transactions",
                    "Multi-vendor support",
                    "AI recommendations",
                    "Omnichannel integration"
                ]
            }
        ],
        technologies: [
            "React / Next.js",
            "Node.js",
            "Python",
            "Java / Spring Boot",
            ".NET Core",
            "React Native / Flutter",
            "AWS / Azure / GCP",
            "Kubernetes / Docker",
            "PostgreSQL / MongoDB",
            "GraphQL / REST APIs"
        ],
        testimonial: {
            quote: "SOLTECH Nexus delivered a world-class ERP system that transformed our operations. Their technical expertise and understanding of our business was exceptional.",
            author: "CTO",
            company: "Leading Manufacturing Company"
        }
    },

    "soltech360ads": {
        name: "SOLTECH 360 Ads",
        slug: "soltech360ads",
        url: "https://soltech360ads.com",
        tagline: "360° Digital Marketing",
        color: "#dc2626",
        description: "Complete digital marketing and advertising solutions that drive brand awareness, engagement, and conversions across all channels.",
        longDescription: "SOLTECH 360 Ads is our comprehensive digital marketing vertical, offering end-to-end marketing solutions that help brands reach, engage, and convert their target audiences. We combine creative excellence with data-driven strategies to deliver campaigns that maximize ROI. From search engine optimization and content marketing to paid advertising, social media management, and marketing automation, we create integrated marketing programs that build brand equity and drive measurable business results.",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Search",
                title: "SEO & Content Marketing",
                description: "Strategic SEO and compelling content that drives organic traffic and builds authority."
            },
            {
                icon: "Target",
                title: "Paid Advertising",
                description: "Performance-driven campaigns across Google, Meta, LinkedIn, and programmatic platforms."
            },
            {
                icon: "Users",
                title: "Social Media Marketing",
                description: "Engaging social strategies that build community, drive engagement, and generate leads."
            },
            {
                icon: "Mail",
                title: "Marketing Automation",
                description: "Automated nurture campaigns and personalized communication at scale."
            }
        ],
        statistics: [
            { value: "500+", label: "Campaigns", description: "Successfully executed" },
            { value: "300%", label: "Average ROI", description: "Campaign performance" },
            { value: "1k+", label: "Ad Spend Managed", description: "Across platforms" },
            { value: "50+", label: "Brands Served", description: "Diverse industries" }
        ],
        capabilities: [
            "Search Engine Optimization (SEO)",
            "Pay-Per-Click Advertising (PPC)",
            "Social Media Marketing",
            "Content Marketing & Strategy",
            "Email Marketing & Automation",
            "Influencer Marketing",
            "Video Marketing",
            "Branding & Creative Services",
            "Web Analytics & Reporting",
            "Conversion Rate Optimization",
            "Lead Generation Campaigns",
            "Marketing Technology Stack Setup"
        ],
        solutions: [
            {
                title: "Integrated Brand Launch Campaign",
                industry: "Consumer Goods",
                value: "Full-Funnel Marketing",
                description: "Executed a 360° brand launch campaign across digital channels resulting in 5M+ impressions and 200% sales target achievement.",
                image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "5M+ impressions",
                    "200% sales target",
                    "Multi-channel execution",
                    "Influencer partnerships"
                ]
            },
            {
                title: "B2B Lead Generation Program",
                industry: "Technology",
                value: "Performance Marketing",
                description: "Designed and implemented a B2B lead generation program delivering 500+ qualified leads monthly with 40% lower CPL.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "500+ monthly leads",
                    "40% lower CPL",
                    "LinkedIn & Google Ads",
                    "Marketing automation"
                ]
            }
        ],
        technologies: [
            "Google Ads",
            "Meta Business Suite",
            "LinkedIn Ads",
            "HubSpot",
            "Mailchimp",
            "SEMrush / Ahrefs",
            "Google Analytics",
            "Hotjar",
            "Canva / Adobe Suite",
            "Hootsuite / Buffer"
        ],
        testimonial: {
            quote: "SOLTECH 360 Ads exceeded our expectations with their brand launch campaign. The integrated approach and results-focused execution were outstanding.",
            author: "Marketing Director",
            company: "Consumer Goods Brand"
        }
    }
};

// ✅ FIX: Interface with Promise type for params (Next.js 15+)
interface VerticalDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// ✅ FIX: Await params in the main component
export default async function VerticalDetailPage({ params }: VerticalDetailPageProps) {
    const { slug } = await params; // ✅ FIXED: Added await
    const verticalData = verticalDetailsData[slug];

    if (!verticalData) {
        notFound();
    }

    return <VerticalDetailClient vertical={verticalData} />;
}

// ✅ Metadata function (already correct)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const vertical = verticalDetailsData[slug];

    if (!vertical) {
        return { title: 'Vertical Not Found' };
    }

    const title = `${vertical.name} | SOLTECH TechServices Verticals`;
    const description = vertical.description || `${vertical.name} - ${vertical.tagline}`;

    return {
        title,
        description,
        keywords: `${vertical.name}, ${vertical.tagline}, SOLTECH verticals, ${vertical.capabilities?.[0]}`,
        openGraph: {
            title: `${vertical.name} | SOLTECH TechServices`,
            description: vertical.tagline,
            url: `https://soltechtechservices.com/verticals/${slug}`,
            images: [{ url: vertical.heroImage || '/images/og-image.jpg' }],
        },
        alternates: { canonical: `https://soltechtechservices.com/verticals/${slug}` },
    };
}

// ✅ Generate static params for all verticals
export async function generateStaticParams() {
    return soltechVerticals.map((vertical) => ({
        slug: vertical.slug,
    }));
}