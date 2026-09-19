import type { Metadata } from 'next';
import ModelsGrid from '@/components/ModelsGrid';
import { getPublicHouses } from '@/data/houses';

export const metadata: Metadata = { title: 'Modelos', description: 'Colección de viviendas industrializadas de hormigón de 90 a 240 m², completamente equipadas.' };

export default function ModelsPage() {
  const houses = getPublicHouses();
  return <div className="container-wide pb-24 pt-32 md:pb-32 md:pt-44">
    <div className="grid gap-8 border-t hairline pt-6 md:grid-cols-[.7fr_1.3fr]"><p className="eyebrow pt-2 opacity-55">Colección 01—07</p><div><h1 className="display-xl">Escoge.<br/>No empieces de cero.</h1><p className="body-lg mt-8 max-w-2xl opacity-70">Siete modelos cerrados, de 92 a 244 m². Cada uno ha sido planteado como un producto completo: arquitectura, distribución, equipamiento y opciones predefinidas.</p></div></div>
    <div className="mt-16 md:mt-24"><ModelsGrid houses={houses}/></div>
  </div>;
}
