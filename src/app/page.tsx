import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { getHouses } from "@/lib/houses";
import { advantages, comparison, deliverStates, equipment, noTienes, steps } from "@/data/content";
import { Button, Eyebrow, H2, Section } from "@/components/ui";
import { HouseCard } from "@/components/HouseCard";
import { SiteImage } from "@/components/HouseImage";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: `${site.brandName} · Casas industrializadas de hormigón llave en mano, equipadas y listas para vivir` },
  description: "Escoge tu casa de arquitectura contemporánea en hormigón industrializado. Entregada terminada, equipada y amueblada. Siete modelos cerrados, un solo interlocutor.",
};

export default function Home() {
  const houses = getHouses();
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 animate-slow">
          <SiteImage name="hero" alt="Villa contemporánea de hormigón al atardecer" kind="exterior-front" scale={1} pool className="h-full w-full" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/30" />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-28 sm:px-8 sm:pb-24 lg:px-14">
          <p className="mb-6 animate-rise text-[11px] font-medium uppercase tracking-[0.24em] text-sand" style={{ animationDelay: ".2s" }}>{site.brandName} · Arquitectura industrializada</p>
          <h1 className="max-w-4xl animate-rise font-serif text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.98] tracking-tight text-ivory" style={{ animationDelay: ".35s" }}>
            Tu próxima casa ya está diseñada.
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-base leading-relaxed text-ivory/85 sm:text-lg" style={{ animationDelay: ".55s" }}>
            Arquitectura industrializada de hormigón. Completamente equipada y preparada para vivir.
          </p>
          <div className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row" style={{ animationDelay: ".75s" }}>
            <Button href="/modelos" variant="light">Descubre los modelos</Button>
            <Button href="/contacto" variant="ghost">Solicita información</Button>
          </div>
        </div>
      </section>

      {/* CONCEPTO */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>El concepto</Eyebrow>
            <H2>Escoge tu casa.<br />Nosotros hacemos el resto.</H2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-warm-600">
              Olvida la obra tradicional. Aquí escoges un producto terminado: un diseño de arquitectura contemporánea, optimizado y cerrado, que adaptamos a tu parcela, construimos, equipamos y te entregamos listo para vivir.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {noTienes.map((t, i) => (
                <li key={t} className="flex items-baseline gap-5 py-6">
                  <span className="font-serif text-2xl text-bronze">0{i + 1}</span>
                  <span className="font-serif text-2xl font-light leading-snug sm:text-[28px]">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-warm-600">Escoges uno de nuestros diseños. Lo adaptamos a tu parcela. Lo construimos. Lo equipamos. Te entregamos las llaves. <strong className="font-medium text-charcoal">Y entras a vivir.</strong></p>
          </Reveal>
        </div>
      </Section>

      {/* COLECCIÓN */}
      <Section tone="stone" id="coleccion">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 sm:mb-20 lg:flex-row lg:items-end">
          <div><Eyebrow>La colección</Eyebrow><H2>Siete viviendas.<br />Un mismo lenguaje.</H2></div>
          <p className="max-w-md text-warm-600">De 90 a 240 m², todas en una planta, todas con la misma calidad de materiales, el mismo cuidado por la luz y el mismo nivel de terminación.</p>
        </Reveal>
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {houses.map((h, i) => (
            <div key={h.slug} className="w-[82vw] shrink-0 snap-center sm:w-auto"><Reveal delay={(i % 3) * 100}><HouseCard house={h} /></Reveal></div>
          ))}
        </div>
        <div className="mt-16 text-center"><Button href="/modelos" variant="outline">Ver todos los modelos</Button></div>
      </Section>

      {/* QUÉ INCLUYE */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SiteImage name="interior" alt="Salón amueblado y equipado" kind="living" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Qué incluye</Eyebrow>
            <H2>Más que llave en mano.</H2>
            <p className="mt-6 text-lg leading-relaxed text-warm-600">Entregamos la vivienda completa. No falta nada, no hay que comprar nada.</p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9">
              {deliverStates.map((d) => (
                <div key={d.title} className="border-t border-charcoal/20 pt-5">
                  <p className="font-serif text-3xl font-light">{d.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-warm-600">{d.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12"><Button href="/todo-incluido" variant="outline">Descubre todo lo que incluye</Button></div>
          </Reveal>
        </div>
      </Section>

      {/* VENTAJAS */}
      <Section tone="charcoal">
        <Reveal className="mb-16 max-w-3xl"><Eyebrow light>Ventajas</Eyebrow><H2 light>Menos decisiones.<br />Más tranquilidad.</H2></Reveal>
        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 90}>
              <div className="border-t border-ivory/20 pt-6">
                <p className="font-serif text-2xl font-light text-ivory sm:text-3xl">{a.title}</p>
                <p className="mt-3 leading-relaxed text-ivory/65">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-24 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead><tr className="text-[11px] uppercase tracking-[0.2em] text-sand"><th className="pb-5 font-medium">Construir una casa a medida</th><th className="pb-5 font-medium">Escoger tu {site.brandName}</th></tr></thead>
            <tbody>{comparison.map(([a, b]) => (
              <tr key={a} className="border-t border-ivory/15"><td className="py-5 pr-6 text-ivory/50 line-through decoration-ivory/25">{a}</td><td className="py-5 font-serif text-xl text-ivory sm:text-2xl">{b}</td></tr>
            ))}</tbody>
          </table>
        </Reveal>
      </Section>

      {/* PROCESO */}
      <Section>
        <Reveal className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><Eyebrow>El proceso</Eyebrow><H2>De la elección a las llaves<br />en siete pasos.</H2></div>
          <Link href="/como-funciona" className="text-[11px] font-medium uppercase tracking-[0.18em] underline underline-offset-8">Ver cómo funciona</Link>
        </Reveal>
        <ol className="grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="bg-ivory p-7 sm:p-8">
              <span className="font-serif text-5xl font-light text-bronze">{s.n}</span>
              <p className="mt-6 font-serif text-2xl font-light">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-warm-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* TECNOLOGÍA + EQUIPAMIENTO */}
      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>Tecnología</Eyebrow>
            <H2>Precisión industrial.<br />Hormigón, con diseño.</H2>
            <p className="mt-6 max-w-lg leading-relaxed text-warm-600">Fabricamos en un entorno controlado para conseguir calidad constante, plazos previsibles y una vivienda de comportamiento excelente. Los detalles técnicos se irán publicando junto al fabricante.</p>
            <div className="mt-10"><Button href="/tecnologia" variant="outline">Sistema constructivo</Button></div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Equipamiento</Eyebrow>
            <H2>Todo, dentro.</H2>
            <div className="mt-8 flex flex-wrap gap-2">
              {equipment.map((e) => <Link key={e.id} href={`/equipamiento#${e.id}`} className="border border-charcoal/25 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory">{e.title}</Link>)}
            </div>
            <div className="mt-10"><Button href="/equipamiento" variant="outline">Ver equipamiento</Button></div>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-charcoal px-5 py-28 text-center sm:py-40">
        <div className="absolute inset-0 -z-10 opacity-40"><SiteImage name="cta" alt="" kind="exterior-garden" scale={0.8} className="h-full w-full" /></div>
        <div className="absolute inset-0 -z-10 bg-charcoal/60" />
        <Reveal>
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-sand">Empieza hoy</p>
          <h2 className="mx-auto max-w-3xl font-serif text-5xl font-light leading-tight text-ivory sm:text-6xl">Cuéntanos dónde quieres vivir.</h2>
          <p className="mx-auto mt-6 max-w-md text-ivory/75">Escoge tu modelo y estudiaremos tu parcela sin compromiso.</p>
          <div className="mt-10"><Button href="/contacto" variant="light">Solicita información</Button></div>
        </Reveal>
      </section>
    </>
  );
}
