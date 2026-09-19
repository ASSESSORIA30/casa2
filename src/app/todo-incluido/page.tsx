import type { Metadata } from "next";
import { deliverStates, equipment, noTienes } from "@/data/content";
import { Button, Eyebrow, H2, Section } from "@/components/ui";
import { SiteImage } from "@/components/HouseImage";
import { Reveal } from "@/components/Reveal";
import type { ImageKind } from "@/lib/images";

export const metadata: Metadata = {
  title: "Casas completamente equipadas: todo incluido, lista para vivir",
  description: "Más que llave en mano: la vivienda se entrega construida, terminada, equipada y amueblada. Cocina, electrodomésticos, camas, sofá… y entras a vivir.",
  alternates: { canonical: "/todo-incluido" },
};

const showcase: { id: string; title: string; text: string; kind: ImageKind }[] = [
  { id: "cocina", title: "Cocina", text: "Completa, con mobiliario, encimera e iluminación.", kind: "kitchen" },
  { id: "electro", title: "Electrodomésticos", text: "Frigorífico, horno, placa, lavavajillas y lavadora.", kind: "kitchen" },
  { id: "salon", title: "Salón", text: "Sofá, mesa de comedor, sillas y textiles.", kind: "living" },
  { id: "dorm", title: "Dormitorios", text: "Camas, colchones, mesitas y armarios.", kind: "master-bedroom" },
  { id: "banos", title: "Baños", text: "Sanitarios, mobiliario, duchas y grifería.", kind: "master-bath" },
  { id: "clima", title: "Climatización", text: "Confort térmico todo el año.", kind: "living" },
  { id: "luz", title: "Iluminación", text: "Luz cálida y bien pensada en cada estancia.", kind: "living" },
  { id: "mob", title: "Mobiliario", text: "Todo lo necesario, ya colocado.", kind: "living" },
];

export default function TodoIncluido() {
  return (
    <>
      <header className="bg-stone-50 px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:px-14">
        <div className="mx-auto max-w-[1360px]">
          <Eyebrow>Todo incluido</Eyebrow>
          <h1 className="font-serif text-6xl font-light leading-none tracking-tight sm:text-8xl">Más que<br />llave en mano.</h1>
          <p className="mt-8 max-w-xl text-lg text-warm-600">Entregamos la vivienda lista para entrar a vivir. Solo tienes que traer tus maletas.</p>
        </div>
      </header>
      <Section>
        <div className="grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {deliverStates.map((d) => (
            <div key={d.title} className="bg-ivory p-8 sm:p-10"><p className="font-serif text-4xl font-light uppercase tracking-wide">{d.title}</p><p className="mt-4 text-sm leading-relaxed text-warm-600">{d.text}</p></div>
          ))}
        </div>
        <ul className="mx-auto mt-20 max-w-3xl space-y-3 text-center font-serif text-2xl font-light sm:text-3xl">{noTienes.map((n) => <li key={n}>{n}</li>)}</ul>
      </Section>
      <Section tone="stone">
        <Reveal className="mb-14"><Eyebrow>Qué recibes</Eyebrow><H2>Cada estancia, resuelta.</H2></Reveal>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {showcase.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 80}>
              <SiteImage name={`incluido-${s.id}`} alt={s.title} kind={s.kind} scale={0.7} className="aspect-[4/5] w-full" sizes="(min-width:1024px) 25vw, 50vw" />
              <p className="mt-4 font-serif text-2xl">{s.title}</p><p className="mt-1 text-sm text-warm-600">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <Reveal className="mb-12"><Eyebrow>El día de la entrega</Eyebrow><H2>Abres la puerta. Enciendes la luz.<br />Estás en casa.</H2></Reveal>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.slice(0, 6).map((e) => (<div key={e.id} className="border-t border-charcoal/20 pt-5"><p className="font-serif text-2xl">{e.title}</p><ul className="mt-3 space-y-1 text-sm text-warm-600">{e.items.map((i) => <li key={i}>· {i}</li>)}</ul></div>))}
        </div>
        <div className="mt-14 flex flex-col gap-3 sm:flex-row"><Button href="/equipamiento">Ver equipamiento completo</Button><Button href="/modelos" variant="outline">Descubre los modelos</Button></div>
        <p className="mt-8 max-w-xl text-xs text-warm-500">El equipamiento concreto puede variar según modelo y pack. Los productos y marcas definitivos se comunicarán en la memoria de calidades.</p>
      </Section>
    </>
  );
}
