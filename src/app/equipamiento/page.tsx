import type { Metadata } from "next";
import { equipment } from "@/data/content";
import { Button, PageHero, Section } from "@/components/ui";
import { SiteImage } from "@/components/HouseImage";
import { Reveal } from "@/components/Reveal";
import type { ImageKind } from "@/lib/images";

export const metadata: Metadata = {
  title: "Equipamiento: cocina, electrodomésticos, mobiliario y domótica incluidos",
  description: "Cocina, electrodomésticos, salón, dormitorios, baños, climatización, iluminación, domótica y exterior: la casa se entrega equipada.",
  alternates: { canonical: "/equipamiento" },
};
const kindFor: Record<string, ImageKind> = { cocina: "kitchen", electrodomesticos: "kitchen", salon: "living", dormitorios: "master-bedroom", banos: "master-bath", climatizacion: "living", iluminacion: "living", domotica: "living", exterior: "exterior-garden" };

export default function Equipamiento() {
  return (
    <>
      <PageHero eyebrow="Equipamiento" title={<>Todo lo que necesitas.<br />Ya dentro.</>} text="Nueve categorías completamente resueltas. Los productos concretos se irán incorporando a medida que se cierren con los proveedores." />
      <Section>
        <div className="space-y-24 sm:space-y-32">
          {equipment.map((e, i) => (
            <Reveal key={e.id}>
              <article id={e.id} className={`grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <SiteImage name={`equip-${e.id}`} alt={e.title} kind={kindFor[e.id]} scale={0.7} className="aspect-[4/3] w-full" sizes="(min-width:1024px) 50vw, 100vw" />
                <div>
                  <p className="font-serif text-5xl font-light sm:text-6xl">{e.title}</p>
                  <p className="mt-4 text-lg text-warm-600">{e.text}</p>
                  <ul className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10">{e.items.map((it) => <li key={it} className="py-3 text-sm">{it}</li>)}</ul>
                  <p className="mt-4 text-xs italic text-warm-500">Producto y marca: pendiente de selección.</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-24 text-center"><Button href="/modelos">Descubre los modelos</Button></div>
      </Section>
    </>
  );
}
