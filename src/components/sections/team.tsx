import Image from "next/image";
import { teamMembers } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Team() {
  return (
    <section className="font-apfel2">
      <div className=" text-center">
        <h2 className="font-apfel2 text-3xl font-bold text-primary md:text-4xl">
          Our Leadership Team
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[#30454c]">
          Meet the experienced professionals guiding our company and ensuring the success of every project.
        </p>
        <div className="mt-4 mb-12 w-24 h-1 bg-accent mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.name} className="text-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="p-0">
              <div className="relative h-64 w-full bg-secondary/50">
                <Image
                  src={member.image.imageUrl}
                  alt={member.image.description}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  data-ai-hint={member.image.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="font-apfel2 text-2xl font-bold text-primary">{member.name}</h3>
              <p className="text-accent font-semibold text-lg">{member.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
