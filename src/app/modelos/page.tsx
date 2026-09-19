import type { Metadata } from "next";
import { getHouses } from "@/lib/houses";
import { HouseCard } from "@/components/HouseCard";
import { ModelsGrid } from "@/components/ModelsGrid";
import { PageHero, Section, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Modelos de casas industrializadas de hormigón",
  description: "Siete viviendas contemporáneas de hormigón, de 90 a 240 m², entregadas terminadas, equipadas y amuebladas. Escoge la tuya.",
  alternates: { canonical: "/modelos" },
};

export default function Modelos() {
  const houses = getHouses();
  return (
    <>
      <PageHero eyebrow="Colección" title={<>Siete casas.<br />Una forma de vivir.</>} text="Modelos cerrados y optimizados. Sin rediseños ni sorpresas: ves tu casa antes de empezar, y la recibes lista para vivir." />
      <Section>
        <ModelsGrid items={houses.map((h, i) => ({ id: h.slug, surface: h.nominalSurface, bedrooms: h.bedrooms, node: <HouseCard house={h} priority={i < 3} /> }))} />
        <div className="mt-24 border-t border-charcoal/10 pt-16 text-center">
          <p className="font-serif text-3xl font-light sm:text-4xl">¿No sabes cuál encaja con tu parcela?</p>
          <p className="mx-auto mt-4 max-w-md text-warm-600">Te ayudamos a escoger.</p>
          <div className="mt-8"><Button href="/contacto">Cuéntanos dónde quieres vivir</Button></div>
        </div>
      </Section>
    </>
  );
}
