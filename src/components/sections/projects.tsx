import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { projects } from "@/lib/data"; // using your existing data

type MarketTile = {
  id: string | number;
  title: string;
  tag: string;
  imageUrl: string;
  alt: string;
  href?: string;
};

const markets: MarketTile[] = [
  {
    id: "energy",
    title: "Energy",
    tag: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1400&auto=format&fit=crop",
    alt: "Energy infrastructure",
    href: "#",
  },
  {
    id: "env-cleanup",
    title: "Environmental Cleanup",
    tag: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1503516459261-40c66117780d?q=80&w=1400&auto=format&fit=crop",
    alt: "Environmental cleanup",
    href: "#",
  },
  {
    id: "mfg-tech",
    title: "Manufacturing & Technology",
    tag: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1400&auto=format&fit=crop",
    alt: "Manufacturing & Technology",
    href: "#",
  },
  {
    id: "mining",
    title: "Mining & Critical Minerals",
    tag: "MARKET",
    imageUrl:
      "https://images.unsplash.com/photo-1532892452297-87638ae8f06e?q=80&w=1400&auto=format&fit=crop",
    alt: "Mining & Critical Minerals",
    href: "#",
  },
];

export function Projects() {
  // Map your existing "projects" data to the card fields used below.
  // Expected shape on each item:
  // {
  //   id, title, location, description,
  //   image: { imageUrl, description, imageHint? }
  // }
  const projectCards =
    (projects as any[])?.map((p) => ({
      id: p.id,
      title: p.title,
      label: p.location,
      description: p.description,
      imageUrl: p?.image?.imageUrl,
      alt: p?.image?.description || p?.title || "Project image",
      imageHint: p?.image?.imageHint,
      href: "#",
    })) || [];

  return (
    <section>
      {/* Header */}
      <div className="font-apfel2 max-w-3xl mx-auto text-center">
        <h2 className="font-apfel2 text-3xl md:text-4xl font-bold text-primary">
          Explore Our Projects
        </h2>
        <p className="mt-4 text-lg text-[#30454c]">
          From complex LNG facilities to cutting-edge manufacturing and
          environmental cleanup programs, our work drives progress and connects
          communities.
        </p>
        <p className="mt-3 text-foreground/70">
          Browse by markets or dive straight into featured projects below.
        </p>
        <div className="mt-5 mb-12 w-24 h-1 bg-accent mx-auto rounded"></div>

        <div className="flex items-center justify-center gap-6">
          <Link
            href="#markets"
            className="inline-flex items-center gap-2 text-blue-800 hover:text-red-700 font-semibold"
          >
            View Markets
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 text-blue-800 hover:text-red-700 font-semibold"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Content Grid: Left Markets, Right Projects */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Markets (taller tiles) */}
        <div id="markets" className="lg:col-span-5 grid grid-cols-1 gap-6">
          {markets.map((m, idx) => (
            <Card
              key={m.id}
              className="relative overflow-hidden rounded-xl border-0 shadow-md group h-[320px] sm:h-[360px] bg-card"
            >
              <div className="absolute inset-0">
                <Image
                  src={m.imageUrl}
                  alt={m.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />

              {/* Tag */}
              <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] tracking-wide font-semibold text-white/90">
                {m.tag}
              </span>

              {/* Title */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-10">
                <h3 className="font-apfel2 text-white text-xl sm:text-2xl font-bold drop-shadow">
                  {m.title}
                </h3>
              </div>

              {/* Red action dot */}
              <Link
                href={m.href || "#"}
                className="absolute bottom-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-white shadow-lg transition-transform duration-200 hover:scale-110"
                aria-label={`${m.title} details`}
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Card>
          ))}
        </div>

        {/* Right: Projects grid (2 columns) */}
        <div id="projects" className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
          {projectCards.map((p, idx) => (
            <Card
              key={p.id ?? idx}
              className="relative overflow-hidden rounded-xl border-0 shadow-md group aspect-video bg-card"
            >
              <div className="absolute inset-0">
                <Image
                  src={p.imageUrl}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  data-ai-hint={p.imageHint}
                />
              </div>

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent transition-opacity duration-300" />

              {/* Label (e.g., location) */}
              {p.label ? (
                <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] tracking-wide font-semibold text-white/90">
                  {p.label}
                </span>
              ) : null}

              {/* Title + description */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10">
                <h4 className="text-white font-apfel2 text-lg sm:text-xl font-bold drop-shadow">
                  {p.title}
                </h4>
                {p.description ? (
                  <p className="mt-1 text-white/85 text-sm line-clamp-2">
                    {p.description}
                  </p>
                ) : null}
              </div>

              {/* Red action dot */}
              <Link
                href={p.href || "#"}
                className="absolute bottom-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-800 text-white shadow-lg transition-transform duration-200 hover:scale-110"
                aria-label={`${p.title} details`}
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}