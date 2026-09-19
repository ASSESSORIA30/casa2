import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BedDouble, Bath, Layers3, Car, Waves, Check } from 'lucide-react';
import PlanTabs from '@/components/PlanTabs';
import ContactForm from '@/components/ContactForm';
import { BRAND } from '@/config/brand';
import { getHouseSlugs, getPublicHouse, getPublicHouses } from '@/data/houses';

export function generateStaticParams() { return getHouseSlugs().map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const house = getPublicHouse(slug);
  if (!house) return {};
  return { title: `${house.name} · ${house.surface} m²`, description: `${house.name}: ${house.bedrooms} dormitorios, ${house.bathrooms} baños, ${house.surface} m². Vivienda industrializada completamente equipada.` };
}

export default async function HousePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const maybeHouse = getPublicHouse(slug);
  if (!maybeHouse) notFound();
  const house = maybeHouse!;
  const allHouses = getPublicHouses();
  const price = new Intl.NumberFormat(BRAND.locale, { style: 'currency', currency: BRAND.currency, maximumFractionDigits: 0 }).format(house.retailPrice);
  return <>
    <section className="relative min-h-[82svh] overflow-hidden bg-[#c2c5bf] text-white">
      <img src={house.hero} alt={`Vista conceptual de ${house.name}`} className="absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10"/>
      <div className="container-wide relative flex min-h-[82svh] flex-col justify-end pb-10 pt-32 md:pb-14">
        <p className="eyebrow">Colección {house.id}</p>
        <h1 className="display-xl mt-4">{house.name}</h1>
        <div className="mt-7 grid max-w-3xl grid-cols-2 gap-5 border-t border-white/30 pt-5 sm:grid-cols-4">
          <div className="model-stat"><strong>{house.surface} m²</strong><span>Construidos</span></div>
          <div className="model-stat"><strong>{house.bedrooms}</strong><span>Habitaciones</span></div>
          <div className="model-stat"><strong>{house.bathrooms}</strong><span>Baños</span></div>
          <div className="model-stat"><strong>{house.floors}</strong><span>Planta</span></div>
        </div>
      </div>
    </section>

    <section className="container-wide py-16 md:py-28">
      <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr]">
        <div><p className="eyebrow opacity-55">Concepto arquitectónico</p><p className="mt-5 text-sm leading-6 opacity-60">{house.audience}</p></div>
        <div><h2 className="display-lg">{house.tagline}</h2><p className="body-lg mt-7 max-w-3xl opacity-70">{house.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">{house.features.map((f)=><span key={f} className="border border-black/20 px-3 py-2 text-[10px] uppercase tracking-[.11em]">{f}</span>)}</div>
        </div>
      </div>
    </section>

    <section className="container-wide pb-20 md:pb-28">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-12 md:gap-3">
        {house.gallery.map((image, i) => <figure key={image.src} className={`arch-image relative ${i===0 ? 'col-span-2 aspect-[16/9] md:col-span-8 md:row-span-2' : i===1 ? 'col-span-2 aspect-[16/9] md:col-span-4 md:aspect-auto' : 'aspect-[4/3] md:col-span-4'}`}><img src={image.src} alt={image.alt} loading={i<2?'eager':'lazy'} className="h-full w-full object-cover"/><figcaption className="absolute bottom-3 left-3 bg-[#dde0da]/90 px-3 py-2 text-[9px] uppercase tracking-[.13em] text-ink backdrop-blur">{image.alt}</figcaption></figure>)}
      </div>
    </section>

    <section className="concrete-bg-light py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow opacity-55">Distribución</p><h2 className="mt-6 text-5xl arch-serif md:text-6xl">Pensada antes de construir.</h2><p className="mt-6 max-w-md text-sm leading-6 opacity-65">El plano es conceptual y comercial. Mantiene recorridos cortos, separación de zonas y concentración de instalaciones, pero deberá validarse y adaptarse técnicamente a parcela, normativa y estructura.</p></div><PlanTabs plan={house.plan}/></div>
        <p className="mt-4 text-[10px] uppercase tracking-[.1em] opacity-50">Distribución orientativa sujeta a adaptación técnica, urbanística y estructural.</p>
      </div>
    </section>

    <section className="container-wide py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2">
        <div><p className="eyebrow opacity-55">Cuadro de superficies</p><h2 className="mt-5 text-5xl arch-serif">Cada metro tiene un trabajo.</h2><div className="mt-10 border-t hairline">{house.rooms.map((room)=><div key={room.name} className="flex justify-between border-b hairline py-3 text-sm"><span>{room.name}</span><span className="tabular-nums opacity-65">{room.area.toFixed(1).replace('.', ',')} m²</span></div>)}</div></div>
        <div className="md:pl-10"><div className="grid grid-cols-2 gap-px bg-black/15 border border-black/15">{[
          ['Superficie útil',`${house.usableSurface} m²`],['Superficie construida',`${house.surface} m²`],['Porches',`${house.porchSurface} m²`],['Dimensiones',house.dimensions],['Dormitorios',String(house.bedrooms)],['Baños',String(house.bathrooms)],
        ].map(([label,value])=><div key={label} className="concrete-panel p-5"><p className="text-[10px] uppercase tracking-[.12em] opacity-50">{label}</p><p className="mt-3 text-xl arch-serif">{value}</p></div>)}</div>
        <div className="mt-5 flex flex-wrap gap-3 text-xs opacity-65">{house.garage&&<span className="flex items-center gap-2"><Car size={16}/>Garaje / marquesina</span>}{house.pool&&<span className="flex items-center gap-2"><Waves size={16}/>Piscina integrada</span>}<span className="flex items-center gap-2"><BedDouble size={16}/>{house.bedrooms} dormitorios</span><span className="flex items-center gap-2"><Bath size={16}/>{house.bathrooms} baños</span><span className="flex items-center gap-2"><Layers3 size={16}/>{house.floors} planta</span></div></div>
      </div>
    </section>

    <section className="grid bg-[#262824] text-white md:grid-cols-2"><div className="min-h-[500px]"><img src={house.gallery.find(x=>x.alt==='Cocina')?.src || house.gallery[3].src} alt="Interior conceptual" className="h-full w-full object-cover"/></div><div className="p-7 md:p-14 xl:p-20"><p className="eyebrow opacity-55">Equipamiento</p><h2 className="mt-6 text-5xl arch-serif md:text-6xl">La casa no termina en las paredes.</h2><div className="mt-9 grid gap-4">{house.equipment.map((item)=><div key={item} className="flex gap-3 border-b border-white/15 pb-4 text-sm text-white/75"><Check size={16} className="mt-1 shrink-0"/>{item}</div>)}</div><Link href="/equipamiento" className="btn-light mt-9">Ver equipamiento</Link></div></section>

    <section className="container-wide py-20 md:py-28"><div className="grid gap-10 md:grid-cols-2"><div><p className="eyebrow opacity-55">Opciones cerradas</p><h2 className="mt-5 text-5xl arch-serif">Personaliza sin volver a empezar.</h2><p className="mt-5 max-w-lg leading-7 opacity-65">Las opciones se plantean como packs predefinidos. Se evita modificar la distribución y se protege la lógica industrial del modelo.</p></div><div className="border-t hairline">{house.options.map((option,i)=><div key={option} className="flex items-center justify-between border-b hairline py-5"><span className="text-lg arch-serif">{option}</span><span className="text-xs opacity-40">0{i+1}</span></div>)}</div></div></section>

    <section className="concrete-bg py-20 md:py-28"><div className="container-wide grid gap-10 md:grid-cols-[.75fr_1.25fr]"><div><p className="eyebrow opacity-55">{BRAND.showPrices ? `Desde ${price}` : 'Solicitar precio'}</p><h2 className="display-lg mt-5">Quiero esta casa.</h2><p className="mt-6 max-w-md leading-7 opacity-65">Cuéntanos dónde quieres construirla. El siguiente paso es comprobar el encaje del modelo en tu parcela.</p></div><ContactForm houses={allHouses} defaultModel={house.name}/></div></section>
  </>;
}
