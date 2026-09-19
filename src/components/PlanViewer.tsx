"use client";
import { useState } from "react";
import type { Plan } from "@/lib/plan";
import { PlanSVG } from "./PlanSVG";

export function PlanViewer({ plan, title, disclaimer }: { plan: Plan; title: string; disclaimer: string }) {
  const [furnished, setFurnished] = useState(true);
  return (
    <div>
      <div className="mb-5 inline-flex border border-charcoal/20 p-1 text-[11px] font-medium uppercase tracking-[0.16em]" role="tablist">
        {[{ v: true, l: "Amueblado" }, { v: false, l: "Plano limpio" }].map((t) => (
          <button key={t.l} role="tab" aria-selected={furnished === t.v} onClick={() => setFurnished(t.v)}
            className={`min-h-[44px] px-5 transition-colors ${furnished === t.v ? "bg-charcoal text-ivory" : "text-charcoal hover:bg-stone-100"}`}>{t.l}</button>
        ))}
      </div>
      <div className="overflow-x-auto border border-charcoal/10 bg-[#FBF9F4]">
        <div className="min-w-[640px] lg:min-w-0">
          <PlanSVG plan={plan} furnished={furnished} label={`Plano ${furnished ? "amueblado" : "limpio"} de ${title}`} />
        </div>
      </div>
      <p className="mt-3 text-xs text-warm-500 sm:hidden">Desliza horizontalmente para ver el plano completo.</p>
      <p className="mt-3 text-xs italic text-warm-500">{disclaimer}</p>
    </div>
  );
}
