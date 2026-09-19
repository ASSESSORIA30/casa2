import type { Metadata } from "next";
import { techFields, techValue } from "@/data/content";
import { Button, Eyebrow, H2, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tecnología: construcción industrializada en hormigón",
  description: "Sistema constructivo de hormigón industrializado: fabricación en entorno controlado, calidad constante y plazos previsibles.",
  alternates: { canonical: "/tecnologia" },
};

const principles = [
  { t: "Fabricación en entorno controlado", d: "La producción industrializada permite un control de calidad constante y menos incertidumbre en obra." },
  { t: "Procesos repetibles", d: "Cada modelo está previamente optimizado: soluciones probadas, sin improvisaciones." },
  { t: "Plazos previsibles", d: "La cimentación y la fabricación avanzan en paralelo." },
  { t: "Hormigón como material de arquitectura", d: "Inercia, solidez y una estética atemporal, con acabados de diseño." },
];

export default function Tecnologia() {
  return (
    <>
      <PageHero eyebrow="Tecnología y construcción" title={<>Precisión industrial.<br />Sensibilidad arquitectónica.</>} text="Un sistema de construcción industrializada en hormigón, pensado para entregar viviendas de gama alta con rapidez y calidad constante." />
      <Section>
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">{principles.map((p) => (<div key={p.t} className="border-t border-charcoal/20 pt-6"><p className="font-serif text-3xl font-light">{p.t}</p><p className="mt-3 text-warm-600">{p.d}</p></div>))}</div>
      </Section>
      <Section tone="stone">
        <Eyebrow>Ficha técnica</Eyebrow><H2 className="mb-12">Especificaciones</H2>
        <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {techFields.map((f) => (
            <div key={f.label} className="grid gap-1 py-5 sm:grid-cols-[1fr_2fr] sm:gap-8"><dt className="font-serif text-xl">{f.label}</dt><dd className={f.value ? "" : "text-sm italic text-warm-500"}>{techValue(f.value)}</dd></div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-warm-500">Editable en <code>src/data/content.ts</code> (campo <code>techFields</code>).</p>
        <div className="mt-12"><Button href="/contacto" variant="outline">Solicitar información técnica</Button></div>
      </Section>
    </>
  );
}
