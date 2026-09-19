import Link from 'next/link';
import { ArrowUpRight, BedDouble, Bath, Layers3 } from 'lucide-react';
import type { PublicHouse } from '@/data/types';
import { BRAND } from '@/config/brand';

export default function HouseCard({ house, priority = false }: { house: PublicHouse; priority?: boolean }) {
  const price = new Intl.NumberFormat(BRAND.locale, { style: 'currency', currency: BRAND.currency, maximumFractionDigits: 0 }).format(house.retailPrice);
  return (
    <article className="group">
      <Link href={`/modelos/${house.slug}`} className="block">
        <div className="arch-image aspect-[4/3] bg-[#c4c7c1]">
          <img src={house.hero} alt={`Vista conceptual de ${house.name}`} loading={priority ? 'eager' : 'lazy'} />
        </div>
        <div className="flex items-start justify-between border-b hairline py-5">
          <div>
            <p className="eyebrow opacity-45">{house.surface} m² · Colección {house.id}</p>
            <h3 className="mt-2 text-3xl arch-serif">{house.name}</h3>
          </div>
          <ArrowUpRight className="mt-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={22}/>
        </div>
        <div className="grid grid-cols-3 gap-3 py-4 text-xs opacity-65">
          <span className="flex items-center gap-2"><BedDouble size={15}/>{house.bedrooms} hab.</span>
          <span className="flex items-center gap-2"><Bath size={15}/>{house.bathrooms} baños</span>
          <span className="flex items-center gap-2"><Layers3 size={15}/>{house.floors} planta</span>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-6 opacity-70">{house.tagline}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[.12em]">
          {BRAND.showPrices ? `Desde ${price}` : 'Solicitar precio'}
        </p>
      </Link>
    </article>
  );
}
