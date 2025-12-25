// app/services/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";

// SOLTECH Services Data (same as in lib/data.ts)
const soltechServices = [
    { id: 1, title: "AI (Artificial Intelligence)", slug: "ai" },
    { id: 2, title: "IoT (Internet of Things)", slug: "iot" },
    { id: 3, title: "IT Infrastructure", slug: "it-infrastructure" },
    { id: 4, title: "Telecommunication", slug: "telecommunication" },
    { id: 5, title: "Surveillance", slug: "surveillance" },
    { id: 6, title: "Cyber Security", slug: "cyber-security" },
    { id: 7, title: "Industrial Automation", slug: "industrial-automation" },
];

// SOLTECH Service Details Data
const serviceDetailsData: Record<string, any> = {
    "ai": {
        title: "AI (Artificial Intelligence)",
        slug: "ai",
        tagline: "Empowering Future-Ready Enterprises",
        description: "Our AI services are designed to empower future-ready enterprises. From automation to deep data analysis, we deliver customized, scalable, and secure AI solutions.",
        longDescription: "At SOLTECH TechServices, we harness the power of Artificial Intelligence to transform how businesses operate, make decisions, and serve their customers. Our AI solutions are built on cutting-edge technologies including Machine Learning, Deep Learning, Natural Language Processing, and Computer Vision. We work closely with your team to understand business challenges and develop AI-powered solutions that deliver measurable ROI, enhance operational efficiency, and unlock new possibilities for growth and innovation.",
        heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Brain",
                title: "Machine Learning",
                description: "Custom ML models trained on your data to predict outcomes, automate decisions, and uncover hidden patterns in your business operations."
            },
            {
                icon: "MessageSquare",
                title: "Natural Language Processing",
                description: "Intelligent chatbots, sentiment analysis, document processing, and language understanding solutions for enhanced customer engagement."
            },
            {
                icon: "Eye",
                title: "Computer Vision",
                description: "Image and video analytics, object detection, facial recognition, and visual inspection systems for quality control and security."
            },
            {
                icon: "TrendingUp",
                title: "Predictive Analytics",
                description: "Data-driven forecasting solutions for demand planning, risk assessment, maintenance prediction, and business intelligence."
            }
        ],
        statistics: [
            { value: "50+", label: "AI Projects", description: "Successfully delivered" },
            { value: "40%", label: "Cost Reduction", description: "Average client savings" },
            { value: "98%", label: "Accuracy", description: "Model performance" },
            { value: "24/7", label: "AI Operations", description: "Continuous learning" }
        ],
        capabilities: [
            "Machine Learning Model Development",
            "Deep Learning & Neural Networks",
            "Natural Language Processing (NLP)",
            "Computer Vision Solutions",
            "Predictive Analytics",
            "AI-Powered Chatbots",
            "Recommendation Systems",
            "Anomaly Detection",
            "Process Automation (RPA + AI)",
            "AI Strategy Consulting",
            "Model Training & Optimization",
            "AI Integration Services"
        ],
        majorProjects: [
            {
                title: "Intelligent Document Processing System",
                location: "Manufacturing Sector",
                value: "Enterprise Solution",
                description: "Developed an AI-powered document processing system that automatically extracts, classifies, and routes information from invoices, purchase orders, and contracts, reducing manual processing time by 85%.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "Processes 10,000+ documents daily",
                    "99.2% extraction accuracy",
                    "Integration with ERP systems",
                    "Multi-language support"
                ]
            },
            {
                title: "Predictive Maintenance Platform",
                location: "Industrial Sector",
                value: "IoT + AI Solution",
                description: "Built a predictive maintenance system using sensor data and machine learning to forecast equipment failures before they occur, preventing costly downtime.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "30% reduction in unplanned downtime",
                    "Real-time monitoring of 500+ assets",
                    "Predictive alerts 72 hours in advance",
                    "Mobile dashboard for maintenance teams"
                ]
            }
        ],
        tools: [
            "TensorFlow",
            "PyTorch",
            "Scikit-learn",
            "OpenAI APIs",
            "Azure AI Services",
            "AWS SageMaker",
            "Google Cloud AI",
            "Hugging Face",
            "LangChain",
            "MLflow"
        ],
        testimonial: {
            quote: "SOLTECH's AI solution transformed our document processing workflow. What used to take hours now happens in minutes with incredible accuracy.",
            author: "Operations Director",
            company: "Leading Manufacturing Company"
        }
    },

    "iot": {
        title: "IoT (Internet of Things)",
        slug: "iot",
        tagline: "Connected Intelligence for Smart Enterprises",
        description: "Smart, connected services that drive automation, efficiency, and real-time insights. We deliver scalable, secure IoT ecosystems tailored for modern enterprises.",
        longDescription: "SOLTECH's IoT services empower businesses to harness the power of connected devices and data. We design, build, and manage comprehensive IoT ecosystems that transform raw sensor data into actionable business intelligence. From smart manufacturing and asset tracking to environmental monitoring and smart buildings, our IoT solutions enable real-time visibility, predictive insights, and automated operations across your entire value chain.",
        heroImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Wifi",
                title: "Device Connectivity",
                description: "Seamless integration of sensors, actuators, and devices using multiple protocols including MQTT, CoAP, HTTP, and LoRaWAN."
            },
            {
                icon: "Cloud",
                title: "IoT Platforms",
                description: "Robust cloud and edge computing platforms for data ingestion, processing, storage, and analytics at scale."
            },
            {
                icon: "Activity",
                title: "Real-Time Analytics",
                description: "Live dashboards and analytics engines that transform sensor data into actionable insights for immediate decision-making."
            },
            {
                icon: "Shield",
                title: "Security & Compliance",
                description: "End-to-end security with device authentication, encrypted communications, and compliance with industry standards."
            }
        ],
        statistics: [
            { value: "75+", label: "IoT Projects", description: "Deployed successfully" },
            { value: "100K+", label: "Devices", description: "Connected & managed" },
            { value: "99.9%", label: "Uptime", description: "Platform availability" },
            { value: "60%", label: "Efficiency Gain", description: "Average improvement" }
        ],
        capabilities: [
            "IoT Architecture Design",
            "Sensor & Device Integration",
            "Edge Computing Solutions",
            "IoT Platform Development",
            "Real-Time Data Processing",
            "Predictive Analytics",
            "Asset Tracking & Management",
            "Smart Building Solutions",
            "Industrial IoT (IIoT)",
            "Remote Monitoring Systems",
            "IoT Security Implementation",
            "Legacy System Integration"
        ],
        majorProjects: [
            {
                title: "Smart Factory Monitoring System",
                location: "Automobile Industry",
                value: "Enterprise IoT",
                description: "Implemented a comprehensive IoT solution connecting 200+ machines across multiple production lines, enabling real-time monitoring, predictive maintenance, and automated quality control.",
                image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "Real-time OEE monitoring",
                    "35% reduction in downtime",
                    "Automated production reporting",
                    "Integration with MES systems"
                ]
            },
            {
                title: "Smart Agriculture Platform",
                location: "Agriculture Sector",
                value: "AgriTech Solution",
                description: "Developed an IoT-based precision agriculture system with soil sensors, weather stations, and automated irrigation, improving crop yields and water efficiency.",
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "50+ farm deployments",
                    "40% water savings",
                    "Mobile app for farmers",
                    "Weather-based automation"
                ]
            }
        ],
        tools: [
            "AWS IoT Core",
            "Azure IoT Hub",
            "MQTT Brokers",
            "Node-RED",
            "Grafana",
            "InfluxDB",
            "Raspberry Pi",
            "Arduino",
            "LoRaWAN Gateways",
            "Edge Computing Devices"
        ],
        testimonial: {
            quote: "The IoT platform SOLTECH built for us provides real-time visibility into our entire manufacturing process. It's been a game-changer for our operations.",
            author: "Plant Manager",
            company: "Automobile Manufacturing Company"
        }
    },

    "it-infrastructure": {
        title: "IT Infrastructure",
        slug: "it-infrastructure",
        tagline: "Building Future-Ready Digital Foundations",
        description: "Secure, scalable, and future-ready IT infrastructure from cloud to on-premise. We ensure seamless operations, robust connectivity, and strategic growth.",
        longDescription: "SOLTECH's IT Infrastructure services provide the robust foundation your business needs to thrive in the digital age. We design, implement, and manage comprehensive IT environments that combine on-premise systems with cloud technologies, ensuring high availability, security, and scalability. Our team of certified infrastructure experts delivers solutions that optimize performance, reduce costs, and enable your organization to adapt quickly to changing business needs.",
        heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Cloud",
                title: "Cloud Solutions",
                description: "Expert implementation and management of AWS, Azure, and Google Cloud environments with cost optimization and security best practices."
            },
            {
                icon: "Server",
                title: "Server & Storage",
                description: "High-performance server infrastructure and storage solutions designed for reliability, scalability, and optimal performance."
            },
            {
                icon: "Network",
                title: "Network Design",
                description: "Enterprise-grade network architecture with robust security, high availability, and seamless connectivity across locations."
            },
            {
                icon: "RefreshCw",
                title: "Disaster Recovery",
                description: "Comprehensive backup and disaster recovery solutions ensuring business continuity with minimal downtime and data loss."
            }
        ],
        statistics: [
            { value: "120+", label: "Infra Projects", description: "Successfully delivered" },
            { value: "99.99%", label: "Uptime", description: "SLA achievement" },
            { value: "45%", label: "Cost Savings", description: "Cloud optimization" },
            { value: "24/7", label: "Support", description: "Monitoring & management" }
        ],
        capabilities: [
            "Cloud Migration Services (AWS, Azure, GCP)",
            "Hybrid Cloud Architecture",
            "Server Virtualization",
            "Network Design & Implementation",
            "Data Center Solutions",
            "Storage & Backup Systems",
            "Disaster Recovery Planning",
            "Infrastructure Monitoring (24/7)",
            "Performance Optimization",
            "Security Hardening",
            "DevOps & CI/CD Pipelines",
            "Infrastructure as Code (IaC)"
        ],
        majorProjects: [
            {
                title: "Enterprise Cloud Migration",
                location: "Healthcare Sector",
                value: "Multi-Cloud Solution",
                description: "Migrated a complete on-premise infrastructure to a hybrid cloud environment, achieving 50% cost reduction while improving performance and compliance.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "Zero-downtime migration",
                    "HIPAA compliant architecture",
                    "50% infrastructure cost reduction",
                    "Improved disaster recovery"
                ]
            },
            {
                title: "High-Availability Data Center",
                location: "Financial Services",
                value: "Enterprise Infrastructure",
                description: "Designed and implemented a fully redundant data center infrastructure with 99.999% uptime SLA for critical banking applications.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "Active-active configuration",
                    "Sub-second failover",
                    "Comprehensive monitoring",
                    "Automated scaling"
                ]
            }
        ],
        tools: [
            "Amazon Web Services (AWS)",
            "Microsoft Azure",
            "Google Cloud Platform",
            "VMware vSphere",
            "Kubernetes",
            "Docker",
            "Terraform",
            "Ansible",
            "Prometheus & Grafana",
            "Cisco & Juniper Networks"
        ],
        testimonial: {
            quote: "SOLTECH's infrastructure team helped us migrate to the cloud seamlessly. Our systems are now more reliable, secure, and cost-effective than ever.",
            author: "CTO",
            company: "Healthcare Technology Company"
        }
    },

    "telecommunication": {
        title: "Telecommunication",
        slug: "telecommunication",
        tagline: "Seamless Connectivity for Modern Business",
        description: "Secure, scalable, and high-speed communication infrastructure. From unified communication systems to advanced networking solutions.",
        longDescription: "SOLTECH's Telecommunication services provide the connectivity backbone that modern enterprises need to collaborate effectively and serve customers seamlessly. We design and implement comprehensive communication solutions including VoIP systems, video conferencing platforms, unified communications, and advanced networking infrastructure. Our solutions ensure crystal-clear voice quality, reliable video conferencing, and secure data transmission across your entire organization.",
        heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Phone",
                title: "VoIP & Unified Communications",
                description: "Enterprise-grade VoIP solutions with integrated messaging, presence, and collaboration tools for seamless team communication."
            },
            {
                icon: "Video",
                title: "Video Conferencing",
                description: "High-quality video conferencing solutions with screen sharing, recording, and integration with existing collaboration platforms."
            },
            {
                icon: "Globe",
                title: "Network Connectivity",
                description: "High-speed, reliable network connectivity solutions including MPLS, SD-WAN, and dedicated internet access."
            },
            {
                icon: "Lock",
                title: "Secure Communications",
                description: "End-to-end encrypted communications ensuring privacy and compliance with industry regulations."
            }
        ],
        statistics: [
            { value: "80+", label: "Telecom Projects", description: "Deployed successfully" },
            { value: "50K+", label: "Users", description: "Connected & supported" },
            { value: "99.9%", label: "Call Quality", description: "HD voice clarity" },
            { value: "40%", label: "Cost Savings", description: "Communication costs" }
        ],
        capabilities: [
            "VoIP System Implementation",
            "Unified Communications (UC)",
            "Video Conferencing Solutions",
            "Contact Center Solutions",
            "SD-WAN Implementation",
            "MPLS Network Design",
            "SIP Trunking",
            "PBX Migration",
            "Network Optimization",
            "Collaboration Platforms",
            "Mobile Communication Solutions",
            "Communication Analytics"
        ],
        majorProjects: [
            {
                title: "Enterprise UC Platform",
                location: "Multi-Location Enterprise",
                value: "Unified Communications",
                description: "Implemented a comprehensive unified communications platform connecting 15 offices across India with voice, video, and messaging integration.",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "15 locations connected",
                    "5,000+ users onboarded",
                    "MS Teams integration",
                    "50% reduction in telecom costs"
                ]
            },
            {
                title: "Cloud Contact Center",
                location: "Retail Sector",
                value: "CCaaS Solution",
                description: "Deployed a cloud-based contact center with omnichannel support, AI-powered routing, and real-time analytics for customer service excellence.",
                image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "Omnichannel support (Voice, Chat, Email)",
                    "AI-powered call routing",
                    "Real-time dashboards",
                    "30% improvement in CSAT"
                ]
            }
        ],
        tools: [
            "Cisco Unified Communications",
            "Microsoft Teams",
            "Zoom",
            "Avaya",
            "Genesys Cloud",
            "Twilio",
            "Asterisk",
            "3CX",
            "SD-WAN Solutions",
            "SIP Providers"
        ],
        testimonial: {
            quote: "SOLTECH modernized our entire communication infrastructure. Crystal clear calls, reliable video conferencing, and significant cost savings.",
            author: "IT Director",
            company: "Multi-Location Retail Chain"
        }
    },

    "surveillance": {
        title: "Surveillance",
        slug: "surveillance",
        tagline: "Intelligent Security for Complete Protection",
        description: "Advanced surveillance solutions designed to protect assets, ensure safety, and deliver actionable intelligence with cutting-edge technology.",
        longDescription: "SOLTECH's Surveillance solutions provide comprehensive security coverage for enterprises, commercial spaces, and critical infrastructure. We combine cutting-edge camera technology with AI-powered analytics to deliver more than just video recording – we provide intelligent security systems that detect threats, analyze behavior, and enable proactive response. Our solutions are designed to scale from single-site deployments to enterprise-wide security ecosystems.",
        heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Camera",
                title: "Advanced CCTV Systems",
                description: "High-definition IP cameras with night vision, PTZ capabilities, and weather-resistant designs for indoor and outdoor environments."
            },
            {
                icon: "Eye",
                title: "AI Video Analytics",
                description: "Intelligent video analytics including facial recognition, object detection, behavior analysis, and automated alerts."
            },
            {
                icon: "Fingerprint",
                title: "Access Control",
                description: "Integrated access control systems with biometric authentication, card readers, and visitor management."
            },
            {
                icon: "Monitor",
                title: "Central Monitoring",
                description: "24/7 command center capabilities with multi-site monitoring, incident management, and remote access."
            }
        ],
        statistics: [
            { value: "80+", label: "Security Projects", description: "Deployed successfully" },
            { value: "10K+", label: "Cameras", description: "Installed & managed" },
            { value: "95%", label: "Threat Detection", description: "Accuracy rate" },
            { value: "24/7", label: "Monitoring", description: "Available support" }
        ],
        capabilities: [
            "IP Camera Installation",
            "CCTV System Design",
            "Video Management Systems (VMS)",
            "AI-Powered Video Analytics",
            "Facial Recognition Systems",
            "License Plate Recognition (ANPR)",
            "Access Control Systems",
            "Biometric Solutions",
            "Intrusion Detection",
            "Central Monitoring Stations",
            "Remote Surveillance",
            "Video Storage Solutions"
        ],
        majorProjects: [
            {
                title: "Smart Campus Security",
                location: "Educational Institution",
                value: "Integrated Security",
                description: "Implemented a comprehensive surveillance system across a 50-acre campus with 500+ cameras, AI analytics, and integrated access control.",
                image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "500+ IP cameras installed",
                    "AI-powered threat detection",
                    "Mobile security app",
                    "Integration with emergency systems"
                ]
            },
            {
                title: "Retail Loss Prevention",
                location: "Retail Chain",
                value: "Smart Surveillance",
                description: "Deployed an intelligent surveillance solution across 25 retail stores with POS integration, behavior analytics, and centralized monitoring.",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "25 stores covered",
                    "POS exception reporting",
                    "Customer counting analytics",
                    "40% reduction in shrinkage"
                ]
            }
        ],
        tools: [
            "Hikvision",
            "Dahua",
            "Axis Communications",
            "Milestone VMS",
            "Genetec",
            "BriefCam Analytics",
            "HID Access Control",
            "ZKTeco Biometrics",
            "NVR/DVR Systems",
            "Cloud Video Storage"
        ],
        testimonial: {
            quote: "The AI-powered surveillance system SOLTECH implemented has transformed our security operations. We can now detect and respond to threats before they escalate.",
            author: "Security Director",
            company: "Large Educational Institution"
        }
    },

    "cyber-security": {
        title: "Cyber Security",
        slug: "cyber-security",
        tagline: "Defending What Matters Most",
        description: "Enterprise-grade security services that detect, defend, and respond with precision. Protecting your data, infrastructure, and reputation.",
        longDescription: "In an era of evolving cyber threats, SOLTECH's Cyber Security services provide comprehensive protection for your organization's most valuable assets. Our security experts combine advanced technologies with proven methodologies to identify vulnerabilities, implement robust defenses, and respond swiftly to incidents. From compliance management to 24/7 threat monitoring, we ensure your business remains secure, resilient, and compliant with global standards.",
        heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Shield",
                title: "Threat Detection & Response",
                description: "24/7 Security Operations Center (SOC) with advanced threat detection, real-time monitoring, and rapid incident response."
            },
            {
                icon: "Search",
                title: "Vulnerability Assessment",
                description: "Comprehensive security assessments including penetration testing, vulnerability scanning, and risk analysis."
            },
            {
                icon: "Lock",
                title: "Data Protection",
                description: "Enterprise data protection solutions including encryption, DLP, and secure access management."
            },
            {
                icon: "FileCheck",
                title: "Compliance Management",
                description: "Ensuring compliance with GDPR, ISO 27001, PCI-DSS, HIPAA, and other regulatory requirements."
            }
        ],
        statistics: [
            { value: "100+", label: "Security Projects", description: "Successfully delivered" },
            { value: "99%", label: "Threat Prevention", description: "Attack mitigation rate" },
            { value: "15 min", label: "Response Time", description: "Average incident response" },
            { value: "24/7", label: "SOC Coverage", description: "Continuous monitoring" }
        ],
        capabilities: [
            "Security Operations Center (SOC)",
            "Threat Intelligence",
            "Penetration Testing",
            "Vulnerability Assessment",
            "Security Audits",
            "Incident Response",
            "Data Loss Prevention (DLP)",
            "Identity & Access Management",
            "Endpoint Protection",
            "Network Security",
            "Cloud Security",
            "Security Awareness Training"
        ],
        majorProjects: [
            {
                title: "Enterprise Security Transformation",
                location: "Financial Services",
                value: "Complete Security Overhaul",
                description: "Implemented a comprehensive security program including SOC services, zero-trust architecture, and compliance management for a leading financial institution.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "Zero-trust architecture implementation",
                    "24/7 SOC services",
                    "ISO 27001 certification achieved",
                    "95% reduction in security incidents"
                ]
            },
            {
                title: "Healthcare Data Protection",
                location: "Healthcare Provider",
                value: "HIPAA Compliance",
                description: "Designed and implemented a data protection framework ensuring HIPAA compliance and securing sensitive patient data across multiple facilities.",
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "End-to-end encryption",
                    "Access control implementation",
                    "Security awareness program",
                    "Full HIPAA compliance"
                ]
            }
        ],
        tools: [
            "Splunk",
            "CrowdStrike",
            "Palo Alto Networks",
            "Fortinet",
            "Qualys",
            "Tenable",
            "Microsoft Defender",
            "Okta",
            "CyberArk",
            "Wireshark"
        ],
        testimonial: {
            quote: "SOLTECH's security team provides peace of mind. Their 24/7 monitoring and rapid incident response have protected us from multiple potential breaches.",
            author: "CISO",
            company: "Financial Services Firm"
        }
    },

    "industrial-automation": {
        title: "Industrial Automation",
        slug: "industrial-automation",
        tagline: "Smart Manufacturing for the Future",
        description: "Smart technologies and real-time control systems for manufacturing optimization. Increase efficiency, reduce downtime, and drive precision.",
        longDescription: "SOLTECH's Industrial Automation solutions transform manufacturing operations through intelligent automation, real-time control systems, and seamless integration. We help manufacturers achieve Industry 4.0 readiness by combining SCADA systems, PLCs, robotics, and IoT sensors into cohesive automation ecosystems. Our solutions enable predictive maintenance, optimize production processes, and deliver the visibility needed to make data-driven decisions at every stage of manufacturing.",
        heroImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            {
                icon: "Cpu",
                title: "SCADA & PLC Systems",
                description: "Advanced supervisory control and data acquisition systems with programmable logic controllers for process automation."
            },
            {
                icon: "Bot",
                title: "Robotics Integration",
                description: "Industrial robot programming, integration, and optimization for assembly, welding, painting, and material handling."
            },
            {
                icon: "Activity",
                title: "Process Optimization",
                description: "Data-driven process optimization using real-time analytics, digital twins, and machine learning algorithms."
            },
            {
                icon: "Wrench",
                title: "Predictive Maintenance",
                description: "IoT-enabled predictive maintenance solutions that prevent failures and optimize maintenance schedules."
            }
        ],
        statistics: [
            { value: "60+", label: "Automation Projects", description: "Successfully delivered" },
            { value: "35%", label: "Efficiency Gain", description: "Average improvement" },
            { value: "50%", label: "Downtime Reduction", description: "Through predictive maintenance" },
            { value: "25%", label: "Cost Savings", description: "Operational costs" }
        ],
        capabilities: [
            "SCADA System Design & Implementation",
            "PLC Programming",
            "HMI Development",
            "Industrial Robotics",
            "Motion Control Systems",
            "Process Control",
            "MES Integration",
            "Digital Twin Implementation",
            "Predictive Maintenance",
            "Industrial IoT (IIoT)",
            "Factory Automation",
            "Quality Control Systems"
        ],
        majorProjects: [
            {
                title: "Smart Factory Implementation",
                location: "Automobile Manufacturing",
                value: "Industry 4.0",
                description: "Complete Industry 4.0 transformation of a manufacturing facility with SCADA, robotics integration, and real-time production monitoring.",
                image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "10 robotic work cells integrated",
                    "Real-time OEE monitoring",
                    "40% productivity improvement",
                    "Paperless manufacturing"
                ]
            },
            {
                title: "Packaging Line Automation",
                location: "FMCG Sector",
                value: "Complete Automation",
                description: "Automated a high-speed packaging line with vision-based quality inspection, robotic palletizing, and integrated line control.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
                highlights: [
                    "300 units/minute throughput",
                    "Vision-based inspection",
                    "Robotic palletizing",
                    "99.9% packaging accuracy"
                ]
            }
        ],
        tools: [
            "Siemens SIMATIC",
            "Allen-Bradley/Rockwell",
            "ABB Robotics",
            "FANUC",
            "Wonderware",
            "Ignition SCADA",
            "FactoryTalk",
            "OSIsoft PI",
            "Industrial PLCs",
            "Industrial HMIs"
        ],
        testimonial: {
            quote: "SOLTECH's automation expertise helped us achieve Industry 4.0 readiness. Our factory is now smarter, more efficient, and produces higher quality products.",
            author: "VP Manufacturing",
            company: "Leading Automobile Manufacturer"
        }
    }
};

interface ServiceDetailPageProps {
    params: {
        slug: string;
    };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const { slug } = params;
    const serviceData = serviceDetailsData[slug];

    if (!serviceData) {
        notFound();
    }

    return <ServiceDetailClient service={serviceData} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = serviceDetailsData[slug];

    if (!service) {
        return { title: 'Service Not Found' };
    }

    const title = `${service.title} Services | SOLTECH TechServices`;
    const description = service.description || `Expert ${service.title} services by SOLTECH TechServices.`;

    return {
        title,
        description,
        keywords: `${service.title}, technology consulting, IT services, ${service.capabilities[0]}`,
        openGraph: {
            title: `${service.title} | SOLTECH TechServices`,
            description: service.tagline,
            url: `https://soltechtechservices.com/services/${slug}`,
            images: [{ url: service.heroImage || '/images/og-image.jpg' }],
        },
        alternates: { canonical: `https://soltechtechservices.com/services/${slug}` },
    };
}

// Generate static params for all services
export async function generateStaticParams() {
    return soltechServices.map((service) => ({
        slug: service.slug,
    }));
}