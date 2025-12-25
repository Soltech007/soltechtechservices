// app/technologies/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import TechnologyDetailClient from "@/components/TechnologyDetail";

// Technologies for static params
const soltechTechnologies = [
    { id: 1, title: "Cloud Computing", slug: "cloud-computing" },
    { id: 2, title: "Artificial Intelligence", slug: "artificial-intelligence" },
    { id: 3, title: "Web Development", slug: "web-development" },
    { id: 4, title: "IoT & Embedded Systems", slug: "iot-embedded" },
    { id: 5, title: "AI & Automation", slug: "ai-automation" },
    { id: 6, title: "Cyber Security", slug: "cyber-security" },
    { id: 7, title: "Database & Analytics", slug: "database-analytics" },
];

// Technology Details Data
const technologyDetailsData: Record<string, any> = {
    "cloud-computing": {
        title: "Cloud Computing",
        slug: "cloud-computing",
        tagline: "Scale Without Limits",
        icon: "Cloud",
        description: "AWS, Azure, Google Cloud Platform - scalable cloud infrastructure solutions for modern enterprises.",
        longDescription: "Our cloud computing expertise enables businesses to leverage the full power of cloud platforms. We design, implement, and manage cloud infrastructures that are secure, scalable, and cost-optimized. Whether you're looking to migrate existing workloads, build cloud-native applications, or optimize your current cloud spend, our certified cloud architects deliver solutions that drive business agility and innovation.",
        heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { title: "Multi-Cloud Strategy", description: "Design and implement strategies across AWS, Azure, and GCP for optimal performance and cost." },
            { title: "Cloud Migration", description: "Seamless migration of workloads with minimal downtime and risk mitigation." },
            { title: "Infrastructure as Code", description: "Terraform, CloudFormation, and Pulumi for automated, repeatable deployments." },
            { title: "Serverless Architecture", description: "Lambda, Azure Functions, Cloud Functions for event-driven, scalable applications." },
            { title: "Container Orchestration", description: "Kubernetes and ECS/EKS for containerized application management." },
            { title: "Cost Optimization", description: "FinOps practices to monitor, analyze, and reduce cloud spending." },
        ],
        statistics: [
            { value: "40%", label: "Cost Reduction", description: "Average cloud savings" },
            { value: "99.99%", label: "Uptime", description: "Infrastructure reliability" },
            { value: "3x", label: "Faster Deployment", description: "With automation" },
            { value: "100+", label: "Cloud Projects", description: "Successfully delivered" },
        ],
        technologies: [
            "Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform", 
            "Terraform", "Kubernetes", "Docker", "CloudFormation", "Ansible",
            "AWS Lambda", "Azure Functions", "Cloud Run", "EKS/ECS"
        ],
        useCases: [
            {
                title: "Enterprise Cloud Migration",
                description: "Migrated 50+ legacy applications to AWS with zero downtime, reducing infrastructure costs by 45%.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Serverless Data Pipeline",
                description: "Built a serverless ETL pipeline processing 10TB+ daily data using AWS Lambda and Step Functions.",
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
            }
        ],
        certifications: ["AWS Solutions Architect", "Azure Administrator", "Google Cloud Professional", "Kubernetes Administrator"],
    },

    "artificial-intelligence": {
        title: "Artificial Intelligence",
        slug: "artificial-intelligence",
        tagline: "Intelligence That Delivers",
        icon: "Cpu",
        description: "Machine Learning, Deep Learning, NLP, and Computer Vision solutions that transform businesses.",
        longDescription: "We build AI solutions that automate complex processes, enhance decision-making, and create competitive advantages. Our AI expertise spans machine learning, deep learning, natural language processing, and computer vision. From predictive analytics to intelligent chatbots, we help organizations harness the power of AI to solve real business challenges and unlock new opportunities.",
        heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { title: "Machine Learning", description: "Custom ML models for prediction, classification, and pattern recognition." },
            { title: "Natural Language Processing", description: "Text analysis, sentiment analysis, chatbots, and language understanding." },
            { title: "Computer Vision", description: "Image recognition, object detection, and visual inspection systems." },
            { title: "Predictive Analytics", description: "Data-driven forecasting and trend analysis for business intelligence." },
            { title: "AI Chatbots", description: "Intelligent conversational agents for customer service and automation." },
            { title: "MLOps", description: "End-to-end ML pipeline management from development to production." },
        ],
        statistics: [
            { value: "85%", label: "Accuracy", description: "Average model performance" },
            { value: "50+", label: "AI Projects", description: "Delivered successfully" },
            { value: "70%", label: "Automation", description: "Process automation achieved" },
            { value: "3x", label: "Efficiency", description: "Productivity improvement" },
        ],
        technologies: [
            "TensorFlow", "PyTorch", "OpenAI GPT", "LangChain", "Hugging Face",
            "scikit-learn", "Keras", "NLTK", "SpaCy", "OpenCV",
            "AWS SageMaker", "Azure ML", "Google Vertex AI"
        ],
        useCases: [
            {
                title: "Intelligent Customer Service",
                description: "Deployed AI chatbot handling 70% of customer queries with 95% satisfaction rate.",
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Predictive Maintenance",
                description: "Built ML model predicting equipment failures 72 hours ahead, reducing downtime by 45%.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
            }
        ],
        certifications: ["TensorFlow Developer", "AWS ML Specialty", "Azure AI Engineer", "Google ML Engineer"],
    },

    "web-development": {
        title: "Web Development",
        slug: "web-development",
        tagline: "Modern Web Experiences",
        icon: "Globe",
        description: "React, Next.js, Node.js - modern, responsive, and scalable web applications.",
        longDescription: "We build web applications that are fast, secure, and scalable. Our expertise in modern frameworks like React, Next.js, and Node.js enables us to create exceptional user experiences. From progressive web apps to complex enterprise platforms, we deliver solutions that perform flawlessly across all devices and browsers.",
        heroImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { title: "React & Next.js", description: "Modern, SEO-friendly, server-side rendered applications." },
            { title: "Node.js Backend", description: "Scalable, event-driven server-side development." },
            { title: "Progressive Web Apps", description: "Native-like experiences with offline capability." },
            { title: "API Development", description: "RESTful and GraphQL APIs for seamless integration." },
            { title: "Responsive Design", description: "Mobile-first, adaptive layouts for all devices." },
            { title: "Performance Optimization", description: "Core Web Vitals optimization for speed." },
        ],
        statistics: [
            { value: "200+", label: "Web Projects", description: "Successfully delivered" },
            { value: "95+", label: "Performance Score", description: "Average Lighthouse score" },
            { value: "50ms", label: "Response Time", description: "Average API latency" },
            { value: "100%", label: "Responsive", description: "Cross-device compatibility" },
        ],
        technologies: [
            "React.js", "Next.js", "Vue.js", "Node.js", "Express.js",
            "TypeScript", "GraphQL", "REST APIs", "Tailwind CSS",
            "PostgreSQL", "MongoDB", "Redis", "Prisma"
        ],
        useCases: [
            {
                title: "E-commerce Platform",
                description: "Built a Next.js e-commerce platform handling 100K+ daily users with 99.9% uptime.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Enterprise Dashboard",
                description: "Developed real-time analytics dashboard with React, processing 1M+ data points.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
            }
        ],
        certifications: ["AWS Developer", "Meta React Developer", "Node.js Certified Developer"],
    },

    "iot-embedded": {
        title: "IoT & Embedded Systems",
        slug: "iot-embedded",
        tagline: "Connected Device Solutions",
        icon: "Zap",
        description: "Arduino, Raspberry Pi, ESP32 - connected device solutions for smart automation.",
        longDescription: "We design and develop IoT solutions that connect the physical and digital worlds. Our expertise in embedded systems, sensors, and connectivity protocols enables us to create smart devices and automation systems that collect data, enable remote monitoring, and drive operational efficiency across industries.",
        heroImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { title: "Sensor Integration", description: "Temperature, humidity, motion, and industrial sensors." },
            { title: "Edge Computing", description: "Local data processing for real-time decisions." },
            { title: "Connectivity", description: "WiFi, Bluetooth, LoRaWAN, Zigbee, and cellular." },
            { title: "Cloud Integration", description: "AWS IoT, Azure IoT Hub, Google IoT Core." },
            { title: "Remote Monitoring", description: "Real-time dashboards and alerts." },
            { title: "Firmware Development", description: "Embedded C/C++ for microcontrollers." },
        ],
        statistics: [
            { value: "10K+", label: "Devices", description: "Connected and managed" },
            { value: "50+", label: "IoT Projects", description: "Successfully deployed" },
            { value: "99.5%", label: "Uptime", description: "Device reliability" },
            { value: "5ms", label: "Latency", description: "Edge processing speed" },
        ],
        technologies: [
            "Arduino", "Raspberry Pi", "ESP32", "STM32",
            "MQTT", "CoAP", "LoRaWAN", "Zigbee", "BLE",
            "AWS IoT Core", "Azure IoT Hub", "Node-RED"
        ],
        useCases: [
            {
                title: "Smart Agriculture",
                description: "Deployed 500+ soil sensors with automated irrigation, saving 40% water usage.",
                image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Industrial Monitoring",
                description: "Built vibration monitoring system for 100+ machines with predictive maintenance.",
                image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=800&auto=format&fit=crop"
            }
        ],
        certifications: ["AWS IoT Specialty", "Embedded Systems Professional"],
    },

    "ai-automation": {
        title: "AI & Automation",
        slug: "ai-automation",
        tagline: "Automate Everything",
        icon: "Code",
        description: "AI-driven automation, CI/CD pipelines, Docker & Kubernetes for faster deployments.",
        longDescription: "We combine AI with automation to streamline development and operations. Our DevOps and automation expertise helps organizations achieve faster deployments, improved reliability, and reduced operational overhead. From CI/CD pipelines to intelligent process automation, we build systems that work smarter.",
        heroImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { title: "CI/CD Pipelines", description: "Automated build, test, and deployment workflows." },
            { title: "Container Orchestration", description: "Docker and Kubernetes for scalable deployments." },
            { title: "Infrastructure Automation", description: "Terraform and Ansible for IaC." },
            { title: "Process Automation", description: "RPA and AI-driven workflow automation." },
            { title: "Monitoring & Alerting", description: "Prometheus, Grafana, and ELK stack." },
            { title: "GitOps", description: "Git-based infrastructure and application management." },
        ],
        statistics: [
            { value: "10x", label: "Faster Deploys", description: "With automation" },
            { value: "90%", label: "Manual Work Reduced", description: "Through automation" },
            { value: "99.9%", label: "Pipeline Success", description: "Deployment reliability" },
            { value: "24/7", label: "Monitoring", description: "Continuous observability" },
        ],
        technologies: [
            "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI",
            "Terraform", "Ansible", "ArgoCD", "Helm",
            "Prometheus", "Grafana", "ELK Stack", "Datadog"
        ],
        useCases: [
            {
                title: "DevOps Transformation",
                description: "Implemented full CI/CD pipeline reducing deployment time from days to minutes.",
                image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "RPA Implementation",
                description: "Automated 50+ manual processes saving 1000+ hours monthly.",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
            }
        ],
        certifications: ["Kubernetes Administrator", "AWS DevOps Professional", "Docker Certified"],
    },

    "cyber-security": {
        title: "Cyber Security",
        slug: "cyber-security",
        tagline: "Enterprise Protection",
        icon: "Shield",
        description: "Penetration testing, SIEM, security audits - enterprise-grade protection.",
        longDescription: "We provide comprehensive cybersecurity solutions that protect your business from evolving threats. Our security experts conduct thorough assessments, implement robust defenses, and establish continuous monitoring to ensure your assets remain secure. From compliance to incident response, we've got you covered.",
        heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { title: "Penetration Testing", description: "Ethical hacking to identify vulnerabilities." },
            { title: "SIEM & SOC", description: "Security monitoring and incident response." },
            { title: "Compliance", description: "ISO 27001, GDPR, HIPAA, PCI-DSS compliance." },
            { title: "Network Security", description: "Firewall, VPN, and intrusion detection." },
            { title: "Application Security", description: "SAST, DAST, and secure code review." },
            { title: "Security Training", description: "Employee awareness and phishing simulations." },
        ],
        statistics: [
            { value: "500+", label: "Vulnerabilities", description: "Identified and fixed" },
            { value: "100%", label: "Compliance", description: "Audit success rate" },
            { value: "24/7", label: "Monitoring", description: "Security operations" },
            { value: "0", label: "Breaches", description: "For our clients" },
        ],
        technologies: [
            "Splunk", "QRadar", "Palo Alto", "Fortinet", "CrowdStrike",
            "Nessus", "Burp Suite", "Metasploit", "OWASP ZAP",
            "Snort", "Suricata", "Wireshark"
        ],
        useCases: [
            {
                title: "SOC Implementation",
                description: "Built 24/7 Security Operations Center monitoring 10,000+ endpoints.",
                image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "Compliance Achievement",
                description: "Helped fintech achieve PCI-DSS and SOC2 compliance in 3 months.",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
            }
        ],
        certifications: ["CISSP", "CEH", "OSCP", "CompTIA Security+", "AWS Security Specialty"],
    },

    "database-analytics": {
        title: "Database & Analytics",
        slug: "database-analytics",
        tagline: "Data-Driven Insights",
        icon: "Database",
        description: "PostgreSQL, MongoDB, Power BI - data-driven insights and analytics solutions.",
        longDescription: "We help organizations unlock the value of their data through robust database solutions and powerful analytics. From designing scalable data architectures to building interactive dashboards, we enable data-driven decision making that drives business growth and operational excellence.",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        keyFeatures: [
            { title: "Database Design", description: "Scalable, optimized database architectures." },
            { title: "Data Warehousing", description: "Snowflake, Redshift, BigQuery solutions." },
            { title: "ETL Pipelines", description: "Automated data extraction and transformation." },
            { title: "Business Intelligence", description: "Power BI, Tableau, Looker dashboards." },
            { title: "Real-time Analytics", description: "Streaming data processing and analysis." },
            { title: "Data Governance", description: "Quality, security, and compliance management." },
        ],
        statistics: [
            { value: "10TB+", label: "Data Processed", description: "Daily processing capacity" },
            { value: "100+", label: "Dashboards", description: "Built and deployed" },
            { value: "5x", label: "Query Speed", description: "Performance improvement" },
            { value: "99.9%", label: "Data Accuracy", description: "After implementation" },
        ],
        technologies: [
            "PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch",
            "Snowflake", "AWS Redshift", "Google BigQuery",
            "Apache Kafka", "Apache Spark", "Airflow",
            "Power BI", "Tableau", "Looker"
        ],
        useCases: [
            {
                title: "Data Lake Implementation",
                description: "Built enterprise data lake processing 50TB+ data with real-time analytics.",
                image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop"
            },
            {
                title: "BI Dashboard Suite",
                description: "Created 50+ executive dashboards driving $10M+ in business decisions.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
            }
        ],
        certifications: ["AWS Database Specialty", "Snowflake Certified", "Google Data Engineer", "Tableau Desktop Specialist"],
    },
};

interface TechnologyDetailPageProps {
    params: {
        slug: string;
    };
}

export default async function TechnologyDetailPage({ params }: TechnologyDetailPageProps) {
    const { slug } = params;
    const technologyData = technologyDetailsData[slug];

    if (!technologyData) {
        notFound();
    }

    return <TechnologyDetailClient technology={technologyData} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const technology = technologyDetailsData[slug];

    if (!technology) {
        return { title: 'Technology Not Found' };
    }

    return {
        title: `${technology.title} | SOLTECH Technologies`,
        description: technology.description,
        keywords: `${technology.title}, ${technology.tagline}, SOLTECH technologies`,
        openGraph: {
            title: `${technology.title} | SOLTECH TechServices`,
            description: technology.tagline,
            url: `https://soltechtechservices.com/technologies/${slug}`,
            images: [{ url: technology.heroImage }],
        },
        alternates: { canonical: `https://soltechtechservices.com/technologies/${slug}` },
    };
}

export async function generateStaticParams() {
    return soltechTechnologies.map((tech) => ({
        slug: tech.slug,
    }));
}