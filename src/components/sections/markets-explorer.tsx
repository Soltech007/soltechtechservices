"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Bolt,
    Leaf,
    Factory,
    Pickaxe,
    Shield,
    Atom,
    Building2,
    LucideArrowRightToLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/api/categories";

/* ---------------- Types ---------------- */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "border-infrastructure": Shield,
    "road-construction": LucideArrowRightToLine,
    "civil-contracts": Building2,
    "renewable-energy": Leaf,
    energy: Bolt,
    "environmental-cleanup": Leaf,
    "manufacturing-technology": Factory,
    "mining-critical-minerals": Pickaxe,
    "national-defense-security": Shield,
    nuclear: Atom,
    infrastructure: Building2,
};

function transformCategoriesToMarkets(categories: Category[]): MarketContent[] {
    return categories.map((cat) => ({
        key: cat.category_slug as MarketKey,
        title: cat.category_name,
        description: cat.tagline || "Explore our expertise in this domain",
        hero: {
            imageUrl:
                cat.banner_image ||
                cat.thumbnail_image ||
                "https://via.placeholder.com/800x600/eee/666?text=No+Image",
            alt: cat.category_name,
        },
        icon: iconMap[cat.category_slug] || Building2,
    }));
}

function transformProjectsToDisplay(projects: any[]): ProjectDisplay[] {
    return projects.map((proj) => ({
        id: proj.project_id,
        title: proj.project_name,
        location: proj.location || "India",
        description: proj.tagline || "Strategic infrastructure project",
        image: {
            imageUrl:
                proj.thumbnail_image ||
                "https://via.placeholder.com/800x600/eee/666?text=No+Image",
            description: proj.tagline || proj.project_name,
        },
        market: proj.category_slug as MarketKey,
        href: `/projects/${proj.project_slug}`,
    }));
}

/* ---------------- Type Declarations ---------------- */

type MarketKey = string;

type ProjectImage = {
    imageUrl: string;
    description?: string;
    imageHint?: string;
};

type ProjectDisplay = {
    id: string | number;
    title: string;
    location?: string;
    description?: string;
    image: ProjectImage;
    market: MarketKey;
    href?: string;
};

type MarketContent = {
    key: MarketKey;
    title: string;
    description: string;
    hero: { imageUrl: string; alt: string };
    icon?: React.ComponentType<{ className?: string }>;
};

/* ---------------- Main Component ---------------- */

