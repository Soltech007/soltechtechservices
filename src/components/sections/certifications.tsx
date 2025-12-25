import { certifications } from "@/lib/data";
import { BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Certifications() {
  return (
    <section>
      <div className="text-center">
        <h2 className="font-apfel2 text-3xl font-bold text-primary md:text-4xl">
          Our Credentials
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[#30454c]">
          Our commitment to quality, safety, and regulatory adherence is validated by industry-leading certifications, ensuring trust and excellence in every project we undertake.
        </p>
        <div className="mt-4 mb-12 w-24 h-1 bg-accent mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <Card key={cert.name} className="flex items-center gap-4 p-4 rounded-lg hover:shadow-md transition-shadow">
            <BadgeCheck className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
