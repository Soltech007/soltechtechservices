// app/verticals/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import VerticalDetailClient from "@/components/VerticalDetail";

// SOLTECH Verticals Data for static params - All 8 verticals
const soltechVerticals = [
    { id: 1, name: "BizAI Hacks", slug: "bizaihacks" },
    { id: 2, name: "SOLTECH Nexus", slug: "soltechnexus" },
    { id: 3, name: "SOLTECH 360 Ads", slug: "soltech360ads" },
    { id: 4, name: "MrCCTV", slug: "mrcctv" },
    { id: 5, name: "Soltech Virtual CTO", slug: "soltech-virtual-cto" },
    { id: 6, name: "Soltech Biz Solutions", slug: "soltech-biz-solutions" },
    { id: 7, name: "Soltech Tronix", slug: "soltech-tronix" },
    { id: 8, name: "Soltech Talent Hub", slug: "soltech-talent-hub" },
];

// Vertical Details Data - Complete data for all 8 verticals
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
            { icon: "Brain", title: "Intelligent Automation", description: "AI-powered automation that learns, adapts, and optimizes business processes for maximum efficiency." },
            { icon: "BarChart3", title: "Predictive Analytics", description: "Advanced ML models that forecast trends, identify patterns, and enable data-driven decision making." },
            { icon: "MessageSquare", title: "Conversational AI", description: "Smart chatbots and virtual assistants that engage customers and streamline support operations." },
            { icon: "Eye", title: "Computer Vision", description: "Image and video analysis solutions for quality control, security, and document processing." }
        ],
        statistics: [
            { value: "50+", label: "AI Projects", description: "Delivered successfully" },
            { value: "85%", label: "Automation Rate", description: "Process efficiency" },
            { value: "40%", label: "Cost Reduction", description: "Average savings" },
            { value: "3x", label: "Faster Decisions", description: "With AI insights" }
        ],
        capabilities: [
            "Machine Learning Model Development", "Natural Language Processing (NLP)", "Computer Vision Solutions",
            "Predictive Analytics", "Intelligent Process Automation", "Conversational AI / Chatbots",
            "Recommendation Systems", "Anomaly Detection", "Document Intelligence",
            "AI Strategy Consulting", "MLOps & Model Deployment", "Custom AI Development"
        ],
        solutions: [
            {
                title: "Intelligent Customer Service Bot",
                industry: "E-commerce",
                value: "Conversational AI",
                description: "Developed an AI-powered customer service chatbot handling 70% of queries autonomously with 95% accuracy.",
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
                highlights: ["70% query automation", "24/7 availability", "Multi-language support", "CRM integration"]
            },
            {
                title: "Predictive Maintenance System",
                industry: "Manufacturing",
                value: "ML Solution",
                description: "Implemented an AI system that predicts equipment failures 72 hours in advance, reducing downtime by 45%.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                highlights: ["72-hour prediction window", "45% downtime reduction", "IoT sensor integration", "Real-time dashboards"]
            }
        ],
        technologies: ["TensorFlow", "PyTorch", "OpenAI GPT", "LangChain", "Hugging Face", "AWS SageMaker", "Azure ML", "Google Vertex AI", "MLflow", "Kubeflow"],
        testimonial: { quote: "BizAI Hacks transformed our customer service with their AI chatbot. The automation and accuracy levels exceeded our expectations.", author: "Director of Operations", company: "Leading E-commerce Platform" }
    },

    "soltechnexus": {
        name: "SOLTECH Nexus",
        slug: "soltechnexus",
        url: "https://soltechnexus.com",
        tagline: "Connect. Transform. Grow.",
        color: "#0891b2",
        description: "Enterprise software development and digital transformation solutions that connect businesses with cutting-edge technology.",
        longDescription: "SOLTECH Nexus is our enterprise software development and digital transformation vertical. We help businesses modernize their technology landscape, build custom software solutions, and embrace digital-first strategies that accelerate growth. Our team of experienced architects, developers, and consultants work closely with clients to understand their unique challenges and deliver solutions that drive measurable business outcomes.",
        heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { icon: "Code", title: "Custom Software Development", description: "Tailored software solutions built with modern technologies to meet your unique business requirements." },
            { icon: "Cloud", title: "Cloud Solutions", description: "Cloud-native development, migration, and optimization across AWS, Azure, and Google Cloud." },
            { icon: "Smartphone", title: "Mobile Applications", description: "Native and cross-platform mobile apps that deliver exceptional user experiences." },
            { icon: "RefreshCw", title: "Digital Transformation", description: "End-to-end transformation services that modernize operations and enhance digital capabilities." }
        ],
        statistics: [
            { value: "200+", label: "Projects Delivered", description: "Successfully completed" },
            { value: "50+", label: "Enterprise Clients", description: "Trusted partnerships" },
            { value: "15+", label: "Years Experience", description: "Industry expertise" },
            { value: "99.9%", label: "Uptime", description: "System reliability" }
        ],
        capabilities: [
            "Custom Web Application Development", "Mobile App Development (iOS/Android)", "Cloud Migration & Optimization",
            "Enterprise System Integration", "API Development & Management", "Legacy System Modernization",
            "DevOps & CI/CD Implementation", "Microservices Architecture", "Database Design & Optimization",
            "Quality Assurance & Testing", "UI/UX Design", "Technical Consulting"
        ],
        solutions: [
            {
                title: "Enterprise Resource Planning System",
                industry: "Manufacturing",
                value: "Custom ERP",
                description: "Developed a comprehensive ERP system integrating production, inventory, finance, and HR modules.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
                highlights: ["5 integrated modules", "500+ daily users", "Real-time reporting", "Mobile access"]
            },
            {
                title: "E-commerce Platform",
                industry: "Retail",
                value: "Full-Stack Solution",
                description: "Built a scalable e-commerce platform handling 100K+ daily transactions with integrated systems.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
                highlights: ["100K+ daily transactions", "Multi-vendor support", "AI recommendations", "Omnichannel integration"]
            }
        ],
        technologies: ["React / Next.js", "Node.js", "Python", "Java / Spring Boot", ".NET Core", "React Native / Flutter", "AWS / Azure / GCP", "Kubernetes / Docker", "PostgreSQL / MongoDB", "GraphQL / REST APIs"],
        testimonial: { quote: "SOLTECH Nexus delivered a world-class ERP system that transformed our operations.", author: "CTO", company: "Leading Manufacturing Company" }
    },

    "soltech360ads": {
        name: "SOLTECH 360 Ads",
        slug: "soltech360ads",
        url: "https://soltech360ads.com",
        tagline: "360° Digital Marketing",
        color: "#dc2626",
        description: "Complete digital marketing and advertising solutions that drive brand awareness, engagement, and conversions across all channels.",
        longDescription: "SOLTECH 360 Ads is our comprehensive digital marketing vertical, offering end-to-end marketing solutions that help brands reach, engage, and convert their target audiences. We combine creative excellence with data-driven strategies to deliver campaigns that maximize ROI.",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { icon: "Search", title: "SEO & Content Marketing", description: "Strategic SEO and compelling content that drives organic traffic and builds authority." },
            { icon: "Target", title: "Paid Advertising", description: "Performance-driven campaigns across Google, Meta, LinkedIn, and programmatic platforms." },
            { icon: "Users", title: "Social Media Marketing", description: "Engaging social strategies that build community, drive engagement, and generate leads." },
            { icon: "Mail", title: "Marketing Automation", description: "Automated nurture campaigns and personalized communication at scale." }
        ],
        statistics: [
            { value: "500+", label: "Campaigns", description: "Successfully executed" },
            { value: "300%", label: "Average ROI", description: "Campaign performance" },
            { value: "1k+", label: "Ad Spend Managed", description: "Across platforms" },
            { value: "50+", label: "Brands Served", description: "Diverse industries" }
        ],
        capabilities: [
            "Search Engine Optimization (SEO)", "Pay-Per-Click Advertising (PPC)", "Social Media Marketing",
            "Content Marketing & Strategy", "Email Marketing & Automation", "Influencer Marketing",
            "Video Marketing", "Branding & Creative Services", "Web Analytics & Reporting",
            "Conversion Rate Optimization", "Lead Generation Campaigns", "Marketing Technology Stack Setup"
        ],
        solutions: [
            {
                title: "Integrated Brand Launch Campaign",
                industry: "Consumer Goods",
                value: "Full-Funnel Marketing",
                description: "Executed a 360° brand launch campaign across digital channels resulting in 5M+ impressions.",
                image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop",
                highlights: ["5M+ impressions", "200% sales target", "Multi-channel execution", "Influencer partnerships"]
            },
            {
                title: "B2B Lead Generation Program",
                industry: "Technology",
                value: "Performance Marketing",
                description: "Designed and implemented a B2B lead generation program delivering 500+ qualified leads monthly.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
                highlights: ["500+ monthly leads", "40% lower CPL", "LinkedIn & Google Ads", "Marketing automation"]
            }
        ],
        technologies: ["Google Ads", "Meta Business Suite", "LinkedIn Ads", "HubSpot", "Mailchimp", "SEMrush / Ahrefs", "Google Analytics", "Hotjar", "Canva / Adobe Suite", "Hootsuite / Buffer"],
        testimonial: { quote: "SOLTECH 360 Ads exceeded our expectations with their brand launch campaign.", author: "Marketing Director", company: "Consumer Goods Brand" }
    },

    "mrcctv": {
        name: "MrCCTV",
        slug: "mrcctv",
        url: "/verticals/mrcctv",
        tagline: "Smart Surveillance Solutions",
        color: "#dc2626",
        description: "Advanced CCTV cameras, NVRs, and smart surveillance systems with AI-enabled monitoring for businesses, industries, and institutions.",
        longDescription: "MrCCTV is SOLTECH's dedicated surveillance vertical, offering comprehensive security solutions including advanced CCTV cameras (HD, IP, and AI-enabled), NVRs, PoE switches, network racks, and AI video analytics systems. We serve businesses, factories, housing societies, retail outlets, and institutions with installation, maintenance, and remote monitoring services. Our partnerships with leading brands in camera technology, AI analytics, and cloud surveillance platforms ensure cutting-edge security solutions.",
        heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { icon: "Eye", title: "AI-Enabled CCTV", description: "HD, IP, and AI-powered cameras with intelligent video analytics for advanced threat detection." },
            { icon: "Shield", title: "24/7 Remote Monitoring", description: "Cloud-based surveillance management with real-time access and instant alerts." },
            { icon: "RefreshCw", title: "System Upgrades", description: "Migration from analog to AI-enabled CCTV with smart analytics integration." },
            { icon: "Zap", title: "Quick Installation", description: "Complete installation of CCTV systems, PoE networks, and monitoring stations." }
        ],
        statistics: [
            { value: "500+", label: "Installations", description: "Completed successfully" },
            { value: "24/7", label: "Monitoring", description: "Real-time surveillance" },
            { value: "100+", label: "AMC Clients", description: "Active contracts" },
            { value: "99%", label: "Uptime", description: "System reliability" }
        ],
        capabilities: [
            "CCTV Cameras (HD, IP, AI-enabled)", "Network Video Recorders (NVRs)", "PoE Switches and Network Racks",
            "AI Video Analytics Systems", "Power Supply Units and Accessories", "Installation & Setup",
            "Maintenance & Repairs", "Annual Maintenance Contracts (AMC)", "Remote Monitoring Services",
            "System Upgrades & Migration", "Buy-Back & Replacement Programs", "Cloud Surveillance Solutions"
        ],
        solutions: [
            {
                title: "Industrial Factory Surveillance",
                industry: "Manufacturing",
                value: "Complete Security",
                description: "Deployed 200+ AI-enabled cameras with 24/7 monitoring and instant alert system for a large factory.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
                highlights: ["200+ cameras", "AI threat detection", "Cloud storage", "Mobile app access"]
            },
            {
                title: "Smart Society Security",
                industry: "Residential",
                value: "Integrated Solution",
                description: "Implemented comprehensive surveillance system for a housing society with visitor management integration.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
                highlights: ["Entry-exit monitoring", "License plate recognition", "Intercom integration", "Emergency alerts"]
            }
        ],
        technologies: ["Hikvision", "Dahua", "CP Plus", "Axis", "AI Analytics Software", "Cloud Storage Platforms", "PoE Technology", "NVR Systems", "Mobile Monitoring Apps", "Smart Alert Systems"],
        testimonial: { quote: "MrCCTV provided an excellent surveillance solution for our factory. The AI-enabled cameras and 24/7 monitoring give us complete peace of mind.", author: "Operations Head", company: "Manufacturing Enterprise" }
    },

    "soltech-virtual-cto": {
        name: "Soltech Virtual CTO",
        slug: "soltech-virtual-cto",
        url: "/verticals/soltech-virtual-cto",
        tagline: "On-Demand Technology Leadership",
        color: "#7c3aed",
        description: "Virtual CTO services offering strategic tech consultation, cloud migration, IT infrastructure planning, and digital transformation guidance.",
        longDescription: "Soltech Virtual CTO provides on-demand technology leadership for startups, SMEs, enterprises, and business founders. We offer flexible Virtual CTO subscription plans, digital transformation blueprints, industry-specific technology roadmaps, and CIO/CTO advisory reports. Partnering with IBM, Microsoft Azure, AWS, Google Cloud, and Zoho, we deliver comprehensive IT strategy planning, cloud migration, ERP consultancy, AI automation roadmaps, and cybersecurity audits.",
        heroImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { icon: "Brain", title: "Virtual CTO as a Service", description: "On-demand technology leadership to drive innovation and strategic growth." },
            { icon: "Cloud", title: "Cloud Migration & Architecture", description: "Seamless transition and structuring of cloud-based systems across AWS, Azure, and GCP." },
            { icon: "Shield", title: "Cybersecurity Audits", description: "Comprehensive security reviews ensuring data protection and compliance." },
            { icon: "TrendingUp", title: "AI & Automation Roadmaps", description: "Strategic frameworks for intelligent process automation and AI adoption." }
        ],
        statistics: [
            { value: "100+", label: "Clients Advised", description: "Strategic guidance" },
            { value: "50+", label: "Transformations", description: "Digital journeys led" },
            { value: "30%", label: "Cost Savings", description: "Average IT optimization" },
            { value: "5x", label: "Faster Decisions", description: "With expert guidance" }
        ],
        capabilities: [
            "Virtual CTO Subscription Plans (Monthly/Yearly)", "Digital Transformation Blueprints", "Industry-Specific Technology Roadmaps",
            "CIO/CTO Advisory Reports", "Workflow Automation Templates", "IT Infrastructure Strategy",
            "ERP & Business Software Consultation", "Cloud Migration & Architecture Design", "AI & Automation Roadmaps",
            "Cybersecurity Audits & Policies", "Technology Partner Selection", "Vendor Management"
        ],
        solutions: [
            {
                title: "Startup Technology Strategy",
                industry: "FinTech",
                value: "Virtual CTO",
                description: "Provided end-to-end technology leadership for a FinTech startup from MVP to Series A funding.",
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
                highlights: ["MVP development", "Cloud architecture", "Security compliance", "Investor presentations"]
            },
            {
                title: "Enterprise Cloud Migration",
                industry: "Healthcare",
                value: "IT Strategy",
                description: "Led complete cloud migration for a healthcare enterprise ensuring HIPAA compliance.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
                highlights: ["Zero downtime", "HIPAA compliant", "40% cost reduction", "Scalable infrastructure"]
            }
        ],
        technologies: ["IBM Cloud", "Microsoft Azure", "AWS", "Google Cloud", "Zoho Suite", "ServiceNow", "Jira", "Confluence", "Slack", "Microsoft 365"],
        testimonial: { quote: "Soltech Virtual CTO helped us build a solid technology foundation that attracted investors and enabled rapid growth.", author: "Founder & CEO", company: "FinTech Startup" }
    },

    "soltech-biz-solutions": {
        name: "Soltech Biz Solutions",
        slug: "soltech-biz-solutions",
        url: "/verticals/soltech-biz-solutions",
        tagline: "Streamline Your Business Operations",
        color: "#059669",
        description: "Comprehensive ERP systems, CRM platforms, HRMS tools, and business process automation suites for enterprises and SMEs.",
        longDescription: "Soltech Biz Solutions offers end-to-end business software solutions including ERP systems for finance, inventory, and operations management, CRM platforms for customer relationship management, HRMS tools for payroll, attendance, and performance tracking, and business process automation suites. We partner with Zoho, ERPNext, Tally, SAP, and Busy to deliver customized solutions for enterprises, SMEs, startups, and business consultants.",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { icon: "BarChart3", title: "ERP Systems", description: "Comprehensive enterprise solutions for managing finance, inventory, and operations." },
            { icon: "Users", title: "CRM Platforms", description: "Tools designed to streamline customer relationship management and sales tracking." },
            { icon: "Brain", title: "HRMS Tools", description: "End-to-end human resource management for payroll, attendance, and performance." },
            { icon: "Zap", title: "Process Automation", description: "Solutions to digitize workflows and improve operational efficiency." }
        ],
        statistics: [
            { value: "300+", label: "Implementations", description: "Successful deployments" },
            { value: "50%", label: "Efficiency Gain", description: "Average improvement" },
            { value: "200+", label: "AMC Clients", description: "Ongoing support" },
            { value: "99.5%", label: "Uptime", description: "System availability" }
        ],
        capabilities: [
            "ERP Systems (Finance, Inventory, Operations)", "CRM Platforms", "HRMS Tools",
            "Business Process Automation Suites", "Custom Software Solutions", "Software Installation & Setup",
            "ERP & Accounting Software Customization", "Annual Maintenance Contract (AMC)", "Renewal & Licensing Management",
            "Cloud Deployment for ERP", "Data Migration & Backup Services", "Integration Support"
        ],
        solutions: [
            {
                title: "Complete ERP Implementation",
                industry: "Retail",
                value: "Zoho One",
                description: "Implemented Zoho One suite for a retail chain with 50+ stores covering inventory, sales, and HR.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
                highlights: ["50+ store integration", "Real-time inventory", "Automated payroll", "Sales analytics"]
            },
            {
                title: "Tally to Cloud Migration",
                industry: "Manufacturing",
                value: "ERPNext",
                description: "Migrated from Tally to cloud-based ERPNext for a manufacturing company with multi-location operations.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                highlights: ["Zero data loss", "Multi-location sync", "GST compliance", "Mobile access"]
            }
        ],
        technologies: ["Zoho Suite", "ERPNext", "Tally Prime", "SAP Business One", "Busy Accounting", "Microsoft Dynamics", "QuickBooks", "Freshworks", "Razorpay", "AWS/Azure Cloud"],
        testimonial: { quote: "Soltech Biz Solutions transformed our operations with their ERP implementation. We now have real-time visibility across all stores.", author: "Operations Director", company: "Retail Chain" }
    },

    "soltech-tronix": {
        name: "Soltech Tronix",
        slug: "soltech-tronix",
        url: "/verticals/soltech-tronix",
        tagline: "Industrial IoT & Automation",
        color: "#ea580c",
        description: "Embedded systems, IoT devices, industrial sensors, and smart control units for manufacturing and industrial automation needs.",
        longDescription: "Soltech Tronix specializes in embedded systems, IoT devices, industrial sensors, and smart control units. We serve manufacturing units, industrial automation firms, research institutes, and system integrators with hardware design, PCB development, firmware programming, and IoT integration services. Our partnerships with Keyence, Siemens, Schneider Electric, and Honeywell ensure access to world-class industrial automation components.",
        heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { icon: "Zap", title: "Industrial IoT Sensors", description: "Temperature, pressure, motion, and proximity sensors for real-time industrial monitoring." },
            { icon: "BarChart3", title: "Smart Energy Meters", description: "Advanced metering solutions for efficient energy tracking and management." },
            { icon: "Target", title: "RFID & Tracking", description: "Precise asset tracking, logistics, and inventory management solutions." },
            { icon: "Brain", title: "Edge Computing", description: "High-performance modules for on-site data processing and analytics." }
        ],
        statistics: [
            { value: "100+", label: "IoT Projects", description: "Deployed successfully" },
            { value: "10K+", label: "Sensors", description: "Installed nationwide" },
            { value: "35%", label: "Energy Savings", description: "Average reduction" },
            { value: "50+", label: "Industrial Clients", description: "Trusted partnerships" }
        ],
        capabilities: [
            "Industrial IoT Sensors (Temperature, Pressure, Motion, Proximity)", "Smart Energy Meters", "RFID & Tracking Devices",
            "IoT Gateways & Controllers", "Automation Hardware (PLC, HMI)", "Edge Computing Devices",
            "Hardware Design & PCB Development", "Firmware Programming", "IoT Integration Services",
            "Sensor Calibration", "Preventive Maintenance", "Custom Embedded Solutions"
        ],
        solutions: [
            {
                title: "Smart Factory Automation",
                industry: "Manufacturing",
                value: "Complete IoT Solution",
                description: "Deployed 500+ IoT sensors for a smart factory enabling predictive maintenance and energy optimization.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                highlights: ["500+ sensors", "Predictive maintenance", "30% energy savings", "Real-time monitoring"]
            },
            {
                title: "Warehouse Asset Tracking",
                industry: "Logistics",
                value: "RFID Solution",
                description: "Implemented RFID-based asset tracking system for a logistics warehouse reducing inventory errors by 95%.",
                image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
                highlights: ["95% error reduction", "Real-time tracking", "Automated reports", "Mobile integration"]
            }
        ],
        technologies: ["Keyence Sensors", "Siemens PLC", "Schneider Electric", "Honeywell", "Arduino", "Raspberry Pi", "ESP32", "LoRaWAN", "MQTT", "Node-RED"],
        testimonial: { quote: "Soltech Tronix helped us transform our factory into a smart manufacturing facility with their IoT expertise.", author: "Plant Manager", company: "Manufacturing Plant" }
    },

    "soltech-talent-hub": {
        name: "Soltech Talent Hub",
        slug: "soltech-talent-hub",
        url: "https://soltechtalenthub.com",
        tagline: "Nurturing Future-Ready Talent",
        color: "#0d9488",
        description: "AI-powered learning platforms, skill development programs, recruitment services, and corporate training modules for workforce excellence.",
        longDescription: "Soltech Talent Hub offers comprehensive talent solutions including AI-powered learning platforms, internship and placement programs, skill development courses, corporate training modules, and industry certification programs. We serve colleges, universities, corporate HR departments, training institutes, job seekers, fresh graduates, MSMEs, and startups. Our partnerships with EdTech platforms, HR consultancies, and industry mentors ensure quality talent development and recruitment services.",
        heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { icon: "Brain", title: "AI-Powered Learning", description: "Digital platform for structured learning, progress tracking, and performance evaluation." },
            { icon: "Users", title: "IT Recruitment", description: "End-to-end hiring solutions for technical and non-technical roles across industries." },
            { icon: "TrendingUp", title: "Corporate Training", description: "Tailored programs to upskill teams in AI, automation, and emerging technologies." },
            { icon: "Sparkles", title: "Skill Certification", description: "Industry-recognized certifications to enhance professional and technical expertise." }
        ],
        statistics: [
            { value: "5000+", label: "Placements", description: "Successful careers" },
            { value: "100+", label: "Corporate Clients", description: "Training partners" },
            { value: "50+", label: "Training Programs", description: "Active courses" },
            { value: "95%", label: "Satisfaction Rate", description: "Trainee feedback" }
        ],
        capabilities: [
            "Talent Hiring Packages", "Skill Certification Programs", "Internship Programs",
            "Learning Management System (LMS) Access", "Corporate Training Modules", "IT & Technology Recruitment",
            "Contract Staffing & Outsourcing", "Employee Training & Upskilling (AI, IoT, ERP, Cloud, Cybersecurity)",
            "Internship & Placement Programs", "Corporate HR Solutions", "Virtual Talent Management", "Payroll Services"
        ],
        solutions: [
            {
                title: "Campus-to-Corporate Program",
                industry: "Education",
                value: "Training & Placement",
                description: "Partnered with 20+ colleges to train and place 500+ students in IT companies annually.",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
                highlights: ["20+ college partners", "500+ placements/year", "Industry curriculum", "Mentorship programs"]
            },
            {
                title: "Enterprise Upskilling Program",
                industry: "Technology",
                value: "Corporate Training",
                description: "Designed and delivered AI and Cloud training for 200+ employees of a tech enterprise.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
                highlights: ["200+ employees trained", "AI & Cloud focus", "Hands-on projects", "Certification included"]
            }
        ],
        technologies: ["Custom LMS Platform", "Zoom/Teams Integration", "LinkedIn Learning", "Coursera for Business", "HackerRank", "GitHub Classroom", "AWS Training", "Microsoft Learn", "Google Cloud Skills", "Udemy Business"],
        testimonial: { quote: "Soltech Talent Hub helped us build a strong tech team through their recruitment and training programs.", author: "HR Director", company: "Technology Enterprise" }
    }
};

// Interface with Promise type for params (Next.js 15+)
interface VerticalDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Main component
export default async function VerticalDetailPage({ params }: VerticalDetailPageProps) {
    const { slug } = await params;
    const verticalData = verticalDetailsData[slug];

    if (!verticalData) {
        notFound();
    }

    return <VerticalDetailClient vertical={verticalData} />;
}

// Metadata function
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

// Generate static params for all verticals
export async function generateStaticParams() {
    return soltechVerticals.map((vertical) => ({
        slug: vertical.slug,
    }));
}