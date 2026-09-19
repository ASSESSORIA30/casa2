import Link from "next/link";
import type { PublicHouse } from "@/lib/houses";
import { priceLabel } from "@/lib/houses";
import { HouseImage } from "./HouseImage";

export function HouseCard({ house, priority }: { house: PublicHouse; priority?: boolean }) {
  return (
    <Link href={`/modelos/${house.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]">
          <HouseImage house={house} kind="exterior-front" className="h-full w-full" sizes="(min-width:1024px) 33vw, 100vw" priority={priority} />
        </div>
        {house.signature && <span className="absolute right-3 top-3 bg-ivory px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal">Signature</span>}
      </div>
      <div className="pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-3xl font-light text-charcoal">{house.title}</h3>
          <span className="text-xs uppercase tracking-[0.14em] text-warm-500">{priceLabel(house)}</span>
        </div>
        <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-bronze-dark">
          {house.nominalSurface} m² · {house.bedrooms} hab. · {house.bathrooms} baños · {house.floors} planta{house.floors > 1 ? "s" : ""}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-warm-600">{house.tagline}</p>
        <span className="mt-5 inline-block border-b border-charcoal pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors group-hover:border-bronze group-hover:text-bronze-dark">Descubrir</span>
      </div>
    </Link>
  );
}
