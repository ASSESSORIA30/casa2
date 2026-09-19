'use client';

import { useState } from 'react';
import PlanView from './PlanView';
import type { PlanRoom } from '@/data/types';

export default function PlanTabs({ plan }: { plan: { widthM: number; depthM: number; rooms: PlanRoom[] } }) {
  const [furnished, setFurnished] = useState(true);
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setFurnished(false)} className={`border px-4 py-2 text-[10px] uppercase tracking-[.12em] ${!furnished ? 'border-ink bg-ink text-white' : 'border-black/20'}`}>Plano limpio</button>
        <button onClick={() => setFurnished(true)} className={`border px-4 py-2 text-[10px] uppercase tracking-[.12em] ${furnished ? 'border-ink bg-ink text-white' : 'border-black/20'}`}>Plano amueblado</button>
      </div>
      <PlanView plan={plan} furnished={furnished}/>
    </div>
  );
}
