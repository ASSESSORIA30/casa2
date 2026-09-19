import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, Box, KeyRound, Sofa, Factory, Ruler, ShieldCheck } from 'lucide-react';
import HouseCard from '@/components/HouseCard';
import SectionIntro from '@/components/SectionIntro';
import { BRAND } from '@/config/brand';
import { getPublicHouses } from '@/data/houses';

export default function HomePage() {
  const houses = getPublicHouses();
  const hero = houses[6];
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#c3c5c0] text-white">
        <img src={hero.hero} alt="Villa contemporánea de hormigón" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10"/>
        <div className="container-wide relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 md:pb-16">
          <p className="eyebrow mb-5 reveal">Viviendas industrializadas de hormigón</p>
          <h1 className="display-xl max-w-[1100px] reveal">Tu próxima casa<br/>ya está diseñada.</h1>
          <div className="mt-7 flex max-w-4xl flex-col gap-7 md:flex-row md:items-end md:justify-between reveal-delay">
            <p className="max-w-xl text-lg leading-7 text-white/85 md:text-xl">Arquitectura contemporánea. Completamente equipada y preparada para vivir.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/modelos" className="btn-light">Descubre los modelos</Link>
              <Link href="/contacto" className="btn-ghost !border-white/50 !text-white hover:!bg-white hover:!text-ink">Solicita información</Link>
            </div>
          </div>
          <ArrowDown className="mt-10 opacity-70" size={22}/>
        </div>
      </section>

      <section className="container-wide py-20 md:py-32">
        <SectionIntro eyebrow="Una nueva lógica" title="No empiezas una obra. Escoges una casa." text="Hemos convertido la vivienda en un producto mucho más claro: siete diseños previamente resueltos, una selección limitada de opciones y un único equipo que coordina el proceso hasta la entrega."/>
        <div className="mt-14 grid gap-0 border-y hairline md:grid-cols-4">
          {[
            ['01','Escoges','Un modelo ya diseñado y optimizado.'],['02','Adaptamos','Comprobamos su encaje técnico en tu parcela.'],['03','Construimos','Industrialización, cimentación, montaje y acabados.'],['04','Entras a vivir','Casa terminada, equipada y amueblada.'],
          ].map(([n,t,d]) => <div key={n} className="border-b hairline py-7 md:border-b-0 md:border-r md:px-6 first:md:pl-0 last:md:border-r-0"><p className="eyebrow opacity-40">{n}</p><h3 className="mt-8 text-2xl arch-serif">{t}</h3><p className="mt-3 text-sm leading-6 opacity-65">{d}</p></div>)}
        </div>
      </section>

      <section className="concrete-bg py-20 md:py-28">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-8 border-t hairline pt-6">
            <div><p className="eyebrow opacity-55">La colección</p><h2 className="display-lg mt-5">Siete casas.<br/>Una misma forma de vivir.</h2></div>
            <Link href="/modelos" className="hidden items-center gap-2 text-xs uppercase tracking-[.12em] md:flex">Ver todos <ArrowRight size={16}/></Link>
          </div>
          <div className="mt-14 grid gap-x-5 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {houses.slice(0, 6).map((house, i) => <HouseCard key={house.id} house={house} priority={i < 2}/>) }
          </div>
          <Link href={`/modelos/${houses[6].slug}`} className="group mt-16 block">
            <div className="arch-image aspect-[16/8] md:aspect-[16/7]"><img src={houses[6].hero} alt={houses[6].name} loading="lazy"/></div>
            <div className="grid gap-5 border-b hairline py-6 md:grid-cols-[1fr_auto] md:items-end">
              <div><p className="eyebrow opacity-45">Signature · {houses[6].surface} m²</p><h3 className="mt-2 text-4xl arch-serif md:text-6xl">{houses[6].name}</h3></div>
              <span className="flex items-center gap-2 text-xs uppercase tracking-[.12em]">Descubrir <ArrowRight size={16}/></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="container-wide py-20 md:py-32">
        <SectionIntro eyebrow="Más que llave en mano" title="Construida. Terminada. Equipada. Amueblada." text="No queremos entregarte una vivienda para que empiece otra lista de compras. Según modelo y pack, cocina, electrodomésticos, mobiliario principal, armarios, iluminación, baños y climatización forman parte de una propuesta cerrada."/>
        <div className="mt-14 grid gap-3 md:grid-cols-4">
          {[['Cocina','Mobiliario, encimera y equipamiento previsto.'],['Salón','Sofá, mesa, sillas y composición principal.'],['Dormitorios','Camas, colchones, mesitas y armarios previstos.'],['Confort','Baños, iluminación, climatización e instalaciones.']].map(([t,d],i)=><div key={t} className="min-h-60 concrete-panel p-6 md:p-8"><span className="text-5xl arch-serif opacity-25">0{i+1}</span><h3 className="mt-14 text-2xl arch-serif">{t}</h3><p className="mt-3 text-sm leading-6 opacity-65">{d}</p></div>)}
        </div>
        <Link href="/todo-incluido" className="btn-primary mt-8">Ver todo lo incluido <ArrowRight size={15}/></Link>
      </section>

      <section className="grid bg-[#272925] text-[#f4f0e8] md:grid-cols-2">
        <div className="min-h-[520px]"><img src={houses[5].gallery.find(x=>x.alt==='Piscina')?.src || houses[5].gallery[1].src} alt="Arquitectura industrializada" className="h-full w-full object-cover"/></div>
        <div className="flex flex-col justify-center p-7 md:p-14 xl:p-24">
          <p className="eyebrow opacity-55">Precisión industrial</p>
          <h2 className="mt-6 text-5xl leading-[.96] arch-serif md:text-7xl">Menos incertidumbre.<br/>Más control.</h2>
          <div className="mt-10 space-y-5 text-base leading-7 text-white/70">
            <p>Los modelos cerrados reducen decisiones tardías, incompatibilidades entre oficios y cambios que suelen disparar plazos y costes.</p>
            <p>La ingeniería y las especificaciones constructivas definitivas se incorporarán cuando el fabricante cierre cada sistema.</p>
          </div>
          <Link href="/tecnologia" className="btn-light mt-10 w-fit">Cómo construimos</Link>
        </div>
      </section>

      <section className="container-wide py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          <div><p className="eyebrow opacity-55">Por qué funciona</p><h2 className="display-lg mt-5">Decidir menos también es vivir mejor.</h2></div>
          <div className="grid gap-0 border-t hairline">
            {[[Ruler,'Diseño resuelto','Distribuciones optimizadas antes de llegar a tu parcela.'],[ShieldCheck,'Coste más previsible','Menos cambios y menos partidas abiertas durante el proceso.'],[Factory,'Proceso industrial','Fabricación planificada y montaje coordinado.'],[Sofa,'Equipamiento integrado','La vivienda se concibe con el mobiliario y el equipamiento desde el inicio.'],[KeyRound,'Una sola entrega','Un único destino: abrir la puerta y empezar a vivir.']].map(([Icon,t,d]) => { const C=Icon as typeof Check; return <div key={String(t)} className="grid grid-cols-[44px_1fr] gap-4 border-b hairline py-6"><C size={20}/><div><h3 className="text-xl arch-serif">{String(t)}</h3><p className="mt-1 text-sm leading-6 opacity-65">{String(d)}</p></div></div>})}
          </div>
        </div>
      </section>

      <section className="concrete-bg py-20 md:py-32">
        <div className="container-copy text-center"><p className="eyebrow opacity-55">Empieza por una decisión sencilla</p><h2 className="display-lg mt-6">Escoge la casa que encaja contigo.</h2><p className="body-lg mx-auto mt-6 max-w-2xl opacity-70">El resto —adaptación técnica, licencias, cimentación, fabricación, montaje, acabados y equipamiento— lo coordinamos nosotros.</p><div className="mt-9 flex justify-center gap-2"><Link href="/modelos" className="btn-primary">Ver modelos</Link><Link href="/contacto" className="btn-ghost">Hablar con nosotros</Link></div></div>
      </section>
    </>
  );
}
