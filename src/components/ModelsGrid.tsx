"use client";
import { useState, type ReactNode } from "react";

export interface GridItem { id: string; surface: number; bedrooms: number; node: ReactNode }

const surfaceFilters = [
  { id: "all", label: "Todas", test: () => true },
  { id: "s1", label: "Hasta 120 m²", test: (s: number) => s <= 120 },
  { id: "s2", label: "120–160 m²", test: (s: number) => s > 120 && s <= 160 },
  { id: "s3", label: "160–200 m²", test: (s: number) => s > 160 && s <= 200 },
  { id: "s4", label: "+200 m²", test: (s: number) => s > 200 },
];
const bedFilters = [{ id: 0, label: "Cualquier nº" }, { id: 3, label: "3 hab." }, { id: 4, label: "4 hab." }, { id: 5, label: "5 hab." }];

export function ModelsGrid({ items }: { items: GridItem[] }) {
  const [s, setS] = useState("all");
  const [b, setB] = useState(0);
  const st = surfaceFilters.find((f) => f.id === s)!;
  const shown = items.filter((i) => st.test(i.surface) && (b === 0 || i.bedrooms === b));
  const chip = (active: boolean) => `min-h-[44px] whitespace-nowrap border px-4 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${active ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/25 text-charcoal hover:border-charcoal"}`;
  return (
    <div>
      <div className="mb-12 space-y-3">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrar por superficie">
          {surfaceFilters.map((f) => <button key={f.id} className={chip(s === f.id)} onClick={() => setS(f.id)} aria-pressed={s === f.id}>{f.label}</button>)}
        </div>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filtrar por habitaciones">
          {bedFilters.map((f) => <button key={f.id} className={chip(b === f.id)} onClick={() => setB(f.id)} aria-pressed={b === f.id}>{f.label}</button>)}
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="py-16 text-center text-warm-600">Ningún modelo coincide con estos filtros. Prueba con otra combinación.</p>
      ) : (
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => <div key={i.id}>{i.node}</div>)}
        </div>
      )}
    </div>
  );
}