export default function MarketsExplorer({
    categories = [],
    projects = [],
}: {
    categories?: any[];
    projects?: any[];
}) {
    const markets = useMemo(() => transformCategoriesToMarkets(categories), [categories]);
    const displayProjects = useMemo(() => transformProjectsToDisplay(projects), [projects]);

    const [selectedMarket, setSelectedMarket] = useState<MarketKey>(
        markets.length > 0 ? markets[0].key : ""
    );
    const [topOffset, setTopOffset] = useState(0);
    const [visibleMobileHeaders, setVisibleMobileHeaders] = useState<Set<MarketKey>>(new Set());
    const [headerVisible, setHeaderVisible] = useState(true);
    const filterBarRef = useRef<HTMLDivElement>(null);

    const projectsByMarket = useMemo(() => {
        const map = new Map<MarketKey, ProjectDisplay[]>();
        markets.forEach((m) => map.set(m.key, []));
        displayProjects.forEach((p) => {
            if (!map.has(p.market)) map.set(p.market, []);
            map.get(p.market)?.push(p);
        });
        return map;
    }, [displayProjects, markets]);

    const sectionRefs = useRef<Record<MarketKey, HTMLDivElement | null>>(
        markets.reduce(
            (acc, m) => ({ ...acc, [m.key]: null }),
            {} as Record<MarketKey, HTMLDivElement | null>
        )
    );

    // Track scroll direction and header visibility
    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const cur = window.scrollY;

            if (cur < last) {
                setTopOffset(80);
                setHeaderVisible(true);
            } else if (cur > last) {
                setTopOffset(0);
                setHeaderVisible(false);
            }
            last = cur;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Track mobile sticky headers
    useEffect(() => {
        const checkMobileHeaders = () => {
            const newVisible = new Set<MarketKey>();

            markets.forEach((m) => {
                const heroEl = document.getElementById(`hero-${m.key}`);
                const sectionEl = sectionRefs.current[m.key];

                if (heroEl && sectionEl) {
                    const heroRect = heroEl.getBoundingClientRect();
                    const sectionRect = sectionEl.getBoundingClientRect();

                    if (heroRect.bottom < 80 && sectionRect.bottom > 100) {
                        newVisible.add(m.key);
                    }
                }
            });

            setVisibleMobileHeaders(newVisible);
        };

        window.addEventListener("scroll", checkMobileHeaders, { passive: true });
        window.addEventListener("resize", checkMobileHeaders);
        checkMobileHeaders();

        return () => {
            window.removeEventListener("scroll", checkMobileHeaders);
            window.removeEventListener("resize", checkMobileHeaders);
        };
    }, [markets]);

    useEffect(() => {
        function updateActive() {
            const viewportHeight = window.innerHeight;
            const stickyHeaderOffset = 100;

            if (selectedMarket) {
                const currentEl = sectionRefs.current[selectedMarket];
                if (currentEl) {
                    const rect = currentEl.getBoundingClientRect();
                    const isStillVisible = rect.bottom > stickyHeaderOffset && rect.top < viewportHeight;

                    if (isStillVisible) {
                        return;
                    }
                }
            }

            const visibleSections: { key: MarketKey; visiblePercentage: number; rect: DOMRect }[] = [];

            markets.forEach((m) => {
                const el = sectionRefs.current[m.key];
                if (!el) return;

                const rect = el.getBoundingClientRect();
                const isVisible = rect.bottom > stickyHeaderOffset && rect.top < viewportHeight;

                if (isVisible) {
                    const top = Math.max(stickyHeaderOffset, rect.top);
                    const bottom = Math.min(viewportHeight, rect.bottom);
                    const visibleHeight = Math.max(0, bottom - top);
                    const sectionHeight = rect.height;
                    const visiblePercentage = (visibleHeight / Math.min(sectionHeight, viewportHeight - stickyHeaderOffset)) * 100;

                    visibleSections.push({ key: m.key, visiblePercentage, rect });
                }
            });

            if (visibleSections.length > 0) {
                const bestSection = visibleSections.reduce((best, current) => {
                    if (current.rect.top <= stickyHeaderOffset + 50 && best.rect.top > stickyHeaderOffset + 50) {
                        return current;
                    }
                    if (best.rect.top <= stickyHeaderOffset + 50 && current.rect.top > stickyHeaderOffset + 50) {
                        return best;
                    }
                    return current.visiblePercentage > best.visiblePercentage ? current : best;
                }, visibleSections[0]);

                if (bestSection.key !== selectedMarket) {
                    setSelectedMarket(bestSection.key);
                }
            }
        }

        let scrollTimeout: NodeJS.Timeout;
        const debouncedUpdateActive = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActive, 50);
        };

        window.addEventListener("scroll", debouncedUpdateActive, { passive: true });
        window.addEventListener("resize", updateActive);

        setTimeout(updateActive, 100);
        requestAnimationFrame(updateActive);

        return () => {
            window.removeEventListener("scroll", debouncedUpdateActive);
            window.removeEventListener("resize", updateActive);
            clearTimeout(scrollTimeout);
        };
    }, [markets, selectedMarket]);

    if (markets.length === 0) {
        return (
            <section className="py-20">
                <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 text-center">
                    <p className="text-gray-500">No categories available.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 font-apfel2" id="market">
            {/* ✅ Sticky categories bar - DESKTOP ONLY - Full width with Hero padding inside */}
            <div
                ref={filterBarRef}
                className="hidden lg:block sticky left-0 right-0 z-50 transition-all duration-300"
                style={{ top: `${topOffset}px` }}
            >
                <CategoriesBar
                    markets={markets}
                    selected={selectedMarket}
                    onSelect={(key) => {
                        setSelectedMarket(key);
                        const el = sectionRefs.current[key];
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                />
            </div>

            {/* ✅ Market sections - SAME padding as Hero */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                <div className="mt-0 lg:mt-20 space-y-16 sm:space-y-20 md:space-y-24">
                    {markets.map((m) => {
                        const list = projectsByMarket.get(m.key) || [];

                        return (
                            <div
                                key={m.key}
                                id={`market-${m.key}`}
                                data-market-key={m.key}
                                ref={(el) => (sectionRefs.current[m.key] = el)}
                                className="scroll-mt-24 sm:scroll-mt-28 relative"
                            >
                                {/* Mobile-only sticky header */}
                                <div
                                    className={cn(
                                        "lg:hidden fixed left-0 right-0 z-40 bg-white border-b border-gray-200 transition-all duration-300",
                                        visibleMobileHeaders.has(m.key)
                                            ? "translate-y-0 opacity-100"
                                            : "-translate-y-full opacity-0"
                                    )}
                                    style={{
                                        top: headerVisible ? '65px' : '0px',
                                    }}
                                >
                                    <div className="px-4 sm:px-6">
                                        <div className="py-3">
                                            <span className="font-neuhas font-semibold text-gray-900 uppercase tracking-wider">
                                                SELECT {m.title.toUpperCase()} PROJECTS
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                                    {/* Left sticky hero - NEGATIVE MARGIN ON MOBILE FOR EDGE-TO-EDGE */}
                                    <div className="lg:col-span-6 -mx-4 sm:mx-0" id={`hero-${m.key}`}>
                                        <div className="lg:sticky lg:top-36">
                                            <MarketHeroCard market={m} />
                                        </div>
                                    </div>

                                    {/* Right project list */}
                                    <div className="lg:col-span-6">
                                        {/* Title - hide on mobile */}
                                        <div className="hidden lg:flex mb-4 sm:mb-6 items-end justify-between">
                                            <h3 className="text-[10px] sm:text-xs font-semibold tracking-widest text-foreground/70 uppercase">
                                                {m.title} Projects
                                            </h3>
                                            <div className="h-px bg-border w-1/2" />
                                        </div>

                                        {/* PROJECT CARDS */}
                                        <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                            {list.slice(0, 5).map((p) => (
                                                <ProjectCard key={p.id} project={p} />
                                            ))}
                                            {list.length === 0 && (
                                                <div className="rounded-xl border bg-card text-muted-foreground p-4 sm:p-6">
                                                    No projects found in {m.title}.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ---------------- Components ---------------- */

function CategoriesBar({
    markets,
    selected,
    onSelect,
}: {
    markets: MarketContent[];
    selected: MarketKey;
    onSelect: (key: MarketKey) => void;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    useEffect(() => {
        if (!selected || !scrollRef.current) return;

        const activeButton = buttonRefs.current[selected];
        if (!activeButton) return;

        const container = scrollRef.current;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        const buttonLeft = buttonRect.left - containerRect.left + container.scrollLeft;
        const buttonRight = buttonLeft + buttonRect.width;
        const containerWidth = container.clientWidth;

        const scrollTarget = buttonLeft - (containerWidth / 2) + (buttonRect.width / 2);

        container.scrollTo({
            left: scrollTarget,
            behavior: 'smooth'
        });
    }, [selected]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const checkScroll = () => {
            setShowLeftArrow(el.scrollLeft > 0);
            setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
        };

        checkScroll();
        el.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll);
        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [markets.length]);

    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({
            left: direction === "left" ? -200 : 200,
            behavior: "smooth",
        });
    };

    return (
        // ✅ Full width container
        <div className="relative bg-background overflow-x-hidden w-full">
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="overflow-x-auto overflow-y-hidden scroll-smooth w-full
                     [&::-webkit-scrollbar]:h-[10px] sm:[&::-webkit-scrollbar]:h-[12px]
                     [&::-webkit-scrollbar-track]:bg-red-100 [&::-webkit-scrollbar-track]:rounded-full
                     [&::-webkit-scrollbar-thumb]:bg-blue-800 [&::-webkit-scrollbar-thumb]:rounded-full
                     hover:[&::-webkit-scrollbar-thumb]:bg-red-700"
                    style={{
                        scrollbarWidth: "auto",
                        scrollbarColor: "#1D4ED8 #fee2e2",
                    }}
                >
                    {/* ✅ Inner flex with Hero's LEFT padding + matching RIGHT spacer */}
                    <div className="flex items-center space-x-3 sm:space-x-5 py-5 sm:py-7
                                    pl-4 sm:pl-6 md:pl-8 lg:pl-16 xl:pl-20">
                        {markets.map((m) => {
                            const Icon = m.icon || Bolt;
                            const isActive = selected === m.key;

                            return (
                                <button
                                    key={m.key}
                                    ref={(el) => (buttonRefs.current[m.key] = el)}
                                    onClick={() => onSelect(m.key)}
                                    className={cn(
                                        "group flex items-center rounded-full px-4 sm:px-4 py-1",
                                        "text-[14px] font-medium font-neuhas leading-[14px] tracking-[0.0208px] whitespace-nowrap flex-shrink-0 transition-all duration-200",
                                        isActive
                                            ? "bg-blue-800 text-white scale-105 shadow-lg"
                                            : "bg-gray-200 text-black hover:bg-red-100 hover:text-blue-800"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200",
                                            isActive ? "text-white" : "text-gray-800 group-hover:text-blue-800 font-semibold"
                                        )}
                                    />
                                    {m.title.toUpperCase()}
                                </button>
                            );
                        })}

                        {/* ✅ RIGHT spacer - SAME width as left padding for symmetry */}
                        <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 lg:w-16 xl:w-20" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MarketHeroCard({ market }: { market: MarketContent }) {
    return (
        // MOBILE: NO ROUNDED CORNERS, DESKTOP: ROUNDED
        <div className="group relative overflow-hidden rounded-none sm:rounded-2xl bg-card shadow-md">
            <div className="relative h-[350px] sm:h-[400px] md:h-[500px] w-full -mt-10">
                <Image
                    src={market.hero.imageUrl}
                    alt={market.hero.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 ease-out" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 z-10">
                    <h2 className="text-white text-2xl md:text-4xl leading-[30px] drop-shadow font-apfel2">
                        {market.title}
                    </h2>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-[17px] md:leading-[20px] text-white/85 
                        max-w-[85%] sm:max-w-md 
                        line-clamp-2 sm:line-clamp-none 
                        font-neuhas">
                        {market.description}
                    </p>
                </div>

                <Link
                    href={`/markets/${market.key}`}
                    aria-label={`${market.title} details`}
                    className="absolute bottom-3 sm:bottom-4 right-3 -rotate-45 sm:right-4 z-10 inline-flex h-9 w-9 sm:h-12 sm:w-12 
                        items-center justify-center rounded-full bg-blue-800 text-white shadow-lg 
                        transition-transform duration-300 ease-out hover:scale-110 hover:rotate-0"
                >
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: ProjectDisplay }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-500 ease-in-out">
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={project.image.imageUrl}
                    alt={project.image.description || project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 ease-in-out" />

                <div className="absolute left-0 right-0 bottom-6 px-4 sm:px-5 md:px-6 text-white">
                    {project.location && (
                        <div className="font-neuhas text-yellow-400 uppercase text-[10px] sm:text-xs md:text-[13px] font-medium tracking-widest mb-1">
                            {project.location}
                        </div>
                    )}

                    <h4 className="font-apfel2 text-2xl sm:text-3xl md:text-[28px] max-w-[85%] md:max-w-[90%]">
                        {project.title}
                    </h4>

                    {project.description && (
                        <div className="overflow-hidden max-h-0 group-hover:max-h-32 sm:group-hover:max-h-40 md:group-hover:max-h-48 transition-all duration-500 ease-in-out mt-2">
                            <p className="text-sm sm:text-base md:text-[16px] font-neuhas text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out max-w-[85%] sm:max-w-[80%] md:max-w-[80%]">
                                {project.description}
                            </p>
                        </div>
                    )}

                    <div className="absolute bottom-0 right-4 sm:right-5 md:right-6">
                        <Link
                            href={project.href || `/projects/${project.id}`}
                            aria-label={`${project.title} details`}
                            className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-blue-800 text-white flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-red-700 -rotate-45"
                        >
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}