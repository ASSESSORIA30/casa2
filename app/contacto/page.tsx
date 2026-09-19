import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { BRAND } from '@/config/brand';
import { getPublicHouses } from '@/data/houses';

export const metadata: Metadata = { title: 'Contacto', description: 'Cuéntanos dónde quieres vivir y qué modelo te interesa.' };
export default function ContactPage(){const houses=getPublicHouses();return <section className="container-wide min-h-[78svh] pb-24 pt-32 md:pb-32 md:pt-44"><div className="grid gap-14 border-t hairline pt-6 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow opacity-55">Contacto</p><h1 className="display-lg mt-7">Cuéntanos dónde quieres vivir.</h1><p className="mt-7 max-w-md leading-7 opacity-65">Si ya tienes parcela, indícanos provincia y el modelo que te interesa. Si todavía la estás buscando, también podemos empezar por ahí.</p><div className="mt-10 text-sm leading-7 opacity-60"><p>{BRAND.email}</p><p>{BRAND.phone}</p></div></div><ContactForm houses={houses}/></div></section>}
