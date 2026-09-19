import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PLAN_DISCLAIMER, site } from "@/config/site";
import { getHouse, getHouses, priceLabel } from "@/lib/houses";
import type { ImageKind } from "@/lib/images";
import { deliverStates, equipment, materials, packDetail } from "@/data/content";
import { Button, Eyebrow, H2, Section } from "@/components/ui";
import { HouseImage } from "@/components/HouseImage";
import { PlanViewer } from "@/components/PlanViewer";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() { return getHouses().map((h) => ({ slug: h.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const h = getHouse(params.slug);
  if (!h) return {};
  return {
    title: `${h.title} · Casa de hormigón de ${h.nominalSurface} m² llave en mano y equipada`,
    description: `${h.title}: ${h.nominalSurface} m², ${h.bedrooms} dormitorios, ${h.bathrooms} baños. ${h.tagline} Vivienda industrializada de hormigón entregada terminada, equipada y amueblada.`,
    alternates: { canonical: `/modelos/${h.slug}` },
  };
}

const fmt = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function HousePage({ params }: { params: { slug: string } }) {
  const h = getHouse(params.slug);
  if (!h) notFound();
  const all = getHouses();
  const idx = all.findIndex((x) => x.slug === h.slug);
  const prev = all[(idx + all.length - 1) % all.length], next = all[(idx + 1) % all.length];
  const s = h.summary;
  const gallery: { kind: ImageKind; span: string }[] = [
    { kind: "exterior-garden", span: "sm:col-span-2 aspect-[16/9]" },
    ...(h.pool !== "none" ? [{ kind: "pool" as ImageKind, span: "aspect-[4/3]" }] : []),
    { kind: "living", span: "aspect-[4/3]" },
    { kind: "kitchen", span: "aspect-[4/3]" },
    { kind: "master-bedroom", span: "aspect-[4/3]" },
    { kind: "master-bath", span: h.pool !== "none" ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]" },
  ];
  const stats = [
    [`${h.nominalSurface} m²`, "Superficie"], [`${h.bedrooms}`, "Dormitorios"], [`${h.bathrooms}`, "Baños"], [`${h.floors}`, h.floors > 1 ? "Plantas" : "Planta"],
  ];
  const poolTxt = h.pool === "included" ? "Piscina integrada en la propuesta" : h.pool === "ready" ? "Espacio preparado para piscina" : "Piscina opcional (según parcela)";
  const garageTxt = h.garage === "garage" ? "Garaje cubierto para 2 coches" : h.garage === "carport" ? "Marquesina para 2 coches" : "Sin garaje (opcional según parcela)";
  const jsonLd = { "@context": "https://schema.org", "@type": "Product", name: h.title, description: h.description, brand: { "@type": "Brand", name: site.brandName } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-charcoal">
        <div className="absolute inset-0 animate-slow"><HouseImage house={h} kind="exterior-front" className="h-full w-full" priority sizes="100vw" /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-charcoal/25" />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-28 sm:px-8 sm:pb-20 lg:px-14">
          {h.signature && <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-sand">Modelo Signature</p>}
          <h1 className="animate-rise font-serif text-[clamp(3rem,8.5vw,7rem)] font-light leading-none text-ivory">{h.title}</h1>
          <p className="mt-5 max-w-xl animate-rise text-lg text-ivory/85" style={{ animationDelay: ".2s" }}>{h.tagline}</p>
          <dl className="mt-9 grid max-w-2xl grid-cols-4 gap-4 border-t border-ivory/25 pt-6 text-ivory">
            {stats.map(([v, l]) => (<div key={l}><dt className="sr-only">{l}</dt><dd className="font-serif text-3xl font-light sm:text-4xl">{v}</dd><p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ivory/65 sm:text-[11px]">{l}</p></div>))}
          </dl>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Button href="#formulario" variant="light">Quiero esta casa</Button>
            <p className="text-sm uppercase tracking-[0.16em] text-ivory/80">{priceLabel(h)}</p>
          </div>
        </div>
      </section>

      {/* CONCEPTO */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <Reveal><Eyebrow>Concepto arquitectónico</Eyebrow><H2>{h.tagline}</H2><p className="mt-8 max-w-xl text-lg leading-relaxed text-warm-600">{h.description}</p><p className="mt-5 max-w-xl leading-relaxed text-warm-600">{h.concept}</p><p className="mt-5 text-sm text-warm-500"><strong className="font-medium text-charcoal">Pensada para:</strong> {h.audience}</p></Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {h.highlights.map((t) => <li key={t} className="flex items-center gap-4 py-5"><span className="h-px w-8 bg-bronze" /><span className="font-serif text-xl sm:text-2xl">{t}</span></li>)}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* GALERÍA */}
      <section className="bg-stone-50 px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1360px]">
          <Reveal className="mb-10"><Eyebrow>Galería</Eyebrow><H2>Interior y exterior</H2></Reveal>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {gallery.map((g) => (
              <Reveal key={g.kind} className={g.span.includes("col-span-2") ? "sm:col-span-2" : ""}>
                <HouseImage house={h} kind={g.kind} className={`w-full ${g.span.replace("sm:col-span-2", "")}`} sizes="(min-width:1024px) 50vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLANO */}
      <Section id="plano">
        <Reveal className="mb-12"><Eyebrow>Plano y distribución</Eyebrow><H2>Cada metro, pensado.</H2></Reveal>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <PlanViewer plan={h.plan} title={h.title} disclaimer={PLAN_DISCLAIMER} />
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-dark">Cuadro de superficies</p>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-charcoal/10">
                {h.plan.rooms.filter((r) => r.type !== "corridor").map((r) => (<tr key={r.id}><td className="py-2.5 pr-3">{r.name}</td><td className="py-2.5 text-right tabular-nums text-warm-600">{fmt(r.area)} m²</td></tr>))}
                <tr><td className="py-2.5 pr-3">Distribuidor</td><td className="py-2.5 text-right tabular-nums text-warm-600">{fmt(h.plan.rooms.find((r) => r.type === "corridor")!.area)} m²</td></tr>
                <tr className="font-medium"><td className="py-3">Superficie útil</td><td className="py-3 text-right tabular-nums">{fmt(s.usable)} m²</td></tr>
                <tr className="font-medium"><td className="py-3">Superficie construida</td><td className="py-3 text-right tabular-nums">{fmt(s.built)} m²</td></tr>
                <tr><td className="py-2.5">Porches y terrazas cubiertas</td><td className="py-2.5 text-right tabular-nums text-warm-600">{fmt(s.porch)} m²</td></tr>
                {s.garage > 0 && <tr><td className="py-2.5">Garaje / marquesina</td><td className="py-2.5 text-right tabular-nums text-warm-600">{fmt(s.garage)} m²</td></tr>}
                <tr><td className="py-2.5">Dormitorios · Baños</td><td className="py-2.5 text-right text-warm-600">{s.bedrooms} · {s.bathrooms}</td></tr>
                <tr><td className="py-2.5">Dimensiones exteriores aprox.</td><td className="py-2.5 text-right tabular-nums text-warm-600">{fmt(s.W)} × {fmt(s.D)} m</td></tr>
              </tbody>
            </table>
            <ul className="mt-6 space-y-1 text-sm text-warm-600"><li>· {poolTxt}</li><li>· {garageTxt}</li></ul>
            <p className="mt-6 text-xs italic text-warm-500">{PLAN_DISCLAIMER} Superficies aproximadas; planos conceptuales, no proyecto de ejecución.</p>
          </div>
        </div>
      </Section>

      {/* INTERIORES / MATERIALES */}
      <Section tone="stone">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>Interiores y materiales</Eyebrow><H2>Quiet luxury mediterráneo.</H2>
            <p className="mt-6 leading-relaxed text-warm-600">Tonos arena, beige y gris cálido; roble, nogal y piedra natural. El negro, solo como acento.</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">{materials.map((m) => <li key={m.name} className="border-t border-charcoal/15 pt-4"><p className="font-serif text-xl">{m.name}</p><p className="mt-1 text-sm text-warm-600">{m.text}</p></li>)}</ul>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Características</Eyebrow>
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">{h.features.map((f) => <li key={f} className="py-4">{f}</li>)}</ul>
            <div className="mt-10">
              <Eyebrow>Opciones disponibles</Eyebrow>
              <div className="space-y-6">{h.options.map((o) => (<div key={o.title}><p className="font-serif text-xl">{o.title}</p><ul className="mt-2 space-y-1 text-sm text-warm-600">{o.items.map((i) => <li key={i}>· {i}</li>)}</ul></div>))}</div>
              <p className="mt-6 text-sm text-warm-500">Modelo cerrado: la distribución no admite modificaciones importantes. Eso es lo que nos permite ofrecerte plazo y precio claros.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* EQUIPAMIENTO / QUÉ INCLUYE */}
      <Section>
        <Reveal className="mb-12 max-w-3xl"><Eyebrow>Qué incluye</Eyebrow><H2>Construida. Terminada. Equipada. Amueblada.</H2><p className="mt-6 text-warm-600">{packDetail[h.pack]}</p></Reveal>
        <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{deliverStates.map((d) => <div key={d.title} className="border-t border-charcoal/20 pt-5"><p className="font-serif text-2xl">{d.title}</p><p className="mt-2 text-sm text-warm-600">{d.text}</p></div>)}</div>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((e) => (<div key={e.id}><p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-dark">{e.title}</p><ul className="space-y-1.5 text-sm text-warm-600">{e.items.slice(0, 4).map((i) => <li key={i}>{i}</li>)}</ul></div>))}
        </div>
        <p className="mt-10 text-sm"><Link href="/equipamiento" className="underline underline-offset-4">Ver todo el equipamiento →</Link></p>
      </Section>

      {/* FORMULARIO */}
      <Section tone="stone" id="formulario-seccion">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div><Eyebrow>Quiero esta casa</Eyebrow><H2>Cuéntanos dónde quieres vivir.</H2><p className="mt-6 text-warm-600">Solicita información sobre {h.title}. Estudiaremos tu parcela y te explicaremos los siguientes pasos.</p><p className="mt-4 text-sm uppercase tracking-[0.16em] text-bronze-dark">{priceLabel(h)}</p></div>
          <ContactForm models={all.map((x) => ({ slug: x.slug, title: x.title }))} defaultModel={h.slug} />
        </div>
      </Section>

      {/* NAV */}
      <nav className="grid grid-cols-2 border-t border-charcoal/10 bg-ivory" aria-label="Otros modelos">
        {[{ x: prev, l: "← Anterior" }, { x: next, l: "Siguiente →" }].map(({ x, l }, i) => (
          <Link key={x.slug} href={`/modelos/${x.slug}`} className={`p-8 transition-colors hover:bg-stone-50 sm:p-14 ${i === 1 ? "border-l border-charcoal/10 text-right" : ""}`}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-warm-500">{l}</p><p className="mt-2 font-serif text-2xl sm:text-4xl">{x.title}</p>
          </Link>
        ))}
      </nav>
    </>
  );
}
