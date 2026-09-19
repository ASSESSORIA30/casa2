import type { Metadata } from "next";
import { steps, noTienes } from "@/data/content";
import { Button, PageHero, Section } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cómo funciona: de la elección a las llaves en siete pasos",
  description: "Escoge tu modelo, estudiamos tu parcela, gestionamos licencias, cimentamos, fabricamos, montamos y te entregamos las llaves.",
  alternates: { canonical: "/como-funciona" },
};

export default function ComoFunciona() {
  return (
    <>
      <PageHero eyebrow="Cómo funciona" title={<>Siete pasos.<br />Un solo interlocutor.</>} text="Sin diseñar desde cero, sin coordinar industriales, sin comprar muebles después." />
      <Section>
        <ol className="mx-auto max-w-4xl">
          {steps.map((s) => (
            <Reveal key={s.n}>
              <li className="grid grid-cols-[72px_1fr] gap-4 border-t border-charcoal/15 py-10 sm:grid-cols-[140px_1fr] sm:py-14">
                <span className="font-serif text-5xl font-light text-bronze sm:text-7xl">{s.n}</span>
                <div><h2 className="font-serif text-3xl font-light sm:text-5xl">{s.title}</h2><p className="mt-3 max-w-lg text-warm-600">{s.text}</p></div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
      <Section tone="stone">
        <div className="mx-auto max-w-3xl text-center">
          <ul className="space-y-3 font-serif text-2xl font-light sm:text-3xl">{noTienes.map((n) => <li key={n}>{n}</li>)}</ul>
          <p className="mt-10 text-warm-600">Los plazos concretos dependerán de la parcela, la tramitación de licencias y el modelo escogido. Te los detallamos en el estudio de tu parcela.</p>
          <div className="mt-10"><Button href="/contacto">Empezar por mi parcela</Button></div>
        </div>
      </Section>
    </>
  );
}
